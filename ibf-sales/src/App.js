// @flow
import React, { Component } from 'react';
import NavbarComponent from './Components/Presentational/NavbarComponent/NavbarComponent';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionsCreators from './Redux/Actions/ActionsCreators';
import Routes from './Routes';
import ErrorBoundary from './Utils/ErrorBoundary';
import ShoppingCartContainer from './Components/Containers/ShoppingCartContainer/ShoppingCartContainer';
import ModalWrapperContainer from './Components/Shared/Modals/ModalWrapperContainer';

import { Modal, ModalBody } from 'reactstrap';
import EmmaLogo from './Assets/Images/PullingAccountData.gif';
import environment from './environment';
import BackToTopComponent from './Components/Presentational/BackToTopComponent/BackToTopComponent';
import SharedService from './Services/SharedService';
import { sbxSessionService } from './Network';
import LoginNavbarComponent from './Components/Presentational/LoginComponent/LoginNavbarComponent/LoginNavbarComponent';
import 'react-widgets/dist/css/react-widgets.css';

class App extends Component<{}> {
	state = {
		invalidToken: false
	};

	componentDidMount() {
		const url = window.location.href;
		const params = window.location.hash.split('/')[1];

		if (SharedService.isMobile.any()) {
			if (SharedService.isMobile.Android()) {
				const path = environment.path.split(':/');
				const pack = environment.androidPackage;
				let params = window.location.hash.split('?')[1] || '';
				if (params) {
					params =
						params
							.split('&')
							.map(item => `S.${item}`)
							.join(';') + ';';
				}
				window.location.href = `intent:/${path[1]}#Intent;package=${pack};scheme=${
					path[0]
				};launchFlags=268435456;${params}end;`;
				setTimeout(function() {
					window.location.href =
						'https://play.google.com/store/apps/details?id=com.ibuyflowers.android.app&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1';
				}, 100);
			} else {
				window.location.href = url.replace('https:', 'ibf:');
				setTimeout(function() {
					window.location.href = 'https://itunes.apple.com/us/app/ibuyflowers/id1407423329?mt=8';
				}, 100);
			}
		} else {
			if (window.location.href.indexOf('auth/validate') !== -1) {
				const route = window.location.hash.split('?');
				const params = queryString.parse(route[1]);
				window.location = `/#/?${queryString.stringify(params)}`;
				window.location.reload();
			} else {
				const { token, user_key } = queryString.parse(params);
				if (token) {
					localStorage.clear();
					sbxSessionService.updateToken(token);
				}

				if (token || localStorage.getItem('token')) {
					this.setState(prev => ({ prev, token, user_key }));
					this.props.validateToken(token, user_key);
				} else {
					this.setState(prev => ({ ...prev, invalidToken: true }));
				}
			}
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const { user, logged, customer, token } = this.props;
		if (!prevProps.logged && logged && user.role) {
			// get holidays after validate token
			this.props.getHolidays();
			if (!this.props.finished) {
				this.props.homeLoading(this.props.customer.customer);
			}

			if (user.role === 'FLORIST') {
				this.props.listShoppingCart(customer.customer);
				this.props.loadCards(customer.customer);
			} else {
				window.location.href = `${environment.version1Url}?token=${token}`;
			}
		}
		// if (this.state.invalidToken) {
		// 	const route = window.location.hash.split('?');
		// 	const params = queryString.parse(route[1]);
		// 	if (environment.production && !params.promo_code && !params.season && !params.search) {
		// 		window.location.href = `${environment.landingUrl}`;
		// 	}
		// }
	}

	render() {
		const {
			logged,
			invalidToken,
			customer,
			shoppingCartTotalItems,
			showShoppingCart,
			user
		} = this.props;

		const route = window.location.hash.split('?');
		const params = queryString.parse(route[1]);

		const emmaLoading = (
			<Modal isOpen={true} centered={true}>
				<ModalBody>
					<div className='d-flex'>
						<img src={EmmaLogo} alt='' className='mr-4' />
					</div>
				</ModalBody>
			</Modal>
		);

		if ((invalidToken || this.state.invalidToken) && !logged && !params.referral_code) {
			if (!window.location.hash || window.location.hash === '#/') {
				window.location = `/#/login?${queryString.stringify(params)}`;
			}
		}

		if (!invalidToken && !this.state.invalidToken && !logged) {
			return emmaLoading;
		}

		if (logged && user.role !== 'FLORIST') {
			return emmaLoading;
		}

		return (
			<ErrorBoundary>
				<div className='App'>
					<Router>
						<div className=''>
							{logged && (
								<NavbarComponent
									customer={customer}
									showShoppingCart={showShoppingCart}
									shoppingCartTotalItems={shoppingCartTotalItems}
								/>
							)}

							{!logged && <LoginNavbarComponent />}

							<div className='pt-3 px-4'>
								<Switch>
									{Routes.map(i => (
										<Route key={i.id} path={i.path} exact={i.exact} component={i.component} />
									))}
								</Switch>
								<ShoppingCartContainer />
							</div>
							<ModalWrapperContainer />
							<BackToTopComponent />
							<Route path='/' render={props => props.location.pathname !== '/search'} />
						</div>
					</Router>
				</div>
			</ErrorBoundary>
		);
	}
}

function mapStateToProps(state) {
	const { logged, customer, invalidToken, user, token } = state.AuthReducer;
	const { shoppingCartTotalItems } = state.ShoppingCartReducer;
	const { isCurrentBox, eta } = state.CustomBoxReducer;
	const { finished, home } = state.DashboardReducer;
	return {
		logged,
		customer,
		finished,
		home,
		shoppingCartTotalItems,
		isCurrentBox,
		eta,
		invalidToken,
		user,
		token
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			validateToken: ActionsCreators.validateToken,
			listShoppingCart: ActionsCreators.listShoppingCart,
			loadCards: ActionsCreators.loadCards,
			showShoppingCart: ActionsCreators.showShoppingCart,
			getHolidays: ActionsCreators.getHolidays,
			homeLoading: ActionsCreators.homeLoading
		},
		dispatch
	);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);

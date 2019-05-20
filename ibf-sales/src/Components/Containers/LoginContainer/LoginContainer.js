import React, { Component, Fragment } from 'react';
import { sbxCoreService } from '../../../Network';
import env from '../../../environment';
import { toast } from '../../../Services/AlertService';
import * as ActionsCreators from '../../../Redux/Actions/ActionsCreators';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import queryString from 'query-string';
import MixpanelService from '../../../Services/MixpanelService';
import environment from '../../../environment';

class LoginContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			login: '',
			password: '',
			isShowing: false,
			inputType: 'password',
			loading: false
		};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		this.props.history.push({ pathname: './signup' });
	}

	onSubmit = e => {
		this.setState({ loading: true });
		e.preventDefault();
		sbxCoreService.run(env.cloudscripts.login, { ...this.state }).then(res => {
			this.setState({ loading: false });

			const success = res.response.body.success;
			if (success) {
				const { data: {token, user} } = res.response.body;
				const params = queryString.parse(this.props.location.search.slice(1) || '');
				params.token = token;

				toast('Login successful');
				this.props.validateToken(params.token);
				this.props.loggedIn();

				if (user.role === 'FLORIST') {
					this.props.history.push({
						pathname: '/',
						search: `?${queryString.stringify(params)}`
					});
				} else {
					window.location.href = `${environment.version1Url}?token=${token}`;
				}
			} else {
				const { error } = res.response.body;
				MixpanelService.track('loginError', { email: this.state.login, error });
				toast('Invalid login', 'error');
			}
		}).catch(error => {
			console.error(error);
		});
	};

	handleChange = (event: SyntheticEvent<HTMLButtonElement>) => {
		const { value, name } = event.currentTarget;
		this.setState({ [name]: value });
	};

	changeParam(value) {
		this.setState({ isShowing: value });

		value ? this.setState({ inputType: 'text' }) : this.setState({ inputType: 'password' });
	}

	render() {
		return (
			<Fragment>
				<div className='d-flex pt-5 mt-5 flex-wrap flex-md-nowrap align-items-center justify-content-center'>
					<div className='card landing-card m-5 mr-md-4'>
						<div className='card-body p-5'>
							<h2 className='card-title'>
								<b>Login with your personal account</b>
							</h2>
							<form onSubmit={this.onSubmit}>
								<div className='form-group'>
									<label htmlFor='formGroupExampleInput'>Your email address</label>
									<input
										type='text'
										name='login'
										className='form-control'
										aria-describedby='emailHelp'
										placeholder='Email'
										onChange={this.handleChange}
									/>
								</div>
								<div className='form-group'>
									<label htmlFor='formGroupExampleInput2'>Password</label>
									<div className='input-group'>
										<input
											name='password'
											type={this.state.inputType}
											className='form-control'
											placeholder='Password'
											onChange={this.handleChange}
										/>
										<div className='input-group-append'>
											<span
												className='input-group-text text-danger cursor-pointer px-2'
												onClick={() => {
													this.changeParam(true);
												}}
												onMouseLeave={() => {
													this.changeParam(false);
												}}
											>
												<i
													className={
														'fa fa-fw text-primary clickable ' +
														(this.state.isShowing ? 'fa-eye ' : 'fa-eye-slash ')
													}
												/>
											</span>
										</div>
									</div>
								</div>
								<button type='submit' className='btn btn-primary w-50'>
									{!this.state.loading && <span> Start Shopping > </span>}
									{this.state.loading && (
										<span>
											{' '}
											<i className='fa fa-spinner fa-spin' />{' '}
										</span>
									)}
								</button>
								<div className='py-2'>
									{/*<a className="text-primary" href="#"> Forgot your password?</a>*/}
								</div>
								<small className='text-success'>
									<i className='fa fa-shield-alt' /> Secure via SSL
								</small>
							</form>
						</div>
					</div>
					<div className='card landing-card-inverse m-5'>
						<div className='card-body p-5'>
							<h2 className='card-title'>
								<b>Are you a new user? Sign up!</b>
							</h2>
							<ul className='list-unstyled'>
								<li className='py-2'>
									<i className='fa fa-check text-success pr-2' /> Over 4000 flowers & greens
								</li>
								<li className='py-2'>
									<i className='fa fa-check text-success pr-2' />
									Free FedEx delivery (mon/fri)
								</li>
								<li className='py-2'>
									<i className='fa fa-check text-success pr-2' />
									Create personal boxes (by the bunch)
								</li>
								<li className='py-2'>
									<i className='fa fa-check text-success pr-2' />
									Secure portal with order history
								</li>
							</ul>
							<button type='submit' className='btn btn-primary' onClick={this.handleClick}>
								Register >
							</button>
							<div className='py-1'>
								<small className='text-success'>
									<i className='fa fa-clock' /> 3 simple steps
								</small>
							</div>
							<div className='py-1'>
								<small className='text-success'>
									<i className='fa fa-shield-alt' /> Secure via SSL
								</small>
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

function mapStateToProps(state) {
	const { logged, customer, invalidToken } = state.AuthReducer;
	const { shoppingCartTotalItems } = state.ShoppingCartReducer;
	const { isCurrentBox, eta } = state.CustomBoxReducer;
	return {
		logged,
		customer,
		shoppingCartTotalItems,
		isCurrentBox,
		eta,
		invalidToken
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			validateToken: ActionsCreators.validateToken,
			listShoppingCart: ActionsCreators.listShoppingCart,
			loadCards: ActionsCreators.loadCards,
			showShoppingCart: ActionsCreators.showShoppingCart,
			loggedIn: ActionsCreators.loggedIn
		},
		dispatch
	);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginContainer);

import React, { Component } from 'react';
import AccountDashboardComponent from '../../Presentational/AccountDashboardComponent/AccountDashboardComponent';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { openModal } from '../../../Redux/Actions/ModalActionsCreators';
import environment from '../../../environment';
import SharedService from '../../../Services/SharedService';
import AuthService from '../../../Services/AuthService';
import { initSendReferral, initLoadReferral } from '../../../Redux/Actions/ActionsCreators';

class AccountDashboardContainer extends Component {
	state = {
		links: {
			ordersByArrival: environment.urlOrdersByArrival,
			ordersByPurchase: environment.urlOrdersByPurchase,
			orderDetail: environment.urlOrderPurchaseDetail,
			requestClaims: environment.urlRequestClaims,
			pendingClaims: environment.urlPendingClaims,
			acceptedClaims: environment.urlAcceptedClaims,
			rejectedClaims: environment.urlRejectedClaims,
			help: environment.urlHelp
		},
		informationPercentage: 0,
		pendingClaims: 0
	};

	componentDidMount() {
		this.calculateInformationPercentage();

		const { customer, onLoadReferral } = this.props;
		onLoadReferral(customer.customer);

		SharedService.getPendingClaims(customer.customer).then(res => {
			this.setState({ pendingClaims: res.results.length });
		});
	}

	calculateInformationPercentage() {
		const { customer } = this.props;

		const keys = [
			'customer',
			'customer_name',
			'customer_street',
			'customer_zipcode',
			'customer_city',
			'customer_office_phone',
			'office_email',
			'customer_employees_quantity',
			'customer_stores_quantity'
		];
		let propertiesCounter = 0;

		keys.forEach(key => {
			if (customer[key]) {
				propertiesCounter++;
			}
		});

		const informationPercentage = parseInt((propertiesCounter / keys.length) * 100);

		this.setState({ informationPercentage });
	}

	logout() {
		AuthService.logout();
	}

	render() {
		return (
			<AccountDashboardComponent
				links={this.state.links}
				{...this.props}
				informationPercentage={this.state.informationPercentage}
				pendingClaims={this.state.pendingClaims}
				logout={this.logout}
			/>
		);
	}
}

function mapStateToProps(state) {
	const { customer, user } = state.AuthReducer;
	const { eta } = state.CustomBoxReducer;
	const { trackPackageInfo } = state.DashboardReducer;
	return {
		customer,
		trackPackageInfo,
		eta,
		user,
		...state.ReferralReducer
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{ openModal, initSendReferral, onLoadReferral: initLoadReferral },
		dispatch
	);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AccountDashboardContainer);

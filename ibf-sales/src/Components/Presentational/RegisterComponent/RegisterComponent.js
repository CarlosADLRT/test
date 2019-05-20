import React, { Component, Fragment } from 'react';
import ContactDetailsComponent from './ContactDetailsComponent';
import CompanyInformation from './CompanyInformation';
import AdditionalCompanyInformation from './AdditionalCompanyInformation';

import { withRouter } from 'react-router-dom';
import Loki from 'react-loki';
import ZipcodeService from '../../../Services/ZipcodeService';
import queryString from 'query-string';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import { changeInvalidToken, initSignup, setSignUpObject, signup } from '../../../Redux/Actions/ActionsCreators';
import { toast } from '../../../Services/AlertService';

class RegisterComponent extends Component {
	state = {
		options: {
			quantity: ['', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
			expenses: ['', '> $1000USD', '$500USD - $999USD', '$100USD - $499USD', '< $100USD'],
			events: ['', '> 60', '25 - 59', '10 - 24', '< 10'],
			states: ZipcodeService.getStateMap(),
			zipcodes: []
		},
		referral_code: ''
	};

	componentDidMount(): void {
		const { referral, email } = this.props;
		const user_email = email;
		if (!this.props.signUpState.user_email) {
			this.props.setSignUpObject({ user_email });
			this.props.setSignUpObject({ repeatEmail: user_email });
		}
		this.props.setSignUpObject({ referral_code: referral });
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const { token, logged, userId, isSignup, invalidToken, error } = this.props;
		if (logged && userId) {
			if (this.props.location) {
				const params = queryString.parse(this.props.location.search.slice(1));
				params.token = token;
				this.props.history.push({
					pathname: '/',
					search: `?${queryString.stringify(params)}`
				});
				window.location.reload();
			}
		}

		if (isSignup && invalidToken) {
			toast('Succesfull sign up');
		} else if (isSignup === false && invalidToken === true) {
			toast(error, 'error');
			this.props.changeInvalidToken();
		}
	}

	customSteps = [
		{
			icon: 1,
			component: <ContactDetailsComponent/>
		},
		{
			icon: 2,
			component: <CompanyInformation states={this.state.options.states} />
		},
		{
			label: 'Step 3',
			icon: 3,
			component: <AdditionalCompanyInformation options={this.state.options} />
		}
	];

	_finishWizard(event) {
		let customer = {};
		Object.assign(customer, this.props.signUpState);

		const params = {
			customer,
			user: {
				password: customer.password,
				first_name: customer.first_name,
				last_name: customer.last_name,
				user_email: customer.user_email
			},
			is_new: true,
			role: 'FLORIST',
			referral_code: this.props.referral
		};

		delete customer.repeatEmail;
		delete customer.repeatPassword;
		delete customer.password;
		delete customer.first_name;
		delete customer.last_name;
		delete customer.user_email;
		delete customer.referral_code;

		this.props.initSignup();
		this.props.signup(params);
	}

	render() {
		return (
			<Fragment>
				<div className='mx-auto mt-5 p-5'>
					<div className='d-flex justify-content-center text-success'>
						<p className='mr-4'>
							<i className='fa fa-check' /> Over 4000 flowers & greens
						</p>
						<p className='mr-4'>
							<i className='fa fa-check' /> Free FedEx delivery (mon/fri)
						</p>
						<p className='mr-4'>
							<i className='fa fa-check' /> Create personal boxes (by the bunch)
						</p>
					</div>
					<div className='card form-register mx-auto'>
						<Loki steps={this.customSteps} onFinish={this._finishWizard.bind(this)} noActions />
					</div>
				</div>
			</Fragment>
		);
	}
}
function mapStateToProps(state) {
	const { isSignup, signUpState } = state.LoadingReducer;
	const { userId, logged, token, invalidSignup, error } = state.AuthReducer;
	return { userId, logged, token, isSignup, signUpState, invalidSignup, error };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		setSignUpObject, signup, initSignup, changeInvalidToken
	}, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(RegisterComponent));

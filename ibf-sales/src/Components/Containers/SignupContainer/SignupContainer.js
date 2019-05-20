import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { toast } from '../../../Services/AlertService';
import ZipcodeService from '../../../Services/ZipcodeService';
import { bindActionCreators } from 'redux';
import './SignupContainer.scss';
import { initSignup, signup } from '../../../Redux/Actions/ActionsCreators';

class SignupContainer extends Component {
	state = {
		customer: {
			password: '',
			first_name: '',
			last_name: '',
			user_email: '',
			company_name: '',
			office_phone: '',
			tax_id: '',
			street: '',
			city: '',
			business: 'florist',
			state: '',
			zipcode: '',
			stores_quantity: 0,
			employees_quantity: 0,
			spend_per_week: '',
			events_per_year: ''
		},
		options: {
			quantity: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
			expenses: ['> $1000USD', '$500USD - $999USD', '$100USD - $499USD', '< $100USD'],
			events: ['> 60', '25 - 59', '10 - 24', '< 10'],
			states: ZipcodeService.getStateMap(),
			zipcodes: []
		},
		referral_code: '',
		inputType: 'password',
		isShowing: false
	};

	handleChangeState = state => {
		const codes = ZipcodeService.getZipcodeByState(state);
		this.setState(state => {
			return {
				...state,
				customer: {
					...state.customer,
					zipcode: codes[0]
				},
				options: {
					...state.options,
					zipcodes: codes
				}
			};
		});
	};

	componentDidMount() {
		const params = queryString.parse(this.props.location.search.slice(1));

		this.setState(state => {
			return {
				...state,
				referral_code: params.referral_code,
				customer: {
					...state.customer,
					user_email: params.email,
					state: 'AL'
				}
			};
		});

		this.handleChangeState('AL');
	}

	handleChange = (event: SyntheticEvent<HTMLButtonElement>) => {
		const { value, name } = event.currentTarget;
		this.setState(state => ({ ...state, customer: { ...state.customer, [name]: value } }));
		if (name === 'state') {
			this.handleChangeState(value);
		}
	};

	changeParam(value) {
		this.setState(state => {
			const inputType = value ? 'text' : 'password';
			return { ...state, inputType, isShowing: value };
		});
	}

	onSubmit = e => {
		e.preventDefault();
		if (this.props.isSignup) {
			return;
		}

		const customer = { ...this.state.customer };

		if (!customer.first_name) {
			return toast("The 'first name' is required.", 'error');
		}

		if (!customer.last_name) {
			return toast("The 'last name' is required.", 'error');
		}

		if (!customer.user_email) {
			return toast("The 'email' is required.", 'error');
		}

		if (!customer.password) {
			return toast("The 'password' is required.", 'error');
		}
		if (!customer.company_name) {
			return toast("The 'company name' is required.", 'error');
		}

		if (!customer.zipcode) {
			return toast("The 'zipcode' is required.", 'error');
		}

		if (!customer.office_phone) {
			return toast("The 'phone' is required.", 'error');
		}

		if (!customer.tax_id) {
			return toast("The 'resaler code' is required.", 'error');
		}

		if (!customer.street) {
			return toast("The 'street' is required.", 'error');
		}

		if (!customer.city) {
			return toast("The 'city' is required.", 'error');
		}

		if (!customer.state) {
			return toast("The 'state' is required.", 'error');
		}

		if (!customer.business) {
			return toast("The 'business' is required.", 'error');
		}

		if (customer.business === 'florist') {
			if (!customer.stores_quantity) {
				return toast("The 'stores quantity' is required.", 'error');
			}
			if (!customer.employees_quantity) {
				return toast("The 'employees quantity' is required.", 'error');
			}
			if (!customer.spend_per_week) {
				return toast("The 'spend per week' is required.", 'error');
			}
			delete customer.events_per_year;
		} else {
			if (!customer.events_per_year) {
				return toast("The 'events per year' is required.", 'error');
			}
			delete customer.stores_quantity;
			delete customer.employees_quantity;
			delete customer.spend_per_week;
		}

		customer.office_email = customer.user_email;
		const params = {
			customer,
			user: {
				password: customer.password,
				first_name: customer.firstName,
				last_name: customer.lastName,
				user_email: customer.user_email
			},
			is_new: true,
			role: 'FLORIST',
			referral_code: this.state.referral_code
		};
		delete customer.password;
		delete customer.first_name;
		delete customer.last_name;
		delete customer.user_email;
		this.props.initSignup();
		this.props.signup(params);
	};

	componentDidUpdate(prevProps, prevState, snapshot) {
		const { token, logged, userId } = this.props;
		if (logged && userId) {
			const params = queryString.parse(this.props.location.search.slice(1));
			params.token = token;
			this.props.history.push({
				pathname: '/',
				search: `?${queryString.stringify(params)}`
			});
		}
	}

	render() {
		const options = this.state.options;
		const customer = this.state.customer;
		const { isSignup } = this.props;

		return (
			<div className='main-panel d-flex align-items-center'>
				<div className='container'>
					<div className='d-flex align-items-center justify-content-center'>
						<div className='card landing-card'>
							<div className='card-body p-4'>
								<h2 className='card-title'>SIGNUP</h2>
								<form onSubmit={this.onSubmit} className='landing-form'>
									<div className='landing-form__wrapper mb-3'>
										<div className='clearfix'>
											<div className='w-50 d-block float-left'>
												<input
													type='text'
													className='form-control'
													placeholder='First name'
													name='first_name'
													onChange={this.handleChange}
												/>
											</div>
											<div className='w-50 d-block float-left'>
												<input
													type='text'
													className='form-control'
													placeholder='Last name'
													name='last_name'
													onChange={this.handleChange}
												/>
											</div>
										</div>
										<div className='clearfix'>
											<div className='w-50 d-block float-left'>
												<input
													type='text'
													className='form-control'
													placeholder='Email'
													name='user_email'
													value={customer.user_email}
													onChange={this.handleChange}
												/>
											</div>
											<div className='w-50 d-block float-left'>
												<input
													type='text'
													className='form-control'
													placeholder='Phone'
													name='office_phone'
													onChange={this.handleChange}
												/>
											</div>
										</div>
										<div className='clearfix'>
											<div className='w-50 d-block float-left'>
												<input
													type='text'
													className='form-control'
													placeholder='Company name'
													name='company_name'
													onChange={this.handleChange}
												/>
											</div>
											<div className='w-50 d-block float-left'>
												<input
													type='text'
													className='form-control'
													placeholder='Resale number'
													name='tax_id'
													onChange={this.handleChange}
												/>
											</div>
										</div>
										<div className='clearfix'>
											<div className='w-50 d-block float-left'>
												<input
													type='text'
													className='form-control'
													placeholder='Street'
													name='street'
													onChange={this.handleChange}
												/>
											</div>
											<div className='w-50 d-block float-left'>
												<input
													type='text'
													className='form-control'
													placeholder='City'
													name='city'
													onChange={this.handleChange}
												/>
											</div>
										</div>

										<div className='clearfix'>
											<div className='w-25 d-block float-left position-relative'>
												<select
													name='state'
													id='state'
													className='custom-select custom-select-sm'
													onChange={this.handleChange}
												>
													{Object.keys(options.states).map(state => (
														<option key={`state-${options.states[state]}`} value={state}>
															{options.states[state]}
														</option>
													))}
												</select>
											</div>

											<div className='w-25 d-block float-left'>
												<select
													name='zipcode'
													id='zipcode'
													className='custom-select custom-select-sm'
													onChange={this.handleChange}
												>
													{options.zipcodes.map(code => (
														<option key={`zipcode-${code}`} value={code}>
															{code}
														</option>
													))}
												</select>
											</div>

											<div className='w-50 d-block float-left'>
												<div className='input-group'>
													<input
														name='password'
														type={this.state.inputType}
														className='form-control form-control-sm'
														id='exampleInputPassword1'
														placeholder='Password'
														onChange={this.handleChange}
													/>
													<span
														className='input-group-addon text-danger cursor-pointer px-2 pt-1'
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
									</div>

									<div className='d-flex justify-content-between align-items-center mb-3'>
										<label className='text-muted m-0'>Are you?</label>
										<div className='d-flex'>
											<div className='custom-control custom-radio mr-2'>
												<input
													type='radio'
													id='customRadio1'
													name='business'
													className='custom-control-input'
													value='florist'
													defaultChecked
													onChange={this.handleChange}
												/>
												<label className='custom-control-label' htmlFor='customRadio1'>
													Florist
												</label>
											</div>
											<div className='custom-control custom-radio mr-2'>
												<input
													type='radio'
													id='customRadio2'
													name='business'
													className='custom-control-input'
													value='wedding/event'
													onChange={this.handleChange}
												/>
												<label className='custom-control-label' htmlFor='customRadio2'>
													Wedding/Events
												</label>
											</div>
											<div className='custom-control custom-radio'>
												<input
													type='radio'
													id='customRadio3'
													name='business'
													className='custom-control-input'
													value='venue'
													onChange={this.handleChange}
												/>
												<label className='custom-control-label' htmlFor='customRadio3'>
													Venue
												</label>
											</div>
										</div>
									</div>

									<div className='mb-3 custom-questions'>
										{customer.business === 'florist' ? (
											<Fragment>
												<div className='d-flex align-items-center justify-content-between mb-2'>
													<label className='text-muted'>How many stores do you have?</label>
													<select
														name='stores_quantity'
														id='stores_quantity'
														className='custom-select custom-select-sm'
														onChange={this.handleChange}
													>
														<option value={0}>Choose one</option>
														{options.quantity.map((q, i) => (
															<option key={`sq-${q}`} value={q}>
																{i < 9 ? q : q + '+'}
															</option>
														))}
													</select>
												</div>
												<div className='d-flex align-items-center justify-content-between mb-2'>
													<label className='text-muted'>How many employees do you have?</label>
													<select
														name='employees_quantity'
														id='employees_quantity'
														className='custom-select custom-select-sm'
														onChange={this.handleChange}
													>
														<option value={0}>Choose one</option>
														{options.quantity.map((exp, i) => (
															<option key={`eq-${exp}`} value={exp}>
																{i < 9 ? exp : exp + '+'}
															</option>
														))}
													</select>
												</div>
												<div className='d-flex align-items-center justify-content-between'>
													<label className='text-muted'>
														How much do you spend on average on flowers per week?
													</label>
													<select
														name='spend_per_week'
														id='spend_per_week'
														className='custom-select custom-select-sm'
														onChange={this.handleChange}
													>
														<option value={''}>Choose one</option>
														{options.expenses.map(exp => (
															<option key={`expense-${exp}`} value={exp}>
																{exp}
															</option>
														))}
													</select>
												</div>
											</Fragment>
										) : (
											<div className='d-flex align-items-center justify-content-between'>
												<label className='text-muted'>How many events do you have per year?</label>
												<select
													name='events_per_year'
													id='events_per_year'
													className='custom-select custom-select-sm'
													onChange={this.handleChange}
												>
													<option value={''}>Choose one</option>
													{options.events.map(eve => (
														<option key={`event-${eve}`} value={eve}>
															{eve}
														</option>
													))}
												</select>
											</div>
										)}
									</div>

									<button
										id='signup-form'
										type='submit'
										className='btn btn--font-sm btn-primary btn-block'
										disabled={isSignup}
									>
										{isSignup && <i className='fa fa-fw fa-spinner fa-pulse' />}
										{!isSignup && <span>SIGNUP</span>}
									</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const { isSignup } = state.LoadingReducer;
	const { userId, logged, token } = state.AuthReducer;
	return { isSignup, userId, logged, token };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ signup, initSignup }, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SignupContainer);

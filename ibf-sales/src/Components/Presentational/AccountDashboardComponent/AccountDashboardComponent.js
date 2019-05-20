import React, { Component } from 'react';

import '../../../Styles/_variables.scss';
import './AccountDashboardComponent.scss';
import {
	ACCOUNT_MANAGER_MODAL,
	ADD_USER_MODAL,
	COMPANY_INFORMATION_MODAL,
	DELIVERY_SCHEDULE_MODAL,
	GROWER_INFO_MODAL,
	MANAGE_GROWERS_MODAL,
	PAYMENT_LIST_MODAL,
	PAYMENT_MODAL,
	REFERRAL_MODAL,
	SHIPPING_DETAILS,
	USERS_LIST_MODAL
} from '../../Shared/Modals/ModalTypes';
import SharedService from '../../../Services/SharedService';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
	email: yup
		.string()
		.label('Email')
		.email()
		.required(),
	firstName: yup.string().required(),
	confirmEmail: yup.string().when('email', {
		is: val => (val && val.length > 0 ? true : false),
		then: yup.string().oneOf([yup.ref('email')], 'Both email need to be the same')
	}),
	companyName: yup.string().required()
});

class AccountDashboardComponent extends Component {
	state = {
		userId: this.props.userId,
		states: [],
		search: ''
	};

	componentDidMount() {
		SharedService.getStateList().then(res => {
			this.setState({ states: res });
		});
	}

	submitChange = e => {
		e.preventDefault();
		this.props.history.push('/');
	};

	track(link) {
		window.location.replace(link);
	}

	render() {
		let {
			informationPercentage,
			trackPackageInfo,
			links,
			openModal,
			customer,
			pendingClaims,
			logout,
			user
		} = this.props;

		const companyStyle = {
			width: informationPercentage + '%'
		};

		let trackingUrl = trackPackageInfo.purchaseOrdersNumber
			? links.orderDetail + trackPackageInfo.firstBox.purchase
			: '#';

		return (
			<div className='container'>
				<section className='mb-5'>
					<div className='d-flex justify-content-between'>
						<div>
							<h4> Account Dashboard</h4>
							<p>Welcome {customer.customer_name}</p>
						</div>
						<div>
							<a className='btn btn-primary' href={links.requestClaims} onClick={this.submitChange}>
								Start Shopping
							</a>
						</div>
					</div>
					<div className='row'>
						<div className='col-6'>
							<div className='row'>
								<div className='col-6 mb-5'>
									<h5>
										<i className='fa fa-boxes' /> Orders
									</h5>
									<ul className='list-group list-group-flush custom__list'>
										<li className='list-group-item custom__list__item link-ibf-purply link-underlined'>
											<span className='badge badge-pill custom__badge'>
												{trackPackageInfo.purchaseOrdersNumber}
											</span>
											<a href={trackingUrl}>Track Package</a>
										</li>
										<li className='list-group-item custom__list__item'>
											<span
												className='link-ibf-purply link-underlined'
												onClick={() => this.track(links.ordersByArrival)}
											>
												Order By Arrival Date
											</span>
										</li>
										<li className='list-group-item custom__list__item'>
											<span
												className='link-ibf-purply link-underlined'
												onClick={() => this.track(links.ordersByPurchase)}
											>
												Orders By Purchase Date
											</span>
										</li>
									</ul>
								</div>
								<div className='col-6'>
									<h5>
										<i className='fa fa-clipboard-list' /> Claims
									</h5>
									<ul className='list-group list-group-flush custom__list'>
										<li className='list-group-item custom__list__item'>
											<div className='d-flex justify-content-between'>
												<div className='link-ibf-purply link-underlined'>
													<span className='badge badge-pill custom__badge mr-1'>
														{pendingClaims}
													</span>
													<a href={links.pendingClaims}>Claims Pending</a>
												</div>
												<a className='btn btn-primary ' href={links.requestClaims}>
													Request Claim
												</a>
											</div>
										</li>
										<li className='list-group-item custom__list__item link-ibf-purply link-underlined'>
											<a href={links.acceptedClaims}>Claims Accepted</a>
										</li>
										<li className='list-group-item custom__list__item link-ibf-purply link-underlined'>
											<a href={links.rejectedClaims}>Claims Rejected</a>
										</li>
									</ul>
								</div>

								<div className='col-6'>
									<h5>
										<i className='fa fa-user' /> Account / User Settings
									</h5>
									<ul className='list-group list-group-flush custom__list'>
										<li className='list-group-item custom__list__item'>
											<div className='d-flex justify-content-between'>
												<span
													className='link-ibf-purply link-underlined'
													onClick={() => openModal({ modal: COMPANY_INFORMATION_MODAL })}
												>
													Company Information
												</span>
												<div className='information-percentage-container'>
													<div
														className='information-percentage-container-loader'
														style={companyStyle}
													>
														<p
															className=' percentage-text'
															data-content={informationPercentage + '%'}
														>
															{informationPercentage + '%'}
														</p>
													</div>
												</div>
											</div>
										</li>
										<li className='list-group-item custom__list__item'>
											<div className='d-flex justify-content-between'>
												<span
													className='link-ibf-purply link-underlined'
													onClick={() => openModal({ modal: USERS_LIST_MODAL })}
												>
													Users
												</span>
												<button
													type='button'
													className='btn btn-primary '
													onClick={() =>
														openModal({ modal: ADD_USER_MODAL, data: { type: 'add' } })
													}
												>
													Add User
												</button>
											</div>
										</li>
										<li className='list-group-item custom__list__item'>
											<div className='d-flex justify-content-between'>
												<span
													onClick={() =>
														openModal({
															modal: PAYMENT_LIST_MODAL,
															data: { from: 'paymentOptions' }
														})
													}
													className='link-ibf-purply link-underlined'
												>
													Payment Options
												</span>
												<button
													type='button'
													className='btn btn-primary '
													onClick={() =>
														openModal({
															modal: PAYMENT_MODAL,
															data: { from: 'paymentOptions' }
														})
													}
												>
													Add Card
												</button>
											</div>
										</li>
										<li
											className='list-group-item custom__list__item link-ibf-purply link-underlined'
											onClick={() => openModal({ modal: MANAGE_GROWERS_MODAL })}
										>
											Manage Growers
										</li>
										<li
											className='list-group-item custom__list__item link-ibf-purply link-underlined'
											onClick={() => openModal({ modal: REFERRAL_MODAL })}
										>
											Referrals
										</li>
										<li
											className='list-group-item custom__list__item link-ibf-purply link-underlined'
											onClick={logout}
										>
											Logout
										</li>
									</ul>
								</div>

								<div className='col-6'>
									<h5>
										<i className='fa fa-question' /> Help Center
									</h5>
									<ul className='list-group list-group-flush custom__list'>
										<li
											className='list-group-item custom__list__item link-ibf-purply link-underlined'
											onClick={() => openModal({ modal: DELIVERY_SCHEDULE_MODAL })}
										>
											Delivery Schedule
										</li>
										<li
											className='list-group-item custom__list__item link-ibf-purply link-underlined'
											onClick={() => openModal({ modal: GROWER_INFO_MODAL })}
										>
											Grower Info - Arrival Dates
										</li>
										<li
											className='list-group-item custom__list__item link-ibf-purply link-underlined'
											onClick={() => openModal({ modal: ACCOUNT_MANAGER_MODAL })}
										>
											Personal Account Manager
										</li>
										<li className='list-group-item custom__list__item link-ibf-purply link-underlined'>
											<a href={links.help} rel='noopener noreferrer' target='_blank'>
												FAQ (External Website)
											</a>
										</li>
										<li
											className='list-group-item custom__list__item link-ibf-purply link-underlined'
											onClick={() => openModal({ modal: SHIPPING_DETAILS })}
										>
											Shipping Details
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div className='col-6 d-flex flex-column'>
							<div className='mb-5'>
								<h5>
									<i className='fa fa-share-alt' /> Referral Program
								</h5>
								<ul className='list-group list-group-flush custom__list'>
									<li
										className='list-group-item custom__list__item'
										// style={{ marginBottom: '6rem', borderBottom: 0 }}
									>
										<span>
											Share your love for flowers with your friends! Invite your friends to try
											iBuyFlowers.
										</span>
									</li>
									<li className='list-group-item custom__list__item'>
										<div
											onClick={() => openModal({ modal: REFERRAL_MODAL })}
											className=' d-flex flex-column justify-content-center '
											style={{ cursor: 'pointer' }}
										>
											<h5 className='m-0 link-ibf-purply link-underlined'>
												Your Reward Balance: ${this.props.amount}
											</h5>
										</div>
									</li>
									<li
										className='list-group-item custom__list__item'
										style={{ marginBottom: '2rem', borderBottom: 0 }}
									>
										<span>
											For every new company that uses your coupon, you get <b>$15 off your next order. </b>
											Simply enter your friend’s Email Address, First Name, and Company Name, and
											press <b>‘Send Referral’</b>.{' '}
											<a
												href='https://sbxcloud.com/www/ibuyflowersdirect/dev3.5/Assets/Images/Terms%20and%20Conditions%20Referral%20Program.pdf'
												target='_blank'
												rel='noopener noreferrer'
												className='link-ibf-purply link-underlined'
											>
												Terms and conditions apply.
											</a>
										</span>
									</li>
									<li
										className='list-group-item custom__list__item'
										style={{ marginBottom: '1.7rem' }}
									>
										<Formik
											initialValues={{
												email: '',
												firstName: '',
												companyName: '',
												confirmEmail: ''
											}}
											validationSchema={validationSchema}
											onSubmit={(values, actions) => {
												this.props.initSendReferral(
													{ ...values, user: user.key, customer: customer.customer },
													actions
												);
											}}
											render={props => (
												<form className='col-12 pl-0' onSubmit={props.handleSubmit}>
													<div className='text-primary'>
														<div className='form-group w-50 input-register'>
															<input
																onChange={props.handleChange}
																onBlur={props.handleBlur}
																value={props.values.email}
																type='email'
																name='email'
																className='form-control form-control-sm'
																aria-describedby='emailHelp'
																id="EmailAddress"
																required
															/>
															<label htmlFor="EmailAddress" className="register-label text-primary">Email Address</label>
														</div>
														<div className='form-group w-50 input-register'>
															<input
																onChange={props.handleChange}
																onBlur={props.handleBlur}
																value={props.values.confirmEmail}
																type='email'
																name='confirmEmail'
																className='form-control form-control-sm'
																id='confirmEmail'
																aria-describedby='emailHelp'
																required
															/>
															<label htmlFor="confirmEmail" className="register-label text-primary">Confirm Email</label>
															{props.errors.confirmEmail && (
																<small className='text-danger'>Email doesn't match</small>
															)}
														</div>
														<div className='form-group w-50 input-register mb-0'>
															<input
																name='firstName'
																onChange={props.handleChange}
																onBlur={props.handleBlur}
																value={props.values.firstName}
																type='text'
																id='name'
																className='form-control form-control-sm'
																required
															/>
															<label htmlFor="name" className="register-label text-primary">First Name</label>
														</div>
														<div className='d-flex align-items-center justify-content-between'>
															<div className='form-group w-50 input-register'>
																<input
																	name='companyName'
																	onChange={props.handleChange}
																	onBlur={props.handleBlur}
																	value={props.values.companyName}
																	type='text'
																	className='form-control form-control-sm'
																	required
																/>
																<label htmlFor="name" className="register-label text-primary">Company Name</label>
															</div>
															<div className='d-flex align-items-center pt-3'>
																<button
																	disabled={
																		props.isSubmitting || !!Object.keys(props.errors).length
																	}
																	type='submit'
																	className='btn btn-primary '
																>
																	<i className='fa fa-share-alt mr-2' />
																	{props.isSubmitting ? 'Submitting' : 'Send Referral'}
																</button>
															</div>
														</div>
													</div>
												</form>
											)}
										/>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</section>
			</div>
		);
	}
}

export default withRouter(AccountDashboardComponent);

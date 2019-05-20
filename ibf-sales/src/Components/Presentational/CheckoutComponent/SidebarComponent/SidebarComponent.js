import React, { Component } from 'react';
import '../CheckoutComponent.scss';
import { roundUp } from '../../../../Utils/Utilities';
import {
	PAYMENT_LIST_MODAL,
	PAYMENT_MODAL,
	SHOPPING_LIST_SUMMARY
} from '../../../Shared/Modals/ModalTypes';
import { toast } from '../../../../Services/AlertService';

class SidebarComponent extends Component {
	state = {
		voucher: '',
		loadingSL: false
	};

	componentDidMount() {
		if (this.props.voucher) {
			this.setState(prev => ({ ...prev, voucher: this.props.voucher.code }));
		}
	}

	handleChange = event => {
		const { value, name } = event.target;
		this.setState({ [name]: value });
	};
	validateVoucher = voucher => {
		const { validateVoucher } = this.props;
		if (voucher.length > 0) {
			validateVoucher(voucher);
		}
	};
	cancelVoucher = () => {
		const { cancelVoucher, voucher } = this.props;
		this.setState(prev => ({ ...prev, voucher: '' }));
		cancelVoucher(voucher._KEY);
	};

	checkOnSL() {
		this.setState({ loadingSL: true });
		const { shoppingList, listShoppingCart, customer, openModal } = this.props;
		if (shoppingList.status === 'PROCESSED') {
			openModal({ modal: SHOPPING_LIST_SUMMARY, data: { fromCheckout: true } });
			this.setState({ loadingSL: false });
		} else {
			listShoppingCart(customer.customer).then(res => {
				const { success, results } = res.payload;
				if (success && results.sl.status === 'PROCESSED') {
					openModal({ modal: SHOPPING_LIST_SUMMARY, data: { fromCheckout: true } });
				} else {
					toast(
						'We are looking for the best product for you, in the next 10 to 20 minutes you should receive an email to review and finalize your shopping list.',
						'info'
					);
				}
				this.setState({ loadingSL: false });
			});
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if (!prevProps.voucher && this.props.voucher) {
			this.setState(prev => ({ ...prev, voucher: this.props.voucher.code }));
		}
	}

	render() {
		const {
			address,
			label,
			totalPrice,
			subtotal,
			freightCost,
			cards,
			totalItems,
			totalGift,
			selectedCard,
			totalBunches,
			voucher,
			openModal,
			customer_street_label,
			shoppingList,
			voucherAvailable
		} = this.props;
		console.log(voucherAvailable);
		return (
			<div className='d-flex flex-column h-100'>
				<div className='ibf-order-sidebar__header'>
					<span className='text-primary'>
						<b>Finish your order</b>
					</span>
				</div>
				<div className='col ibf-order-sidebar__detail py-0'>
					<div className='ibf-order-sidebar__detail-title '>
						<b>Shipping Address</b>
						<br />
						{address} {customer_street_label}
						<br />
						{label}
					</div>
					<p>
						<br />
					</p>
					<div className='ibf-order-sidebar__detail-title mb-2'>
						<b>Payment Method</b>
					</div>
					{!cards.length && (
						<div>
							<p>
								Please add first a payment method before you can checkout{' '}
								<span
									onClick={() => openModal({ modal: PAYMENT_MODAL })}
									className='link-ibf-purply'
								>
									add payment method
								</span>
							</p>
						</div>
					)}
					{!!cards.length && !!selectedCard && (
						<p
							className='card-payment-method clickable'
							onClick={() =>
								openModal({ modal: PAYMENT_LIST_MODAL, data: { from: 'finishOrder' } })
							}
						>
							<span className='media align-items-center'>
								<span className={`card-payment-method__icon ${selectedCard.icon}`} />
								<span className='media-body'>
									<span className='h6 m-0 mr-1'>&#8226;&#8226;&#8226;&#8226;</span>
									{selectedCard.card_last4}
								</span>
								<span>
									<i className='fa fa-fw fa-edit' />
								</span>
							</span>
						</p>
					)}
					<div className='ibf-order-sidebar__content '>
						<ul className='list-unstyled'>
							<li>
								<div className='d-flex'>
									<span>Total boxes:</span>
									<span className='ml-auto'>{totalItems}</span>
								</div>
							</li>
							<li>
								<div className='d-flex'>
									<span>Total bunches:</span>
									<span className='ml-auto'>{totalBunches || 0}</span>
								</div>
							</li>
							<li>
								<div className='d-flex'>
									<span>Ave. bunch price:</span>
									<span className='ml-auto'>
										{!!totalPrice && (
											<span>${roundUp((totalPrice - freightCost) / totalBunches)}</span>
										)}
										{!totalPrice && <span>$0 </span>}
									</span>
								</div>
							</li>
						</ul>
					</div>
					<div className='col ibf-order-sidebar__coupon mb-3'>
						<div className='input-group input-group-sm'>
							<input
								disabled={voucher}
								onChange={this.handleChange}
								value={this.state.voucher}
								type='text'
								className='form-control'
								name='voucher'
								placeholder=' Add a coupon'
							/>
							<div className=' input-group-append'>
								{voucher ? (
									<button className='btn btn-danger' type='button' onClick={this.cancelVoucher}>
										<i className='fa fa-fw fa-trash' />
									</button>
								) : (
									<button
										disabled={this.state.voucher.length <= 0 || voucher}
										onClick={() => this.validateVoucher(this.state.voucher)}
										className='btn btn-success'
										type='button'
									>
										<i className='fa fa-fw fa-check-circle' />
									</button>
								)}
								{/* {false && (
									<React.Fragment>
										<button className = 'btn btn-success' type = 'button' disabled>
											<i className = 'fa fa-fw fa-spinner fa-pulse'/>
										</button>
										<button className = 'btn btn-danger' type = 'button'>
											<i className = 'fa fa-fw fa-trash'/>
										</button>
									</React.Fragment>
								)} */}
							</div>
						</div>
					</div>
					{shoppingList && (
						<div className='col ibf-order-sidebar__coupon'>
							<button
								className='btn btn-primary'
								disabled={this.state.loadingSL}
								onClick={() => this.checkOnSL()}
							>
								<i
									className={
										'fa ' + (this.state.loadingSL ? 'fa-pulse fa-spinner' : 'fa fa-list-ul')
									}
								/>{' '}
								Shopping List
							</button>
						</div>
					)}
					{voucherAvailable && !voucher && voucherAvailable.type !== 'PERCENTAGE' && (
						<div className='col ibf-order-sidebar__coupon'>
							<button
								onClick={() => this.validateVoucher(voucherAvailable.code)}
								className='btn btn-primary'
								type='button'
							>
								Apply coupon for $ {voucherAvailable.amount}
							</button>
						</div>
					)}
				</div>
				<div className='ibf-order-sidebar__content ibf-order-sidebar__content--border'>
					<ul className='list-unstyled'>
						<li>
							<div className='d-flex'>
								<small>Subtotal:</small>
								<small className='ml-auto'>${roundUp(subtotal)}</small>
							</div>
						</li>
						{!!freightCost && (
							<li>
								<div className='d-flex'>
									<small>Extra Freight Costs:</small>
									<small className='ml-auto'>${roundUp(freightCost)}</small>
								</div>
							</li>
						)}
						{!!totalGift && (
							<li>
								<div className='d-flex'>
									<small>Discount:</small>
									<small className='ml-auto text-danger'>${roundUp(totalGift)}</small>
								</div>
							</li>
						)}
						<li>
							<div className='d-flex'>
								<b>Total Amount:</b>
								<b className='ml-auto'>${roundUp(totalPrice)} </b>
							</div>
						</li>
					</ul>
				</div>
				<div className='ibf-order-sidebar__content px-2'>
					<button
						disabled={subtotal === 0}
						onClick={this.props.checkout}
						type='button'
						className='btn btn-block btn-success py-2'
					>
						<span>Place your Order</span>
						{false && (
							<span>
								<i className=' fa fa-fw fa-lg fa-spinner fa-pulse' />
							</span>
						)}
					</button>
				</div>
			</div>
		);
	}
}

export default SidebarComponent;

import React, { Component } from 'react';
import CheckoutComponent from '../../Presentational/CheckoutComponent/CheckoutComponent';
import { bindActionCreators } from 'redux';
import {
	cancelVoucher,
	deleteBox,
	editBox,
	finishOrder,
	finishSL,
	listShoppingCart,
	requestCheckout,
	requestDeleteBox,
	requestEditBox,
	requestValidateVoucher,
	validateVoucher,
	initFinishOrderSaga
} from '../../../Redux/Actions/ActionsCreators';
import { connect } from 'react-redux';
import { openModal, cleanModal } from '../../../Redux/Actions/ModalActionsCreators';
import { FINISH_ORDER_MODAL, CONFIRM_MODAL } from '../../Shared/Modals/ModalTypes';
import { withRouter } from 'react-router-dom';
import MixpanelService from '../../../Services/MixpanelService';
import { convertDateToNumberDate } from '../../../Utils/Utilities';

class CheckoutContainer extends Component {
	componentDidMount() {
		this.props.listShoppingCart(this.props.customer.customer);
	}

	checkout = () => {
		const { checkout, user, selectedCard, requestCheckout, promoCode } = this.props;
		requestCheckout();
		const meta = { from: 'web' };
		if (promoCode) meta.promo_code = promoCode;
		MixpanelService.track('checkout', meta);
		checkout(user.key, selectedCard._KEY);
	};

	beforeCheckout = () => {
		const { totalPrice, voucherAvailable } = this.props;
		if (
			voucherAvailable &&
			voucherAvailable.code.indexOf('15%-REFERRAL') !== -1 &&
			totalPrice < voucherAvailable.min_purchase_amount
		) {
			this.props.openModal({
				modal: CONFIRM_MODAL,
				data: {
					text: `NOTE: The min. amount for the 15% off to apply is $175`,
					cancelText: 'Continue shopping',
					okText: 'Place your order'
				}
			});
		} else {
			this.checkout();
		}
	};
	finishCheckingOut = () => {
		this.props.openModal({ modal: FINISH_ORDER_MODAL });
	};
	cancelBox = item => {
		this.props.requestDeleteBox();
		const { deleteBox, customer } = this.props;
		MixpanelService.track('deleteBox', {
			name: item.name,
			key: item._KEY,
			from: 'order',
			packingDate: item.packing_date
		});
		deleteBox(customer.customer, [item._KEY]);
	};

	validateVoucher = coupon => {
		const {
			validateVoucher,
			requestValidateVoucher,
			customer: { customer }
		} = this.props;
		requestValidateVoucher();
		validateVoucher(customer, coupon);
	};
	cancelVoucher = key => {
		const {
			cancelVoucher,
			customer: { customer }
		} = this.props;
		cancelVoucher(customer, key);
	};

	componentDidUpdate(prevProps, prevState, snapshot) {
		const {
			voucher,
			listShoppingCart,
			customer: { customer },
			isOpenEditBox,
			history,
			confirmModal,
			totalPrice,
			voucherAvailable,
			validatingVoucher,
			lastDate
		} = this.props;

		if ((!prevProps.voucher && voucher) || (!voucher && prevProps.voucher)) {
			listShoppingCart(customer);
		}
		if (prevProps.isOpenEditBox && !isOpenEditBox) {
			history.push('/search');
		}

		if (
			!validatingVoucher &&
			voucherAvailable &&
			!voucher &&
			voucherAvailable.code.indexOf('15%-REFERRAL') !== -1 &&
			voucherAvailable.min_purchase_amount <= totalPrice
		) {
			this.validateVoucher(voucherAvailable.code);
		}
		if (confirmModal.result !== null && confirmModal.result !== undefined) {
			if (confirmModal.result) {
				this.checkout();
			} else {
				history.push({
					pathname: '/search',
					search: '?date=' + (lastDate || convertDateToNumberDate(new Date()))
				});
			}
			this.props.cleanModal({ modal: CONFIRM_MODAL });
		}
	}

	editBox = cartkey => {
		const {
			editBox,
			customer: { customer },
			requestEditBox
		} = this.props;
		requestEditBox();
		editBox(cartkey, customer);
	};

	render() {
		const {
			customer,
			listBoxes,
			totalPrice,
			subtotal,
			shoppingCartTotalItems,
			cards,
			selectedCard,
			totalGift,
			totalBunches,
			freightCost,
			openModal,
			isLoading,
			checkingOut,
			voucher,
			shoppingList,
			isEmpty,
			finishSL,
			listShoppingCart,
			deletingBox
		} = this.props;
		return (
			<CheckoutComponent
				{...this.props}
				cards={cards}
				selectedCard={selectedCard}
				address={customer.customer_street}
				checkingOut={checkingOut}
				totalBunches={totalBunches}
				totalItems={shoppingCartTotalItems}
				totalPrice={totalPrice}
				shoppingCart={listBoxes}
				subtotal={subtotal}
				freightCost={freightCost}
				isLoading={isLoading}
				editBox={this.editBox}
				label={customer.customer_street_label || ''}
				totalGift={totalGift}
				finishCheckingOut={this.finishCheckingOut}
				cancelBox={this.cancelBox}
				openModal={openModal}
				checkout={this.beforeCheckout}
				validateVoucher={this.validateVoucher}
				voucher={voucher}
				cancelVoucher={this.cancelVoucher}
				shoppingList={shoppingList}
				isEmpty={isEmpty}
				finishSL={finishSL}
				listShoppingCart={listShoppingCart}
				customer={customer}
				deletingBox={deletingBox}
			/>
		);
	}
}

function mapStateToProps({
	ShoppingCartReducer,
	AuthReducer,
	CardsReducer,
	LoadingReducer,
	ProductReducer,
	ModalReducer
}) {
	const { customer, user } = AuthReducer;
	const { checkingOut, isOpenEditBox, deletingBox, validatingVoucher } = LoadingReducer;
	const { cards, selectedCard } = CardsReducer;
	const { lastDate } = ProductReducer;
	return {
		customer,
		selectedCard,
		cards,
		user,
		checkingOut,
		isOpenEditBox,
		deletingBox,
		confirmModal: ModalReducer.confirmModal,
		validatingVoucher,
		lastDate,
		...ShoppingCartReducer
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			listShoppingCart,
			openModal,
			checkout: finishOrder,
			validateVoucher,
			cancelVoucher,
			requestValidateVoucher,
			requestCheckout,
			deleteBox,
			editBox,
			requestEditBox,
			finishSL,
			requestDeleteBox,
			cleanModal,
			onInitFinishOrder: initFinishOrderSaga
		},
		dispatch
	);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(CheckoutContainer));

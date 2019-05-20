import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import AddressContainer from './AddressModal/AddressContainer';
import DeliveryScheduleContainer from './DeliveryScheduleModal/DeliveryScheduleContainer';
import GrowerInfoContainer from './GrowerInfoModal/GrowerInfoContainer';
import OpenCustomBoxModal from './CustomBoxModal/openCustomBoxModal';
import AccountManagerContainer from './AccountManagerModal/AccountManagerContainer';
import CompanyInformationContainer from './CompanyInformationModal/CompanyInformationContainer';
import ManageGrowersContainer from './ManageGrowersModal/ManageGrowersContainer';
import CustomBoxDetailContainer from './CustomBoxDetailModal/CustomBoxDetailContainer';
import PaymentModalContainer from './PaymentModal/PaymentModalContainer';
import UsersListContainer from './UsersListModal/UsersListContainer';
import InfoCardComponent from './InfoCardModal/InfoCardComponent';
import AddUserContainer from './AddUserModal/AddUserContainer';
import PaymentListContainer from './PaymentListModal/PaymentListContainer';
import ConfirmModal from './ConfirmModalComponent/ConfirmContainer';
import FinishOrderModal from './FinishOrderModal/FinishOrderModal';
import CloseCustomBoxContainer from './CloseCustomBoxModal/CloseCustomBoxContainer';
import ArrivalDateChangedModal from './ArrivalDateChangedModal/ArrivalDateChangedModal';
import PromoCodeInvalidContainer from './PromoCodeInvalidModal/PromoCodeInvalidContainer';
import NextAvailableDateContainer from './NextAvailableDateModal/NextAvailableDateContainer';
import CustomBoxOpenModal from './CustomBoxOpenModal/CustomBoxOpenModal';
import ShoppingListSummaryContainer from './ShoppingListSummary/ShoppingListSummaryContainer';
import ReferralTableContainer from '../../Containers/ReferralTableContainer/ReferralTableContainer';
import ShippingDetails from "./ShippingDetailsModal/ShippingDetails";

class ModalWrapperContainer extends Component {
	render() {
		const {
			addressModal,
			deliveryScheduleModal,
			growerInfoModal,
			openCustomBox,
			accountManagerModal,
			manageGrowersModal,
			customBoxDetailModal,
			paymentModal,
			infoCardModal,
			usersListModal,
			addUserModal,
			paymentListModal,
			companyInformationModal,
			confirmModal,
			finishOrder,
			closeCustomBoxModal,
			arrivalDateChangedModal,
			promoCodeInvalid,
			nextAvailableDateModal,
			customBoxOpen,
			shoppingListSummary,
			referralModal,
			shippingDetails
		} = this.props;
		return (
			<Fragment>
				{addressModal.open && <AddressContainer />}
				{deliveryScheduleModal.open && <DeliveryScheduleContainer />}
				{growerInfoModal.open && <GrowerInfoContainer />}
				{openCustomBox.open && <OpenCustomBoxModal />}
				{accountManagerModal.open && <AccountManagerContainer />}
				{manageGrowersModal.open && <ManageGrowersContainer />}
				{customBoxDetailModal.open && <CustomBoxDetailContainer />}
				{paymentModal.open && <PaymentModalContainer />}
				{infoCardModal.open && <InfoCardComponent />}
				{usersListModal.open && <UsersListContainer />}
				{addUserModal.open && <AddUserContainer />}
				{paymentListModal.open && <PaymentListContainer />}
				{companyInformationModal.open && <CompanyInformationContainer />}
				{confirmModal.open && <ConfirmModal />}
				{finishOrder.open && <FinishOrderModal />}
				{closeCustomBoxModal.open && <CloseCustomBoxContainer />}
				{arrivalDateChangedModal.open && <ArrivalDateChangedModal />}
				{promoCodeInvalid.open && <PromoCodeInvalidContainer />}
				{nextAvailableDateModal.open && <NextAvailableDateContainer />}
				{customBoxOpen.open && <CustomBoxOpenModal />}
				{shoppingListSummary.open && <ShoppingListSummaryContainer />}
				{referralModal.open && <ReferralTableContainer />}
				{shippingDetails.open && <ShippingDetails />}
			</Fragment>
		);
	}
}

function mapStateToProps(state) {
	const {
		addressModal,
		customBoxOpen,
		deliveryScheduleModal,
		growerInfoModal,
		openCustomBox,
		accountManagerModal,
		manageGrowersModal,
		customBoxDetailModal,
		paymentModal,
		infoCardModal,
		usersListModal,
		addUserModal,
		paymentListModal,
		companyInformationModal,
		confirmModal,
		finishOrder,
		closeCustomBoxModal,
		arrivalDateChangedModal,
		promoCodeInvalid,
		nextAvailableDateModal,
		shoppingListSummary,
		referralModal,
		shippingDetails
	} = state.ModalReducer;
	return {
		addressModal,
		referralModal,
		openCustomBox,
		deliveryScheduleModal,
		growerInfoModal,
		accountManagerModal,
		manageGrowersModal,
		customBoxDetailModal,
		paymentModal,
		infoCardModal,
		usersListModal,
		addUserModal,
		paymentListModal,
		companyInformationModal,
		confirmModal,
		finishOrder,
		closeCustomBoxModal,
		arrivalDateChangedModal,
		promoCodeInvalid,
		nextAvailableDateModal,
		customBoxOpen,
		shoppingListSummary,
		shippingDetails
	};
}

export default connect(mapStateToProps)(ModalWrapperContainer);

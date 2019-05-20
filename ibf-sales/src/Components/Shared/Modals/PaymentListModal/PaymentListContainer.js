import React, {Component} from 'react';
import PaymentListComponent from "./PaymentListComponent";
import {cleanModal, closeModal, openModal} from "../../../../Redux/Actions/ModalActionsCreators";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {PAYMENT_LIST_MODAL} from "../ModalTypes";
import {changeDefaultCard, changeSelectedCard, deleteCard} from "../../../../Redux/Actions/ActionsCreators";

class PaymentListContainer extends Component{


  render(){
    const {openModal, closeModal, changeDefaultCard, changeSelectedCard, deleteCard, cleanModal, customer, cards, data,
			confirmData} = this.props;
    return (
        <PaymentListComponent onClose = {() => closeModal({modal: PAYMENT_LIST_MODAL})} data = {cards} customer = {customer.customer}
                              openModal = {openModal} changeDefaultCard = {changeDefaultCard} cleanModal = {cleanModal}
                              deleteCard = {deleteCard} from={data}
                              changeSelectedCard = {changeSelectedCard} confirmation = {confirmData}/>
    );
  }
}

function mapStateToProps(state){
  const {customer} = state.AuthReducer;
  const confirmData = state.ModalReducer.confirmModal;
  const {data} = state.ModalReducer.paymentListModal;
  const {cards} = state.CardsReducer;
  return {confirmData, customer, cards, data};
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    closeModal, openModal, cleanModal, changeDefaultCard, changeSelectedCard, deleteCard
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentListContainer);

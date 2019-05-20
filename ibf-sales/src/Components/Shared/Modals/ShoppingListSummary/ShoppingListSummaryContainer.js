import React, {Component} from 'react';
import ShoppingListSummaryComponent from "./ShoppingListSummaryComponent";
import {cleanModal, closeModal, openModal} from "../../../../Redux/Actions/ModalActionsCreators";
import {SHOPPING_LIST_SUMMARY} from "../ModalTypes";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {cancelSLItem, finishSL, listShoppingCart, requestCancelSLItem} from "../../../../Redux/Actions/ActionsCreators";

class ShoppingListSummaryContainer extends Component{
	componentDidMount(){
	}

	render(){
		const {shoppingList, closeModal, openModal, confirmData, fromCheckout, cancelSLItem, customer, listShoppingCart,
			isEmpty, finishSL, cleanModal, requestCancelSLItem, deletingBox} = this.props;
		return (
			<ShoppingListSummaryComponent shoppingList = {shoppingList} openModal = {openModal} confirmation = {confirmData}
																		isEmpty = {isEmpty} onClose = {() => closeModal({modal: SHOPPING_LIST_SUMMARY})}
																		listShoppingCart={listShoppingCart} fromCheckout = {fromCheckout} finishSL= {finishSL}
																		removeItem={cancelSLItem} customer={customer.customer} cleanModal={cleanModal}
																		requestRemoveItem={requestCancelSLItem} deletingBox={deletingBox}/>
		);
	}
}

function mapStateToProps(state){
	const {customer} = state.AuthReducer;
	const {shoppingList, isEmpty} = state.ShoppingCartReducer;
	const confirmData = state.ModalReducer.confirmModal;
	const {fromCheckout} = state.ModalReducer.shoppingListSummary.data;
	const {deletingBox} = state.LoadingReducer;
	return {shoppingList, confirmData, fromCheckout, customer, isEmpty, deletingBox};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({closeModal, openModal, cleanModal, requestCancelSLItem, cancelSLItem, listShoppingCart, finishSL}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingListSummaryContainer);

import React, {Component} from 'react';
import ModalComponent from "../ModalComponent";
import {INFO_CARD_MODAL, PAYMENT_MODAL} from "../ModalTypes";
import {closeModal, openModal} from "../../../../Redux/Actions/ModalActionsCreators";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

class InfoCardComponent extends Component{
  componentDidMount(){
  }

  render(){
    const {openModal, closeModal, data} = this.props;
    return (
        <ModalComponent title = "Information"
                        body = {<p>Please add first a payment method before you can checkout.</p>}
                        okText = {'Add payment method'}
                        okClick = {() => openModal({modal: PAYMENT_MODAL, data})}
                        cancelText = {'Cancel'}
                        onClose = {() => closeModal({modal: INFO_CARD_MODAL})}
        >

        </ModalComponent>

    );
  }
}
function mapStateToProps(state) {
	const {data} = state.ModalReducer.infoCardModal;
	return {data}
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({closeModal, openModal}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoCardComponent);

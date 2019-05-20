import React, {Component} from 'react';
import PaymentModalComponent from './PaymentModalComponent';
import {bindActionCreators} from 'redux';
import {closeModal} from '../../../../Redux/Actions/ModalActionsCreators';
import {connect} from 'react-redux';
import {PAYMENT_MODAL} from '../ModalTypes';
import StripeService from '../../../../Services/StripeService';
import {toast} from '../../../../Services/AlertService';
import CustomerService from '../../../../Services/CustomerService';
import * as ActionsCreators from '../../../../Redux/Actions/ActionsCreators';
import MixpanelService from "../../../../Services/MixpanelService";

class PaymentModalContainer extends Component {
  toggle = () => {
    const {closeModal} = this.props;
    closeModal({modal: PAYMENT_MODAL});
  };
  
  submit = (card, placeholder) => {
    
    const {customer} = this.props;
    
    const options = {
      name: placeholder,
      address_city: customer.customer_city,
      address_line1: customer.customer_street,
      address_state: customer.customer_state,
      address_zip: customer.customer_zipcode
    };
    
    StripeService.createToken(card, options).then(res => {
      
      if (res.error) {
        toast(res.error.message, 'error');
      } else {
        CustomerService.addCard(res.token, customer.customer).then(result => {
          if (result.success) {
          	MixpanelService.track('addCard', {cardBrand: result.box.card_added.brand, from: this.props.data.from});
            toast(result.box.card_added.brand + ' was added successfully!');
            // success, let's close this modal
            this.toggle();
            // update list of cards
            this.props.loadCards(customer.customer);
          } else {
            if (result.message) {
              toast(result.message, 'error');
            }
          }
        });
      }
    });
  };
  
  render() {
    return (
      
      <PaymentModalComponent onClose={this.toggle} submit={this.submit}/>
    );
  }
}

function mapStateToProps(state) {
	const {data} = state.ModalReducer.paymentModal;
  const {customer} = state.AuthReducer;
  return {customer, data};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    closeModal: closeModal,
    loadCards: ActionsCreators.loadCards
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentModalContainer);

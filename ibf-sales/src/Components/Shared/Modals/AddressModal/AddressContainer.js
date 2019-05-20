import React, {Component} from 'react';
import AddressModalComponent from "./AddressComponent";
import CustomerService from "../../../../Services/CustomerService";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {changeCustomerAddress} from "../../../../Redux/Actions/ActionsCreators";
import {ADDRESS_MODAL} from '../ModalTypes';

type state = {
  home: any
}

class AddressContainer extends Component<{}, state>{

  state = {
    saved: []
  };

  componentDidMount(){
    CustomerService.loadSavedAddresses(this.props.customer.customer).then(res => {
      this.setState({saved: res.addresses})
    });
  }

  render(){
    const {saved} = this.state;
    const {changeCustomerAddress} = this.props;
    return (
      <AddressModalComponent changeCustomerAddress={changeCustomerAddress} savedAdresses={saved} onClose = {() => this.props.closeModal({modal: ADDRESS_MODAL})} customer={this.props.customer.customer}/>
    );
  }
}

function mapStateToProps(state){
  const {customer} = state.AuthReducer;
  return {customer};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    changeCustomerAddress: changeCustomerAddress
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressContainer);

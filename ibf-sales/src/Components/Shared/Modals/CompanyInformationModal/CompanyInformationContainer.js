import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as ActionsCreators from '../../../../Redux/Actions/ActionsCreators';

import {closeModal, openModal} from '../../../../Redux/Actions/ModalActionsCreators';
import CompanyInformationComponent from './CompanyInformationComponent';
import CompanyInformationEditComponent from './CompanyInformationEditComponent';

import SharedService from '../../../../Services/SharedService';
import CustomerService from '../../../../Services/CustomerService';
import {toast} from '../../../../Services/AlertService';

type state = {
  edit: boolean
};

class CompanyInformationContainer extends Component<{}, state> {
  state = {
    edit: false,
    states: [],
    customer: this.props.customer,
    customerImage: ''
  };
  
  componentDidMount(): void {
    this.setState({userId: this.props.userId});
    SharedService.getStateList().then(res => {
      this.setState({states: res});
    });
  }
  
  validateData(customer) {
    return (
      !!customer.customer_name
      && !!customer.customer_street
      && !!customer.customer_zipcode
      && !!customer.customer_city
      && !!customer.customer_office_phone
      && !!customer.office_email
      && !!customer.customer_employees_quantity
      && !!customer.customer_stores_quantity
    );
  }
  
  customerEdit(customer, customerImage) {
    if (!this.validateData(customer) && (customer.customer_logo || customerImage)) {
      toast('Please fill the requested fields', 'error');
      return;
    }
    
    if (customerImage) {
      this.upload(customerImage);
    }
    
    this.setState({customer, customerImage: customerImage});
    this.props.changeAllCustomerInfo(customer);
    
    let state = this.state.states.find(state => {
      return state.state_iso === customer.customer_state;
    });
    
    const company = {
      _KEY: customer.customer,
      company_name: customer.customer_name,
      street: customer.customer_street,
      state: state._KEY,
      zipcode: customer.customer_zipcode,
      city: customer.customer_city,
      office_phone: customer.customer_office_phone,
      office_email: customer.office_email,
      employees_quantity: customer.customer_employees_quantity,
      stores_quantity: customer.customer_stores_quantity
    };
    
    CustomerService.updateCustomerInfo(company).then(data => {
      toast('Customer successfully updated', 'success');
      this.props.closeModal({modal: 'companyInformationModal'});
    });
  }
  
  upload(event) {
    const blob = event.slice(0, -1, 'image/png');
    const file = new File([blob], 'logo.png', {type: 'image/png'});
    
    CustomerService.updateCustomerImage(this.state.customer.customer_folder, file).then(data => {
      //const logo = environment.publicPath + 'customers/' + this.state.customer.customer + '/logo.png';
    });
  }
  
  render() {
    let {customer, edit, states, userId, customerImage} = this.state;
    
    let component = edit ?
      <CompanyInformationEditComponent
        customer={customer}
        userId={userId}
        states={states}
        customerImage={customerImage}
        OnEdit={() => {
          this.setState({edit: false});
        }}
        customerEdit={(customer, customerImage) => {
          this.customerEdit(customer, customerImage);
        }}
        onClose={() => this.props.closeModal({modal: 'companyInformationModal'})}/> :
      <CompanyInformationComponent
        customer={customer}
        userId={userId}
        OnEdit={() => {
          this.setState({edit: true});
        }}
        onClose={() => this.props.closeModal({modal: 'companyInformationModal'})}/>;
    
    return (
      component
    );
  }
}

function mapStateToProps(state) {
  const {customer, userId} = state.AuthReducer;
  return {
    customer,
    userId
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    openModal,
    closeModal,
    changeAllCustomerInfo: ActionsCreators.changeAllCustomerInfo
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps)(CompanyInformationContainer);

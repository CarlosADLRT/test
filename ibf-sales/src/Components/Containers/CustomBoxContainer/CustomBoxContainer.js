import React, {Component} from 'react';
import CustomBoxComponent from '../../Presentational/CustomBoxComponent/CustomBoxComponent';
import {bindActionCreators} from 'redux';
import {
  addToBox,
  cancelCustomBox,
  checkOpenBox,
  closeCustomBox,
  loadInventory,
  removeFromCustomBox, requestAddToBox,
  requestInventory, requestRemoveFromCustomBox, toggleCustomBox
} from '../../../Redux/Actions/ActionsCreators';
import {connect} from 'react-redux';
import MixpanelService from "../../../Services/MixpanelService";

class CustomBoxContainer extends Component {
  cancelBox = () => {
    const {cancelCustomBox, cartbox, customer: {customer}} = this.props;
    MixpanelService.track('cancelBox', {percentage: cartbox.current_percentage,
			quantity: cartbox.current_items, key: cartbox._KEY, packingDate: cartbox.packing_date}) ;
    cancelCustomBox(customer, [cartbox._KEY]);
  };
  
  closeCustomBox = () => {
    const {closeCustomBox, customer: {customer}} = this.props;
    closeCustomBox(customer);
  };
  
  removeItem = (product, quantity, name) => {
    const {removeFromCustomBox, customer: {customer}, requestRemoveFromCustomBox} = this.props;
    requestRemoveFromCustomBox();
    MixpanelService.track('removeBunches', {name, quantity, key: product});
    removeFromCustomBox(customer, product, quantity)
  };

  addToBox = (product, quantity) => {
    const {addToBox, customer, requestAddToBox, cartbox} = this.props;
    requestAddToBox();
		MixpanelService.track("addToBox", {key: product.inventory._KEY, name: product.name, quantity});
    addToBox(customer.customer, product.inventory._KEY, quantity, cartbox.eta_date, cartbox.charge_date, cartbox.packing_date);
  };
  
  render() {
    const {isAddingToBox, isRemovingFromBox, customBox = [], cartbox, toggleCustomBox} = this.props;
    return (
      <CustomBoxComponent list={customBox} removeItem={this.removeItem} cancelCustomBox={this.cancelBox}
                          addToBox = {this.addToBox} closeBox={this.closeCustomBox} subtotal={cartbox.subtotal}
                          percentage = {cartbox.current_percentage} shipping={cartbox.freightCost} toggle={toggleCustomBox}
                          total={cartbox.price || 0} isAddingToBox= {isAddingToBox} isRemovingFromBox={isRemovingFromBox}/>
    );
  }
}

function mapStateToProps(state) {
  const {customBox, isCurrentBox, cartbox} = state.CustomBoxReducer;
  const {customer} = state.AuthReducer;
  const {isAddingToBox, isRemovingFromBox} = state.LoadingReducer;
  return {
    customer,
    isCurrentBox,
    customBox,
    cartbox,
    isAddingToBox,
    isRemovingFromBox
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    toggleCustomBox,
    loadInventory,
    requestInventory,
    checkOpenBox,
    cancelCustomBox,
    closeCustomBox,
    removeFromCustomBox,
    requestRemoveFromCustomBox,
    addToBox,
    requestAddToBox
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomBoxContainer);

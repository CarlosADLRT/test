import React, {Component} from 'react';
import {connect} from 'react-redux';
import ShoppingCartComponent from '../../Presentational/ShoppingCartComponent/ShoppingCartComponent';
import {bindActionCreators} from 'redux';
import {
  addToCart,
  deleteBox,
  requestAddToCart,
  showShoppingCart
} from '../../../Redux/Actions/ActionsCreators';
import MixpanelService from "../../../Services/MixpanelService";

class ShoppingCartContainer extends Component {

  deleteBox = (cart) => {
    const {
      deleteBox, customer
    } = this.props;
    deleteBox(customer.customer, cart);
  };

  addToCart = (product, numberBoxes, inventory) => {
    const {addToCart, customer, requestAddToCart} = this.props;
    requestAddToCart();
		MixpanelService.track("addToCart", {key: inventory, name: product.name, quantity: numberBoxes});
    addToCart(product.eta_date, customer.customer, inventory, product.packing_date, product.total_items, numberBoxes);
  };

  render() {
    const {shoppingCart, showShoppingCart, shoppingCartTotalItems, closeShoppingCart, subtotal, totalPrice} = this.props;
    return (
      <ShoppingCartComponent shoppingCart={shoppingCart} showShoppingCart={showShoppingCart} addToCart = {this.addToCart}
                             shoppingCartTotalItems={shoppingCartTotalItems} close={closeShoppingCart}
                             subtotal={subtotal} totalPrice={totalPrice} deleteBox={this.deleteBox}
      />
    );
  }
}

function mapStateToProps({ShoppingCartReducer, AuthReducer}) {
  const {shoppingCart, showShoppingCart, shoppingCartTotalItems, totalPrice, subtotal} = ShoppingCartReducer;
  const {customer, user} = AuthReducer;
  return {
    shoppingCart,
    showShoppingCart,
    shoppingCartTotalItems,
    totalPrice,
    subtotal,
    customer,
    user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({closeShoppingCart: showShoppingCart, deleteBox, requestAddToCart, addToCart}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartContainer);

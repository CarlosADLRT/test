import React, {Component} from 'react';

import CardProductComponent from '../../Presentational/ProductOverviewComponent/CardProductComponent/CardProductComponent';
import {bindActionCreators} from 'redux';
import * as ActionsCreators from '../../../Redux/Actions/ActionsCreators';
import {connect} from 'react-redux';
import {roundUp} from "../../../Utils/Utilities";
import MixpanelService from '../../../Services/MixpanelService';

class CardProductContainer extends Component {

  addToCart = (numberBoxes) => {
    const {addToCart, product, customer, requestAddToCart, conditions, promoCodeStillAvailable} = this.props;
		let code = '';
		if(conditions.promoCodeState && promoCodeStillAvailable) {
			code = conditions.promoCode;
		}
		MixpanelService.track("addToCart", {key: product.inventory, name: product.name, quantity: numberBoxes});
    requestAddToCart();
    addToCart(product.eta, customer.customer, product.inventory, product.packing_date, product.total_box, numberBoxes, code);
  };

  setFavorite = () => {
    const {setFavorite, product, customer, requestSetFavorite} = this.props;
    requestSetFavorite(product.inventory);
    setFavorite(customer.customer, product.masterlist, !product.favorite);
  };
  
  addToBox = (quantity) => {
    const {addToBox, product, customer, requestAddToBox} = this.props;
    requestAddToBox();
		MixpanelService.track("addToBox", {key: product.inventory, name: product.name, quantity});
    addToBox(customer.customer, product.inventory, quantity, product.eta, product.charge_date, product.packing_date);
  };
  
  render() {
    const {product, loadingFavorite, isCurrentBox, cartbox, bulk_promo, isSeason, index, promoCodeOff, conditions, promoCodeStillAvailable} = this.props;
    const bulk = isSeason ? [] : bulk_promo.filter(item=> (item.grower === product.grower) && (item.product_group === product.product_group));
    if(bulk.length) {
      const numberBox = Math.ceil(
          bulk[0].amount /
          product.stems_per_bunch /
          product.total_box
      );
      bulk[0].message =
          'If you buy ' +
          bulk[0].amount +
          ' or more stems (' +
          numberBox +
          " or more boxes) of this product group you'll get a " +
          roundUp(bulk[0].percentage * 100) +
          '% discount.';
    }
    return (
      <CardProductComponent loading={loadingFavorite} addToBox={this.addToBox} setFavorite={this.setFavorite}
                            product={product} cartbox={cartbox} bulk={bulk}
                            addToCart={this.addToCart} isCurrentBox={isCurrentBox} index={index}
														promoCodeOff={promoCodeOff} promoCodeStillAvailable={promoCodeStillAvailable} conditions={conditions}/>
    );
  }
}

function mapStateToProps({AuthReducer, LoadingReducer, CustomBoxReducer, DashboardReducer, FilterReducer, ProductReducer}) {
  const {customer} = AuthReducer;
  const {conditions} = FilterReducer;
  const {promoCodeStillAvailable, promoCodeOff} = ProductReducer;
  const {setFavorite} = LoadingReducer;
  const {isCurrentBox, cartbox} = CustomBoxReducer;
  const {bulk_promo, isSeason} = DashboardReducer.home;
  return {customer, loadingFavorite: setFavorite, isCurrentBox, cartbox, bulk_promo, isSeason, conditions, promoCodeStillAvailable, promoCodeOff};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addToCart: ActionsCreators.addToCart,
    setFavorite: ActionsCreators.setFavorite,
    addToBox: ActionsCreators.addToBox,
    requestSetFavorite: ActionsCreators.requestSetFavorite,
    requestAddToCart: ActionsCreators.requestAddToCart,
    requestAddToBox: ActionsCreators.requestAddToBox,
    requestInventory: ActionsCreators.requestInventory
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardProductContainer);

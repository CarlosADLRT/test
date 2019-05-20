import React, {Component, Fragment} from 'react';
import {Transition} from 'react-transition-group';
import style from './ShoppingCartComponent.scss';
import FedexBadge from '../Shared/FedexBadgeComponent/FedexBadgeComponent';
import {convertToFullDate, roundUp} from '../../../Utils/Utilities';
import ShoppingCartItemComponent from './ShoppingCartItemComponent/ShoppingCartItemComponent';
import {withRouter} from 'react-router-dom';
import MixpanelService from "../../../Services/MixpanelService";

class ShoppingCartComponent extends Component {
  close = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    this.props.close();
  };
  
  goToCheckout() {
    this.props.close();
		MixpanelService.track('finishOrder', {from: 'shoppingcart'});
    this.props.history.push({
      pathname: './checkout'
    });
  };
  
  render() {
    const {showShoppingCart, shoppingCartTotalItems, shoppingCart, totalPrice, deleteBox, addToCart} = this.props;
    return (
      <Transition in={showShoppingCart} timeout={300} mountOnEnter unmountOnExit>
        {state => (
          <div
            className={['container-shoppingCart', state === 'entering' ? style.Open : state === 'exiting' ? style.Closed : null].join(' ')}>
            <div className="shoppingcart" onClick={this.close}>
              <div className="shoppingcart__container bg-soft-gradient" onClick={(e)=>{e.stopPropagation();}}>
                <div className="shoppingcart__header">
                  <div className="media align-items-center">
                    <div className="media-body">
                      <b>Your Cart</b> ({shoppingCartTotalItems})
                    </div>
                    <span onClick={this.close} className="text-danger link-ibf">
                      <i className="fa fa-times"/>
                    </span>
                  </div>
                </div>
                <FedexBadge/>
                <div className="shoppingcart__body">
                  <ul className="shoppingcart-list">
                    {shoppingCart.map(i => {
                      return (<Fragment key={i.eta_date}>
                        <li className="shoppingcart-list__groups">
                      <span className="shoppingcart-list__groups-header">
                        {convertToFullDate(i.eta_date + '')}
                      </span>
                          <ul className="shoppingcart-list__group">
                            {i.cartboxes.map(item => (
                              <ShoppingCartItemComponent product={item} key={item._KEY} addToCart={addToCart}
                                                         deleteBox={deleteBox}/>
                            ))}
                          </ul>
                        </li>
                      </Fragment>);
                    })}
                  
                  </ul>
                </div>
                <div className="shoppingcart__footer">
                  <div className="shoppingcart__footer-label">
                    <span>Total Amount:</span>
                    <span>${roundUp(totalPrice)}</span>
                  </div>
                  <button className="btn btn-block btn-primary" onClick={() => this.goToCheckout()}>Proceed to Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
        }
      </Transition>
    
    );
  }
}

export default withRouter(ShoppingCartComponent);

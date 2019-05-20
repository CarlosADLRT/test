import React, {Component} from 'react';
import CustomBoxItemComponent from './CustomBoxItemComponent/CustomBoxItemComponent';
import './CustomBoxComponent.scss';
import {roundUp} from '../../../Utils/Utilities';

class CustomBoxComponent extends Component {
  render() {
    const {list, shipping, subtotal, total, cancelCustomBox, closeBox, percentage, addToBox, toggle, removeItem, isAddingToBox, isRemovingFromBox} = this.props;
    return (
      <div className="container">

        <div className="row justify-content-center mt-4 px-4">
          <div className="col-8 d-flex justify-content-between align-items-center">
            &nbsp;
            <div className="text-center">
              <h5 className="mr-4">PERSONAL BOX</h5>
              <span> Product added to personal box</span>
            </div>
            <button className="btn btn-primary" onClick={() => toggle()}>Hide</button>
          </div>
        </div>

        <div className="row p-4">
          <div className="col-5 offset-2 custom-box-info-height">
            {list.map(i => (<div className="card mb-2" key={i._KEY}>
              <CustomBoxItemComponent addToBox={addToBox} removeItem={removeItem} product={i}
                                      percentage={percentage}
                                      isAddingToBox={isAddingToBox} isRemovingFromBox={isRemovingFromBox}/>
            </div>))}
          </div>
          <div className="col-3 d-flex flex-column custom-box-info-height">
            <div>
              <div className="d-flex justify-content-between">

                <i className="fa fa-info mr-2"/>

                <p> Before you can continue shopping by other growers, first you have to finish filling this
                  personalized box by this grower.</p>
              </div>
              <div className="d-flex justify-content-between">
                <span className="mb-3">Subtotal:</span> <span>${roundUp(subtotal)}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="mb-3">Shipping:</span> <span>${roundUp(shipping)}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="mb-3"><b>Total:</b></span> <span><b>${roundUp(total)}</b></span>
              </div>
              <div className="mb-3 d-flex flex-column justify-content-center">
                <button onClick={closeBox} className="btn btn-primary font-size-sm mb-3"
                        disabled={isAddingToBox || isRemovingFromBox}>
                  <i className="fa fa-shopping-cart"/> ADD PERSONAL BOX TO
                  CART
                </button>
                <button onClick={cancelCustomBox} className="btn btn-danger font-size-sm"
                        disabled={isAddingToBox || isRemovingFromBox}>
                  <i className="fa fa-trash-alt"/> CANCEL BOX
                </button>
              </div>
              <div className="d-flex justify-content-between">

                <i className="fa fa-truck mr-2"/>

                <p> Note: by adding a box incomplete additional freight cost will be added. Free shipping when a box
                  is 100% full.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CustomBoxComponent;

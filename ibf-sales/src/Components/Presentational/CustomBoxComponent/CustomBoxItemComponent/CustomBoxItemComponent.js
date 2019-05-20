import React, {Component} from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledButtonDropdown} from 'reactstrap';
import {getBunchesAvailable, getQuantity} from '../../../../Utils/Utilities';
import env from '../../../../environment';

class CustomBoxItemComponent extends Component {

	getBunchesAvailable() {
		const {product, percentage} = this.props;
		const {inventory, uom, stems_per_bunch} = product;
		const available = getQuantity(inventory.quantity, uom.uom, stems_per_bunch.stems_per_bunch);
		const bunches = getBunchesAvailable(available, product.percentage, true, percentage);
		return product.quantity > bunches ? product.quantity + bunches : bunches
	}

  changeBunches(numBunches){
    const {product, addToBox, removeItem} = this.props;
    if(numBunches !== product.quantity){
      if(numBunches > product.quantity){
        addToBox(product, (numBunches - product.quantity));
      } else{
        removeItem(product._KEY, (product.quantity - numBunches), product.name);
      }
    }
  }

	render() {
		const {product, removeItem, isAddingToBox, isRemovingFromBox} = this.props;
		const bunchesAvailable = this.getBunchesAvailable();

    return (
        <div className = "media p-2">
          <img width = {100} height = {100} className = "mr-2" src = {env.publicPath+product.images[0]} alt = ""/>
          <div className = "media-body ">
            <div className = "d-flex justify-content-between">
              <span><b>{product.name}</b></span>
              <i onClick = {() => !(isAddingToBox || isRemovingFromBox) && removeItem(product._KEY, product.quantity,product.name)} className = "fa fa-trash-alt clickable"/>
            </div>
            <br/>
            <span><small>{product.stems_per_bunch.stems_per_bunch} stems per bunch</small></span>
            <br/>
            <span className = "mb-auto"><small>{product.percentage}% of box volume</small></span>

					<div className="d-flex justify-content-between">
						<span><b>${product.price} / bunch</b></span>
						<UncontrolledButtonDropdown size="sm">
							<DropdownToggle caret disabled={isAddingToBox || isRemovingFromBox}>
								{product.quantity}
							</DropdownToggle>
							<DropdownMenu modifiers={{
								setMaxHeight: {
									enabled: true,
									order: 890,
									fn: (data) => {
										return {
											...data,
											styles: {
												...data.styles,
												overflow: 'auto',
												maxHeight: 110,
											},
										};
									},
								},
							}}>
								{Array(bunchesAvailable).fill(1).map((i, index) => (
									<DropdownItem key={index + 1} value={index + 1}
																onClick={() => this.changeBunches(index + 1)}>{index + 1}</DropdownItem>))}
							</DropdownMenu>
						</UncontrolledButtonDropdown>
					</div>
				</div>
			</div>
		);
	}
}

export default CustomBoxItemComponent;

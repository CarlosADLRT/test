import React, {Component} from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledButtonDropdown} from 'reactstrap';
import environment from '../../../../environment';
import {getAvailableBoxes, getQuantity, roundUp} from "../../../../Utils/Utilities";
import ProductImageComponent from "../../../Shared/ProductImageComponent/ProductImageComponent";
import './ShoppingCartItemComponent.scss'
import EmmaGif from '../../../../Assets/Images/ProcessingOrder.gif';
import MixpanelService from "../../../../Services/MixpanelService";

class ShoppingCartItemComponent extends Component {

    state = {
        processingOrder: false
    };

	delete = () => {
		const {deleteBox, product} = this.props;
		this.setState({processingOrder: true});
		product.allBoxes.forEach(i => {
			MixpanelService.track('deleteBox', {name: product.name, from: 'iconCart', key: i,
				packingDate: product.packing_date});
		});
		deleteBox(product.allBoxes);
	};

	changeBoxes(numBoxes){
		const {product, addToCart, deleteBox} = this.props;
		if(numBoxes !== product.quantity){
			this.setState({processingOrder: true});
			const {inventory} = product.items[0];
			if(numBoxes > product.quantity){
				addToCart(product, (numBoxes - product.quantity), inventory._KEY);
			} else{
				const boxes = product.allBoxes.slice(0, product.quantity - numBoxes);
				boxes.forEach(i => {
					MixpanelService.track('deleteBox', {name: product.name, from: 'iconCart', key: i,
						packingDate: product.packing_date});
				});
				deleteBox(boxes);
			}
		}
	}

	componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void{
		if(prevProps.product.quantity !== this.props.product.quantity){
			this.setState({processingOrder: false});
		}
	}

	render(){
		const {product} = this.props;
		let {custom, name, product_group, variety, total_items, grade, length} = product;
		const {inventory, uom, stems_per_bunch} = product.items[0];
		if(custom){
			name = 'Custom Box Special Pack';
		} else{
			name = `${product_group.common_name}
          ${variety.variety_name}${grade ? ' ' + grade.grade : ''} ${length}cm`;
        }
        const bunches = custom ? null : getQuantity(inventory.quantity, uom.uom, stems_per_bunch.stems_per_bunch);
        const boxesAvailable = custom ? 0 : getAvailableBoxes(bunches, total_items);

		return (
			<div className = "shopping-cart-item-container">

				{
					this.state.processingOrder && <div className = "emma-loading">
						<img src = {EmmaGif} alt = "" className = "emma-loading-img"/>
					</div>
				}

				<div className = "d-flex p-2 bg-light-pink mb-3">
					<div className = "shoppingcart-item__image mr-2">
						<ProductImageComponent custom={custom} img = {product.picture || product.img[0]}/>
					</div>
					<div className = "flex-fill">
						<div className = "media mb-1">
							<div className = "media-body ">
								<span><b>{name}</b></span>
							</div>
							<i className = "fa fa-trash-alt clickable" onClick = {this.delete}/>
						</div>
						<div className = "media">
							<div className = "media-body ">
								<ul className = "list-unstyled">

									<li>
										<small><img
											src = {`Assets/Images/${environment.country_flag_map[product.grower.country]}_flag.svg`}
											alt = ""/> {product.grower.company_name}</small>
									</li>
									<li className = "mb-auto">
										<small>{product.current_items} Bunches</small>
									</li>
									<li>
										{product.off > 0 &&
										<span className = "text-danger">
                  <s>${roundUp((product.price - product.extra_freight_cost) / product.current_items)} </s>
                </span>
										}
										<span>${roundUp(((product.price * (1 - product.off)) - product.extra_freight_cost) / product.current_items)}/Bunch</span>
									</li>
									<li>
										{product.off > 0 &&
										<span className = "text-danger">
                    <s>${roundUp(product.price)} </s>
                  </span>
										}
										<span>${roundUp(product.price * (1 - product.off))}/Box</span>
									</li>
								</ul>
							</div>
							<div
								className = {`d-flex align-self-stretch flex-column flex-column align-items-center ${product.custom ? "justify-content-end" : "justify-content-between"}`}>
								{!product.custom && <div>
									<UncontrolledButtonDropdown size = "sm">
										<DropdownToggle caret>
											{product.quantity}
										</DropdownToggle>
										<DropdownMenu modifiers = {{
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
											{boxesAvailable.map((i, index) => (
												<DropdownItem onClick = {() => this.changeBoxes(index + 1)}
																			key = {index + 1}
																			value = {index + 1}>{index + 1}</DropdownItem>))}
										</DropdownMenu>
									</UncontrolledButtonDropdown>
								</div>}
								<div>
									<span><b>${roundUp(product.totalPriceQuantity)}</b></span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

		);
	}
}

export default ShoppingCartItemComponent;

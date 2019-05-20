import React, {Component, Fragment} from 'react';
import ModalComponent from "../ModalComponent";
import {Button} from "reactstrap";
import {convertToFullDate} from "../../../../Utils/Utilities";
import {withRouter} from 'react-router-dom';
import {CONFIRM_MODAL} from "../ModalTypes";

class ShoppingListSummaryComponent extends Component{
	state = {
		itemToDelete: null,
	};

	componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void{
		const {confirmation, customer, removeItem, listShoppingCart, cleanModal, requestRemoveItem} = this.props;
		if(confirmation.result){
			requestRemoveItem();
			removeItem(customer, this.state.itemToDelete).then(()=>{
				listShoppingCart(customer);
			});
			cleanModal({modal: CONFIRM_MODAL});
		}
		if(!this.props.shoppingList || !this.props.shoppingList.items.some(i => i.carts)) {
			this.props.onClose();
		}
	}

	deleteItem(item){
		this.setState({itemToDelete: item});
		this.props.openModal({
			modal: CONFIRM_MODAL,
			data: {text: 'Are you sure you want to delete this item?', result: false}
		});
	};

	goToCheckout(){
		this.props.history.push({
			pathname: '/checkout',
		});
		this.props.onClose();
	}

	noItemsFound(){
		return (this.props.isEmpty || !this.props.shoppingList || !this.props.shoppingList.items.some(i => i.carts))
	}

	close = () => {
		if(this.noItemsFound()){
			this.props.finishSL(this.props.shoppingList._KEY).then(() => {
				this.props.onClose();
			});
		} else {
			this.props.onClose();
		}
	};


	getComment(item){
		if(!item.bought){
			return 'Couldn’t find the requested product.';
		}
		if(!item.carts){
			return 'Options deleted';
		}
		if(item.bought - item.quantity < 0 && item.hasReplace){
			return 'Couldn’t find all the requested product and used some replacements.';
		}
		if(item.bought - item.quantity < 0){
			return 'Couldn’t find all the requested product.';
		}
		if(item.hasReplace){
			return 'Used some replacements.';
		}
	}

	render(){
		const {shoppingList, fromCheckout, deletingBox} = this.props;
		return (
				<ModalComponent
					title = {`Shopping List for arrival ${(shoppingList && shoppingList.delivery_date) ? convertToFullDate(shoppingList.delivery_date) : ''}`}
					size = "lg"
					onClose = {this.close}
					customFooter = {
						fromCheckout || (this.noItemsFound()) ? <Button color = "secondary" onClick = {this.close}>Close</Button> :
							<Button color = "secondary" onClick = {() => this.goToCheckout()}>Finish Order</Button>
					}
					body = {<table className = "table">
						<thead>
						<tr>
							<th>
								Product:
							</th>

							<th>
								Requested stems:
							</th>
							<th>
								Stems Found:
							</th>
							{fromCheckout && <Fragment>
								<th>
									Results:
								</th>
								<th>
									Comment:
								</th>
								<th>
									Action:
								</th>
							</Fragment>}
						</tr>
						</thead>
						<tbody>
						{shoppingList && shoppingList.items.map(item => (
							<tr key = {item._KEY}>
								<td>
									{item.product_group.common_name} {item.variety.variety_name} {!!item.length &&
								<span>{item.length} cm</span>}
								</td>
								<td className = "text-center">
									{item.quantity}
								</td>
								<td className = "text-center">
									{item.bought || 0}
								</td>
								{fromCheckout && <Fragment>
									<td className = "text-center">
										{!item.carts && <i className = "far fa-exclamation-triangle"/>}
										{!!item.carts && (item.bought >= item.quantity) && <i className = "fal fa-check text-success"/>}
									</td>
									<td>
										{this.getComment(item)}
									</td>
									<td>
										{!!item.carts &&
										<button className = "btn btn-danger" onClick = {() => this.deleteItem(item._KEY)}
										disabled={deletingBox}>
											<i className = {'fa ' + (deletingBox ? 'fa-pulse fa-spinner' : "fa-trash")}/>
										</button>}
									</td>
								</Fragment>}

							</tr>
						))}

						</tbody>
					</table>}
				/>
		);
	}
}

export default withRouter(ShoppingListSummaryComponent);

import React, { Component, Fragment } from 'react';
import './CheckoutComponent.scss';
import FedexBadge from '../Shared/FedexBadgeComponent/FedexBadgeComponent';
import Emma from '../../../Assets/Images/emma.jpg';
import { convertToFullDate, roundUp } from '../../../Utils/Utilities';
import CartItem from './CartItemComponent/CartItemComponent';
import SidebarComponent from './SidebarComponent/SidebarComponent';
import { withRouter } from 'react-router-dom';
import { INFO_CARD_MODAL } from '../../Shared/Modals/ModalTypes';
import { Modal, ModalBody } from 'reactstrap';
import EmmaLogo from '../../../Assets/Images/ProcessingOrder.gif';

class CheckoutComponent extends Component {
	componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
		const { checkingOut, cards, finishCheckingOut } = this.props;
		if (!prevProps.isLoading && !cards.length) {
			this.props.openModal({ modal: INFO_CARD_MODAL, data: { from: 'finishOrder' } });
		}
		if (prevProps.checkingOut && !checkingOut) {
			finishCheckingOut();
		}
		if (
			this.props.shoppingList &&
			this.checkForSLItems(prevProps) &&
			!this.checkForSLItems(this.props)
		) {
			this.props.finishSL(this.props.shoppingList._KEY);
		}
	}

	checkForSLItems({ shoppingCart }) {
		return shoppingCart.reduce((flag, item) => {
			return flag ? flag : item.cartboxes.some(i => i.shoppingListItems.length);
		}, false);
	}

	render() {
		const {
			totalItems, shoppingCart, isLoading, checkingOut, cancelBox, editBox, deletingBox, openModal,
			voucher
		} = this.props;
		return (
			<Fragment>
				<div className='d-flex flex-column ibf-main-wrapper position-relative'>
					<div className='d-flex flex-row justify-content-between mb-2'>
						<div>
							<span>
								<b>Order Total ({totalItems} boxes) </b>
							</span>
							<span className='link-ibf-greyish-brown' onClick={this.props.history.goBack}>
								<small>
									<i className='fa fa-fw fa-arrow-left' />
									Continue shopping
								</small>
							</span>
						</div>
						<div>
							<FedexBadge />
						</div>
					</div>
					<div className='container d-flex flex-1-1'>
						<div className='d-flex ibf-main-section ibf-checkout-wrapper mr-xl-3 bg-soft-gradient ml-0 px-3'>
							{(isLoading || !shoppingCart.length) && (
								<div className='d-flex align-items-center justify-content-center bg-white w-100 col-auto my-3'>
									<figure className='figure'>
										<img src={Emma} className='figure-img' alt='' />
									</figure>
								</div>
							)}
							{!isLoading && (
								<div className='list-shoppingcart-wrapper'>
									<ul className='list-unstyled list-shoppingcart'>
										{shoppingCart.map(item => (
											<li key={item.eta_date}>
												<div className='list-shoppingcart__header'>
													<div className='row align-items-between'>
														<div className='col'>
															<h3 className='list-shoppingcart__header-title'>
																Delivery on: <b>{convertToFullDate(item.eta_date + '')}</b>
															</h3>
														</div>
														<div className='col-auto text-right'>
															{item.cartboxes.length} boxes ($
															{roundUp(
																item.cartboxes.reduce(
																	(total, item) => total + item.price * (1 - item.off),
																	0
																)
															)}
															)
														</div>
													</div>
												</div>
												<ul className='list-unstyled'>
													{item.cartboxes.map(i => (
														<li key={i._KEY}>
															<CartItem
																editBox={editBox}
																voucher={voucher}
																item={i}
																cancelBox={() => cancelBox(i)}
																deletingBox={deletingBox}openModal={openModal}
															/>
														</li>
													))}
												</ul>
											</li>
										))}
									</ul>
								</div>
							)}
						</div>
						<div className='ibf-order-sidebar open bg-soft-gradient'>
							<SidebarComponent {...this.props} />
						</div>
					</div>
				</div>

				{checkingOut && (
					<Modal isOpen={true} centered>
						<ModalBody>
							<div className='d-flex'>
								<img src={EmmaLogo} alt='' className='mr-4' />
							</div>
						</ModalBody>
					</Modal>
				)}
			</Fragment>
		);
	}
}

export default withRouter(CheckoutComponent);

import React, { Component, Fragment } from 'react';
import environment from '../../../../environment';
import ProductImageComponent from '../../../Shared/ProductImageComponent/ProductImageComponent';
import './CartItemComponent.scss';
import { subDays } from 'date-fns';
import { convertNumberDateToDate, convertToFullDate, roundUp } from '../../../../Utils/Utilities';
import { CUSTOM_BOX_DETAIL_MODAL } from '../../../Shared/Modals/ModalTypes';
import { UncontrolledTooltip } from 'reactstrap';
import { toast } from '../../../../Services/AlertService';

class CartItemComponent extends Component {
	componentDidMount() {}

	render(){
		const {item, editBox, voucher,openModal, deletingBox, cancelBox} = this.props;
		return (
			<div className='cart-item'>
				<div className='cart-item__image'>
					<ProductImageComponent custom={item.custom} img={item.picture || item.img[0]} />
				</div>
				<div className='cart-item__body'>
					<div className='row'>
						<div className='col-lg-6 col-xl-7'>
							<h4 className='cart-item-title'>
								<b className='mr-2'>
									#{item.consecutive} {item.name}{' '}
									{item.custom && <span> {`(${item.current_percentage}%)`}</span>}{' '}
								</b>
								{item.product_group.warning && (
									<span
										className='clickable'
										id={'warning' + item._KEY.replace(/\s|[()]|[.]|[/]/g, '')}
										onClick={() => {
											toast(item.product_group.warning, 'warning');
										}}
									>
										<img src='../../../../Assets/Images/alert.png' alt='Warning' height={18} />
										<UncontrolledTooltip
											placement='top'
											autohide={false}
											target={'warning' + item._KEY.replace(/\s|[()]|[.]|[/]/g, '')}
										>
											<span>{item.product_group.warning}</span>
										</UncontrolledTooltip>
									</span>
								)}
							</h4>
							<ul className='list-unstyled mb-2'>
								<li>
									<small>
										{item.grower.company_name}{' '}
										<img
											src={`Assets/Images/${
												environment.country_flag_map[item.grower.country]
											}_flag.svg`}
											className='align-text-bottom'
											alt=''
											width={16}
										/>
										{environment.country_flag_map[item.grower.country]}
									</small>
								</li>
								{item.custom && (
									<li>
										<small>Freight costs: ${roundUp(item.extra_freight_cost)}</small>
									</li>
								)}
								{item.off > 0 && voucher && voucher.type !== 'AMOUNT' && (
									<li>
										<small>Discount: {(100 * item.off).toFixed(2)}%</small>
									</li>
								)}

								<li>
									<small>
										Price per bunch:
										{item.off > 0 && (
											<span className='text-danger'>
												<s>
													${roundUp((item.price - item.extra_freight_cost) / item.current_items)}
												</s>{' '}
											</span>
										)}
										$
										{roundUp(
											(item.price * (1 - item.off) - item.extra_freight_cost) / item.current_items
										)}
									</small>
								</li>
								<li>
									<small>
										Stems per bunch:
										{item.items[0].stems_per_bunch.stems_per_bunch}
									</small>
								</li>

								<li>
									<i className='small'>
										<b>
											*CC Reservation:{' '}
											{convertToFullDate(subDays(convertNumberDateToDate(item.charge_date), 1))}
										</b>
									</i>
								</li>
							</ul>
						</div>
						<div className='col-lg-6 col-xl-5 d-flex flex-column justify-content-between'>
							<div className='row'>
								<div className='col-md-6 mb-2'>
									<b>Bunches</b>
									<br /> {item.current_items}
								</div>
								<div className='col-md-6 mb-2'>
									<b>Box Price</b>
									<br />
									{item.off > 0 && (
										<span className='text-danger'>
											<s>${roundUp(item.price)}</s>
											<br />
										</span>
									)}
									<b>${roundUp(item.price * (1 - item.off))}</b>
								</div>
							</div>
							{item.bulkPromo && (
								<div className='mb-1'>
									<span className='info-yellow-span clickable'>Bulk Discount </span>
								</div>
							)}
							{item.shoppingListItems.length > 0 && (
								<div className='mb-1'>
									<span
										className='info-yellow-span '
										id={'SL' + item.shoppingListItems[0]._KEY + item._KEY}
									>
										Shopping List product
										{!item.custom && (
											<UncontrolledTooltip
												placement='top'
												autohide={false}
												target={'SL' + item.shoppingListItems[0]._KEY + item._KEY}
											>
												<span>
													{item.shoppingListItems[0].product_group.common_name +
														' ' +
														item.shoppingListItems[0].variety.variety_name}
												</span>
											</UncontrolledTooltip>
										)}
									</span>
								</div>
							)}

							<div className='text-lg-right mb-2'>
								{item.custom && (
									<Fragment>
                        <span className = "link-ibf-purply mr-2"
															onClick = {() => openModal({
																modal: CUSTOM_BOX_DETAIL_MODAL,
																data: item.items
															})}>
                          <i className = "fa fa-fw fa-info-circle"/>
                          <u>Details</u>
                        </span>
										<span onClick = {() => editBox(item._KEY)} className = "link-ibf-purply edit-action">
                          <i className = "fa fa-fw"/>
                          <u>Edit box</u>
                        </span>
									</Fragment>
								)}
							</div>
						</div>
					</div>
				</div>

				<span className = "text-danger cart-item-cancel" onClick = {deletingBox ? null : cancelBox}>
            <i className = {'fa ' + (deletingBox ? 'fa-pulse fa-spinner' : "fa fa-trash-alt")}/>
            <span className = " d-none">Cancel Box</span>
          </span>
			</div>
		);
	}
}

export default CartItemComponent;

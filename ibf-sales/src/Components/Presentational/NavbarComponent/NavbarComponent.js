import React, { Component, Fragment } from 'react';
import {
	Collapse,
	DropdownMenu,
	DropdownToggle,
	Nav,
	Navbar,
	NavbarBrand,
	NavbarToggler,
	NavItem,
	NavLink,
	UncontrolledDropdown
} from 'reactstrap';

import {
	ACCOUNT_MANAGER_MODAL,
	DELIVERY_SCHEDULE_MODAL,
	GROWER_INFO_MODAL,
	SHOPPING_LIST_SUMMARY
} from '../../Shared/Modals/ModalTypes';

import Logo from '../../../Assets/Images/logo-main-color.png';
import { NavLink as RRNavLink } from 'react-router-dom';
import env from '../../../environment';
import environment from '../../../environment';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import * as ActionsCreators from '../../../Redux/Actions/ActionsCreators';
import { listShoppingCart } from '../../../Redux/Actions/ActionsCreators';
import CustomerService from '../../../Services/CustomerService';
import { toast } from '../../../Services/AlertService';
import jsPDF from 'jspdf';
import { openModal } from '../../../Redux/Actions/ModalActionsCreators';
import 'jspdf-autotable';
import { roundUp } from '../../../Utils/Utilities';
import AuthService from '../../../Services/AuthService';

class NavbarComponent extends Component {
	state = {
		downloadingTag: false
	};

	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false,
			shippingInformationOpen: false,
			filtersOpen: false,
			relevanceOpen: false,
			customer: this.props.customer.customer,
			links: {
				orderDetail: env.urlOrderPurchaseDetail
			},
			loadingSL: false
		};
	}

	downloadTag = () => {
		if (this.state.downloadingTag) {
			return toast('Currently downloading your holiday price list, please wait.');
		}
		this.setState(prev => ({ ...prev, downloadingTag: true }));
		CustomerService.getTagData(this.props.customer.customer).then(response => {
			if (response.success) {
				const columns = [
					{ title: 'Product', dataKey: 'name' },
					{ title: 'Stems per Bunch', dataKey: 'spb' },
					{ title: 'Starting/ bunch', dataKey: 'bprice' },
					{ title: 'Starting/ stem', dataKey: 'sprice' }
				];
				const rows = response.box.products.map(product => {
					// const factor = product.spb !== 'n/a' ? '1.3-3' : '1.2-2';
					product.bprice = roundUp(product.bprice) + '/bunch';
					product.sprice = product.spb !== 0 ? roundUp(product.sprice) + '/stem' : 'n/a';
					product.spb = product.spb !== 0 ? `${product.spb} stems/bunch` : 'n/a';
					return product;
				});
				const doc = new jsPDF('p', 'pt');
				const totalPagesExp = '{total_pages_count_string}';
				doc.autoTable(columns, rows, {
					theme: 'grid',
					headerStyles: {
						fillColor: [239, 246, 255],
						textColor: [22, 86, 158],
						lineWidth: 1,
						lineColor: 200
					},
					columnStyles: {
						sprice: { fontStyle: 'bold', halign: 'right', textColor: [22, 86, 158] },
						bprice: { fontStyle: 'bold', halign: 'right', textColor: [22, 86, 158] },
						spb: { halign: 'right', textColor: [22, 86, 158] },
						name: { textColor: [22, 86, 158], columnWidth: 220 }
					},
					styles: {
						overflow: 'linebreak'
					},
					startY: 110,
					createdHeaderCell: function(cell, data) {
						if (data.column.dataKey === 'sprice' || data.column.dataKey === 'bprice') {
							cell.styles.halign = 'right';
						}
					},
					addPageContent: function(data) {
						doc.setTextColor(22, 86, 158);
						if (data.pageCount === 1) {
							doc.addImage(response.box.img, 'PNG', 40, 10, 250, 57);
							const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
							const end = '(price including delivery to your door)';
							const text = doc.splitTextToSize(
								`iBuyFlowers holiday prices: ${response.box.tagName} ${end}`,
								pageWidth - 65,
								{}
							);
							doc.text(text, 40, 80);
						}
						let str = 'Page ' + data.pageCount;
						if (typeof doc.putTotalPages === 'function') {
							str = str + ' of ' + totalPagesExp;
						}
						const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
						doc.setFontSize(10);
						doc.text(str, data.settings.margin.left, pageHeight - 10);
					}
				});
				if (typeof doc.putTotalPages === 'function') {
					doc.putTotalPages(totalPagesExp);
				}
				doc.save('holiday prices.pdf');
			} else {
				toast(response.error, 'error');
			}
			this.setState(prev => ({ ...prev, downloadingTag: false }));
		});
	};

	componentDidMount() {
		this.props.getOrderToShip(this.props.customer.customer);
	}

	toggle(property) {
		this.setState({
			[property]: !this.state[property]
		});
	}

	slActive = () => {
		this.setState({ loadingSL: true });
		CustomerService.validateSLActive(this.props.customer.customer).then(res => {
			if (res) {
				this.props.listShoppingCart(this.props.customer.customer).then(() => {
					if (res.status === 'PROCESSED' && this.props.shoppingList) {
						this.setState({ loadingSL: false });
						this.props.openModal({ modal: SHOPPING_LIST_SUMMARY, data: { fromCheckout: false } });
					} else {
						// this.sharedService.confirmModal({
						// 	title: `We are processing your shopping list`,
						// 	msj: 'We are looking for the best product for you, in the next 10 to 20 ' +
						// 		'minutes you should receive an email to review and finalize your shopping list.',
						// 	saveText: 'OK',
						// 	hideCancel: true
						// }, callback);
						toast(
							'We are looking for the best product for you, in the next 10 to 20 minutes you should receive an email to review and finalize your shopping list.',
							'info'
						);
					}
				});
				this.setState({ loadingSL: false });
			} else {
				window.location.replace(env.appsUrls.shoppingList);
			}
		});
	};

	render() {
		const { config, customer } = this.props;
		let trackingUrl = this.props.trackPackageInfo.purchaseOrdersNumber
			? this.state.links.orderDetail + this.props.trackPackageInfo.firstBox.purchase
			: '#';

		return (
			<Fragment>
				<Navbar style={{ height: '46px' }} color='light' light expand='md'>
					<div className='container'>
						<NavbarBrand tag={RRNavLink} to='/'>
							<img height={45} src={Logo} alt='' />
						</NavbarBrand>
						<NavbarToggler onClick={() => this.toggle('isOpen')} />
						<Collapse isOpen={this.state.isOpen} navbar>
							<Nav className='ml-auto' navbar>
								<UncontrolledDropdown className='mr-3 text-color-grey' nav inNavbar>
									<DropdownToggle nav caret>
										Help Center
									</DropdownToggle>
									<DropdownMenu right className='py-0' style={{ minWidth: '200px' }}>
										<ul className='list-group list-group-flush custom__list'>
											<li
												className='list-group-item link-ibf-purply p-2'
												onClick={() => this.props.openModal({ modal: DELIVERY_SCHEDULE_MODAL })}
											>
												Delivery schedule
											</li>
											<li
												className='list-group-item link-ibf-purply p-2'
												onClick={() => this.props.openModal({ modal: GROWER_INFO_MODAL })}
											>
												Grower info - Arrival Dates
											</li>
											<li
												className='list-group-item link-ibf-purply p-2'
												onClick={() => this.props.openModal({ modal: ACCOUNT_MANAGER_MODAL })}
											>
												Personal Account Manager
											</li>
											<li className='list-group-item p-2'>
												<a href={environment.urlFAQ} target='_blank' rel='noopener noreferrer'>
													FAQ
												</a>
											</li>
										</ul>
									</DropdownMenu>
								</UncontrolledDropdown>
								<NavItem className='link-ibf-greyish-brown'>
									<NavLink onClick={() => AuthService.logout()}> Logout</NavLink>
								</NavItem>
								<NavItem>
									<NavLink
										tag={RRNavLink}
										to='/accounting'
										activeClassName='active'
										className='text-color-grey'
									>
										{' '}
										{customer.customer_name}
									</NavLink>
								</NavItem>
							</Nav>
						</Collapse>
					</div>
				</Navbar>
				<Navbar color='light' sticky={'top'} light expand='md'>
					<div className='container'>
						<Nav className='ml-auto'>
							<NavItem>
								<NavLink
									tag={RRNavLink}
									to='/accounting'
									activeClassName='active'
									className='text-color-grey'
								>
									<i className='fa fa-tachometer' /> Dashboard
								</NavLink>
							</NavItem>
							{this.props.trackPackageInfo.firstBox && (
								<NavItem>
									<a href={trackingUrl} className='text-color-grey nav-link'>
										<i className='fa fa-truck' /> Track Package
									</a>
								</NavItem>
							)}
							{/* <NavItem>
								<NavLink tag = {'span'} onClick = {this.downloadTag} className = "link-ibf-greyish-brown">
									<i className = {'fa ' + (this.state.downloadingTag ? 'fa-pulse fa-spinner' : 'fa-list-alt')}/> Holiday
									price list
								</NavLink>
							</NavItem> */}
							{config &&
								(config.sl_users === null ||
									config.sl_users.some(i => customer.customer === i)) && (
									<NavItem>
										<NavLink
											onClick={this.slActive}
											disabled={this.state.loadingSL}
											className='link-ibf-greyish-brown'
										>
											<i
												className={
													'fa ' + (this.state.loadingSL ? 'fa-pulse fa-spinner' : 'fa fa-list-ul')
												}
											/>{' '}
											Shopping List
										</NavLink>
									</NavItem>
								)}
							<NavItem>
								<NavLink
									tag={'span'}
									onClick={this.props.showShoppingCart}
									className='link-ibf-greyish-brown'
								>
									<div className='cart-dropdown'>
										<div className='d-flex align-items-center'>
											<i className='fa fa-shopping-cart' />
											<span className='badge badge-danger mx-1'>
												{this.props.shoppingCartTotalItems}
											</span>
											<span>Cart</span>
										</div>
									</div>
								</NavLink>
							</NavItem>
						</Nav>
					</div>
				</Navbar>
			</Fragment>
		);
	}
}

function mapStateToProps(state) {
	const { customer, config } = state.AuthReducer;
	const { trackPackageInfo } = state.DashboardReducer;
	const { shoppingList } = state.ShoppingCartReducer;
	return {
		customer,
		trackPackageInfo,
		config,
		shoppingList
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			openModal,
			listShoppingCart,
			getOrderToShip: ActionsCreators.getOrderToShip
		},
		dispatch
	);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NavbarComponent);

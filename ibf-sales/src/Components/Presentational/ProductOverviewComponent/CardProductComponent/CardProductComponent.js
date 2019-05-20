import React, {Component, Fragment} from 'react';
import {UncontrolledTooltip} from 'reactstrap';
import Lightbox from 'react-image-lightbox';
import './CardProductComponent.scss';
import environment from '../../../../environment';
import {getAvailableBoxes, getBunchesAvailable, roundUp} from '../../../../Utils/Utilities';
import StemsIcon from '../../../../Assets/Images/stems_icon.png';
import BunchesIcon from '../../../../Assets/Images/bunches_icon.png';
import placeholder from '../../../../Assets/Images/image-placeholder.png';
import {toast} from "../../../../Services/AlertService";

class CardProductComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			photoIndex: 0,
			selectFavorite: false,
			isOpen: false,
			numberBoxes: 1,
			numberBunch: 1
		};
	}

	addToBox = () => {
		this.props.addToBox(parseInt(this.state.numberBunch, 10));
		this.setState(prev => ({...prev, numberBunch: 1}));
	};

	addToCart = () => {
		this.props.addToCart(parseInt(this.state.numberBoxes, 10));
		this.setState(prev => ({...prev, numberBoxes: 1}));
	};

	setFavorite = (e) => {
		e.cancelBubble = true;
		e.stopPropagation();
		this.setState(prev => ({...prev, selectFavorite: !prev.selectFavorite}));
		this.props.setFavorite();
	};

	componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
		if (prevProps.product.favorite !== this.props.product.favorite) {
			this.setState(prev => ({...prev, selectFavorite: !prev.selectFavorite}));
		}
	}

	handleChange = event => {
		const {value, name} = event.target;
		this.setState({[name]: value});
	};

	render() {
		const {isOpen, photoIndex} = this.state;
		const {isCurrentBox, product, bulk, index, promoCodeOff, conditions, promoCodeStillAvailable, cartbox} = this.props;
		const {
			name, available, grower_name,
			country_iso, favorite,
			custom_percentage, total_box, price_own_box, stems_per_bunch,
			special, loadingFavorite, inventory, customizable, length
		} = product;
		const bunchesAvailable = getBunchesAvailable(available, custom_percentage, isCurrentBox, cartbox.current_percentage);
		const boxesAvailable = getAvailableBoxes(available, total_box);
		const images = product.images ? product.images.map(i => environment.publicPath + i) : [];
		let off = 0;
		if (conditions.promoCodeState && promoCodeStillAvailable) {
			off = promoCodeOff;
		}

		const flag = require(`../../../../Assets/Images/${country_iso}_flag.svg`);
		const price = product.price * (1 - off);
		return (
			<div className="card border-0">
				<div className={`${special ? 'bg-pale-mauve' : 'bg-light-pink'} mb-2 p-3`} style={{height: '276px'}}>
					{special &&
					<div className="ribbon d-flex align-items-center justify-content-center"><i
						className="fa fa-dollar-sign font-size-md"
						aria-hidden="true"/>
					</div>}
					<div className="mb-2 d-flex flex-column clickable justify-content-between" style={{
						backgroundImage: `url(${images[0]}), url(${placeholder})`,
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
						height: '200px'
					}}
							 onClick={() => this.setState({isOpen: true})}>
						<div className="d-flex justify-content-end">
							<div onClick={this.setFavorite}
									 className={`text-center p-1 ${favorite ? 'bg-strong-pink' : ''}`}>
								<i className={`fa  ${!loadingFavorite ? 'fa-heart favorite-icon' : 'fa-spin fa-spinner'}`}/>
							</div>
						</div>
						<div className="d-flex justify-content-between">
							<div className="bg-white p-2 d-flex align-item-center justify-content-center">
								<div>
									<i id={'tooltip_' + index}
										 className="fa fa-info-square"/>
								</div>
								<UncontrolledTooltip className="tooltip-ibf" placement="top" autohide={false}
																		 target={'tooltip_' + index}>
									<div className="d-flex flex-column align-items-start justify-content-end">
										<div className="d-flex align-items-end mb-2">
											<img src={StemsIcon} height="20" alt=""/><span>  {stems_per_bunch} Stems per bunch</span>
										</div>
										<div className="d-flex align-items-end">
											<img src={BunchesIcon} height="20" alt=""/><span>  {total_box} Bunches per box</span>
										</div>
									</div>
								</UncontrolledTooltip>
								{!!bulk.length &&
								<Fragment>
									<span id={'bulk' + inventory} className="ml-2">Bulk discount</span>
									<UncontrolledTooltip className="bulk-tooltip" placement="top" autohide={false}
																			 target={'bulk' + inventory}>
										<div className="d-flex flex-column align-items-start justify-content-around">
											<div className="d-flex align-items-end mb-2">
												<img src={BunchesIcon} height="20" alt=""/><span>  {total_box} Bunches per box</span>
											</div>
											<span className="text-left">{bulk[0].message}</span>
										</div>
									</UncontrolledTooltip>
								</Fragment>
								}
							</div>
							<div className="grower-tag bg-white font-size-sm px-2 py-1">

								{grower_name} <img src={flag} alt=""/> {country_iso}
							</div>
						</div>

					</div>
					<div className="product-name__line-height">
						{`${name} ${length || 0} cm`}
					</div>
				</div>
				<div className="d-flex justify-content-between">

					<div className="d-flex flex-column mr-1"
							 style={{color: !customizable ? 'grey' : 'black'}}>
						<span className="font-size-sm"><b>Bunch (fills {custom_percentage + '%'} of box)</b></span>
						{stems_per_bunch > 0 && <span
							className="font-size-sm d-inline-block ">${roundUp(price_own_box / stems_per_bunch)} / stem</span>}
						<span
							className="font-size-sm d-inline-block ">${roundUp(price_own_box)} / bunch {customizable && stems_per_bunch > 0 && `(${stems_per_bunch} st)`}</span>
						<span
							className={`font-size-sm d-inline-block ${available < 10 ? 'text-danger' : 'text-success'}`}>Available: {available} bunches</span>
						<div className="">
							{
								customizable && <Fragment>
									<select name="numberBunch" disabled={!customizable}
													className="form-control form-control-sm w-auto d-inline mr-2"
													value={this.state.numberBunch}
													onChange={this.handleChange}>
										{Array(bunchesAvailable).fill(1).map((i, index) => (
											<option key={index + 1} value={index + 1}>{index + 1}</option>))}
									</select>
									<button disabled={!customizable}
													onClick={() => this.addToBox(parseInt(this.state.numberBunch, 10))}
													className="btn btn-sm btn-outline-primary">Add <i
										className="fa fa-box-open"/></button>
								</Fragment>
							}
						</div>
					</div>
					<div className="text-center mr-1">
						<div className="divider"/>
					</div>

					<div className="p-0 d-flex flex-column"
							 style={{color: (isCurrentBox || boxesAvailable <= 0) ? '#D3D3D3' : 'black'}}>
						<span className="font-size-sm d-inline-block "><b>Box ({total_box} bunches)</b></span>
						{stems_per_bunch > 0 && <span className={'font-size-sm d-inline-block ' + (off > 0 ? 'text-danger' : '')}>
							${roundUp(price / stems_per_bunch)} / stem
						</span>}
						<span className={'font-size-sm d-inline-block ' + (off > 0 ? 'text-danger' : '')}>
							${roundUp(price)} / bunch{stems_per_bunch > 0 && `(${stems_per_bunch} st)`}
						</span>
						<span className={'font-size-sm d-inline-block ' + (off > 0 ? 'text-danger' : '')}>
							${roundUp(price * total_box)} / box
						</span>
						{!(isCurrentBox || boxesAvailable <= 0) && <div className="">
							<select disabled={isCurrentBox || boxesAvailable <= 0} name="numberBoxes"
											className="form-control form-control-sm w-auto d-inline mr-2"
											value={this.state.numberBoxes}
											onChange={this.handleChange}>
								{boxesAvailable.map((i, index) => (
									<option key={index + 1} value={index + 1}>{index + 1}</option>))}
							</select>

							<button disabled={isCurrentBox || boxesAvailable <= 0}
											onClick={() => this.addToCart(parseInt(this.state.numberBoxes, 10))}
											className="btn btn-sm btn-outline-primary">Add <i
								className="fa fa-shopping-cart"/>
							</button>
						</div>}

					</div>
				</div>
				{isOpen && (
					<Lightbox reactModalStyle={{overlay: {'zIndex': 2000}}}
										mainSrc={images[photoIndex]}
										nextSrc={images.length > 1 ? images[(photoIndex + 1) % images.length] : null}
										prevSrc={images.length > 1 ? images[(photoIndex + images.length - 1) % images.length] : null}
										onCloseRequest={() => this.setState({isOpen: false})}

										onMovePrevRequest={() =>
											this.setState({
												photoIndex: (photoIndex + images.length - 1) % images.length
											})
										}
										onMoveNextRequest={() =>
											this.setState({
												photoIndex: (photoIndex + 1) % images.length
											})
										}
										onImageLoadError ={()=> {
											this.setState({isOpen: false});
											toast('Couldn\'t retrieve image', 'error');
										}}
					/>
				)}
			</div>
		);
	}
}

export default CardProductComponent;

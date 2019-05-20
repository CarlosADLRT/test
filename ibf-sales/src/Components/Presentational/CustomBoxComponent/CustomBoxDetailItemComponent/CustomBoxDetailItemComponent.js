import React from 'react';
import './CustomBoxDetailItemComponent.scss';
import {roundUp} from '../../../../Utils/Utilities';
import env from '../../../../environment';
import {UncontrolledTooltip} from "reactstrap";

class CustomBoxDetailItemComponent extends React.Component{

	render(){

		const {
			product_group, price, variety, percentage, stems_per_bunch, quantity, images, masterlist, shopping_list_item,
			_KEY
		} = this.props.data;

		const image_url = env.publicPath + images[0];

		return (
			<li className = "custom-box-detail-list-item">
				<div className = "custom-box-detail-media">
					<div className = "image-wrapper mr-3">

						<div className = "product-image-wrapper">
							<img className = "product-image hover cursor-pointer"
									 src = {image_url} alt = ""/>
						</div>
					</div>
					<div className = "media-body text-truncate">
						<div className = "d-flex justify-content-between"><b
							className = "text-truncate"
							title = "undefined"> {product_group.common_name} {variety.variety_name} ({variety.color.color_name}) </b>
						</div>
						<div className = "media">
							<div className = "media-body">
								<ul className = "list-unstyled">
									<li><b>${roundUp(price)}/bunch</b></li>
									<li> {stems_per_bunch.stems_per_bunch} stem - {masterlist.length}
										<span> cm</span>
									</li>
									<li> {percentage}% of box volume</li>
								</ul>
							</div>
						</div>
						{shopping_list_item && (
							<div className = "mb-1">
									<span className = "info-yellow-span " id = {'SL' + shopping_list_item._KEY + _KEY}>
										Shopping List product
										<UncontrolledTooltip placement = "top" autohide = {false}
																				 target = {'SL' + shopping_list_item._KEY + _KEY}>
											<span>{shopping_list_item.product_group.common_name + ' ' + shopping_list_item.variety.variety_name}</span>
										</UncontrolledTooltip>
									</span>
							</div>
						)}
					</div>
					<div className = "d-flex ibf-button-action align-items-center mb-1">
						<span className = "sm">x{quantity}</span></div>
				</div>
			</li>
		);
	}
}

export default CustomBoxDetailItemComponent;

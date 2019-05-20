import React, {Component} from 'react';
import Emma from '../../../../Assets/Images/emma.jpg';
import {Modal, ModalBody} from "reactstrap";
import {SHIPPING_DETAILS} from "../ModalTypes";
import {closeModal} from "../../../../Redux/Actions/ModalActionsCreators";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

class ShippingDetails extends Component{
  componentDidMount(){
  }

  render(){
		return (
			<Modal size={'lg'} style={{width: '600px'}} centered isOpen={true}>
				<ModalBody>
					<div className="media">
						<img src={Emma} className="mr-3" alt=""/>
						<div className="media-body">
							<div className="d-flex mt-4">
								<i className = "fas fa-2x fa-dolly"/>
								<h5 className="mt-1 ml-2">Shipping Details</h5>
							</div>
							<p className="mt-3">
								iBuyFlowers ships all their flowers directly from the farm to the customer with FedEx.
								Each purchase order confirmation is providing with a FedEx tracking link. iBuyFlowers is not responsible
								for FedEx shipping delays of 1 day or less or other shipping delivery problems including the customer
								not being on site to accept the delivery. iBuyFlowers can’t credit if a package has been delayed beyond
								our control. iBuyFlowers stands behind the quality of the flowers. Should something not be according to
								standard. Please file a claim following our claim policy.
							</p>

							<div className="mt-5 d-flex justify-content-end">
								<button className="btn btn-primary mt-3"
												onClick={() => {
													this.props.closeModal({modal: SHIPPING_DETAILS});
												}}>
									Ok
								</button>
							</div>
						</div>
					</div>

				</ModalBody>
			</Modal>
		);
  }
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({closeModal}, dispatch);
}

export default connect(null, mapDispatchToProps)(ShippingDetails);

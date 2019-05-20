import React, {Component} from 'react';
import SpinnerComponent from '../../SpinnerComponent/SpinnerComponent';
import {CLOSE_CUSTOM_BOX_MODAL} from '../ModalTypes';

class CloseCustomBoxComponent extends Component {

	constructor(props) {
		super(props);
		this.closeYourBox = this.closeYourBox.bind(this);
	}


	closeYourBox() {
		const {closeModal, customer, closeCustomBox} = this.props;
		closeCustomBox(customer.customer);
		closeModal({modal: CLOSE_CUSTOM_BOX_MODAL});
	}

	keepBoxOpen() {
		const {closeModal, showCustomBox, keepEditing} = this.props;
		closeModal({modal: CLOSE_CUSTOM_BOX_MODAL});
		keepEditing();
		showCustomBox();
	}

	render() {
		const {closeModal} = this.props;
		return (
			<SpinnerComponent
				size="lg"
				title={
					<div className="d-flex align-items-center">
						<i className="fas fa-box-open fa-3x mr-4 d-inline-block"/>
						<h4>Information</h4>
					</div>
				}
				hideCheckbox={true}
				body={
					<p className="font-size-md">
						There is no more space available to fill up the last % of your box.
						Please press 'close your box' button to send it to your shopping cart,
						or remove one or more items to change your current composition if you would like to
						fill up the box more efficient. The box filled up to 100% has FREE shipping, if closed at an
						earlier stage, the additional freight cost will be added. After the calculation, you are still able to
						cancel the box in your shopping cart before you checkout.
					</p>
				}
				footer={
					<div className="d-flex pt-4 align-items-center">
						<button onClick={this.closeYourBox} className="btn btn-primary ml-4">Close Your Box</button>
						<button onClick={() => this.keepBoxOpen()}
										className="btn btn-primary ml-4">Not yet
						</button>
					</div>
				}
				close={() => closeModal({modal: CLOSE_CUSTOM_BOX_MODAL})}/>
		);
	}
}

export default CloseCustomBoxComponent;

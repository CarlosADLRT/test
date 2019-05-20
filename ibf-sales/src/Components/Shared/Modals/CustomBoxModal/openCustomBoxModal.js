import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {closeModal} from '../../../../Redux/Actions/ModalActionsCreators';
import {connect} from 'react-redux';
import SpinnerComponent from '../../SpinnerComponent/SpinnerComponent';
import {OPEN_CUSTOM_BOX} from '../ModalTypes';
import {showCustomBox} from '../../../../Redux/Actions/ActionsCreators';

class OpenCustomBoxModal extends Component {
	backToOverview = () => {
		this.props.showCustomBox();
		this.props.closeModal({modal: OPEN_CUSTOM_BOX});
	};

	render() {
		const {closeModal, showCustomBox} = this.props;
		return (
			<SpinnerComponent
				size="lg"
				title={
					<div className="d-flex align-items-center">
						<i className="fas fa-box-open fa-3x mr-4 d-inline-block"/>
						<h4>Creating personalized box</h4>
					</div>
				}
				body={
					<p className="font-size-md">
						You are now creating a personalized box with products from this
						grower. Once the box is full you can add it to your cart and
						continue shopping at other growers.
					</p>
				}
				footer={
					<div className="d-flex pt-4 align-items-center">
						<span
							onClick={this.backToOverview}
							className="link-ibf-purply mr-4"
						>
							Back to overview
						</span>
						<button
							onClick={() => {
								closeModal({modal: OPEN_CUSTOM_BOX});
								showCustomBox(false);
							}}
							className="btn btn-primary ml-4"
						>
							START FILLING PERSONALIZED BOX
						</button>
					</div>
				}
				close={() => closeModal({modal: OPEN_CUSTOM_BOX})}
			/>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			closeModal,
			showCustomBox
		},
		dispatch
	);
}

export default connect(
	null,
	mapDispatchToProps
)(OpenCustomBoxModal);

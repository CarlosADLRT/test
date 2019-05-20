import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { closeModal } from '../../../../Redux/Actions/ModalActionsCreators';
import { connect } from 'react-redux';
import { CUSTOM_BOX_OPEN } from '../ModalTypes';
import ModalComponent from '../ModalComponent';
import EmmaLogo from '../../../../Assets/Images/emma.jpg';

class CustomBoxOpenModal extends Component {
	closeYourBox = () => {
		const { closeModal } = this.props;
		console.log('aqii');
		closeModal({ modal: CUSTOM_BOX_OPEN });
	};

	render() {
		const { closeModal } = this.props;
		return (
			<ModalComponent
				onClose={this.props.onClose}
				title={
					<div className='d-flex align-items-center'>
						<i className='fas fa-box-open fa-3x mr-4 d-inline-block' />
						<h3>Information</h3>
					</div>
				}
				hideCheckbox={true}
				body={
					<div className='media'>
						<img src={EmmaLogo} alt='' className='mr-4' />
						<p style={{ fontSize: '20px' }}>
							We have notice that you have a custom box open. Please finish or cancel this box first
							before you can continue
						</p>
					</div>
				}
				customFooter={
					<div className='d-flex pt-4 align-items-center'>
						<button onClick={this.closeYourBox} className='btn btn-primary ml-4'>
							Ok
						</button>
					</div>
				}
				close={() => closeModal({ modal: CUSTOM_BOX_OPEN })}
			/>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			closeModal
		},
		dispatch
	);
}

export default connect(
	null,
	mapDispatchToProps
)(CustomBoxOpenModal);

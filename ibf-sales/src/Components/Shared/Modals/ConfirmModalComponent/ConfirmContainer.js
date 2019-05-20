import React, { Component } from 'react';
import ConfirmComponent from './ConfirmComponent';
import { closeModal } from '../../../../Redux/Actions/ModalActionsCreators';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CONFIRM_MODAL } from '../../../Shared/Modals/ModalTypes';

class ConfirmContainer extends Component {
	render() {
		const { data, closeModal } = this.props;
		return (
			<ConfirmComponent
				onClose={result => closeModal({ modal: CONFIRM_MODAL, data: result })}
				{...data}
			/>
		);
	}
}

function mapStateToProps(state) {
	const { data } = state.ModalReducer.confirmModal;
	return { data };
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({ closeModal }, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ConfirmContainer);

import React, {Component} from 'react';
import {closeModal} from '../../../../Redux/Actions/ModalActionsCreators';
import {closeCustomBox, keepEditing, showCustomBox} from '../../../../Redux/Actions/ActionsCreators';
import {connect} from 'react-redux';
import CloseCustomBoxComponent from './CloseCustomBoxComponent';
import {bindActionCreators} from 'redux';

class CloseCustomBoxContainer extends Component {
	render() {
		return (
			<CloseCustomBoxComponent {...this.props}/>
		);
	}
}

function mapStateToProps(state) {
	const {customer} = state.AuthReducer;
	const showToggle = state.CustomBoxReducer.showToggle;
	return {customer, showToggle};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		closeModal,
		closeCustomBox,
		showCustomBox,
		keepEditing
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CloseCustomBoxContainer);

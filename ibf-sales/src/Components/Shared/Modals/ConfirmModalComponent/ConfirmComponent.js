import React, { Component } from 'react';
import ModalComponent from '../ModalComponent';

class ConfirmComponent extends Component {
	render() {
		return (
			<ModalComponent
				size='md'
				title={'Dear Customer'}
				okText={this.props.okText || 'Yes'}
				cancelText={this.props.cancelText || 'No'}
				onClose={() => this.props.onClose(false)}
				okClick={() => this.props.onClose(true)}
				body={<p>{this.props.text}</p>}
			/>
		);
	}
}

export default ConfirmComponent;

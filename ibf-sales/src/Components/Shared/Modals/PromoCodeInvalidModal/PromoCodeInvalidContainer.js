import React, {Component} from 'react';
import invalidCode from '../../../../Assets/Images/festive-invitation.jpg';
import ModalComponent from '../ModalComponent';
import {closeModal} from '../../../../Redux/Actions/ModalActionsCreators';
import {connect} from 'react-redux';
import {PROMO_CODE_INVALID} from '../ModalTypes';
import {bindActionCreators} from 'redux';

class PromoCodeInvalidContainer extends Component {

	close = () => {
		this.props.closeModal({modal: PROMO_CODE_INVALID});

	};

	render() {
		return (
			<ModalComponent size="md" footerEnabled={false} headerEnabled={false}
											onClose={this.close}
											body={
												<img src={invalidCode} alt="" className="w-100"/>
											}
			>
			</ModalComponent>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({closeModal}, dispatch);
}

export default connect(null, mapDispatchToProps)(PromoCodeInvalidContainer);

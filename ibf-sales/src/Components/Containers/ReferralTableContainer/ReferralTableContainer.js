import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initLoadReferral } from '../../../Redux/Actions/ActionsCreators';
import ModalComponent from '../../Shared/Modals/ModalComponent';
import { closeModal } from '../../../Redux/Actions/ModalActionsCreators';
import { REFERRAL_MODAL } from '../../Shared/Modals/ModalTypes';
import { format } from 'date-fns';

class ReferralTableContainer extends Component {
	componentDidMount() {}
	componentDidUpdate(prevProps, prevState) {}
	getRewardText = item => {
		switch (item.status) {
			case 'COMPLETED':
				return '$15';
			case 'INVALID':
				return '$0';
			default:
				return '';
		}
	};

	getActionText = item => {
		switch (item.status) {
			case 'COMPLETED':
				return 'Ordered';
			case 'SIGNED':
				return 'Signed Up';
			case 'ACTIVE':
				return 'Emailed';
			case 'INVALID':
				return 'Sorry, already a customer';
			default:
				return '';
		}
	};

	render() {
		let table = (
			<table className='table table-bordered table-striped'>
				<thead>
					<tr>
						<th>Date</th>
						<th>Company name</th>
						<th>Action</th>
						<th>Reward</th>
					</tr>
				</thead>
				<tbody>
					{this.props.referrals.map(i => (
						<tr key={i._KEY}>
							<td>{format(i.date || new Date(), 'MMM DD, YYYY')}</td>
							<td>{i.company_name}</td>
							<td>{this.getActionText(i)}</td>
							<td>{this.getRewardText(i)}</td>
						</tr>
					))}
				</tbody>
			</table>
		);
		if (!this.props.referrals.length) {
			table = <h3>You don't have referrals</h3>;
		}
		return (
			<ModalComponent
				title={'Referrals'}
				body={table}
				footerEnabled={false}
				onClose={() => this.props.onClose({ modal: REFERRAL_MODAL })}
			/>
		);
	}
}

const mapStateToProps = ({ ReferralReducer, AuthReducer }) => {
	return {
		...ReferralReducer,
		customer: AuthReducer.customer.customer
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators({ onLoadReferral: initLoadReferral, onClose: closeModal }, dispatch);
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ReferralTableContainer);

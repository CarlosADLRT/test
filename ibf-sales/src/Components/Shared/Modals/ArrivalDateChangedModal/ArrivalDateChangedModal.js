import React, {Component} from 'react';
import {Modal, ModalBody} from 'reactstrap';
import Emma from '../../../../Assets/Images/emma.jpg';
import {ARRIVAL_DATE_CHANGED_MODAL} from '../ModalTypes';
import {bindActionCreators} from 'redux';
import {closeModal} from '../../../../Redux/Actions/ModalActionsCreators';
import {connect} from 'react-redux';
import {convertNumberDateMMMDDYYYY} from '../../../../Utils/Utilities';

class ArrivalDateChangedModal extends Component {
	state = {msg: ''};

	componentDidMount(): void {
		const {favorite, special, filters} = this.props.conditions;
		let msg;
		if (favorite) {
			msg = 'for your favorite flowers.';
		} else if (special) {
			msg = 'for the promo offer';
		} else if (filters.grower.length) {
			msg = 'for the grower of the month flowers.';
		}
		this.setState(prev => ({...prev, msg}));
	}

	render() {
		const {closeModal} = this.props;
		return (
			<Modal size={'lg'} style={{width: '600px'}} centered isOpen={true}>
				<ModalBody>
					<div className="media">
						<img src={Emma} className="mr-3" alt=""/>
						<div className="media-body">
							<div className="d-flex mt-4">
								<i className="fas fa-2x fa-calendar-alt"/>
								<h5 className="mt-1 ml-2">Arrival date changed</h5>
							</div>
							<p className="mt-3">
								The arrival date for the selected products
								is <b>{convertNumberDateMMMDDYYYY(this.props.data)}</b>.
								<br/>
								You can change the date in the Arrival Date dropdown menu at the top left of the screen.
							</p>

							<div className="mt-5 d-flex justify-content-end">
								<button className="btn btn-primary mt-3"
												onClick={() => {
													closeModal({modal: ARRIVAL_DATE_CHANGED_MODAL});
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

function mapStateToProps({ModalReducer, FilterReducer}) {
	const {
		data
	} = ModalReducer.arrivalDateChangedModal;
	const {conditions} = FilterReducer;
	return {
		data,
		conditions
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({closeModal}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ArrivalDateChangedModal);

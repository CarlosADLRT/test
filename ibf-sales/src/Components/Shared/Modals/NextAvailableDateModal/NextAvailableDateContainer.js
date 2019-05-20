import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {closeModal} from "../../../../Redux/Actions/ModalActionsCreators";
import {NEXT_AVAILABLE_DATE_MODAL} from "../ModalTypes";
import NextAvailableDateComponent from "./NextAvailableDateComponent";
import ProductService from "../../../../Services/ProductService";

class NextAvailableDateContainer extends Component {

	state = {
		dates: null
	};

	constructor(props) {
		super(props);
		this.handleDayClick = this.handleDayClick.bind(this);
	}

	componentWillMount(): void {

		const {customer, data} = this.props;

		ProductService.getNextDateAvailable(customer.customer, data.eta, data.conditions).then(res => {
			this.setState({dates: res});
		});
	}

	render() {
		return (
			<NextAvailableDateComponent
				onClose={() => this.props.closeModal({modal: NEXT_AVAILABLE_DATE_MODAL})}
				dates={this.state.dates}
				handleDayClick={this.handleDayClick}/>
		);
	}

	handleDayClick = (date) => {
		// generate search
		this.props.data.generateParams(date);
		// close current modal
		this.props.closeModal({modal: NEXT_AVAILABLE_DATE_MODAL})
	}
}

function mapStateToProps(state) {
	const {customer} = state.AuthReducer;
	const {data} = state.ModalReducer.nextAvailableDateModal;
	return {customer, data};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		closeModal: closeModal
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NextAvailableDateContainer);

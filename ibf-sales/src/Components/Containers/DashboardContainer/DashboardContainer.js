import React, {Component} from 'react';
import DashboardComponent from '../../Presentational/DashboardComponent/DashboardComponent';
import {bindActionCreators} from 'redux';
import {checkOpenBox, homeLoading, requestCheckOpenBox, restartInventory} from '../../../Redux/Actions/ActionsCreators';
import {addFilter} from '../../../Redux/Actions/FilterActionsCreators';
import {connect} from 'react-redux';


class DashboardContainer extends Component {
	_isMounted = false;


	componentDidMount(): void {
		this._isMounted = true;
		const {requestCheckOpenBox, checkOpenBox, isCurrentBox} = this.props;
		if (!isCurrentBox) {

			requestCheckOpenBox();
			checkOpenBox(this.props.customer.customer);
		}
		if (!this.props.finished) {
			this.props.homeLoading(this.props.customer.customer);
		}
		if (this.props.isCurrentBox) {
			this.props.history.push({
				pathname: '/search',
				search: '?date=' + this.props.eta
			});
		}
	}

	componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
		if (!prevProps.isCurrentBox && this.props.isCurrentBox) {
			this.props.history.push({
				pathname: '/search',
				search: '?date=' + this.props.eta
			});
		}
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		const {config, holidays, disabledDaysOfWeek, addFilter, finished, home} = this.props;

		return (
			<DashboardComponent home={home} config={config} holidays={holidays} finished={finished}
													disabledDaysOfWeek={disabledDaysOfWeek} addFilter={addFilter}/>
		);
	}
}


function mapStateToProps(state) {
	const {isCurrentBox, eta} = state.CustomBoxReducer;
	const {customer, logged, config, holidays, disabledDaysOfWeek} = state.AuthReducer;
	const {conditions} = state.FilterReducer;
	const {finished, home} = state.DashboardReducer;
	const {isCheckingBox} = state.LoadingReducer;
	return {
		customer, logged, isCurrentBox, eta, isCheckingBox, conditions, config, holidays, disabledDaysOfWeek,
		finished, home
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		homeLoading,
		checkOpenBox, requestCheckOpenBox,
		restartInventory,
		addFilter
	}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(DashboardContainer);

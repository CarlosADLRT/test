import React, {Component, Fragment} from 'react';
import FilterBarComponent from '../../Presentational/FilterBarComponent/FilterBarComponent';
import {bindActionCreators} from 'redux';
import {openModal} from '../../../Redux/Actions/ModalActionsCreators';
import {
	addFilter,
	clearConditions,
	removeFilter,
	toggleSingleFilter,
	toggleSortFilter
} from '../../../Redux/Actions/FilterActionsCreators';
import {connect} from 'react-redux';
import FilterSelectedOptionBarComponent
	from '../../Presentational/FilterSelectedOptionBarComponent/FilterSelectedOptionBarComponent';
import queryString from 'query-string';
import {withRouter} from 'react-router-dom';

class FilterBarContainer extends Component {
	componentDidMount(): void {
		const {filter} = queryString.parse(this.props.location.search);
		if (filter) {
			if ((filter === 'favorite' || filter === 'special' || filter === 'link') && (!this.props.conditions[filter])) {
				this.props.toggleSingleFilter({type: filter});
				this.props.clearConditions({type: filter});
			} else {
			}
		}
	}

	render() {
		const {totalItems, customer, openModal, toggleSingleFilter, toggleSortFilter, conditions, filters, removeFilter, singleFilters, holidays, disabledDaysOfWeek, shoppingCartTotalItems, isCurrentBox} = this.props;
		return (
			<Fragment>
				<FilterBarComponent quantity={totalItems} customer={customer} openModal={openModal} conditions={conditions}
														singleFilters={singleFilters} toggleSingleFilter={toggleSingleFilter}
														toggleSortFilter={toggleSortFilter} holidays={holidays} isCurrentBox={isCurrentBox}
														disabledDaysOfWeek={disabledDaysOfWeek} shoppingCartTotalItems={shoppingCartTotalItems}/>
				<FilterSelectedOptionBarComponent filters={filters} removeFilter={removeFilter}/>
			</Fragment>
		);
	}
}

function mapStateToProps(state) {
	const {totalItems} = state.ProductReducer;
	const {conditions, filters, singleFilters} = state.FilterReducer;
	const {customer, holidays, disabledDaysOfWeek} = state.AuthReducer;
	const {shoppingCartTotalItems} = state.ShoppingCartReducer;
	const {isCurrentBox} = state.CustomBoxReducer;
	return {
		totalItems,
		conditions,
		filters,
		singleFilters,
		customer,
		holidays,
		disabledDaysOfWeek,
		shoppingCartTotalItems,
		isCurrentBox
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		openModal,
		addFilter,
		toggleSingleFilter,
		toggleSortFilter,
		removeFilter,
		clearConditions
	}, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(FilterBarContainer));

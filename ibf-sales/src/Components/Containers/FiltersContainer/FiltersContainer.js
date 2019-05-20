import React, {Component} from 'react';
import CollapseComponent from '../../Presentational/Shared/CollapseComponent';
import FilterOptionListComponent
	from '../../Presentational/FilterBarComponent/FilterOptionListComponent/FilterOptionListComponent';
import FilterSelectedOptionListComponent
	from '../../Presentational/FilterBarComponent/FilterSelectedOptionListComponent/FilterSelectedOptionListComponent';
import {bindActionCreators} from 'redux';
import {
	addFilter,
	removeAllFilters,
	removeFilter,
	toggleSingleFilter,
	toggleSortFilter
} from '../../../Redux/Actions/FilterActionsCreators';
import {connect} from 'react-redux';

class FiltersContainer extends Component {
	constructor(props) {
		super(props);
		this.handleCollapse = this.handleCollapse.bind(this);
		this.state = {
			collapse: {
				special: true,
				product_group: true,
				color: true,
				variety: true,
				country: true,
				grower: true,
				category: true
			}
		};
	}

	static closeFilterBar() {
		document.getElementsByClassName('filter-bar-item')[1].click();
	}

	handleCollapse(key, value) {
		this.setState(state => ({
			...state,
			collapse: {
				...state.collapse,
				[key]: value
			}
		}));
	}

	render() {
		const {filters, addFilter, removeFilter, removeAllFilters, singleFilters, toggleSingleFilter, conditions} = this.props;
		return (
			<div className="container">
				<div className="row">
					<div className="col-12">
            <span className="text-color-grey ml-2">
              <b>Reset all</b>
              <i className="ml-2 fa fa-times clickable" onClick={removeAllFilters}/>
            </span>
					</div>
				</div>
				<div className="row">
					<div className="col">
						{
							filters.special && <div className="row mb-4">
								<div className="col">
									<CollapseComponent label={filters.special.label} btnOpen={'btn-white'}
																		 onCollapse={(value) => this.handleCollapse('special', value)}>
										<FilterOptionListComponent type={'special'} list={filters.special.values} add={addFilter}
																							 remove={removeFilter}/>
									</CollapseComponent>
									{
										this.state.collapse.special &&
										<FilterSelectedOptionListComponent list={filters.special.values} onRemoveFilter={removeFilter}
																											 type={'special'}/>
									}
								</div>
							</div>
						}
						{
							filters.product_group && <div className="row">
								<div className="col">
									<CollapseComponent label={filters.product_group.label} btnOpen={'btn-white'}
																		 onCollapse={(value) => this.handleCollapse('product_group', value)}>
										<FilterOptionListComponent type={'product_group'} list={filters.product_group.values}
																							 add={addFilter} remove={removeFilter}/>
									</CollapseComponent>
									{
										this.state.collapse.product_group &&
										<FilterSelectedOptionListComponent list={filters.product_group.values} onRemoveFilter={removeFilter}
																											 type={'product_group'}/>
									}
								</div>
							</div>
						}
					</div>
					<div className="col">
						{
							filters.color && <div className="row mb-4">
								<div className="col">
									<CollapseComponent label={filters.color.label} btnOpen={'btn-white'}
																		 onCollapse={(value) => this.handleCollapse('color', value)}>
										<FilterOptionListComponent type={'color'} list={filters.color.values} add={addFilter}
																							 remove={removeFilter}/>
									</CollapseComponent>
									{
										this.state.collapse.color &&
										<FilterSelectedOptionListComponent list={filters.color.values} onRemoveFilter={removeFilter}
																											 type={'color'}/>
									}
								</div>
							</div>
						}
						{
							filters.variety && <div className="row">
								<div className="col">
									<CollapseComponent label={filters.variety.label} btnOpen={'btn-white'}
																		 onCollapse={(value) => this.handleCollapse('variety', value)}>
										<FilterOptionListComponent type={'variety'} list={filters.variety.values} add={addFilter}
																							 remove={removeFilter}/>
									</CollapseComponent>
									{
										this.state.collapse.variety &&
										<FilterSelectedOptionListComponent list={filters.variety.values} onRemoveFilter={removeFilter}
																											 type={'variety'}/>
									}
								</div>
							</div>
						}
					</div>
					<div className="col">
						{
							filters.country && <div className="row mb-4">
								<div className="col">
									<CollapseComponent label={filters.country.label} btnOpen={'btn-white'}
																		 onCollapse={(value) => this.handleCollapse('country', value)}>
										<FilterOptionListComponent type={'country'} list={filters.country.values} add={addFilter}
																							 remove={removeFilter}/>
									</CollapseComponent>
									{
										this.state.collapse.country &&
										<FilterSelectedOptionListComponent list={filters.country.values} onRemoveFilter={removeFilter}
																											 type={'country'}/>
									}
								</div>
							</div>
						}
						{
							filters.grower && <div className="row">
								<div className="col">
									<CollapseComponent label={filters.grower.label} btnOpen={'btn-white'}
																		 onCollapse={(value) => this.handleCollapse('grower', value)}>
										<FilterOptionListComponent type={'grower'} list={filters.grower.values} add={addFilter}
																							 remove={removeFilter}/>
									</CollapseComponent>
									{
										this.state.collapse.grower &&
										<FilterSelectedOptionListComponent list={filters.grower.values} onRemoveFilter={removeFilter}
																											 type={'grower'}/>
									}
								</div>
							</div>
						}
					</div>
					<div className="col">
						{
							singleFilters.promoCodeState && singleFilters.promoCodeState.state !== 0 &&
							<div className="row">
								<button className={(conditions.promoCodeState ? 'btn-primary text-white' : 'btn-soft') + ' btn px-2'}
												onClick={() => toggleSingleFilter({type: 'promoCodeState'})}>
                  <span className="d-flex align-items-center justify-content-between">
                    <i className="fa fa-dollar-sign mr-2"/> {singleFilters.promoCodeState.label}
                  </span>
								</button>
							</div>
						}
					</div>
				</div>
				<div className="row">
					<div className="col-12 text-right">
						<button className="btn btn-primary ml-2 text-white" onClick={FiltersContainer.closeFilterBar}>
							<b>Hide</b>
						</button>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	const {filters, singleFilters, conditions} = state.FilterReducer;
	return {
		filters,
		singleFilters,
		conditions
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		addFilter,
		removeAllFilters,
		removeFilter,
		toggleSingleFilter,
		toggleSortFilter
	}, dispatch);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FiltersContainer);

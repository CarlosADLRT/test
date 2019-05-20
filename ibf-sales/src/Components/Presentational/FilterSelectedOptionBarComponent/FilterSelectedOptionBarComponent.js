import React, {Component} from 'react';
import './FilterSelectedOptionBarComponent.scss';

class FilterSelectedOptionBarComponent extends Component {
	handleClick(item) {
		item.loading = true;
		this.props.removeFilter({key: item.key, type: item.type});
	}

	render() {
		const {filters} = this.props;
		const selectedFilters = Object.keys(filters).reduce((current, key) => {
			const list = filters[key].values.filter(item => item.selected).map(item => {
				item.type = key;
				item.loading = item.loading || false;
				return item;
			});
			current.push(...list);
			return current;
		}, []);
		return (


			selectedFilters.length > 0 &&
			<div className="selected-filter-bar sticky-top bg-white container p-1" style={{top: '93px', zIndex:3}}
			>
				{
					selectedFilters.map(item => (
						<div key={item.key} className="selected-filter-bar-item">
                  <span className="px-2 py-1 mx-2">
                    {item.value}
										<i className={'fa clickable ' + (item.loading ? 'fa-pulse fa-spinner' : 'fa-times')}
											 onClick={() => this.handleClick(item)}/>
                  </span>
						</div>
					))
				}
			</div>

		);
	}
}

export default FilterSelectedOptionBarComponent;

import React, {Component} from 'react';

class FilterSelectedOptionListComponent extends Component {
	render() {
		let {list, onRemoveFilter, type} = this.props;
		list = list.filter(item => item.selected);
		return list.length > 0 &&
			list.map(item => (
				<div key={item.key} className="mb-2">
                <span
									className="d-flex align-items-center justify-content-between font-size-md bg-white px-2 py-1 mx-2">
                    {item.value}
									<i className="fa fa-times clickable" onClick={() => onRemoveFilter({key: item.key, type})}/>
                </span>
				</div>
			));
	}
}

export default FilterSelectedOptionListComponent;

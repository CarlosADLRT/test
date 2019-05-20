import React, {Component} from 'react';
import './FilterOptionComponent.scss';

class FilterOptionComponent extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  toggle(event, item) {
    this.props.onChangeSelected(Object.assign(item, {selected: event.target.checked}));
  }

  render() {
    const {item, actsAsRadio} = this.props;
    return (
      <div className="filter-option">
        <input type="checkbox" id={item.key} onChange={(event) => this.toggle(event, item)} checked={item.selected} disabled={actsAsRadio && item.selected}/>
        <label htmlFor={item.key}><span className="fa"/>{item.value}</label>
      </div>
    );
  }
}

export default FilterOptionComponent;

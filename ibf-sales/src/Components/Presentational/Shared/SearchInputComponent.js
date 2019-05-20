import React, {Component} from 'react';
import {InputGroup, InputGroupAddon} from 'reactstrap';

class SearchInputComponent extends Component {
  render() {
    const {placeholder, iconColor, onChangeInput, value, submit, name, clear} = this.props;
    return (
      <InputGroup className="filter-option-search-input group-input-append">
        <input name={name} placeholder={placeholder} type="text" className="form-control" onKeyPress={submit}
               onChange={onChangeInput} value={value} />
        <InputGroupAddon addonType="append" className="border-left-0 border-right-0">
          <button className="btn btn-sm" onClick={clear} disabled={!value}>
            <i className={iconColor + ' fal fa-times'}/>
          </button>
        </InputGroupAddon>
        <InputGroupAddon addonType="append" className="border-left-0">
          <button className="btn btn-sm" onClick={submit} disabled={!value}>
            <i className={iconColor + ' fa fa-search'}/>
          </button>
        </InputGroupAddon>
      </InputGroup>
    );
  }
}

export default SearchInputComponent;

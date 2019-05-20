import React, {Component} from 'react';
import {Card} from "reactstrap";
import FilterOptionComponent from "../FilterOptionComponent/FilterOptionComponent";
import './FilterOptionListComponent.scss';
import SearchInputComponent from "../../Shared/SearchInputComponent";
import _ from 'lodash';

class FilterOptionListComponent extends Component {
  constructor(props) {
    super(props);
    this.filterList = this.filterList.bind(this);
    this.onChangeSelected = this.onChangeSelected.bind(this);
    const list = this.props.list.sort((a, b) => a.value.localeCompare(b.value));
    this.state = {initialItems: list, items: list, initialValue: ''};
  }

  filterList(event) {
    const updatedList = this.state.initialItems.filter((item) => {
      return item.value.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1;
    });
    this.setState({items: updatedList, initialValue: event.target.value});
  }

  onChangeSelected(item) {
    if(item.selected) {
      this.props.add({key: item.key, type: this.props.type, name: item.value});
    } else {
      this.props.remove({key: item.key, type: this.props.type, name: item.value});
    }
  }

  updateItems() {
    const list = this.props.list.sort((a, b) => a.value.localeCompare(b.value));
    this.setState({initialItems: list, items: list, initialValue: ''});
  }

  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
    if (!_.isEqual(this.props.list, prevProps.list)) {
      this.updateItems();
    }
  }

  render() {
    return (
      <Card className="filter-option-card">
        <div className="px-4 mt-3">
          <SearchInputComponent placeholder={'Search'} iconColor={'text-color-strong-pink'} initialValue={this.state.initialValue} onChangeInput={this.filterList}/>
        </div>
        <div className="filter-option-card-body">
          {this.state.items.map(item => (
            <FilterOptionComponent key={item.key} item={item} onChangeSelected={(item) => this.onChangeSelected(item)}/>
          ))}
        </div>
      </Card>
    );
  }
}

export default FilterOptionListComponent;

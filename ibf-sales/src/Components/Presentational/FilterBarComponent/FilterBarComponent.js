import React, {Component} from 'react';
import './FilterBarComponent.scss';
import DropdownComponent from '../Shared/DropdownComponent';
import ShippingInformationComponent from './ShippingInformationComponent/ShippingInformationComponent';
import FiltersContainer from '../../Containers/FiltersContainer/FiltersContainer';
import SearchInputComponent from '../Shared/SearchInputComponent';
import queryString from 'query-string';
import {withRouter} from 'react-router-dom';
import SharedService from '../../../Services/SharedService';
import FilterOptionComponent from "./FilterOptionComponent/FilterOptionComponent";
import MixpanelService from "../../../Services/MixpanelService";

class FilterBarComponent extends Component {
  constructor(props) {
    super(props);
    this.onChangeSelected = this.onChangeSelected.bind(this);
    this.state = {
      search: '',
      filterMenuStyle: {
        translation: '-222px',
        style: {
          transform: 'translate(-222px, 44px) !important'
        }
      },
      items: [
        {key: 'variety', value: 'Product then Variety then Price', selected: true},
        {key: 'price', value: 'Product then Price', selected: false}
      ]
    };
  }

  componentDidMount(): void {
    let {search} = queryString.parse(this.props.location.search);
    if (search) {
      this.setState(prev => ({...prev, search}));
    }
  }

  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
    const item = document.getElementById('filterButtonDropdown');
    const translation = `${-(SharedService.getOffset(item).left - 386)}px`;
    if (translation !== this.state.filterMenuStyle.translation) {
      this.setState(state => {
        return {
          ...state,
          filterMenuStyle: {
            translation,
            style: {
              transform: `translate(${translation}, 31px) !important`
            }
          }
        };
      });
    }
  }

  clear = () => {
    this.setState({search: ''},() => this.search());
  };

  inputChange = (event) => {
    const {value, name} = event.currentTarget;
    this.setState({[name]: value});
  };

  submit = (e) => {
		const search = this.state.search;
    if ((e.charCode === 13 || e.type === 'click') && search.length) {
    	MixpanelService.track('searchProduct', {search: this.state.search, custom: this.props.isCurrentBox});
			this.search();
    }
  };

  search(){
    const search = this.state.search;
    let {date} = queryString.parse(this.props.location.search);
    const query = '?date=' + date + (search ? '&search=' + search : '');
    this.props.history.push({
      pathname: './search',
      search: query
    });
  }


  sort = (text) => {
    this.setState(prev => ({orderBy:text, ...prev}));
  };

  onChangeSelected(item) {
    this.props.toggleSortFilter({type: 'orderBy', value: item.key});
    this.setState(state => {
      return {
        ...state,
        items: state.items.map(i => {
          i.selected = i.key === item.key;
          return i;
        })
      }
    });
  }

  render() {
    const {quantity, openModal, toggleSingleFilter, conditions, singleFilters, customer, holidays, disabledDaysOfWeek, shoppingCartTotalItems, isCurrentBox} = this.props;

    return (
      <div className="filter-bar container">
        <div className="filter-bar-item">
          <DropdownComponent label={'ARRIVAL DATE'} btnOpen={'btn-secondary'} btnClose={'btn-soft'} menuStyle={{width: '200px'}}>
            <ShippingInformationComponent openModal={openModal} customer={customer} holidays={holidays}
                                          disabledDaysOfWeek={disabledDaysOfWeek} shoppingCartTotalItems={shoppingCartTotalItems} isCurrentBox={isCurrentBox}/>
          </DropdownComponent>
        </div>

        <div className="filter-bar-item" id="filterButtonDropdown">
          <DropdownComponent label={'FILTERS'} btnOpen={'btn-secondary'} btnClose={'btn-soft'}>
            <FiltersContainer/>
          </DropdownComponent>
        </div>

        <div className="filter-bar-item">
          <DropdownComponent label={'SORT BY'} btnOpen={'btn-secondary'} btnClose={'btn-outline-secondary'} menuStyle={{width: '270px'}}>
            <div className="filter-option-card card">
              <div className="filter-option-card-body mt-2 mb-1">
                {
                  this.state.items.map(item => (
                    <FilterOptionComponent key={item.key} item={item} actsAsRadio={true} onChangeSelected={(item) => this.onChangeSelected(item)}/>
                  ))
                }
              </div>
            </div>
          </DropdownComponent>
        </div>

        <div className="filter-bar-item">
          <span>{quantity} PRODUCTS</span>
        </div>

        <div className="filter-bar-item">
          <SearchInputComponent name={'search'} submit={this.submit} iconColor={'text-color-strong-pink'}
                                onChangeInput={this.inputChange} value={this.state.search} clear={this.clear}/>
        </div>

        <div className="filter-bar-item">
          <button className={(conditions.favorite ? 'btn-secondary' : 'btn-soft') + ' btn px-2'}
                            onClick={() => toggleSingleFilter({type: 'favorite'})}
                            disabled={!singleFilters.favorite || singleFilters.favorite.state === 0}>
            <span className="d-flex align-items-center justify-content-between">
              <i className="fa fa-heart mr-2"/> FAVORITES
            </span>
          </button>
        </div>

        <div className="filter-bar-item">
          <button className={(conditions.special ? 'btn-secondary' : 'btn-soft') + ' btn px-2'}
                  onClick={() => toggleSingleFilter({type: 'special'})}
                  disabled={!singleFilters.special || singleFilters.special.state === 0}>
            <span className="d-flex align-items-center justify-content-between">
              <i className="fa fa-dollar-sign mr-2"/> PROMOS
            </span>
          </button>
        </div>

      </div>
    );
  }
}

export default withRouter(FilterBarComponent);

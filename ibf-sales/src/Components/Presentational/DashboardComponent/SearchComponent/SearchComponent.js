import React, {Component, Fragment} from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import {DateUtils} from 'react-day-picker';
import CalendarComponent from '../../CalendarComponent/CalendarComponent';
import {convertDateToNumberDate, getDisabledDays} from '../../../../Utils/Utilities';
import {format, parse} from 'date-fns';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Button, Input, InputGroup, InputGroupAddon} from 'reactstrap';
import {toast} from '../../../../Services/AlertService';
import CustomerService from '../../../../Services/CustomerService';
import {bindActionCreators} from 'redux';
import * as ActionsCreators from '../../../../Redux/Actions/ModalActionsCreators';
import {ADDRESS_MODAL} from '../../../Shared/Modals/ModalTypes';
import MixpanelService from "../../../../Services/MixpanelService";


type state = {
  selectedDay: string,
  address: string,
  isModalOpen: boolean
}

class SearchComponent extends Component<{}, state> {
  
  state = {
    selectedDay: format(new Date(), 'MM/DD/YYYY'),
    address: ''
  };
  
  componentDidMount() {
    CustomerService.getCustomerInfo(this.props.customer.customer).then(cus => {
      const address = JSON.parse(cus.actual_address);
      if (address) {
        this.setState({address: `${address.address} | ${address.city}, ${address.state.abbr} ${address.zipcode}`});
      }
    });
  }
  
  handleDayChange = (day) => {
  	MixpanelService.track('selectDate', {dateView: 'Arrival Date'});
    this.setState({selectedDay: day});
  };
  
  handleChange = (event: SyntheticEvent<HTMLButtonElement>) => {
    const {value, name} = event.currentTarget;
    this.setState({[name]: value});
  };
  
  parseDate(str, format, locale) {
    const parsed = parse(str, format, {locale});
    if (DateUtils.isDate(parsed)) {
      return parsed;
    }
    return undefined;
  }
  
  openModal() {
    if (!this.props.shoppingCartTotalItems) { //verify if there are items in cart.
      this.props.openModal({modal: ADDRESS_MODAL});
    } else {
      toast('Please checkout the items in your shopping cart before changing the destination address.',
        'error');
    }
  }
  
  formatDate(date, dateFormat, locale) {
    return format(date, dateFormat, {locale});
  }
  
  submitChange = (e) => {
		e.preventDefault();
		const date = convertDateToNumberDate(this.state.selectedDay);
  	MixpanelService.track('search', {dateView: 'Arrival Date', search: this.state.search, date});

    const params = {date, search: this.state.search};
    
    let query = Object.keys(params).reduce((queryParam, i) => {
      if (params[i]) {
        queryParam += `${i}=${params[i]}&`;
      }
      return queryParam;
    }, '');
    if (query.length) {
      query = query.slice(0, -1);
    }
    this.props.history.push({
      pathname: './search',
      search: '?' + query
    });
  };
  
  render() {
    return (
      <Fragment>
        <div className="card">
          <div className="card-body">
            <h2>
              START SHOPPING
            </h2>
            <div className="card-text">
              <form onSubmit={this.submitChange}>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Select the arrival date for your flowers</label>
                  <br/>
                  <DayPickerInput
                    disabled={true}
                    onDayChange={this.handleDayChange}
                    formatDate={this.formatDate}
                    parseDate={this.parseDate}
                    format={'MM/DD/YYYY'}
                    component={CalendarComponent}
                    className="w-100"
                    dayPickerProps={{
                      modifiers: {
                        disabled: getDisabledDays(this.props.holidays, this.props.disabledDaysOfWeek)
                      }
                    }} placeholder={format(new Date(), 'MM/DD/YYYY')}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Shipping address</label>
                  <InputGroup>
                    <Input onChange={this.handleChange}
                           name="address"
                           readOnly
                           value={`${this.props.customer.customer_street} | ${this.props.customer.customer_address || ''}`}
                           className="font-size-md form-control"/>
                    <InputGroupAddon addonType="prepend">
                      <Button color="primary" className="font-size-md" onClick={() => this.openModal()}>Change</Button>
                    </InputGroupAddon>
                  </InputGroup>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Name or type of the flower</label>
                  <input onChange={this.handleChange} type="text" name="search" className="font-size-md form-control"/>
                </div>
                <div className="row d-flex justify-content-end m-0">
                  <button type="submit" className="btn btn-primary font-size-md">CHECK AVAILABILITY</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps({AuthReducer, ShoppingCartReducer}) {
  const {customer} = AuthReducer;
  const {shoppingCartTotalItems} = ShoppingCartReducer;
  return {customer, shoppingCartTotalItems};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    openModal: ActionsCreators.openModal
  }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchComponent));

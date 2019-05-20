import React, {Component, forwardRef} from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import {DateUtils} from 'react-day-picker';
import CalendarComponent from '../../CalendarComponent/CalendarComponent';
import {format, parse} from 'date-fns';
import * as queryString from 'query-string';
import _ from 'lodash';
import {withRouter} from 'react-router-dom';
import {convertDateToNumberDate, convertNumberDateToDate, getDisabledDays} from '../../../../Utils/Utilities';
import {ADDRESS_MODAL} from '../../../Shared/Modals/ModalTypes';
import ExtraDatesAvailableComponent from '../ExtraDatesAvailableComponent/ExtraDatesAvailableComponent';
import {toast} from '../../../../Services/AlertService';
import MixpanelService from "../../../../Services/MixpanelService";

class ShippingInformationComponent extends Component {
	state = {
		date: convertDateToNumberDate(new Date())
	};

	componentDidMount(): void {
		const {date} = queryString.parse(this.props.location.search);
		if (date) {
			this.setState(prev => ({...prev, date}));
		}
	}

	handleDayChange = (date) => {
		MixpanelService.track('selectDate', {dateView: 'Choose Flowers'});
		if (typeof date !== ('string' || 'number')) date = convertDateToNumberDate(date);
		this.setState({date});
		const {search} = queryString.parse(this.props.location.search);
		let query = '?date=' + date;
		if (search) {
			query += '&search=' + search;
		}
		this.props.history.push({
			pathname: './search',
			search: query
		});
	};

	componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
		if (!_.isEqual(prevProps.location, this.props.location)) {

			const {date} = queryString.parse(this.props.location.search);
			this.setState(prev => ({...prev, date}));
		}
	}

	parseDate(str, format, locale) {
		const parsed = parse(str, format, {locale});
		if (DateUtils.isDate(parsed)) {
			return parsed;
		}
		return undefined;
	}

	formatDate(date, dateFormat, locale) {
		return format(date, dateFormat, {locale});
	}

	open = () => {
		if (!this.props.shoppingCartTotalItems) { //verify if there are items in cart.
			this.props.openModal({modal: ADDRESS_MODAL});
		} else {
			toast('Please checkout the items in your shopping cart before changing the destination address.',
				'error');
		}
	};

	render() {
		let {date} = this.state;
		let {customer, holidays, disabledDaysOfWeek, isCurrentBox} = this.props;
		date = parseInt(date, 10);
		return (
			<div className="px-2">
				<span className="font-weight-bold font-size-md">Arrival date</span>
				<DayPickerInput
					onDayChange={this.handleDayChange}
					formatDate={this.formatDate}
					parseDate={this.parseDate}
					format={'MM/DD/YYYY'}
					component={forwardRef((props,ref) => <CalendarComponent ref={ref} {...props} disabled={isCurrentBox}/>)}
					className="w-100 mt-2"
					placeholder={convertNumberDateToDate(date).toISOString()}
					value={convertNumberDateToDate(date)}
					dayPickerProps={{
						modifiers: {
							disabled: getDisabledDays(holidays, disabledDaysOfWeek)
						}
					}}
				/>

				<ExtraDatesAvailableComponent date={date} handleDayChange={(date) => this.handleDayChange(date)}/>

				<span className="font-weight-bold font-size-md">Shipping address</span>

				<div className="address-info">
					<span>{customer.customer_street}</span>
					<span>{customer.customer_address || ''}</span>
				</div>

				<span onClick={this.open}
							className="purply-link link-ibf">Change shipping address</span>

				<p className="font-size-sm mt-3">
					<b>Note:</b> changing arrival date will reset all active filters
				</p>
			</div>
		);
	}
}

export default withRouter(ShippingInformationComponent);

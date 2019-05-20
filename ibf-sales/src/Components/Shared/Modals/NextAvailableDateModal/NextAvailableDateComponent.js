import React, {Component} from 'react';
import ModalComponent from "../ModalComponent";
import Emma from '../../../../Assets/Images/emma.jpg';
import DayPicker from 'react-day-picker';
import './NextAvailableDateComponent.scss';
import {convertDateToNumberDate, convertNumberDateToDate} from "../../../../Utils/Utilities";

class NextAvailableDateComponent extends Component {

	handleDayClick = (date) => {
		this.props.handleDayClick(convertDateToNumberDate(date));
	};

	render() {

		let selectedDays = [];
		let smallestDate = 0;

		if (this.props.dates) {
			selectedDays = this.props.dates.map(item => {
				item = convertNumberDateToDate(item);
				if(item < smallestDate || !smallestDate) {
					smallestDate = item;
				}
				return item;
			});
		}


		return (
			<ModalComponent
				size="lg"
				title={'We will search for days available within 2 weeks time frame of availability.\n'}
				onClose={this.props.onClose}
				className={'next-available-date-dialog'}
				body={
					<div className="modal-body d-flex align-items-center">
						<img alt="loading..." className="mr-3 " src={Emma}/>
						{
							this.props.dates ?
								this.props.dates.length === 0 ?
									<div>
										<h4>Sorry, we couldn’t find available product with the selected filters.</h4>
									</div> :
									<div>
										<p className="text-justify">
											The blue highlighted day(s) of the week your product is available.
											Click on your preferred day of the month to view inventory.
										</p>
										<div className="d-flex align-items-center justify-content-center">
											<DayPicker
												selectedDays={selectedDays}
												month={smallestDate}
												onDayClick={this.handleDayClick}/>
										</div>
									</div> :
								<div className="modal-body d-flex align-items-center">
									<i className={'fa fa-spinner fa-spin fa-2x'}/>
									<h5 className="ml-2 mt-3"> We are searching for your product</h5>
								</div>
						}
					</div>
				}
				customFooter={<button className="btn btn-primary" onClick ={this.props.onClose}>Cancel</button>}>
			</ModalComponent>
		);
	}
}

export default NextAvailableDateComponent;

import React, {Component} from 'react';
import {convertNumberDateToDate} from "../../../../Utils/Utilities";
import {format} from 'date-fns';

class ExtraDatesAvailableComponent extends Component {
  constructor(props) {
    super(props);
    this.setupNextDates = this.setupNextDates.bind(this);
    this.state = {
      date: new Date(),
      dates: []
    }
  }

  static disabledDay(d: Date) {
    return d.getDay() === 0 || d.getDay() === 1 || d.getDay() === 6;
  }

  setupNextDates() {
    let currentDate = convertNumberDateToDate(this.props.date);
    const dates = [];
    while (dates.length < 2) {
      const tmpDate = new Date(currentDate);
      tmpDate.setDate(tmpDate.getDate() + 1);

      while (ExtraDatesAvailableComponent.disabledDay(tmpDate)) {
        tmpDate.setDate(tmpDate.getDate() + 1);
      }

      dates.push({date: new Date(tmpDate), formated: format(tmpDate, 'MMM DD, YYYY')});
      currentDate = tmpDate;
    }
    this.setState({...this.state, dates: [...this.state.dates, ...dates]});
  }

  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
    if(this.props.date !== this.state.date && !this.state.dates.length) {
      this.setState(state => ({...state, date: this.props.date}));
      this.setupNextDates();
    }
  }

  render() {
    return (
      <div className="extra-dates-selector mb-2">
        <span className="link-ibf-purply p-2" onClick={() => this.props.handleDayChange(this.state.dates[0].date)}>
          {this.state.dates[0] ? this.state.dates[0].formated : ''}
        </span>
        <span className="divider"/>
        <span className="link-ibf-purply p-2" onClick={() => this.props.handleDayChange(this.state.dates[1].date)}>
          {this.state.dates[1] ? this.state.dates[1].formated : ''}
        </span>
      </div>
    );
  }
}

export default ExtraDatesAvailableComponent;

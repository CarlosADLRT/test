import React, {Component} from 'react';
import {InputGroup, InputGroupAddon} from "reactstrap";

class CalendarComponent extends Component {
  constructor(props) {
    super(props);
    this.buttonGroupHandler = this.buttonGroupHandler.bind(this);
  }

  buttonGroupHandler () {
    this.calendarInput.focus();
  }

  render() {
    return (
      <InputGroup className="group-input-append mt-2">
        <input disabled={this.props.disabled} ref={input => {this.calendarInput = input;}} {...this.props} type="text" className="form-control"/>
        <InputGroupAddon onClick={this.buttonGroupHandler} addonType="append" className="clickable border-left-0 p-2">
          <i className="fa fa-calendar"/>
        </InputGroupAddon>
      </InputGroup>
    );
  }
}

export default CalendarComponent;

import React, {Component} from 'react';
import {Dropdown, DropdownMenu, DropdownToggle} from 'reactstrap';

class DropdownComponent extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.dropdown = React.createRef();
    this.state = {open: false};
  }

  toggle() {
    this.setState({open: !this.state.open});
  }

  render() {
    const {label, btnOpen, btnClose, menuStyle} = this.props;
    return (
      <Dropdown isOpen={this.state.open} size="md" toggle={this.toggle}>
        <DropdownToggle tag="button" className={(this.state.open ? btnOpen : btnClose) + ' btn px-2'} onClick={(e) => this.toggle(e)} aria-expanded={this.state.open}>
          <span className="d-flex align-items-center justify-content-between">
            {label}
            <i className={(this.state.open ? 'fa-angle-up' : 'fa-angle-down') + ' fa ml-2'}/>
          </span>
        </DropdownToggle>
        <DropdownMenu style={menuStyle}>
          {this.props.children}
        </DropdownMenu>
      </Dropdown>
    );
  }
}

export default DropdownComponent;

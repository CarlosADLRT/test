import React, {Component, Fragment} from 'react';
import {Collapse} from 'reactstrap';

class CollapseComponent extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.onCollapse = this.props.onCollapse || (()=>{});
    this.state = {collapse: false};
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
    this.onCollapse(this.state.collapse);
  }

  render() {
    const {label = '', btnOpen = '', btnClose = ''} = this.props;
    return (
      <Fragment>
        <button className={(this.state.collapse ? btnOpen : btnClose) + ' btn btn-block p-2'} onClick={this.toggle}>
          <span className="d-flex align-items-center justify-content-between font-size-md">
            {label}
            <i className={(this.state.collapse ? 'fa-angle-up' : 'fa-angle-down') + ' fa'}/>
          </span>
        </button>
        <Collapse isOpen={this.state.collapse}>
          {this.props.children}
        </Collapse>
      </Fragment>
    );
  }
}

export default CollapseComponent;

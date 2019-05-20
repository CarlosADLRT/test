import React, {Component} from 'react';
import CountryCardComponent
  from '../../Presentational/DashboardComponent/CountryComponent/CountryCardComponent/CountryCardComponent';
import * as ActionsCreatorsFilter from '../../../Redux/Actions/FilterActionsCreators';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class CountryCardContainer extends Component {
  render() {
    return (
      <CountryCardComponent {...this.props}/>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addFilter: ActionsCreatorsFilter.addFilter,
  }, dispatch);
}

export default connect(
  null,
  mapDispatchToProps
)(CountryCardContainer);

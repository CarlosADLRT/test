import React, {Component} from 'react';
import DeliveryScheduleComponent from './DeliveryScheduleComponent';
import {connect} from 'react-redux';
import SharedService from '../../../../Services/SharedService';
import {bindActionCreators} from 'redux';
import {closeModal} from '../../../../Redux/Actions/ModalActionsCreators';
import {DELIVERY_SCHEDULE_MODAL} from '../ModalTypes';

type state = {
  countries: any,
  loaded: boolean
}

class DeliveryScheduleContainer extends Component<{}, state> {
  
  state = {
    countries: [],
    loaded: false
  };
  
  componentDidMount() {
    SharedService.getSchedule().then(res => {
      this.setState({countries: res, loaded: true});
    });
  }
  
  render() {
    const {countries, loaded} = this.state;
    return (
      <DeliveryScheduleComponent countries={countries} loaded={loaded}
                                 onClose={() => this.props.closeModal({modal: DELIVERY_SCHEDULE_MODAL})}/>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({closeModal}, dispatch);
}

export default connect(null, mapDispatchToProps)(DeliveryScheduleContainer);

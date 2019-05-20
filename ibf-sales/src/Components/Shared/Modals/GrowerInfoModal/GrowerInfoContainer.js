import React, {Component} from 'react';
import {connect} from "react-redux";

import SharedService from "../../../../Services/SharedService";
import FloristService from "../../../../Services/FloristService";

import GrowerInfoModalComponent from "./GrowerInfoComponent";
import {bindActionCreators} from "redux";
import {closeModal} from "../../../../Redux/Actions/ModalActionsCreators";
import {GROWER_INFO_MODAL} from '../ModalTypes';


type state = {
  loaded: boolean,
  listMaster: any,
  list: any
}

class GrowerInfoContainer extends Component<{}, state>{
  state = {
    loaded: false,
    listMaster: [],
    list: []
  };

  componentDidMount(){
    Promise.all([SharedService.getArrivalPerGrower(), FloristService.loadProductGroupsByGrower()])
        .then(data => {
          let listMaster = [];
          if(data[0].success){
            listMaster = Array.from(data[1]);

            listMaster.forEach(item => {
              const days = [];
              Object.keys(data[0].info).forEach(key => {
                const grower = data[0].info[key].countryArrival.find(elem => elem._KEY === item.country);
                if(grower){
                  days.push(data[0].info[key].label);
                }
              });
              item.days = days.join(', ');
            });
          }

          this.setState({loaded: true, listMaster});

          if(listMaster.length){
            this.filter();
          }
        });
  }

  filter(value){
    if(!value){
      this.setState({list: Array.from(this.state.listMaster)});
      return;
    }

    const newVal = value.toLowerCase().trim();

    const list = this.state.listMaster.filter(item => {
      const name = item.name.toLowerCase().trim();
      const desc = item.desc.toLowerCase().trim();
      const days = item.days.toLowerCase().trim();
      return (name.indexOf(newVal) !== -1) || (desc.indexOf(newVal) !== -1) || (days.indexOf(newVal) !== -1);
    });

    this.setState({list});
  }

  render(){
    const {loaded, listMaster, list} = this.state;
    return (
        <GrowerInfoModalComponent
            loaded = {loaded}
            listMaster = {listMaster}
            filter = {this.filter.bind(this)}
            list = {list}
            onClose = {() => this.props.closeModal({modal: GROWER_INFO_MODAL})}/>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({closeModal}, dispatch);
}

export default connect(null, mapDispatchToProps)(GrowerInfoContainer);

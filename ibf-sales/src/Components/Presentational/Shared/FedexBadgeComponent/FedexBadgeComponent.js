import React, {Component} from 'react';
import './FedexBadgeComponent.scss'

class FedexBadgeComponent extends Component{

  componentDidMount(){
  }

  render(){
    return (
        <div className="fedex-badge text-center">
          <b>Free</b> shipping by <img className = "fedex-logo" src = "../../../../Assets/Images/fedex.svg" alt = ""/>
        </div>
    );
  }
}

export default FedexBadgeComponent;

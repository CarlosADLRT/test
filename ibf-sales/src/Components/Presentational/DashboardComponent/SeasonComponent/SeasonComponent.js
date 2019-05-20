import React, {Component, Fragment} from 'react';
import SeasonCardComponent from './SeasonCardComponent/SeasonCardComponent';

class SeasonComponent extends Component{

  render(){
      return (
        <Fragment>
          <div className = "row">
            <div className="col">
              <h2>SHOP FOR A SPECIAL OCCASION</h2>
            </div>
          </div>
          <div className = "row mb-3">
            {this.props.seasons &&
            this.props.seasons.map(season => (
                <SeasonCardComponent season={season} key={season.name}/>
            ))
            }
          </div>
        </Fragment>
    );
  }
}

export default SeasonComponent;

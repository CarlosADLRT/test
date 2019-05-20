import React, {Component, Fragment} from 'react';
import EC from '../../../../Assets/Images/EC_cover.jpg';
import EC_FLAG from '../../../../Assets/Images/EC_flag.png';
import CO from '../../../../Assets/Images/CO_cover.jpg';
import CO_FLAG from '../../../../Assets/Images/CO_flag.png';
import US from '../../../../Assets/Images/US_cover.jpg';
import US_FLAG from '../../../../Assets/Images/US_flag.png';
import NL from '../../../../Assets/Images/NL_cover.jpg';
import NL_FLAG from '../../../../Assets/Images/NL_flag.png';
import TH from '../../../../Assets/Images/TH_cover.jpg';
import TH_FLAG from '../../../../Assets/Images/TH_flag.png';
import CountryCardContainer from '../../../Containers/CountryCardContainer/CountryCardContainer';

type state = {
  countries: array<any>
};

class CountryComponent extends Component<{}, state> {


  render() {
    const countryIso = [['US', US, US_FLAG],
      ['CO', CO, CO_FLAG],
      ['NL', NL, NL_FLAG],
      ['EC', EC, EC_FLAG],
      ['TH', TH, TH_FLAG]];
    const countries = this.props.countries;
    return (
      <Fragment>
        <div className="row mb-3">
          <div className="col">
            <h2>FLOWERS AROUND THE WORLD, FIND BY COUNTRY</h2>
          </div>
        </div>
        <div className="row">
          {countryIso.map(country => {
            countries[country[0]].cover = country[1];
            countries[country[0]].flag = country[2];
            return (<CountryCardContainer
                key = {countries[country[0]]._KEY}
                country = {countries[country[0]]}
                growers = {countries[country[0]] ? countries[country[0]].growers : 0}
                varieties = {countries[country[0]] ? countries[country[0]].varieties : 0}
                size = {(country[0] === 'EC' || country[0] === 'TH') ? 6 : 4}
            />)
          })}
        </div>
      </Fragment>
    );
  }
}

export default CountryComponent;

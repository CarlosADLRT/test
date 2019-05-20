import React, {Component, Fragment} from 'react';
import ModalComponent from '../ModalComponent';
import LoadingSpinnerComponent from '../../../Presentational/Shared/LoadingSpinnerComponent';
import connect from "react-redux/es/connect/connect";
import SharedService from "../../../../Services/SharedService";

import EC_flag from '../../../../Assets/Images/EC_flag.png';
import CO_flag from '../../../../Assets/Images/CO_flag.png';
import US_flag from '../../../../Assets/Images/US_flag.png';
import NL_flag from '../../../../Assets/Images/NL_flag.png';
import TH_flag from '../../../../Assets/Images/TH_flag.png';

class GrowerInfoModalComponent extends Component {
  state = {
    loadedData: false,
    listMaster: [],
    list: [],
    searchValue: '',
    countries : {
      CO: CO_flag,
      US: US_flag,
      NL: NL_flag,
      TH: TH_flag,
      EC: EC_flag,
    }
  };

  handleSearchProduct = (event: SyntheticEvent<HTMLButtonElement>) => {
    const {value} = event.currentTarget;
    this.setState({searchValue: value});
    this.props.filter(value);
  };

  deleteValue(){
    this.setState({searchValue: ''});
  }

  render() {
    let {loaded, list} = this.props;

    let bodyRender = loaded ?
      <GrowerInfoModalBody
        list={list}
        searchValue={this.state.searchValue}
        countries={this.state.countries}
        deleteValue={this.deleteValue.bind(this)}
        handleSearchProduct={this.handleSearchProduct}/> :
      <LoadingSpinnerComponent size={5}/>;

    return (
      <ModalComponent
        onClose={this.props.onClose}
        size="lg"
        title={<GrowerInfoModalTitle/>}
        body={
          bodyRender
        }
        footerEnabled={false}>
      </ModalComponent>
    );
  }
}

function GrowerInfoModalBody(props) {
  let {list, countries, handleSearchProduct, searchValue} = props;

  list.forEach( grower => {
    grower.countryISO = SharedService.getCountryFlag(grower.country);
    grower.countryFlag = countries[grower.countryISO];
  });

  return (
    <React.Fragment>
      <div className="modal-body">
        <div className="form-group">
          <label className="font-weight-bold small">Search by product</label>
          <div className="input-group search-control">
            <input className="form-control" name="search-product" value={searchValue} type="text" onChange={handleSearchProduct}/>
            <span className="input-group-addon cursor-pointer">
              { searchValue &&
                <i className="fa fa-fw fa-times" onClick={()=>{searchValue = ''}}/>
              }
          </span>
          </div>
        </div>
        <div className="border border-grey-soft modal-body--max">
          <ul className="list-group list-group-flush">
            {list.map(grower => (
              <li className="list-group-item" key={grower.name}>
                <p className="m-0">
                  <span className="small font-weight-bold"> {grower.name} </span>
                  <span>
                  <img className="country_flag" src={grower.countryFlag} title={grower.countryISO} alt={grower.countryISO} width="36"/>
                    {grower.countryISO}
                </span>
                  <span className="small font-weight-bold"> - Arrival Date: </span>
                  <span className="small font-weight-bold">{grower.days}</span>
                  <br/>
                  <span className="small"> {grower.desc} </span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
}

function GrowerInfoModalTitle() {
  return (
    <Fragment>
      <div className="media">
        <div className="text-primary mr-1">
          <i className="fa fa-lg fa-info-circle"/>
        </div>
        <div className="media-body">
          <span>
            <span className="font-weight-bold">Products By Grower</span>
            <br/>
            <small>Personalized boxes are filled with one Grower’s products.</small>
          </span>
        </div>
      </div>
    </Fragment>
  );
}

export default connect()(GrowerInfoModalComponent);
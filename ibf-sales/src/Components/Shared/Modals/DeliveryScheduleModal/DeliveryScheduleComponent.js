import React, {Component, Fragment} from 'react';
import ModalComponent from '../ModalComponent';
import LoadingSpinnerComponent from '../../../Presentational/Shared/LoadingSpinnerComponent';

class DeliveryScheduleComponent extends Component {
  state = {
    loadedData: false,
    countries: []
  };

  render() {
    let loaded = this.props.loaded;
    let bodyRender = loaded ? <DeliveryScheduleBody countries={this.props.countries}/> : <LoadingSpinnerComponent size={5}/>;

    return (
      <ModalComponent
        onClose={this.props.onClose}
        size="xl"
        title={ <DeliveryScheduleModalTitle/> }
        body={
          bodyRender
        }
        footerEnabled={false}>
      </ModalComponent>
    );
  }
}

function DeliveryScheduleBody(props) {

  props.countries.map(country => country.image = require('../../../../Assets/Images/' + country.country_iso + '_flag.svg'));

  return (
    <Fragment>
      <p className="mb-1">
        We suggest ordering 2-3 days in advance of your events. All Flowers are farm fresh and need time to open
      </p>
      <div className="table-responsive">
        <table className="table table-bordered table-striped mb-0">
          <thead>
          <tr>
            <th rowSpan="2"></th>
            <th className="text-center" colSpan="7">
              Delivery days - Cutt off time is daily 8 AM EST
            </th>
          </tr>
          <tr>
            <th>
              Sunday
              <br/>
              <small>(Order before)</small>
            </th>
            <th>
              Monday
              <br/>
              <small>(Order before)</small>
            </th>
            <th>
              Tuesday
              <br/>
              <small>(Order before)</small>
            </th>
            <th>
              Wednesday
              <br/>
              <small>(Order before)</small>
            </th>
            <th>
              Thursday
              <br/>
              <small>(Order before)</small>
            </th>
            <th>
              Friday
              <br/>
              <small>(Order before)</small>
            </th>
            <th>
              Saturday
              <br/>
              <small>(Order before)</small>
            </th>
          </tr>
          </thead>
          <tbody>
          {props.countries.map(country => (
            <tr key={country.country_iso}>
              <td className="text-center">
                <img src={country.image} title={country.country} alt={country.country_iso} width="36"/>
                <b>{country.country_iso}</b> - <small>{country.deliveryTime}*</small>
                <br/>
                <small>
                  <span>{country.type}</span>
                </small>
              </td>
              {country.days.map( (day, index) => (
                  <td className={"text-center align-middle"} key={day.to + index}>
                    <i className={"font-weight-bold fa fa-lg " +
                    ((day.status === 'OK' ? 'fa-check text-success' : day.status === 'TEMP' ? 'fa-clock-o text-primary' : 'fa-times text-danger'))}/>
                    <br/>
                    <small className="delivery-info">
                      {day.status==='TEMP' &&
                      <span> During holidays: </span>
                      }
                      {day.from}
                    </small>
                  </td>
                )
              )}
            </tr>
          ))}
          <tr>
          </tr>
          </tbody>
        </table>
      </div>
      <div className="row">
        <div className="col-auto">
          <small>
            *Estimate Delivery Time
          </small>
        </div>
        <div className="col text-right">
          <ul className="list-inline">
            <li className="list-inline-item">
              <i className="align-middle font-weight-bold fa fa-check text-success">
              </i>
              <small>
                Delivery
              </small>
            </li>
            <li className="list-inline-item">
              <i className="align-middle font-weight-bold fa fa-times text-danger">
              </i>
              <small>
                 No Delivery
              </small>
            </li>
            <li className="list-inline-item">
              <i className="align-middle font-weight-bold fa fa-clock-o text-primary">
              </i>
              <small>
                 During holidays
              </small>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  )
}

function DeliveryScheduleModalTitle() {
  return (
    <Fragment>
      <div className="media">
        <div className="text-primary mr-1">
          <i className="fa fa-lg fa-calendar"/>
        </div>
        <div className="media-body">
          <span className="font-weight-bold">Delivery Schedule</span>
        </div>
      </div>
    </Fragment>
  );
}

export default DeliveryScheduleComponent;
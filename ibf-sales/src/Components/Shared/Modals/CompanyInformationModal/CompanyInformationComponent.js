import React, {Component, Fragment} from 'react';
import ModalComponent from '../ModalComponent';

class CompanyInformationComponent extends Component {
  state = {
    loadedData: false
  };

  render() {
    let {customer, userId, OnEdit} = this.props;
    return (
      <ModalComponent
        onClose={this.props.onClose}
        size="lg"
        title={<CompanyInfoModalTitle/>}
        body={
          <CompanyInfoModalBody customer={customer} userId={userId} OnEdit={OnEdit}/>
        }
        footerEnabled={false}
      >
      </ModalComponent>
    );
  }
}

function CompanyInfoModalBody(props) {
  let {customer, userId, OnEdit} = props;

  return (
    <React.Fragment>
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-4">
              <dl className="dl-horizontal--text-left">
                <dt>
                  Company Name:
                </dt>
                <dd>
                  {customer.customer_name || 'No information'}
                </dd>
                <dt>
                  Phone:
                </dt>
                <dd>
                  {customer.customer_office_phone || 'No information'}
                </dd>
                <dt>
                  Street:
                </dt>
                <dd>
                  {customer.customer_street || 'No information'}
                </dd>
                <dt>
                  City:
                </dt>
                <dd>
                  {customer.customer_city}, {customer.customer_state}
                </dd>
                <dt>
                  ZipCode:
                </dt>
                <dd>
                  {customer.customer_zipcode || 'No information'}
                </dd>
              </dl>
            </div>
            <div className="col-md-4">
              <dl className="dl-horizontal--text-left">
                <dt>
                  Stores Quantity:
                </dt>
                <dd>
                  {customer.customer_stores_quantity || 'No information'}
                </dd>
                <dt>
                  Employees Quantity:
                </dt>
                <dd>
                  {customer.customer_employees_quantity || 'No information'}
                </dd>
                <dt>
                  Office Email:
                </dt>
                <dd>
                  {customer.office_email || 'No information'}
                </dd>
                <dt>
                  Account Manager:
                </dt>
                <dd>
                  {customer.account_manager || 'No information'}
                </dd>
              </dl>
            </div>
            <div className="col-md-4">
              {customer.customer_logo &&
              <dl className="dl-horizontal--text-left">
                <dt>
                  Company Logo:
                </dt>
                <img className="profile-picture" src={customer.customer_logo} alt=""/>
              </dl>
              }
            </div>
          </div>
        </div>
      </div>
      {
        userId === customer.customer_admin &&
        <div className="row my-1">
          <div className="col text-right">
            <button type="button" className="btn btn-primary btn__info mr-2" onClick={OnEdit}>EDIT COMPANY</button>
          </div>
        </div>
      }
    </React.Fragment>
  );
}

function CompanyInfoModalTitle() {
  return (
    <Fragment>
      <div className="media">
        <div className="text-primary mr-1">
          <i className="fa fa-user"/>
        </div>
        <div className="media-body">
          <span className="font-weight-bold">Company Information</span>
        </div>
      </div>
    </Fragment>
  );
}

export default CompanyInformationComponent;
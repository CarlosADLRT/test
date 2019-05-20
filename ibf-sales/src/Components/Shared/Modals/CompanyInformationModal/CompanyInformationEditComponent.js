import React, {Component, Fragment} from 'react';
import ModalComponent from '../ModalComponent';

class CompanyInformationEditComponent extends Component {
  state = {
    customer: {
      customer_name: '',
      customer_street: '',
      customer_city: '',
      customer_state: '',
      customer_zipcode: '',
      customer_office_phone: '',
      customer_website: '',
      account_manager: '',
      customer_logo: '',
      office_email: '',
      customer_employees_quantity: '',
      customer_stores_quantity: 0,
    },
    states: [],
    customerImage :''
  };

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.upload = this.upload.bind(this);
  }

  componentDidMount(): void {
    this.setState({
      customer: this.props.customer
    });
  }

  editCustomer(customer, customerImage){
    this.props.customerEdit(customer, customerImage);
  }

  handleChange(event: SyntheticEvent<HTMLButtonElement>) {
    const {value, name} = event.currentTarget;
    let customer = {...this.state.customer};
    customer[name] = value;

    this.setState({
      customer
    });
  }

  upload(event){
    if(event.target.files.length === 0) { return;}

    const file = event.target.files[0];

    let customer = {...this.state.customer};
    customer.customer_logo = URL.createObjectURL(file);

    this.setState({customer, customerImage: file});
  }

  modalBody() {
    return (
      <Fragment>
        <div className="card m-0">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-4">
                <div className="form-group">
                  <b>Company Name:</b>
                  <sup className="text-danger">*</sup>
                  <input
                    type="text"
                    className="form-control input-sm"
                    name="customer_name"
                    value={this.state.customer.customer_name}
                    onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                  <b>Phone:</b>
                  <sup className="text-danger">*</sup>
                  <input
                    type="text"
                    className="form-control input-sm"
                    name="customer_office_phone"
                    value={this.state.customer.customer_office_phone}
                    onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                  <b>Street:</b>
                  <sup className="text-danger">*</sup>
                  <input
                    type="text"
                    className="form-control input-sm"
                    name="customer_street"
                    value={this.state.customer.customer_street}
                    onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                  <b>City:</b>
                  <sup className="text-danger">*</sup>
                  <input
                    type="text"
                    className="form-control input-sm"
                    name="customer_city"
                    value={this.state.customer.customer_city}
                    onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                  <b>State:</b>
                  <sup className="text-danger">*</sup>
                  <select
                    className="form-control input-sm"
                    name="customer_state"
                    value={this.state.customer.customer_state}
                    onChange={this.handleChange}>
                    {
                      this.props.states.map(state => (
                        <option value={state.state_iso} key={state.state_iso}>{state.state}</option>
                      ))
                    }
                  </select>
                </div>
                <div className="form-group">
                  <b>Zip Code:</b>
                  <sup className="text-danger">*</sup>
                  <input
                    type="text"
                    className="form-control input-sm"
                    name="customer_zipcode"
                    value={this.state.customer.customer_zipcode}
                    onChange={this.handleChange}/>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <b>Stores Quantity:</b>
                  <sup className="text-danger">*</sup>
                  <input
                    type="number"
                    className="form-control input-sm"
                    name="customer_stores_quantity"
                    value={this.state.customer.customer_stores_quantity}
                    onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                  <b>Employees Quantity:</b>
                  <sup className="text-danger">*</sup>
                  <input
                    type="text"
                    className="form-control input-sm"
                    name="customer_employees_quantity"
                    value={this.state.customer.customer_employees_quantity}
                    onChange={this.handleChange}/>
                </div>
                <div className="form-group">
                  <b>Office Email:</b>
                  <sup className="text-danger">*</sup>
                  <input
                    type="text"
                    className="form-control input-sm"
                    name="office_email"
                    value={this.state.customer.office_email}
                    onChange={this.handleChange}/>
                </div>
              </div>
              <div className="col-sm-4">
                <div className="form-group">
                  <b>Company Logo:</b>
                  <sup className="text-danger">*</sup>
                  <div>
                    <img src={this.state.customer.customer_logo} alt="" className="profile-picture"/>
                  </div>
                  <p className="file-select">
                    Upload Image
                    <input type="file" onChange={this.upload}/>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row my-1">
          <div className="col text-right">
            <button type="button" className="btn btn-primary btn__info mr-2" onClick={()=> {this.editCustomer(this.state.customer, this.state.customerImage)}}>SAVE CHANGES</button>
            <button type="button" className="btn btn-primary btn__info mr-2" onClick={this.props.OnEdit}>
              <i className="fa fa-arrow-alt-left"/> BACK
            </button>
          </div>
        </div>
      </Fragment>
    );
  }

  render() {
    return (
      <ModalComponent
        onClose={this.props.onClose}
        size="lg"
        title={<CompanyInfoModalTitle/>}
        body={
          this.modalBody()
        }
        footerEnabled={false}
      >
      </ModalComponent>
    );
  }
}

function CompanyInfoModalTitle() {
  return (
    <Fragment>
      <div className="media">
        <div className="text-primary mr-1">
          <i className="fa fa-user"/>
        </div>
        <div className="media-body">
          <span className="font-weight-bold">Edit Company Information</span>
        </div>
      </div>
    </Fragment>
  );
}

export default CompanyInformationEditComponent;
import React, {Component} from 'react';
import ModalComponent from '../ModalComponent';
import './AddressComponent.scss';
import {getStateList} from '../../../../Utils/Utilities';
import {toast} from '../../../../Services/AlertService';
import CustomerService from '../../../../Services/CustomerService';

type state = {
  newAddress: string,
  city: string,
  zipcode: string,
  state: string,
  save: boolean
}

class AddressComponent extends Component<{}, state> {
  
  state = {
    newAddress: '',
    city: '',
    zipcode: '',
    state: "{\"name\":\"Alabama\",\"abbr\":\"AL\"}",
    save: false
  };
  
  selectSavedAddress(item) {
    this.setState({
      ...this.state,
      newAddress: item.address, city: item.city, state: JSON.stringify(getStateList().find(i => i.abbr === item.state)),
      zipcode: item.zipcode, save: false
    }, () => {
      this.loadAddress();
    });
  }
  
  loadAddress = () => {
    let {newAddress, city, zipcode, state, save} = this.state;
    if (newAddress && city && zipcode && state) {
      const regexp = /^[0-9]{5}$/;
      if (regexp.test(this.state.zipcode)) {
        state = JSON.parse(state);
        CustomerService.updateAddress({
          customer: this.props.customer, save,
          address: {address: newAddress, state: state, zipcode, city}
        }).then(res => {
          this.props.onClose();
          this.props.changeCustomerAddress(newAddress, `${city}, ${state.abbr} ${zipcode}`);
          toast('Address changed successfully', 'info');
        }).catch(err => {
          console.error(err);
          toast('An error has occurred, try again later', 'error');
        });
      } else {
        toast('Invalid zip code', 'error');
      }
    }else {
      toast('Fill all the data before adding another address', 'error');
    }
  };
  
  handleChange = event => {
    let {value, name} = event.target;
    if (event.target.type === 'checkbox') {
      value = event.target.checked;
    }
    this.setState({[name]: value});
  };
  
  render() {
    return (
      <ModalComponent
        size="lg"
        title={'Select your shipping address for this shipment\n'}
        okText={'Add address'}
        okClick={() => this.loadAddress()}
        onClose={this.props.onClose}
        cancelText={'Cancel'}
        body={
          <div className="row">
            <div className="col-5">
              <div className="font-size-lg mb-3">Add a new address</div>
              <form onSubmit={() => this.loadAddress()}>
                <div className="form-group row align-items-center">
                  <label htmlFor="address" className="col-sm-3">Street</label>
                  <div className="col-sm-9">
                    <input type="text" id="address" className="form-control" placeholder="Street"
                           name="newAddress"
                           value={this.state.newAddress}
                           onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className=" form-group row align-items-center">
                  
                  <label className=" col-sm-3">City:</label>
                  <div className=" col-sm-9">
                    <input type="text" id=" city" className=" form-control" placeholder=" City"
                           name="city"
                           value={this.state.city}
                           onChange={this.handleChange}/>
                  </div>
                </div>
                <div className="form-group row align-items-center">
                  
                  <label className=" col-sm-3">Zipcode:</label>
                  <div className=" col-sm-9">
                    <input type="number" id=" zipcode" className=" form-control" pattern="[0-9]+"
                           placeholder="zipcode" name="zipcode"
                           value={this.state.zipcode}
                           onChange={this.handleChange}/>
                  </div>
                </div>
                
                <div className=" form-group row align-items-center">
                  <label className=" col-sm-3">State:</label>
                  <div className=" col-sm-9">
                    <select className=" custom-select custom-select-sm" name="state" id=" state"
                            value={this.state.state}
                            onChange={this.handleChange}>
                      {getStateList().map(i => (
                        <option key={i.abbr} value={JSON.stringify(i)}>{`${i.abbr} - ${i.name}`}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className=" form-group pl-4">
                  <div className=" form-check">
                    <input className=" form-check-input" type="checkbox" id="gridCheck" name="save"
                           value={this.state.save}
                           onChange={this.handleChange}/>
                    <label className=" form-check-label">
                      Do you wanna save the address?
                    </label>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-7 d-flex flex-column ">
              <div className="font-size-lg mb-3">Your saved addresses</div>
              <ul className="list-unstyled">
                {this.props.savedAdresses.map(i => (
                  <li className="address-modal-list" key={i.address}
                      onClick={() => this.selectSavedAddress(i)}>
                    {`${i.address}, ${i.city}, ${i.state} ${i.zipcode}`}
                  </li>
                ))}
              </ul>
            </div>
          </div>}>
        
        <div className=" row">
          <div className=" col-4">
          
          </div>
          <div className=" col-8">
          
          </div>
        </div>
      </ModalComponent>
    );
  }
}

export default AddressComponent;

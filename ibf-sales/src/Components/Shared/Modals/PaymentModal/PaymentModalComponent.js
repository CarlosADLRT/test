import React, {Component} from 'react';
import {Modal, ModalFooter, ModalBody, ModalHeader} from 'reactstrap';
import StripeService from '../../../../Services/StripeService';
import {toast} from '../../../../Services/AlertService';

let card;

class PaymentModalComponent extends Component {

  state = {
      name: ''
  };

  submit = () => {
    if(this.state.name){
      this.props.submit(card, this.state.name);
    }else{
      toast('Please enter a name for the card', 'warning');
    }
  };
  
  componentDidMount(): void {
    card = StripeService.elements().create('card');
    
    // Add an instance of the card UI component into the `card-element` <div>
    card.mount('#card-element');
  }
  
  render() {
    const {onClose} = this.props;
    return (
      <Modal isOpen={true} toggle={onClose} centered onClosed={onClose}>
        <ModalHeader>Add Payment Option</ModalHeader>
        <ModalBody>
          <div className="d-flex flex-column">
            <label>
              Name Card
              <input className="StripeElement" name="name" type="text" placeholder="Name Card" required
                      onChange={this.onChangeTextInput}/>
            </label>
            <label htmlFor="">
              Card details
              <div id="card-element">
              </div>
            
            </label>
          </div>
        
        </ModalBody>
        <ModalFooter>
          <button id="add-payment-save" className="btn btn-primary btn-sm"
                  onClick={this.submit}>
            <i className="fa fa-fw fa-save"/> Save
          </button>
          <button onClick={onClose} id=" add-payment-close" className=" btn btn-danger btn-sm">
            <i className="fa fa-fw fa-close"/> Close
          </button>
        </ModalFooter>
      </Modal>
    );
  }

  onChangeTextInput = event => {
    this.setState({
       [event.target.name]: event.target.value
    })
  }
}

export default PaymentModalComponent;

import React, {Component, Fragment} from 'react';
import ModalComponent from '../ModalComponent';
import {Button} from 'reactstrap';
import {CONFIRM_MODAL, PAYMENT_MODAL} from '../ModalTypes';
import './PaymentListComponent.scss';
import {toast} from '../../../../Services/AlertService';
import MixpanelService from "../../../../Services/MixpanelService";

class PaymentListComponent extends Component {

  state = {
    selectedCard: {},
    selectedCardKey: '',
    cardToDelete: ''
  };

  deleteCard(card) {
    if (this.props.data.length === 1) {
      toast('You must have at least one payment option.', 'show');
    } else {
      this.setState({cardToDelete: card});
      this.props.openModal({
        modal: CONFIRM_MODAL,
        data: {text: `Are you sure to delete ${card.card_name}?`, result: false}
      });
    }

  }

  componentDidUpdate(nextProps: Readonly<P>, nextState: Readonly<S>, nextContext: any): void {
    const {confirmation, deleteCard, cleanModal, customer, from} = this.props;
    const {cardToDelete} = this.state;
    if (confirmation.result) {
    	MixpanelService.track('removeCard', {cardBrand: cardToDelete.card_brand, from: from.from});
      deleteCard(customer, cardToDelete._KEY, cardToDelete.is_default);
      cleanModal({modal: CONFIRM_MODAL});
    }
  }

  selectCard(card) {
    if (this.state.selectedCardKey !== card._KEY) {
      this.setState({selectedCard: card, selectedCardKey: card._KEY});
    }
  }

  changeCurrentCard() {
    this.props.changeSelectedCard(this.state.selectedCard);
    toast('Card selected', 'success');
    this.props.onClose();
  }

  selectDefault() {
    const card = this.state.selectedCard;
    if (!card.is_default) {
      this.props.changeDefaultCard(this.props.data, card);
      toast('New Default Payment Method Selected.', 'success');
    } else {
      toast('The payment method selected is already default.', 'info');
    }
  }

  render() {
    const {onClose, openModal, data, from} = this.props;
    
    return (
      <ModalComponent
        title={'Your current payment details'}
        onClose={onClose}
        size="lg"
        body={
          <ul className="list-group">
            {data.map(item => (
              <li
                className={`list-group-item card-list-item selectable clickable ${this.state.selectedCardKey === item._KEY ? 'selected' : ''}`}
                key={item._KEY} onClick={() => this.selectCard(item)}>
                <div className="row">
                  <div className="card-payment-method col-9" style={{'backgroundColor': 'inherit'}}>
                    <div className="media">
                      <span className={`card-payment-method__icon ${item.icon}`}/>
                      <div className="media-body">
                        <div className="row">
                          <div className="text-ellipsis col-3">
                            {item.card_name}
                          </div>
                          <div className="col-3">
                            <span className="h6 mr-1">&#8226;&#8226;&#8226;&#8226;</span> {item.card_last4}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-end p-2 col-3">
                    {item.is_default &&
                    <span id="payment-default" className={`btn py-0 pr-2 ${item.is_default ? 'btn-outline-success' : 'btn-success'}`}>
                      Default
                      <i className={`fal fa-fw text-ibf-bold ${item.is_default ? 'fa-check-circle' : 'fa-circle'}`}/>
                    </span>}
                    <span id="payment-remove" className="text-danger ml-4"
                          onClick={() => this.deleteCard(item)}>
                            <i className="fal fa-fw fa-trash-alt"/>
                          </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        }
        customFooter={
          <Fragment>
            <button id="payment-choose" className="btn btn-success" disabled={!this.state.selectedCardKey}
                    onClick={() => this.changeCurrentCard()}>
              Choose card
            </button>
            <button id="payment-choose" className="btn btn-success" disabled={!this.state.selectedCardKey}
                    onClick={() => this.selectDefault()}>
              Set as default
            </button>
            <button id="payment-add" className="btn btn-primary"
                    onClick={() => openModal({modal: PAYMENT_MODAL, data: from})}>
              Add card
            </button>
            <Button className="btn btn-secondary" onClick={onClose}>Close</Button>
          </Fragment>
        }

      />
    );
  }
}

export default PaymentListComponent;

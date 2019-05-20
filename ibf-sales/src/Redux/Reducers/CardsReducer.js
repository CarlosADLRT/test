import * as ActionsTypes from '../Actions/ActionsTypes';
import {mapCreditCards} from "../../Utils/Utilities";

const initialState = {
  cardDefault: {},
  selectedCard: {},
  cards: []
};

export default function CardsReducer(state: Object = initialState, {type, payload}){
  switch(type){
    case ActionsTypes.LIST_CARDS:
      const cards = mapCreditCards(payload);
      const cardDefault = payload.find(i => i.is_default) || payload[0];
      return {...state, cards, cardDefault, selectedCard: cardDefault};

    case ActionsTypes.CHANGE_DEFAULT_CARD:
      const newDefaultCard = payload.find(i => i.is_default);
      return Object.assign({}, state, {
        ...state,
        cards: [...payload],
        cardDefault: newDefaultCard
      });

    case ActionsTypes.CHANGE_SELECTED_CARD:
      return Object.assign({}, state, {
        ...state,
        selectedCard: payload
      });

    case ActionsTypes.DELETE_CARD:
      if(payload.success){
        const newCards = mapCreditCards(payload.cards);
        const cardDefaultReplace = payload.isDefault ? payload.cards[0] : state.cardDefault;

        return Object.assign({}, state, {
          cards: [...newCards],
          cardDefault: cardDefaultReplace,
          selectedCard: cardDefaultReplace
        });
      } else{
        return state
      }

    default:
      return state;
  }
}
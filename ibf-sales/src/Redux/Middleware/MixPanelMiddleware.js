import MixpanelService from "../../Services/MixpanelService";
import {
	ADD_COMPOSED_FILTER,
	ADD_FILTER,
	CLOSE_CUSTOM_BOX, EDIT_BOX,
	LOAD_INVENTORY,
	OPEN_MODAL,
	TOGGLE_SINGLE_FILTER,
	VALIDATE_TOKEN,
	SIGNUP
} from "../Actions/ActionsTypes";

const MixPanelMiddleware = store => next => ({type, payload}) => {
	let eventType = null;
	let metadata = {};

	switch(type){
		case VALIDATE_TOKEN:
			if (payload.success) {
				MixpanelService.setPeople(payload.data.user);
			}
			break;

		case SIGNUP:
			if (!payload.success) {
				eventType = 'signupError';
				metadata= {email: payload.email, error: payload.error}
			}
			break;

		case LOAD_INVENTORY:
			if(payload.response.isEmpty){
				eventType = "emptyList";
				metadata = {custom: payload.custom, date: payload.eta, search: payload.search};
			}
			break;
		case CLOSE_CUSTOM_BOX:
			const customBox = payload.box.last;
			eventType = 'closeBox';
			metadata = {percentage: customBox.current_percentage, quantity: customBox.current_items,
			key: customBox._KEY, packingDate: customBox.packing_date};
			break;
		case OPEN_MODAL:
			switch(payload.modal){
				case 'growerInfoModal':
					eventType = 'growerInfo';
					break;
				case 'deliveryScheduleModal':
					eventType = 'deliverySchedule';
					break;
				case 'accountManagerModal':
					eventType = 'needHelp';
					break;
				default:
					break;
			}
			break;
		case ADD_FILTER:
			eventType = 'filter';
			metadata = {label: payload.name, name: payload.name, value: payload.key, type: payload.type};
			break;

		case TOGGLE_SINGLE_FILTER:
			if(!store.getState().FilterReducer.conditions[payload.type]){
				eventType = 'filter';
				metadata = {label: payload.type, name: payload.type, value: true, type: 'condition'}
			}
			break;
		case ADD_COMPOSED_FILTER:
			if (payload.composed === 'promoCode'){
				eventType = 'LinkPromo';
				metadata= {promo_code: payload.value}
			}
			break;
		case EDIT_BOX:
			if (payload.success){
				eventType = 'openBox';
				metadata = {percentage: payload.response.cartbox.current_percentage};
			}
			break;
		default:
			break;
	}
	if(eventType){
		MixpanelService.track(eventType, metadata);
	}
	return next({type, payload});
};

export default MixPanelMiddleware;

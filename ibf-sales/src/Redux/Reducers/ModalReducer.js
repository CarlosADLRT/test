import * as ActionsTypes from '../Actions/ActionsTypes';
import * as ModalTypes from '../../Components/Shared/Modals/ModalTypes.js';

const initialState = {
	[ModalTypes.ADDRESS_MODAL]: {
		open: false
	},
	[ModalTypes.CUSTOM_BOX_OPEN]: {
		open: false
	},
	[ModalTypes.DELIVERY_SCHEDULE_MODAL]: {
		open: false
	},
	[ModalTypes.GROWER_INFO_MODAL]: {
		open: false
	},
	[ModalTypes.ACCOUNT_MANAGER_MODAL]: {
		open: false
	},
	[ModalTypes.OPEN_CUSTOM_BOX]: {
		open: false
	},
	[ModalTypes.MANAGE_GROWERS_MODAL]: {
		open: false
	},
	[ModalTypes.CUSTOM_BOX_DETAIL_MODAL]: {
		open: false
	},
	[ModalTypes.PAYMENT_MODAL]: {
		open: false
	},
	[ModalTypes.INFO_CARD_MODAL]: {
		open: false
	},
	[ModalTypes.PAYMENT_LIST_MODAL]: {
		open: false
	},
	[ModalTypes.USERS_LIST_MODAL]: {
		open: false
	},
	[ModalTypes.ADD_USER_MODAL]: {
		open: false
	},
	[ModalTypes.COMPANY_INFORMATION_MODAL]: {
		open: false
	},
	[ModalTypes.CONFIRM_MODAL]: {
		open: false
	},
	[ModalTypes.FINISH_ORDER_MODAL]: {
		open: false
	},
	[ModalTypes.CLOSE_CUSTOM_BOX_MODAL]: {
		open: false
	},
	[ModalTypes.ARRIVAL_DATE_CHANGED_MODAL]: {
		open: false
	},
	[ModalTypes.PROMO_CODE_INVALID]: {
		open: false
	},
	[ModalTypes.NEXT_AVAILABLE_DATE_MODAL]: {
		open: false
	},
	[ModalTypes.SHOPPING_LIST_SUMMARY]: {
		open: false
	},
	[ModalTypes.REFERRAL_MODAL]: {
		open: false
	},
	[ModalTypes.SHIPPING_DETAILS]: {
		open: false
	}
};

export default function ModalReducer(state = initialState, { type, payload }) {
	switch (type) {
		case ActionsTypes.OPEN_MODAL:
			return {
				...state,
				[payload.modal]: {
					open: true,
					data: payload.data !== undefined ? payload.data : null,
					result: null
				}
			};
		case ActionsTypes.CLOSE_MODAL:
			return {
				...state,
				[payload.modal]: {
					open: false,
					data: null,
					result: payload.data !== undefined ? payload.data : null
				}
			};
		case ActionsTypes.CLEAN_MODAL:
			return {
				...state,
				[payload.modal]: {
					open: false,
					data: null,
					result: null
				}
			};
		default:
			return state;
	}
}

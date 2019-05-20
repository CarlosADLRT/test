import * as StateUI from '../Actions/UIStates';
import * as ActionsTypes from '../Actions/ActionsTypes';

const initialState = {
	UIState: StateUI.CHECKING_BOX,
	customBoxOpen: false,
	firstLoadInventory: true
};

export default function UIReducer(
	state: Object = initialState,
	{ type, payload }: { type: string, payload: any }
) {
	let UIState = null;
	let tmpState = {};
	switch (type) {
		case ActionsTypes.REQUEST_ADD_TO_CART:
			return { ...state, UIState: StateUI.ADDING_TO_CART };
		case ActionsTypes.ADD_TO_CART:
			return { ...state, UIState: StateUI.ADDED_TO_CART };
		case ActionsTypes.REQUEST_CHECK_OPEN_BOX:
			return { ...state, UIState: StateUI.LOADING_INVENTORY };
		case ActionsTypes.REQUEST_INVENTORY:
			return {
				...state,
				UIState: !state.customBoxOpen ? StateUI.LOADING_INVENTORY : null
			};
		case ActionsTypes.LOAD_INVENTORY:
			if (state.customBoxOpen && payload.response.productsStillFitInBox === false) {
				UIState = StateUI.NO_MORE_PRODUCTS_FIT_CUSTOM_BOX;
			} else if (payload.response.promoCodeStillAvailable === false) {
				UIState = StateUI.PROMO_CODE_INVALID;
			}
			return {
				...state,
				UIState,
				firstLoadInventory: false
			};
		case ActionsTypes.CLEAN_UI_STATE:
			return { ...state, UIState };
		case ActionsTypes.REQUEST_ADDING_TO_CUSTOM_BOX:
			return { ...state, UIState: StateUI.ADDING_TO_BOX };
		case ActionsTypes.ADD_CUSTOM_BOX:
			UIState = StateUI.ADDED_TO_BOX;
			if (payload.exist && payload.cartbox.current_percentage === 100) {
				UIState = StateUI.FULL_CUSTOM_BOX;
			} else if (payload.exist && !state.customBoxOpen) {
				UIState = StateUI.SHOW_FIRST_BOX_OPEN;
			}
			return {
				...state,
				customBoxOpen: true,
				UIState
			};
		case ActionsTypes.REQUEST_REMOVE_FROM_CUSTOM_BOX:
			return { ...state, UIState: StateUI.REMOVING_FROM_CUSTOM_BOX };
		case ActionsTypes.CHECK_OPEN_BOX:
			if (payload.success) {
				tmpState.customBoxOpen = payload.checkOpenBox.exist;
				tmpState.firstLoadInventory = !!payload.getInv;
			}
			if (payload.checkOpenBox.exist && !payload.getInv.productsStillFitInBox) {
				UIState = StateUI.NO_MORE_PRODUCTS_FIT_CUSTOM_BOX;
			} else if (payload.getInv && payload.getInv.promoCodeStillAvailable === false) {
				UIState = StateUI.PROMO_CODE_INVALID;
			} else if (payload.checkOpenBox.exist && !state.customBoxOpen) {
				UIState = StateUI.SHOW_CHECK_CUSTOM_BOX_OPEN;
			}

			return { ...state, ...tmpState, UIState };

		default:
			return state;
	}
}

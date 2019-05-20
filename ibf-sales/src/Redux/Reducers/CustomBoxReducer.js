import * as ActionsTypes from '../Actions/ActionsTypes';
import * as StateUI from '../Actions/UIStates';

const initialState = {
	customBox: [],
	eta: null,
	cartbox: {},
	isCurrentBox: false,
	showToggle: false,
	state: StateUI.CHECKING_BOX,
	keepEditing: false,
	isEditingBox: false
};

export default function CustomBoxReducer(
	state: Object = initialState,
	{type, payload}: { type: string, payload: any }
) {
	switch (type) {
		case ActionsTypes.CHECK_OPEN_BOX:
			if (payload.success) {
				const {checkOpenBox: {exist, items, eta_date, cartbox}} = payload;

				if (exist) {
					return Object.assign({}, state, {
						isCurrentBox: true,
						customBox: [...items],
						eta: eta_date,
						cartbox,
						showToggle: true,
						isEditingBox: cartbox.current_percentage === 100
					});
				} else {
					return initialState;
				}
			}
			return initialState;
		case ActionsTypes.TOGGLE_SHOW:
			return Object.assign({}, state, {
				...state,
				showToggle: state.isCurrentBox ? !state.showToggle : false
			});
		case ActionsTypes.SHOW_CUSTOM_BOX:
			return Object.assign({}, state, {
				...state,
				showToggle: state.isCurrentBox && payload
			});
		case ActionsTypes.ADD_CUSTOM_BOX:
			if (payload.exist && payload.cartbox.current_percentage === 100) {
				return initialState;

			}
			return Object.assign({}, state, {
				cartbox: {...payload.cartbox},
				customBox: [...payload.items],
				eta: payload.eta_date,
				isCurrentBox: true,
				isFirstCustomBox: !JSON.parse(
					localStorage.getItem('dontShowCustomBoxModal')
				), showToggle: !state.isCurrentBox
			});
		case ActionsTypes.CANCEL_CUSTOM_BOX:
			return initialState;
		case ActionsTypes.CLOSE_CUSTOM_BOX:
			return initialState;
		case ActionsTypes.REMOVE_FROM_CUSTOM_BOX:
			if (payload.box.exist) {
				return Object.assign({}, state, {
					cartbox: {...payload.box.cartbox},
					customBox: [...payload.box.items],
					isCurrentBox: true,
					isEditingBox: false
				});
			} else {
				return initialState;
			}
		case ActionsTypes.EDIT_BOX:
			if (payload.success) {
				return Object.assign({}, state, {});
			}
			return state;
		case ActionsTypes.LOAD_INVENTORY:
			if (payload.success) {
				const {response: {productsStillFitInBox, isEmpty}} = payload;
				if (!productsStillFitInBox && isEmpty && state.isCurrentBox) {
					return {...state, showToggle: true};
				}
			}
			return state;

		case ActionsTypes.KEEP_EDITING_CUSTOM_BOX:
			return {...state, keepEditing: true};
		default:
			return state;
	}
}

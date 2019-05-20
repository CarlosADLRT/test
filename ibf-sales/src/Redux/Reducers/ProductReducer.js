import * as ActionsTypes from '../Actions/ActionsTypes';
import * as ModalTypes from '../../Components/Shared/Modals/ModalTypes.js';

const initialState = {
	list: [],
	totalItems: 0,
	productsStillFitInBox: null,
	promoCodeStillAvailable: null,
	promoCodeOff: null,
	isEmpty: null
};

export default function ProductReducer(state: Object = initialState, {type, payload}: { type: string, payload: any }) {

	switch (type) {
		case ActionsTypes.LOAD_INVENTORY:
			return Object.assign({}, state, {
				isLoading: false,
				list: [...payload.response.products],
				totalItems: payload.response.totalItems,
				productsStillFitInBox: payload.response.productsStillFitInBox,
				promoCodeStillAvailable: payload.response.promoCodeStillAvailable,
				promoCodeOff: payload.response.promoCodeOff,
				isEmpty: payload.response.isEmpty,
				requestingLoadInventory: false,
			});
		case ActionsTypes.CHECK_OPEN_BOX:
			if (payload.success) {
				const {getInv} = payload;
				if (getInv) {
					return Object.assign({}, state, {
						isLoading: false,
						list: [...getInv.products],
						totalItems: getInv.totalItems,
						productsStillFitInBox: getInv.productsStillFitInBox,
						promoCodeStillAvailable: getInv.promoCodeStillAvailable,
						promoCodeOff: getInv.promoCodeOff,
						isEmpty: getInv.isEmpty
					});
				}
			}
			return state;

		case ActionsTypes.CLEAN_MODAL:
			if (payload.modal === ModalTypes.PROMO_CODE_INVALID) {
				return {
					...state,
					promoCodeStillAvailable: null
				};
			}
			return state;

		case ActionsTypes.LOAD_INVENTORY_IN_BACKGROUND:
			return Object.assign({}, state, {
				list: [...payload.response.products],
				totalItems: payload.response.totalItems,
				productsStillFitInBox: payload.response.productsStillFitInBox,
				promoCodeStillAvailable: payload.response.promoCodeStillAvailable,
				promoCodeOff: payload.response.promoCodeOff
			});

		case ActionsTypes.RESTART_INVENTORY:
			return initialState;

		case ActionsTypes.ADD_TO_CART:
			return Object.assign({}, state, {});

		case ActionsTypes.REQUEST_SET_FAVORITE:
			const list = state.list.map(i => {
				if (i.inventory === payload) {
					return {...i, loadingFavorite: true};
				}
				return i;
			});
			return {...state, list};

		case ActionsTypes.SET_FAVORITE:
			if (payload.success) {
				const {favorite} = payload;
				const masterlist = Object.keys(favorite)[0];
				const tmp = state.list.reduce((array, i) => {
					if (i.masterlist === masterlist) {
						i.favorite = favorite[masterlist];
						i.loadingFavorite = false;
					}
					return [...array, {...i}];
				}, []);
				return Object.assign({}, state, {
					list: [...tmp]
				});
			}
			return state;

		case ActionsTypes.LOAD_PAGE_INVENTORY:
			return Object.assign({}, state, {
				isLoading: false,
				list: [...state.list, ...payload.response.products],
				requestingLoadInventory: false
			});

		case ActionsTypes.SET_LAST_DATE:
			return Object.assign({}, state, {
				lastDate: payload
			});

		case ActionsTypes.UPDATE_FAVORITES:
			const filteredList = payload.list.filter(item => item.favorite);
			return Object.assign({}, state, {
				list: filteredList,
				totalItems: filteredList.length
			});

		default:
			return state;
	}
}

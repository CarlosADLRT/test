import * as ActionsTypes from '../Actions/ActionsTypes';
import { processShoppingCart } from '../../Utils/Utilities';
import { toast } from '../../Services/AlertService';
import { ADD_COMPOSED_FILTER } from '../Actions/ActionsTypes';
import { CANCEL_SL_ITEM } from '../Actions/ActionsTypes';
import { FINISH_SHOPPING_LIST } from '../Actions/ActionsTypes';

const initialState = {
	shoppingCart: [],
	listBoxes: [],
	shoppingCartTotalItems: 0,
	totalPrice: 0,
	totalGift: 0,
	isLoading: true,
	totalBunches: 0,
	subtotal: 0,
	isGift: false,
	freightCost: 0,
	isEmpty: true,
	havePromos: false,
	showShoppingCart: false,
	PO: null,
	voucher: null,
	promoCode: '',
	shoppingList: null,
	voucherAvailable: null
};

export default function ShoppingCartReducer(state = initialState, { type, payload }) {
	switch (type) {
		case ActionsTypes.LIST_SHOPPING_CART:
			if (payload.success) {
				const results = payload.results;
				if (!payload.isEmpty && payload.results.list) {
					const shoppingCart = processShoppingCart(payload.results.list);
					return {
						...state,
						isLoading: false,
						isEmpty: false,
						shoppingCart,
						listBoxes: results.list,
						shoppingCartTotalItems: results.carts.length,
						totalGift: results.total_gift,
						totalBunches: results.total_bunches,
						freightCost: results.extra_freight_cost,
						totalPrice: results.total_prices,
						subtotal: results.subtotal,
						isGift: results.is_gift,
						voucher: results.voucher,
						shoppingList: results.sl ? results.sl : null,
						voucherAvailable: results.voucherAvailable
					};
				} else {
					return {
						...state,
						...initialState,
						isLoading: false,
						PO: state.PO,
						shoppingList: results && results.sl ? results.sl : null,
						voucher: results.voucher,
						voucherAvailable: results.voucherAvailable
					};
				}
			}
			return state;
		case ActionsTypes.SHOW_SHOPPING_CART:
			return Object.assign({}, state, {
				showShoppingCart: !state.showShoppingCart
			});
		case ActionsTypes.ADD_TO_CART:
			if (payload.success && !payload.isEmpty) {
				toast('Item added to cart successfully');
				const shoppingCart = processShoppingCart(payload.results.list);
				return Object.assign({}, state, {
					shoppingCart: [...shoppingCart],
					totalPrice: payload.results.total_prices,
					listBoxes: payload.results.list,
					subtotal: payload.results.subtotal,
					totalGift: payload.results.total_gift,
					shoppingCartTotalItems: payload.results.carts.length
				});
			}
			return state;
		case ActionsTypes.CLOSE_CUSTOM_BOX:
			if (payload.success) {
				const shoppingCart = processShoppingCart(payload.box.list);
				return Object.assign({}, state, {
					shoppingCart: [...shoppingCart],
					listBoxes: payload.box.list,
					totalPrice: payload.box.total_prices,
					subtotal: payload.box.subtotal,
					totalGift: payload.box.total_gift,
					shoppingCartTotalItems: payload.box.carts.length
				});
			}
			return state;
		case ActionsTypes.DELETE_BOX:
			if (payload.success) {
				toast('Box deleted successfully');
				if (payload.isEmpty) {
					return {
						...initialState,
						showShoppingCart: true
					};
				}
				const shoppingCart = processShoppingCart(payload.results.list);
				return Object.assign({}, state, {
					shoppingCart: [...shoppingCart],
					totalPrice: payload.results.total_prices,
					listBoxes: payload.results.list,
					subtotal: payload.results.subtotal,
					totalGift: payload.results.total_gift,
					shoppingCartTotalItems: payload.results.carts.length,
					voucher: payload.results.voucher
				});
			}
			return state;
		case ActionsTypes.FINISH_ORDER:
			if (payload.success) {
				return { ...state, ...initialState, PO: payload.box.purchase };
			}
			return state;
		case ActionsTypes.VALIDATE_VOUCHER:
			if (payload.success) {
				if (payload.valid) {
					return { ...state, voucher: payload.voucher };
				} else {
					toast(payload.error, 'error');
				}
			}
			return state;
		case ActionsTypes.CANCEL_VOUCHER:
			if (payload.success) {
				return { ...state, voucher: null };
			}
			return state;
		case ActionsTypes.EDIT_BOX:
			if (payload.success) {
				// TODO: Change the name of the response on the cs
				if (payload.shoppincart.list && payload.shoppincart.list.length) {
					const shoppingCart = processShoppingCart(payload.shoppincart.list);

					return Object.assign({}, state, {
						isLoading: false,
						shoppingCart,
						listBoxes: payload.shoppincart.list,
						shoppingCartTotalItems: payload.shoppincart.carts.length,
						totalGift: payload.shoppincart.total_gift,
						totalBunches: payload.shoppincart.total_bunches,
						freightCost: payload.shoppincart.extra_freight_cost,
						totalPrice: payload.shoppincart.total_prices,
						subtotal: payload.shoppincart.subtotal,
						isGift: payload.shoppincart.is_gift,
						voucher: payload.shoppincart.voucher
					});
				} else {
					return { ...state, ...initialState, isLoading: false };
				}
			}
			return state;
		case ADD_COMPOSED_FILTER:
			if (payload.composed === 'promoCode') {
				return Object.assign({}, state, {
					...state,
					promoCode: payload.value
				});
			} else return state;

		case CANCEL_SL_ITEM:
			if (payload.success) {
				return Object.assign({}, state, {
					...state,
					shoppingList: payload.box.sl
				});
			} else {
				return state;
			}
		case FINISH_SHOPPING_LIST:
			return Object.assign({}, state, {
				...state,
				shoppingList: null
			});
		default:
			return state;
	}
}

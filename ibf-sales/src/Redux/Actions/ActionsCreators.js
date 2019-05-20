import AuthService from '../../Services/AuthService';
import * as ActionsType from './ActionsTypes';
import ProductService from '../../Services/ProductService';
import ShoppingCartService from '../../Services/ShoppingCartService';
import SharedService from '../../Services/SharedService';
import CustomerService from '../../Services/CustomerService';
import UserService from '../../Services/UserService';

export const validateToken = (token, user_key) => {
	return {
		type: ActionsType.VALIDATE_TOKEN,
		payload: AuthService.validateToken(token, user_key)
	};
};

export const homeLoading = customer => {
	return {
		type: ActionsType.HOME_LOADING,
		payload: CustomerService.homeLoading(customer)
	};
};

// ProductActionsCreator

export const loadInventory = (date, customer, conditions, page, keepSearching = false) => {
	return {
		type: ActionsType.LOAD_INVENTORY,
		payload: ProductService.getInventories(date, customer, conditions, page, keepSearching)
	};
};
export const loadInventoryInBackground = (date, customer, conditions, page) => {
	return {
		type: ActionsType.LOAD_INVENTORY_IN_BACKGROUND,
		payload: ProductService.getInventories(date, customer, conditions, page)
	};
};
export const restartInventory = (isCustomBox = false) => {
	return {
		type: ActionsType.RESTART_INVENTORY,
		payload: { isCustomBox }
	};
};
export const loadInventoryPageInventory = (date, customer, conditions, page) => {
	return {
		type: ActionsType.LOAD_PAGE_INVENTORY,
		payload: ProductService.getInventories(date, customer, conditions, page)
	};
};

export const requestInventory = (
	initial = false,
	isCustomBox = false,
	firstOpenBox = false,
	keepSearching = false
) => {
	return {
		type: ActionsType.REQUEST_INVENTORY,
		payload: { initial, isCustomBox, firstOpenBox }
	};
};
export const requestPage = (initial = false) => {
	return {
		type: ActionsType.REQUEST_PAGE,
		payload: initial
	};
};

export const setFavorite = (customer, masterlist, status) => {
	return {
		type: ActionsType.SET_FAVORITE,
		payload: ProductService.setFavorite(customer, masterlist, status)
	};
};

export const requestSetFavorite = masterlist => {
	return {
		type: ActionsType.REQUEST_SET_FAVORITE,
		payload: masterlist
	};
};

export const addToCart = (
	arrival_date,
	customer,
	invKey,
	packing_date,
	quantity,
	numberBoxes,
	code
) => {
	return {
		type: ActionsType.ADD_TO_CART,
		payload: ProductService.addToCart(
			arrival_date,
			customer,
			invKey,
			packing_date,
			quantity,
			numberBoxes,
			code
		)
	};
};

export const editBox = (cartBox, customer) => {
	return {
		type: ActionsType.EDIT_BOX,
		payload: ProductService.editBox(cartBox, customer)
	};
};

export const requestEditBox = () => {
	return {
		type: ActionsType.REQUEST_EDIT_BOX
	};
};

export const requestAddToCart = () => {
	return {
		type: ActionsType.REQUEST_ADD_TO_CART
	};
};

export const changeCustomerAddress = (street, address) => {
	return {
		type: ActionsType.CHANGE_CUSTOMER_ADDRESS,
		payload: { customerStreet: street, customerAddress: address }
	};
};

// ShoppingCart Actions Creator

export const listShoppingCart = customer => {
	return {
		type: ActionsType.LIST_SHOPPING_CART,
		payload: ShoppingCartService.getShoppingCart(customer)
	};
};

export const showShoppingCart = () => {
	return {
		type: ActionsType.SHOW_SHOPPING_CART
	};
};
export const finishOrder = (user, cardKey) => {
	return {
		type: ActionsType.FINISH_ORDER,
		payload: ShoppingCartService.finishOrder(user, cardKey)
	};
};

export const initFinishOrderSaga = payload => ({
	type: ActionsType.INIT_FINISH_ORDER,
	payload
});

export const finishOrderSaga = payload => ({
	type: ActionsType.FINISH_ORDER,
	payload
});

export const requestCheckout = () => {
	return {
		type: ActionsType.REQUEST_CHECKOUT
	};
};

export const cancelSLItem = (customer, item) => {
	return {
		type: ActionsType.CANCEL_SL_ITEM,
		payload: ShoppingCartService.cancelSLItem(customer, item)
	};
};

export const requestCancelSLItem = () => {
	return {
		type: ActionsType.REQUEST_CANCEL_SL_ITEM
	};
};

export const finishSL = key => {
	return {
		type: ActionsType.FINISH_SHOPPING_LIST,
		payload: ShoppingCartService.finishSL(key)
	};
};

export const loadCards = customer => {
	return {
		type: ActionsType.LIST_CARDS,
		payload: CustomerService.loadCards(customer)
	};
};

export const changeDefaultCard = (cards, card) => {
	return {
		type: ActionsType.CHANGE_DEFAULT_CARD,
		payload: CustomerService.updateCustomerDefaultCard(cards, card)
	};
};

export const changeSelectedCard = card => {
	return {
		type: ActionsType.CHANGE_SELECTED_CARD,
		payload: card
	};
};

export const deleteCard = (customer, card, isDefault) => {
	return {
		type: ActionsType.DELETE_CARD,
		payload: CustomerService.deleteCustomerCard(customer, card, isDefault)
	};
};
export const validateVoucher = (customer, cupon) => {
	return {
		type: ActionsType.VALIDATE_VOUCHER,
		payload: ShoppingCartService.validateVoucher(customer, cupon)
	};
};
export const cancelVoucher = (customer, key) => {
	return {
		type: ActionsType.CANCEL_VOUCHER,
		payload: ShoppingCartService.cancelVoucher(customer, key)
	};
};

export const requestValidateVoucher = () => {
	return {
		type: ActionsType.REQUEST_VALIDATE_VOUCHER
	};
};

// CustomBox Actions Creator
export const toggleCustomBox = () => {
	return {
		type: ActionsType.TOGGLE_SHOW
	};
};

export const keepEditing = () => {
	return {
		type: ActionsType.KEEP_EDITING_CUSTOM_BOX
	};
};

export const showCustomBox = (payload = true) => {
	return {
		type: ActionsType.SHOW_CUSTOM_BOX,
		payload
	};
};

export const customBoxOpenModal = () => {
	return {
		type: ActionsType.CUSTOM_BOX_OPEN_MODAL
	};
};

export const requestCheckOpenBox = () => {
	return {
		type: ActionsType.REQUEST_CHECK_OPEN_BOX
	};
};

export const checkOpenBox = (customer, date, conditions, search) => {
	return {
		type: ActionsType.CHECK_OPEN_BOX,
		payload: ProductService.checkOpenBox(customer, date, conditions, search)
	};
};
export const addToBox = (customer, invKey, quantity, eta, chargeDate, packingDate) => {
	return {
		type: ActionsType.ADD_CUSTOM_BOX,
		payload: ProductService.addCustomBox(customer, invKey, quantity, eta, chargeDate, packingDate)
	};
};

export const requestAddToBox = () => {
	return {
		type: ActionsType.REQUEST_ADDING_TO_CUSTOM_BOX
	};
};
export const cancelCustomBox = (customer, cartboxes) => {
	return {
		type: ActionsType.CANCEL_CUSTOM_BOX,
		payload: ProductService.deleteBox(customer, cartboxes)
	};
};

export const requestDeleteBox = () => {
	return {
		type: ActionsType.REQUEST_DELETE_BOX
	};
};

export const deleteBox = (customer, cartboxes) => {
	return {
		type: ActionsType.DELETE_BOX,
		payload: ProductService.deleteBox(customer, cartboxes)
	};
};

export const closeCustomBox = customer => {
	return {
		type: ActionsType.CLOSE_CUSTOM_BOX,
		payload: ProductService.closeCustomBox(customer)
	};
};
export const removeFromCustomBox = (customer, itemKey, quantity) => {
	return {
		type: ActionsType.REMOVE_FROM_CUSTOM_BOX,
		payload: ProductService.removeFromCustomBox(customer, itemKey, quantity)
	};
};

export const requestRemoveFromCustomBox = () => {
	return {
		type: ActionsType.REQUEST_REMOVE_FROM_CUSTOM_BOX
	};
};

//Delivery Actions

export const listSchedule = () => {
	return {
		type: ActionsType.LIST_SCHEDULE,
		payload: SharedService.getSchedule()
	};
};

export const changeAllCustomerInfo = customer => {
	return {
		type: ActionsType.CHANGE_ALL_CUSTOMER_INFO,
		payload: customer
	};
};

export const getOrderToShip = customerKey => {
	return {
		type: ActionsType.GET_ORDER_TO_SHIP,
		payload: SharedService.getOrderToShip(customerKey)
	};
};

export const getHolidays = () => {
	return {
		type: ActionsType.GET_HOLIDAYS,
		payload: SharedService.getHolidays()
	};
};

export const changeInvalidToken = () => {
	return {
		type: ActionsType.CHANGE_INVALID_TOKEN
	}
};

export const updateFavorites = list => {
	return {
		type: ActionsType.UPDATE_FAVORITES,
		payload: { list: list }
	};
};
export const setLastDate = date => {
	return {
		type: ActionsType.SET_LAST_DATE,
		payload: date
	};
};

export const cleanUIState = () => {
	return {
		type: ActionsType.CLEAN_UI_STATE
	};
};

export const initSendReferral = (payload, form) => ({
	type: ActionsType.INIT_SEND_REFERRAL,
	payload,
	form
});

export const sendReferral = payload => ({
	type: ActionsType.SEND_REFERRAL,
	payload
});

export const errorReferral = payload => ({
	type: ActionsType.ERROR_REFERRAL,
	payload
});

export const initLoadReferral = payload => ({
	type: ActionsType.INIT_LOAD_REFERRALS,
	payload
});

export const loadReferral = payload => ({
	type: ActionsType.LOAD_REFERRALS,
	payload
});

export const initSignup = () => {
	return {
		type: ActionsType.INIT_SIGNUP
	};
};

export const signup = params => {
	return {
		type: ActionsType.SIGNUP,
		payload: UserService.signup(params)
	};
};

export const setSignUpObject = params => {
	return {
		type: ActionsType.SIGNUPOBJECT,
		payload: params
	};
};

export const loggedIn = () => {
	return {
		type: ActionsType.LOGIN_USER
	};
};

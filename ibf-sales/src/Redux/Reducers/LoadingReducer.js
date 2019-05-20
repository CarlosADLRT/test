import * as ActionsTypes from '../Actions/ActionsTypes';
import LoadingEmma from '../../Assets/Images/loadingInventoryByArrival.gif';
import LoadingEmmaCustomInventory from '../../Assets/Images/RefreshCustomInventory.gif';
import EmmaLogo from '../../Assets/Images/AddingToCart.gif';

const initialState = {
	setFavorite: false,
	setFavoriteMasterlist: null,
	addingToCart: false,
	checkingOut: false,
	validatingVoucher: false,
	isCheckingBox: false,
	initialLoading: true,
	requestingLoadInventory: false,
	requestingLoadInventoryInBackground: false,
	isLoading: true,
	spinner: null,
	firstLoadInventory: false,
	isOpenEditBox: false,
	showCustomBoxModal: false,
	isFirstCustomBox: true,
	isSignup: false,
	deletingBox: false,
	signUpState: {
		first_name: '',
		last_name: '',
		office_phone: '',
		user_email: '',
		repeatEmail: '',
		password: '',
		repeatPassword: '',
		state: 'AL',
		business: 'florist',
		street: '',
		city: '',
		zipcode: '',
		tax_id: ''
	}
};

export default function LoadingReducer(
	state: Object = initialState,
	{type, payload}
) {
	switch (type) {
		case ActionsTypes.REQUEST_SET_FAVORITE:
			return Object.assign({}, state, {
				setFavorite: true,
				setFavoriteMasterlist: payload
			});

		case ActionsTypes.SET_FAVORITE:
			return Object.assign({}, state, {
				setFavorite: false
			});

		case ActionsTypes.REQUEST_CHECK_OPEN_BOX:
			return {...state, isCheckingBox: true, spinner: LoadingEmma};

		case ActionsTypes.INIT_SIGNUP:
			return {...state, isSignup: true};

		case ActionsTypes.SIGNUP:
			return {...state, isSignup: false};

		case ActionsTypes.SIGNUPOBJECT:
			return Object.assign({}, state, {
				signUpState: {
					...state.signUpState,
					...payload
				}
			});
		case ActionsTypes.CHECK_OPEN_BOX:
			return {
				...state,
				isCheckingBox: false,
				isFirstCustomBox: !payload.checkOpenBox.exist,
				spinner: payload.getInv && payload.getInv.isEmpty && !payload.checkOpenBox.exist && state.firstLoadInventory ? LoadingEmma : null
			};

		case ActionsTypes.REQUEST_ADD_TO_CART:
			return {...state, addingToCart: true, spinner: EmmaLogo};
		case ActionsTypes.ADD_TO_CART:
			return {
				...state,
				addingToCart: false,
				requestingLoadInventoryInBackground: true
			};
		case ActionsTypes.REQUEST_VALIDATE_VOUCHER:
			return {...state, validatingVoucher: true};

		case ActionsTypes.REQUEST_REMOVE_FROM_CUSTOM_BOX:
			return {...state, isRemovingFromBox: true};

		case ActionsTypes.REMOVE_FROM_CUSTOM_BOX:
			return {...state, isRemovingFromBox: false};
		case ActionsTypes.CANCEL_CUSTOM_BOX:
			return {...state, isFirstCustomBox: true};
		case ActionsTypes.CLOSE_CUSTOM_BOX:
			return {...state, isFirstCustomBox: true};

		case ActionsTypes.REQUEST_CHECKOUT:
			return {...state, checkingOut: true};

		case ActionsTypes.REQUEST_ADDING_TO_CUSTOM_BOX:
			return {
				...state,
				isAddingToBox: true,
				spinner: LoadingEmmaCustomInventory
			};
		case ActionsTypes.ADD_CUSTOM_BOX:
			return {
				...state,
				isAddingToBox: false,
				isFirstCustomBox: false,
				showCustomBoxModal: state.isFirstCustomBox
			};

		case ActionsTypes.LOAD_INVENTORY:
			return {
				...state,
				isAddingToBox: false,
				addingToCart: false,
				initialLoading: false,
				requestingLoadInventory: false,
				isLoading: false,
				spinner: null
			};
		case ActionsTypes.FINISH_ORDER:
			return {...state, checkingOut: false};

		case ActionsTypes.VALIDATE_VOUCHER:
			return {...state, validatingVoucher: false};
		case ActionsTypes.REQUEST_INVENTORY:
			let spinner = LoadingEmma;

			if (payload.isCustomBox) {
				spinner = LoadingEmmaCustomInventory;
			}
			return Object.assign({}, state, {
				isLoading: !payload.initial,
				initialLoading: payload.initial,
				requestingLoadInventory: true,
				spinner
			});
		case ActionsTypes.LOAD_INVENTORY_IN_BACKGROUND:
			return Object.assign({}, state, {
				requestingLoadInventoryInBackground: false,requestingLoadInventory: false,
				spinner: null
			});
		case ActionsTypes.REQUEST_PAGE:
			return Object.assign({}, state, {
				requestingLoadInventory: true
			});

		case ActionsTypes.RESTART_INVENTORY:
			return initialState;
		case ActionsTypes.LOAD_PAGE_INVENTORY:
			return Object.assign({}, state, {
				isLoading: false,
				requestingLoadInventory: false
			});
		case ActionsTypes.REQUEST_EDIT_BOX:
			return {
				...state,
				isOpenEditBox: true
			};
		case ActionsTypes.CUSTOM_BOX_OPEN_MODAL:
			return {...state, showCustomBoxModal: false};
		case ActionsTypes.EDIT_BOX:
			return {
				...state,
				isOpenEditBox: false
			};
		case ActionsTypes.REQUEST_CANCEL_SL_ITEM:
			return {...state, deletingBox: true};

		case ActionsTypes.CANCEL_SL_ITEM:
			return {...state, deletingBox: false};

		case ActionsTypes.REQUEST_DELETE_BOX:
			return {...state, deletingBox: true};

		case ActionsTypes.DELETE_BOX:
			return {...state, deletingBox: false};

		default:
			return state;
	}
}

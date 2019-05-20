import {
	CHANGE_ALL_CUSTOMER_INFO,
	CHANGE_CUSTOMER_ADDRESS,
	GET_HOLIDAYS,
	VALIDATE_TOKEN,
	SIGNUP,
	LOGIN_USER,
	CHANGE_INVALID_TOKEN
} from '../Actions/ActionsTypes';
import { toast } from '../../Services/AlertService';

const initialState = {
	list: [],
	config: {},
	user: {},
	userId: '',
	customer: {},
	isNewDay: false,
	offset: null,
	token: null,
	logged: false,
	holidays: [],
	disabledDaysOfWeek: []
};

export default function AuthReducer(state: Object = initialState, { type, payload }) {
	switch (type) {
		case VALIDATE_TOKEN:
			if (payload.success) {
				payload.data.user.metadata.office_email = payload.data.user.email;
				Object.keys(payload.data.user.metadata).forEach(key => {
					if (!payload.data.user.metadata[key]) {
						payload.data.user.metadata[key] = '';
					}
				});

				localStorage.setItem('token', payload.data.token);
				return Object.assign({}, state, {
					...payload,
					customer: payload.data.user.metadata,
					logged: true,
					user: payload.data.user,
					userId: payload.data.user.user_id,
					config: payload.data.config,
					token: payload.data.token
				});
			} else {
				return Object.assign({}, state, {
					...payload,
					invalidToken: true
				});
			}
		case LOGIN_USER:
			return {
				...state,
				logged: true
			};

		case SIGNUP:
			if (payload.success) {
				payload.data.user.metadata.office_email = payload.data.user.email;
				Object.keys(payload.data.user.metadata).forEach(key => {
					if (!payload.data.user.metadata[key]) {
						payload.data.user.metadata[key] = '';
					}
				});

				localStorage.setItem('token', payload.data.token);
				return Object.assign({}, state, {
					...payload,
					customer: payload.data.user.metadata,
					logged: true,
					user: payload.data.user,
					userId: payload.data.user.user_id,
					config: payload.data.config,
					token: payload.data.token,
					invalidSignup: false
				});
			} else {
				if (payload && payload.error) {
					toast(payload.error, 'error');
				}
				return Object.assign({}, state, {
					...payload,
					invalidToken: true,
					invalidSignup: true
				});
			}

		case CHANGE_INVALID_TOKEN:
			return {
				invalidToken: false
			};
		case CHANGE_CUSTOMER_ADDRESS:
			return Object.assign({}, state, {
				customer: {
					...state.customer,
					customer_street: payload.customerStreet,
					customer_address: payload.customerAddress
				}
			});

		case CHANGE_ALL_CUSTOMER_INFO:
			return Object.assign({}, state, {
				customer: payload
			});

		case GET_HOLIDAYS:
			return Object.assign({}, state, {
				holidays: payload.holidays,
				disabledDaysOfWeek: payload.disabledDaysOfWeek
			});

		default:
			return state;
	}
}

import * as ActionsTypes from '../Actions/ActionsTypes';
const initialState = {
	error: null,
	referrals: [],
	amount: 0
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case ActionsTypes.ERROR_REFERRAL:
			return { ...state, ...payload };
		case ActionsTypes.LOAD_REFERRALS:
			return { ...state, referrals: payload.res.results, amount: payload.amountDiscount };
		default:
			return state;
	}
};

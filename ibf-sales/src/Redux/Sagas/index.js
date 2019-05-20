import { takeEvery, all } from 'redux-saga/effects';
import * as actionTypes from '../Actions/ActionsTypes';
import * as ReferralSaga from './ReferralSaga';
import * as CheckoutSaga from './CheckoutSaga';

export function* rootSaga() {
	yield all([
		takeEvery(actionTypes.INIT_SEND_REFERRAL, ReferralSaga.send),
		takeEvery(actionTypes.INIT_FINISH_ORDER, CheckoutSaga.checkoutSaga),
		takeEvery(actionTypes.INIT_LOAD_REFERRALS, ReferralSaga.load)
	]);
}

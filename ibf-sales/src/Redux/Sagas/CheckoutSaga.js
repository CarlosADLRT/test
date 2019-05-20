import ShoppingCartService from '../../Services/ShoppingCartService';
import { put } from 'redux-saga/effects';
import * as actions from '../Actions/ActionsCreators';

export function* checkoutSaga({ type, payload: { availableVoucher, customer, user, card } }) {
	if (availableVoucher) {
		const res = yield ShoppingCartService.validateVoucher(customer, availableVoucher.code);
		console.log('TCL: exportfunction*checkoutSaga -> res', res);
	}
	const data = yield ShoppingCartService.finishOrder(user, card);
	if (data.box) {
		yield put(actions.finishOrderSaga(data));
	}
	// const res = yield ShoppingCartService.finishOrder(payload);
	// if (res.success) {
	// 	yield put(actions.sendReferral());
	// 	yield put(actions.initLoadReferral(payload.customer));
	// 	toast('Referral Sent');
	// } else {
	// 	toast(res.error, 'error');
	// 	//yield put(actions.errorReferral(res.error));
	// }
}

import CustomerService from '../../Services/CustomerService';
import { put } from 'redux-saga/effects';
import * as actions from '../Actions/ActionsCreators';
import { toast } from '../../Services/AlertService';

export function* send({ type, payload, form }) {
	const res = yield CustomerService.sendReferral(payload);
	form.setSubmitting(false);
	form.resetForm();
	if (res.success) {
		yield put(actions.sendReferral());
		yield put(actions.initLoadReferral(payload.customer));
		toast('Referral Sent');
	} else {
		toast(res.error, 'error');
		//yield put(actions.errorReferral(res.error));
	}
}
export function* load({ type, payload }) {
	const res = yield CustomerService.loadReferral(payload);
	if (res.res.success) {
		yield put(actions.loadReferral(res));
	} else {
		toast(res.error, 'error');
		//yield put(actions.errorReferral(res.error));
	}
}

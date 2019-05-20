import { sbxCoreService } from '../Network';
import environment from '../environment';
import SharedService from './SharedService';
import logo from '../Assets/Images/ibf-logo.png';

export default class CustomerService {
	static homeLoading(customer) {
		return sbxCoreService
			.run(environment.cloudscripts.homeLoading, { customer }, false)
			.then(res => {
				if (res.response.body.success) {
					return res.response.body.result;
				}
			})
			.catch(error => {
				console.error(error);
			});
	}
	static sendReferral({ user, firstName, email, companyName }) {
		return sbxCoreService
			.run(environment.cloudscripts.sendReferral, { user, firstName, email, companyName }, false)
			.then(res => {
				return res.response.body;
			})
			.catch(error => {
				console.error(error);
			});
	}
	static loadReferral(customer) {
		return sbxCoreService
			.with('referral')
			.andWhereIsEqualTo('customer', customer)
			.find()
			.then(res => {
				return sbxCoreService
					.with('voucher')
					.andWhereIsEqualTo('customer', customer)
					.andWhereIsGreaterThan('quantity', 0)
					.find()
					.then(data => {
						return { res, amountDiscount: data.results.length * 15 };
					});
			})
			.catch(error => {
				console.error(error);
			});
	}

	static loadSavedAddresses(customer) {
		return sbxCoreService
			.run(environment.cloudscripts.loadAddress, { customer }, false)
			.then(res => {
				if (res.response.body.success) {
					return res.response.body.results;
				}
			})
			.catch(error => {
				console.error(error);
			});
	}

	static loadCards(customer) {
		return sbxCoreService
			.with('customer_payment_option')
			.andWhereIsEqualTo('customer', customer)
			.andWhereIsEqualTo('is_active', true)
			.find()
			.then(res => {
				return res.results;
			})
			.catch(err => {
				console.error(err);
				return [];
			});
	}
	static validateSLActive(customer) {
		return sbxCoreService
			.with('shopping_list')
			.andWhereIsEqualTo('customer', customer)
			.andWhereIsNotEqualTo('status', 'FINISHED')
			.find()
			.then(data => {
				return data.results.length ? data.results[0] : null;
			})
			.catch(err => {
				console.error(err);
				return [];
			});
	}

	static updateAddress(params) {
		return sbxCoreService
			.run(environment.cloudscripts.updateAddress, params, false)
			.then(res => {
				if (res.response.body.success) {
					return res.response.body.results;
				}
			})
			.catch(error => {
				console.error(error);
			});
	}

	static getTagData(customer) {
		return sbxCoreService
			.with('tag')
			.andWhereIsEqualTo('active', true)
			.find()
			.then(res => {
				if (res.success && res.results.length) {
					return sbxCoreService
						.run(environment.cloudscripts.getTagData, {
							tag: res.results[0]._KEY,
							customer
						})
						.then(data => {
							return data.response.body;
						})
						.then(response => {
							if (response.success) {
								return SharedService.getDataUrl(logo).then(img => {
									response.box.img = img;
									return response;
								});
							} else {
								return { success: false, error: response.error };
							}
						});
				} else {
					return { success: false, error: 'There was a error, please try again.' };
				}
			});
	}

	static getCustomerInfo(customer) {
		return sbxCoreService
			.with('customer')
			.whereWithKeys(customer)
			.fetchModels(['state'])
			.find(['state'])
			.then(res => {
				return res.results[0];
			})
			.catch(err => {
				console.error(err);
				return [];
			});
	}

	static updateCustomerInfo(customer) {
		return sbxCoreService.update('customer', customer);
	}

	static updateCustomerImage(target, file) {
		return sbxCoreService.uploadFile(target, file);
	}

	static updateCustomerDefaultCard(cardList, card) {
		cardList.forEach(item => {
			item.is_default = card._KEY === item._KEY;
		});
		const updateArray = cardList.map(item => {
			return { _KEY: item._KEY, is_default: item.is_default };
		});
		return sbxCoreService.update('customer_payment_option', updateArray).then(res => {
			return cardList;
		});
	}

	static deleteCustomerCard(customer, card, isDefault) {
		return sbxCoreService
			.run(environment.cloudscripts.deletePay, { customer, payment: card })
			.then(res => {
				if (res.response.body.success) {
					return { success: true, cards: res.response.body.payments, isDefault };
				} else {
					console.error(res.response.body.error);
					return { success: false };
				}
			});
	}

	static addCard(token, customer) {
		return sbxCoreService
			.run(
				environment.cloudscripts.addCardToCustomer,
				{
					token: token,
					customer: customer
				},
				false
			)
			.then(res => {
				return res.response.body;
			});
	}
}

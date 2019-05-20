import {sbxCoreService} from '../Network';
import environment from '../environment';

export default class ProductService {
	static getInventories(eta, customer, conditions = {}, page = 1, keepSearching) {
		const params = {eta, conditions, page, pageSize: 120, customer};
		return sbxCoreService.run(environment.cloudscripts.getCassandraInventory, params).then(res => {
			return {
				...res.response.body, keepSearching, search: (conditions.search || ''), eta,
				custom: conditions.custom
			};
		}).catch(error => {
			console.error(error);
		});
	}

	static addToCart(arrival_date, customer, invKey, packing_date, quantity, numberBoxes = 1, code = '') {
		const params = {arrival_date, customer, invKey, numberBoxes, packing_date, quantity, promo_code: code};
		return sbxCoreService.run(environment.cloudscripts.addToCart, params).then(res => {
			return res.response.body;
		}).catch(error => {
			console.error(error);
		});
	}

	static editBox(cartBox, customer) {
		const params = {cart_box_key: cartBox, customer};
		return sbxCoreService.run(environment.cloudscripts.openBox, params).then(res => {
			return res.response.body;
		}).catch(error => {
			console.error(error);
		});
	}

	static checkOpenBox(customer, date, conditions, search) {
		return sbxCoreService.run(environment.cloudscripts.checkOpenBox, {customer}).then(res => {
			const {exist, success, eta_date, cartbox} = res.response.body;
			if (success) {
				if (search) {
					conditions.search = search;
				}
				if (exist) {
					conditions = {
						custom: true,
						currentPercentage: cartbox.current_percentage,
						filters: {grower: [cartbox.grower._KEY]}
					};
					date = eta_date;
				}
				if (!date) {
					return {success: true, checkOpenBox: {...res.response.body}};
				}
				return this.getInventories(date, customer, conditions, 1).then(data => {
					console.log(data);
					return {success: true, checkOpenBox: {...res.response.body}, getInv: {...data.response}};
				});
			} else {
				return {success: false};
			}
		});
	}

	static setFavorite(customer, masterlist, status) {
		return sbxCoreService.run(environment.cloudscripts.setFavorite, {
			customer,
			masterkeys: [masterlist],
			action: status
		}).then(res => {
			return res.response.body;
		});
	}

	static addCustomBox(customer, invKey, quantity, arrival_date, charge_date, packing_date) {

		return sbxCoreService.run(environment.cloudscripts.addToBox, {
			invKey,
			customer,
			quantity,
			arrival_date,
			charge_date,
			packing_date
		}).then(res => {
			return res.response.body;
		});
	}

	static deleteBox(customer: string, cartboxes: Array<string>) {
		return sbxCoreService.run(environment.cloudscripts.cancelBox, {
			cartboxes, customer
		}).then(res => {
			return res.response.body;
		});
	}

	static closeCustomBox(customer: string) {
		return sbxCoreService.run(environment.cloudscripts.closeBox, {
			customer
		}).then(res => {
			return res.response.body;
		});
	}

	static removeFromCustomBox(customer: string, itemKey: string, quantity: number) {

		return sbxCoreService.run(environment.cloudscripts.remFromBox, {
			customer,
			itemKey,
			quantity
		}).then(res => {
			return res.response.body;
		});
	}

	static getNextDateAvailable(customer, eta, conditions) {

		return sbxCoreService.run(environment.cloudscripts.getInvAva, {
			customer,
			eta,
			conditions
		}).then(res => {
			return res.response.body;
		});
	}

}

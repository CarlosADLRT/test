import {sbxCoreService} from '../Network';
import environment from '../environment';
import {convertDateToNumberDate} from '../Utils/Utilities';

export default class SharedService {

	static isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPod/i);
		},
		iPad: function() {
			return navigator.userAgent.match(/iPad/i);
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function() {
			return (
				this.Android() ||
				this.BlackBerry() ||
				this.iOS() ||
				this.Opera() ||
				this.Windows()
			);
		}
	};

	static getSchedule() {
		return sbxCoreService.run(environment.cloudscripts.deliverySchedule, {}).then(res => {
			return res.response.body.countries;
		}).catch(error => {
			console.error(error);
		});
	}

	static getDataUrl(src) {
		return new Promise(resolve => {
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');
			const base_image = new Image();
			base_image.src = src;
			base_image.onload = function () {
				canvas.width = base_image.naturalWidth;
				canvas.height = base_image.naturalHeight;
				ctx.drawImage(base_image, 0, 0);
				resolve(canvas.toDataURL());
			};
		});
	}


	static getArrivalPerGrower() {
		return sbxCoreService.run(environment.cloudscripts.arrivalPerGrower, {}).then(res => {
			return res.response.body;
		}).catch(error => {
			console.error(error);
		});
	}

	static getCountryFlag(country_key) {
		return environment.country_flag_map[country_key];
	}

	static getManagerInfo(acc_manager) {
		return sbxCoreService.run(environment.cloudscripts.getManagerInfo, {
			acc_manager: acc_manager
		}).then(res => {
			return res.response.body;
		}).catch(error => {
			console.error(error);
		});
	}

	static getCustomerGrower(key, model) {
		return sbxCoreService.run(environment.cloudscripts.customerGrowerRelation, {
			key: key,
			model: model
		}).then(res => {
			return res.response.body;
		}).catch(error => {
			console.error(error);
		});
	}

	static changeCustomerGrowerRelationship(action, customer, grower, block_by) {
		return sbxCoreService.run(environment.cloudscripts.changeCustomerGrowerRelationship, {
			action: action,
			customer: customer,
			grower: grower,
			block_by: block_by
		}).then(res => {
			return res.response.body;
		}).catch(error => {
			console.error(error);
		});
	}

	static getStateList() {
		return sbxCoreService
			.with('state')
			.find().then(
				res => {
					return res.results;
				}
			);
	}

	static getPendingClaims(customer) {
		return sbxCoreService.with('request_claim')
			.andWhereIsEqualTo('cart_box.customer', customer)
			.andWhereIsEqualTo('state', 'Pending')
			.find();
	}

	static salesforceSync() {
		return sbxCoreService.run(environment.cloudscripts.salesforceSync, {}).then();
	}

	static getOrderToShip(customerKey) {
		return sbxCoreService.with('cart_box')
			.andWhereIsNotNull('purchase')
			.andWhereIsEqualTo('customer', customerKey)
			.andWhereIsGreaterOrEqualTo('eta_date', this.getTodayEST())
			.find().then(res => {
				if (res.results.length) {
					const order = res.results.reduce((obj, i) => {
						if (i.eta_date < obj.eta_date) {
							obj = i;
						}
						return obj;
					}, res.results[0]);

					const purchaseOrdersNumber = res.results.filter(cb => {
						return cb.purchase === order.purchase;
					}).length || 0;


					return {firstBox: order, purchaseOrdersNumber};
				} else {
					return {};

				}

			});
	}

	static getTodayEST() {
		let today = convertDateToNumberDate(new Date());
		//let tz = today.tz('America/New_York').format('YYYYMMDD');
		return parseInt(today);
	}

	static getHolidays() {
		return sbxCoreService.run(environment.cloudscripts.getDisabledDays, {}, false).then(res => {
			return res.response.body.box;
		});
	}

	static getOffset(el) {
		var _x = 0;
		var _y = 0;
		while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
			_x += el.offsetLeft - el.scrollLeft;
			_y += el.offsetTop - el.scrollTop;
			el = el.offsetParent;
		}
		return {top: _y, left: _x};
	}
}

import {sbxCoreService} from '../Network';
import environment from '../environment';

export default class ShoppingCartService {
  static getShoppingCart(customer) {
    return sbxCoreService.run(environment.cloudscripts.listCart, {customer}).then(res => {
      return res.response.body;
    }).catch(error => {
      console.error(error);
    });
  }
  
  static finishOrder(user, cardKey) {
    return sbxCoreService.run(environment.cloudscripts.checkout, {user, cardKey}).then(res => {
      return res.response.body;
    }).catch(error => {
      console.error(error);
    });
  }
  
  static validateVoucher(customer, code) {
    return sbxCoreService.run(environment.cloudscripts.validateVoucher, {customer, code}).then(res => {
      return res.response.body;
    }).catch(error => {
      console.error(error);
    });
  }
  
  static cancelVoucher(customer, voucher) {
    return sbxCoreService.run(environment.cloudscripts.cancelVoucher, {customer, voucher}).then(res => {
      return res.response.body;
    }).catch(error => {
      console.error(error);
    });
  }

  static cancelSLItem(customer, item) {
		return sbxCoreService.run(environment.cloudscripts.removeSLItem, {customer, item}).then(res => {
			return res.response.body;
		}).catch(error => {
			console.error(error);
		});
	}

	static finishSL(_KEY) {
		return sbxCoreService.update('shopping_list', {_KEY, status: 'FINISHED'}).then(res => res);
	}
}

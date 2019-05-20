import { sbxCoreService } from '../Network';
import environment from '../environment';

export default class UserService {
	static signup(params) {
		return new Promise(resolve => {
			sbxCoreService
				.run(environment.cloudscripts.signup, params)
				.then(res => {
					if (res.success) {
						resolve(res.response.body);
					} else {
						resolve({
							success: false,
							error: 'There was an error, please try again.',
							email: params.user.user_email
						});
					}
				})
				.catch(error => {
					resolve({
						success: false,
						error: 'There was an error, please try again.',
						email: params.user.user_email
					});
				});
		});
	}

	static getUsersList(customer) {
		return sbxCoreService
			.run(environment.cloudscripts.getUsersList, {
				customer: customer
			})
			.then(res => {
				return res.response.body.box;
			})
			.catch(error => {
				console.error(error);
			});
	}

	static saveAddUser(customer, is_new, role, user, user_preferences) {
		return sbxCoreService
			.run(environment.cloudscripts.signup, {
				customer: customer,
				is_new: is_new,
				role: role,
				user: user,
				user_preferences: user_preferences
			})
			.then(res => {
				return res.response.body;
			})
			.catch(error => {
				console.error(error);
			});
	}

	static addUserAdditionalInfo(row, customerUserConfig = null) {
		return sbxCoreService
			.run(environment.cloudscripts.updateUserInfo, {
				row: row,
				customerUserConfig: customerUserConfig
			})
			.then(res => {
				return res.response.body;
			})
			.catch(error => {
				console.error(error);
			});
	}
}

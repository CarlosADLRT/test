export default class MixpanelService {


	static track(event, metadata) {
		window.mixpanel.track(event, metadata);
	}

	static setPeople(user) {
		window.mixpanel.identify(user.id.toString());

		const people = {
			$email: user.email,
			$name: user.name,
			zipCode: user.metadata.customer_zipcode,
			companyName: user.metadata.customer_name,
			street: user.metadata.customer_street,
			city: user.metadata.customer_city,
			state: user.metadata.customer_state,
			country: user.metadata.customer_country || "US",
			timeZone: "EST",
			accountManager: user.metadata.account_manager,
			officePhone: user.metadata.customer_office_phone,
			adminID: user.metadata.customer_admin,
			business: user.metadata.customer_business,
			eventsPerYear: user.metadata.customer_events_per_year,
			storesQuantity: user.metadata.customer_stores_quantity,
			employeesQuantity: user.metadata.customer_employees_quantity,
			spendPerWeek: user.metadata.customer_spend_per_week
		};
		window.mixpanel.people.set(people);
	}
}

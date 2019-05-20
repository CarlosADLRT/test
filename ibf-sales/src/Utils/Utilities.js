import {format} from 'date-fns';
import env from '../environment';
import queryString from 'query-string';

export function convertDateToNumberDate(date: Date) {
	return format(date, 'YYYYMMDD');
}

export function convertToFullDate(date) {
	return format(date.toString(), 'dddd, MMMM DD, YYYY');
}

export function convertNumberDateMMMDDYYYY(date) {
	if (typeof date === 'number') date += '';
	return format(date, 'MMM DD, YYYY');
}

export function convertNumberDateToDate(number_date: number) {
	let string_date = number_date.toString();
	var year = string_date.slice(0, 4);
	var month = string_date.slice(4, 6);
	var day = string_date.slice(6, 8);
	let date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
	return date;
}

export function getStateMap() {
	return {
		AL: 'Alabama',
		AK: 'Alaska',
		AS: 'American Samoa',
		AZ: 'Arizona',
		AR: 'Arkansas',
		CA: 'California',
		CO: 'Colorado',
		CT: 'Connecticut',
		DE: 'Delaware',
		DC: 'District Of Columbia',
		FM: 'Federated States Of Micronesia',
		FL: 'Florida',
		GA: 'Georgia',
		GU: 'Guam',
		HI: 'Hawaii',
		ID: 'Idaho',
		IL: 'Illinois',
		IN: 'Indiana',
		IA: 'Iowa',
		KS: 'Kansas',
		KY: 'Kentucky',
		LA: 'Louisiana',
		ME: 'Maine',
		MH: 'Marshall Islands',
		MD: 'Maryland',
		MA: 'Massachusetts',
		MI: 'Michigan',
		MN: 'Minnesota',
		MS: 'Mississippi',
		MO: 'Missouri',
		MT: 'Montana',
		NE: 'Nebraska',
		NV: 'Nevada',
		NH: 'New Hampshire',
		NJ: 'New Jersey',
		NM: 'New Mexico',
		NY: 'New York',
		NC: 'North Carolina',
		ND: 'North Dakota',
		MP: 'Northern Mariana Islands',
		OH: 'Ohio',
		OK: 'Oklahoma',
		OR: 'Oregon',
		PW: 'Palau',
		PA: 'Pennsylvania',
		PR: 'Puerto Rico',
		RI: 'Rhode Island',
		SC: 'South Carolina',
		SD: 'South Dakota',
		TN: 'Tennessee',
		TX: 'Texas',
		UT: 'Utah',
		VT: 'Vermont',
		VI: 'Virgin Islands',
		VA: 'Virginia',
		WA: 'Washington',
		WV: 'West Virginia',
		WI: 'Wisconsin',
		WY: 'Wyoming'
	};

}

export function getStateList() {
	return [
		{name: 'Alabama', abbr: 'AL'},
		{name: 'Alaska', abbr: 'AK'},
		{name: 'American Samoa', abbr: 'AS'},
		{name: 'Arizona', abbr: 'AZ'},
		{name: 'Arkansas', abbr: 'AR'},
		{name: 'California', abbr: 'CA'},
		{name: 'Colorado', abbr: 'CO'},
		{name: 'Connecticut', abbr: 'CT'},
		{name: 'Delaware', abbr: 'DE'},
		{name: 'District Of Columbia', abbr: 'DC'},
		{name: 'Federated States Of Micronesia', abbr: 'FM'},
		{name: 'Florida', abbr: 'FL'},
		{name: 'Georgia', abbr: 'GA'},
		{name: 'Guam', abbr: 'GU'},
		{name: 'Hawaii', abbr: 'HI'},
		{name: 'Idaho', abbr: 'ID'},
		{name: 'Illinois', abbr: 'IL'},
		{name: 'Indiana', abbr: 'IN'},
		{name: 'Iowa', abbr: 'IA'},
		{name: 'Kansas', abbr: 'KS'},
		{name: 'Kentucky', abbr: 'KY'},
		{name: 'Louisiana', abbr: 'LA'},
		{name: 'Maine', abbr: 'ME'},
		{name: 'Marshall Islands', abbr: 'MH'},
		{name: 'Maryland', abbr: 'MD'},
		{name: 'Massachusetts', abbr: 'MA'},
		{name: 'Michigan', abbr: 'MI'},
		{name: 'Minnesota', abbr: 'MN'},
		{name: 'Mississippi', abbr: 'MS'},
		{name: 'Missouri', abbr: 'MO'},
		{name: 'Montana', abbr: 'MT'},
		{name: 'Nebraska', abbr: 'NE'},
		{name: 'Nevada', abbr: 'NV'},
		{name: 'New Hampshire', abbr: 'NH'},
		{name: 'New Jersey', abbr: 'NJ'},
		{name: 'New Mexico', abbr: 'NM'},
		{name: 'New York', abbr: 'NY'},
		{name: 'North Carolina', abbr: 'NC'},
		{name: 'North Dakota', abbr: 'ND'},
		{name: 'Northern Mariana Islands', abbr: 'MP'},
		{name: 'Ohio', abbr: 'OH'},
		{name: 'Oklahoma', abbr: 'OK'},
		{name: 'Oregon', abbr: 'OR'},
		{name: 'Palau', abbr: 'PW'},
		{name: 'Pennsylvania', abbr: 'PA'},
		{name: 'Puerto Rico', abbr: 'PR'},
		{name: 'Rhode Island', abbr: 'RI'},
		{name: 'South Carolina', abbr: 'SC'},
		{name: 'South Dakota', abbr: 'SD'},
		{name: 'Tennessee', abbr: 'TN'},
		{name: 'Texas', abbr: 'TX'},
		{name: 'Utah', abbr: 'UT'},
		{name: 'Vermont', abbr: 'VT'},
		{name: 'Virgin Islands', abbr: 'VI'},
		{name: 'Virginia', abbr: 'VA'},
		{name: 'Washington', abbr: 'WA'},
		{name: 'West Virginia', abbr: 'WV'},
		{name: 'Wisconsin', abbr: 'WI'},
		{name: 'Wyoming', abbr: 'WY'}
	];
}

export function roundUp(num = 0) {
	if (!num) {
		return 0;
	}
	num = num.toFixed(2);
	let delimiter = ','; // replace comma if desired
	let a = num.split('.', 2);
	let d = a[1] || '0';
	let i = parseInt(a[0]);
	let minus = '';
	if (i < 0) {
		minus = '-';
	}
	i = Math.abs(i);
	let n = String(i);
	a = [];
	while (n.length > 3) {
		let nn = n.substr(n.length - 3);
		a.unshift(nn);
		n = n.substr(0, n.length - 3);
	}
	if (n.length > 0) {
		a.unshift(n);
	}
	n = a.join(delimiter);
	if (d.length < 1) {
		num = n;
	} else {
		num = n + '.' + d;
	}
	num = minus + num;
	return num;
}

export function processShoppingCart(list) {
	return list.map((itemAfter) => {
		const unique = [];
		const objMasterlist = {};

		itemAfter.cartboxes.forEach(cartbox => {
			cartbox.picture = cartbox.custom ? 'prod/assets/images/custom-box.png' : env.publicPath + cartbox.img[0];
			if (cartbox.custom) {
				cartbox.name = 'Custom Box Special Pack';
			} else {
				cartbox.name = `${cartbox.product_group.common_name}
          ${cartbox.variety.variety_name}${cartbox.grade ? ' ' + cartbox.grade.grade : ''} ${cartbox.length}cm`;
			}

			// Se realiza la agrupación, además se calcula el precio y se dejada guardad en la variable allCartboxes
			// los keys de todos los cartboxes agrupados.
			const masterlist = `${cartbox.items[0].inventory.masterlist}_${cartbox.off}`;
			if (!objMasterlist[masterlist] && !cartbox.custom) {
				cartbox.quantity = 1;
				cartbox.allBoxes = [cartbox._KEY];
				cartbox.totalPriceQuantity = cartbox.price * (1 - cartbox.off);
				objMasterlist[masterlist] = cartbox;
				unique.push(cartbox);
			} else {
				if (cartbox.custom) {
					objMasterlist[masterlist + 'c'] = cartbox;
					cartbox.quantity = 1;
					cartbox.allBoxes = [cartbox._KEY];
					cartbox.totalPriceQuantity = cartbox.price * (1 - cartbox.off);
					unique.push(cartbox);
				} else {
					objMasterlist[masterlist].quantity++;
					objMasterlist[masterlist].allBoxes.push(cartbox._KEY);
					objMasterlist[masterlist].totalPriceQuantity += cartbox.price * (1 - cartbox.off);
				}
			}
		});
		const groupCart = {...itemAfter};
		groupCart.cartboxes = unique;
		return groupCart;
	});

}

export function mapCreditCards(list) {
	return list.map(item => {
		switch (item.card_brand) {
			case 'Visa':
				item.icon = 'visa';
				break;
			case 'MasterCard':
				item.icon = 'mastercard';
				break;
			case 'Discover':
				item.icon = 'discover';
				break;
			case 'Diners Club':
				item.icon = 'diners';
				break;
			case 'JCB':
				item.icon = 'jcb';
				break;
			case 'American Express':
				item.icon = 'amex';
				break;
			default:
				item.icon = '';
				break;
		}
		return item;
	});

}

export function getQuantity(quantity, uom, stemsPerBunch) {
	return uom === 'stem' ? Math.floor(quantity / stemsPerBunch) : quantity;
}

export function overflowHideBody(operator) {
	const tmp = document.querySelector('body').classList;
	if (operator) {

		tmp.add('modal-open');
	} else {
		tmp.remove('model-open');
	}
}

export function getPhoneLabel(phone) {
	let response = '';

	if (phone) {
		response += '(' + phone.substring(0, 3) + ') ';
		response += phone.substring(3, 6) + '-' + phone.substring(6);
	}

	return response;
}

export function addDaysToNumberDate(numberDate: number, days) {
	const date = convertNumberDateToDate(numberDate);
	date.setDate(date.getDate() + days);
	return convertDateToNumberDate(date);
}

export function getDisabledDays(holidays, daysOfWeek) {
	let response = [{daysOfWeek: daysOfWeek}, {before: new Date()}];

	holidays.forEach(day => {
		response.push(convertNumberDateToDate(day.date));
	});

	return response;
}


export function getAvailableBoxes(available, total_box) {
	let total = Math.abs(Math.floor(available / total_box));
	if (total > 30) {
		total = 30;
	}
	return Array(total).fill(1);
}

export function getBunchesAvailable(available: number, custom_percentage: number, isCurrentBox: boolean, current_percentage: number) {
	if (isCurrentBox) {
		const total_box = Math.floor((100 - current_percentage) / custom_percentage);
		return available >= total_box ? total_box : available <= 0 ? 0 : available;
	} else {
		return available >= Math.floor(100 / custom_percentage) ? Math.floor(100 / custom_percentage) : available <= 0 ? 0 : available;
	}
}

export function generateParams(date, location, excludes = []) {
	const params = queryString.parse(location.search.slice(1));
	params.date = date || convertDateToNumberDate(new Date());
	excludes.forEach(item => {
		delete params[item];
	});
	return '?' + queryString.stringify(params);
}

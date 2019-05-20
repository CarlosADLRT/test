import * as ActionTypes from '../Actions/ActionsTypes';
import _ from 'lodash';

const initialState = {
	filters: {},
	singleFilters: {},
	conditions: {
		custom: undefined,
		currentPercentage: undefined,
		favorite: false,
		special: false,
		holiday: false,
		promoCodeState: false,
		seasonState: false,
		promoCode: '',
		orderBy: 'variety',
		season: '',
		filters: {
			category: [],
			product_group: [],
			variety: [],
			country: [],
			grower: [],
			length: [],
			color: []
		}
	}
};

export default function FilterReducer(
	state: Object = initialState,
	{ type, payload }: { type: string, payload: any }
) {
	let conditionsTmp = { ...state.conditions };
	switch (type) {
		case ActionTypes.LOAD_INVENTORY:
			if (!payload.response.promoCodeStillAvailable) {
				conditionsTmp.promoCodeState = false;
				conditionsTmp.promoCode = '';
			}
			return {
				...state,
				filters: _.cloneDeep(payload.response.filters || {}),
				singleFilters: _.cloneDeep(payload.response.singleFilters || {}),
				conditions: { ...conditionsTmp }
			};

		case ActionTypes.ADD_FILTER:
			return {
				...state,
				conditions: {
					...state.conditions,
					filters: {
						...state.conditions.filters,
						[payload.type]: [...state.conditions.filters[payload.type], payload.key]
					}
				}
			};

		case ActionTypes.REMOVE_FILTER:
			return {
				...state,
				conditions: {
					...state.conditions,
					filters: {
						...state.conditions.filters,
						[payload.type]: state.conditions.filters[payload.type].filter(
							key => key !== payload.key
						)
					}
				}
			};

		case ActionTypes.TOGGLE_SINGLE_FILTER:
			return {
				...state,
				conditions: {
					...state.conditions,
					[payload.type]: !state.conditions[payload.type]
				}
			};

		case ActionTypes.TOGGLE_SORT_FILTER:
			return {
				...state,
				conditions: {
					...state.conditions,
					[payload.type]: payload.value
				}
			};

		case ActionTypes.TOGGLE_COMPOSED_FILTER:
			return {
				...state,
				conditions: {
					...state.conditions,
					[payload.type]: !state.conditions[payload.type],
					[payload.composed]: payload.value
				}
			};

		case ActionTypes.ADD_COMPOSED_FILTER:
			return {
				...state,
				conditions: {
					...state.conditions,
					[payload.type]: true,
					[payload.composed]: payload.value
				}
			};

		case ActionTypes.REMOVE_COMPOSED_FILTER:
			return {
				...state,
				conditions: {
					...state.conditions,
					[payload.type]: false,
					[payload.composed]: ''
				}
			};

		case ActionTypes.REMOVE_ALL_FILTERS:
			return {
				...state,
				conditions: {
					...state.conditions,
					filters: {
						...initialState.conditions.filters,
						grower: state.conditions.custom ? state.conditions.filters.grower : []
					}
				}
			};

		case ActionTypes.ADD_SEARCH_FILTER:
			if (payload) {
				return {
					...state,
					conditions: { ...state.conditions, search: payload }
				};
			}
			const conditions = { ...state.conditions };
			delete conditions.search;
			return {
				...state,
				conditions
			};

		case ActionTypes.CHECK_OPEN_BOX:
			if (payload.success) {
				const {
					checkOpenBox: { exist, cartbox },
					getInv
				} = payload;
				if (exist) {
					return {
						...state,
						conditions: {
							...state.conditions,
							custom: true,
							currentPercentage: cartbox.current_percentage,
							filters: {
								...state.conditions.filters,
								grower: [cartbox.grower._KEY]
							}
						}
					};
				} else {
					if (getInv) {
						if (!getInv.promoCodeStillAvailable) {
							conditionsTmp.promoCodeState = false;
							conditionsTmp.promoCode = '';
						}
						return {
							...state,
							filters: _.cloneDeep(getInv.filters || {}),
							singleFilters: _.cloneDeep(getInv.singleFilters || {}),
							conditions: { ...state.conditions, ...conditionsTmp }
						};
					}
				}
			}
			return state;

		case ActionTypes.ADD_CUSTOM_BOX:
			if (payload.success) {
				const { exist, cartbox } = payload;
				if (exist) {
					if (cartbox.current_percentage === 100) {
						return initialState;
					}
					return {
						...state,
						conditions: {
							...state.conditions,
							custom: true,
							currentPercentage: cartbox.current_percentage,
							filters: {
								...state.conditions.filters,
								grower: [cartbox.grower._KEY]
							}
						}
					};
				}
			}
			return state;
		case ActionTypes.REMOVE_FROM_CUSTOM_BOX:
			if (payload.success) {
				const { exist, cartbox } = payload.box;
				if (exist) {
					return {
						...state,
						conditions: {
							...state.conditions,
							custom: true,
							currentPercentage: cartbox.current_percentage,
							filters: {
								...state.conditions.filters,
								grower: [cartbox.grower._KEY]
							}
						}
					};
				} else {
					return initialState;
				}
			}
			return state;

		case ActionTypes.CANCEL_CUSTOM_BOX:
			return initialState;

		case ActionTypes.CLOSE_CUSTOM_BOX:
			return initialState;

		case ActionTypes.RESTART_INVENTORY:
			if (payload.isCustomBox) {
				return {
					...initialState,
					conditions: {
						filters: {
							grower: state.conditions.filters.grower
						},
						custom: state.conditions.custom,
						promoCode: state.conditions.promoCode
					}
				};
			}
			return initialState;

		case ActionTypes.CLEAN_CONDITIONS:
			return {
				...initialState,
				conditions: { ...initialState.conditions, [payload]: state.conditions[payload] }
			};
		default:
			return state;
	}
}

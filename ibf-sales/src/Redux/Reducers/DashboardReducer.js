import * as ActionsTypes from '../Actions/ActionsTypes';

const initialState = {
  finished: false,
	trackPackageInfo: {},
  home: {
    countries: [],
    favorites: [],
    growerArrival: {},
    highlightedProduct: [],
    bulk_promo: [],
    isSeason: false
  }
};

export default function DashboardReducer(state: Object = initialState, {type, payload}: { type: string, payload: any }){

  switch (type) {
    case ActionsTypes.HOME_LOADING:
      return Object.assign({}, state, {
        home: payload,
        finished: true
      });
		case ActionsTypes.GET_ORDER_TO_SHIP:
			return Object.assign({}, state, {
				trackPackageInfo: payload
			});
    default:
      return state;
  }

}

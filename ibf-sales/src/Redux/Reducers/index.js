import { combineReducers } from 'redux';
import ShoppingCartReducer from './ShoppingCartReducer';
import AuthReducer from './AuthReducer';
import ProductReducer from './ProductReducer';
import FilterReducer from './FilterReducer';
import ModalReducer from './ModalReducer';

import LoadingReducer from './LoadingReducer';
import CustomBoxReducer from './CustomBoxReducer';
import CardsReducer from './CardsReducer';
import DashboardReducer from './DashboardReducer';
import UIReducer from './UIReducer';
import ReferralReducer from './ReferralReducer';
/*
  Store
  Redux apps have a single store which takes
  1. All Reducers which we combined into `rootReducer`
  2. An optional starting state - similar to React's getInitialState
*/

const RootReducer = combineReducers({
	ShoppingCartReducer,
	AuthReducer,
	ProductReducer,
	LoadingReducer,
	FilterReducer,
	CustomBoxReducer,
	ModalReducer,
	CardsReducer,
	DashboardReducer,
	UIReducer,
	ReferralReducer
});

export default RootReducer;

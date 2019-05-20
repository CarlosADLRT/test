import RootReducer from './Reducers';
import createSagaMiddleware from 'redux-saga';

import { applyMiddleware, compose, createStore } from 'redux';
import ReduxPromise from 'redux-promise';
import TrackJSLogger from './Middleware/TrackJSLogger';
import MixPanelMiddleware from './Middleware/MixPanelMiddleware';
import { rootSaga } from './Sagas';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

const Store = createStore(
	RootReducer,
	composeEnhancers(applyMiddleware(sagaMiddleware, ReduxPromise, TrackJSLogger, MixPanelMiddleware))
);
sagaMiddleware.run(rootSaga);
export default Store;

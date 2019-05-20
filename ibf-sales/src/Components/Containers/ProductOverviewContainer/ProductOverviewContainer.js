import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import queryString from 'query-string';
import * as _ from 'lodash';
import { convertDateToNumberDate } from '../../../Utils/Utilities';
import ProductOverviewComponent from '../../Presentational/ProductOverviewComponent/ProductOverviewComponent';
import * as ActionsCreators from '../../../Redux/Actions/ActionsCreators';
import * as ActionsCreatorsFilter from '../../../Redux/Actions/FilterActionsCreators';
import * as ActionsCreatorsModal from '../../../Redux/Actions/ModalActionsCreators';
import {
	CLOSE_CUSTOM_BOX_MODAL,
	NEXT_AVAILABLE_DATE_MODAL,
	OPEN_CUSTOM_BOX,
	PROMO_CODE_INVALID,
	CUSTOM_BOX_OPEN
} from '../../Shared/Modals/ModalTypes';
import * as StateUI from '../../../Redux/Actions/UIStates';
import { CUSTOM_BOX_OPEN_MODAL } from '../../../Redux/Actions/ActionsTypes';

class ProductOverviewContainer extends Component {
	constructor(props) {
		super(props);
		this.generateParams = this.generateParams.bind(this);
		this.checkUrlFiltering = this.checkUrlFiltering.bind(this);
		this.state = {
			search: null,
			date: null,
			page: 1,
			loadingBoxes: true
		};
	}

	generateParams(date, excludes = []) {
		const params = queryString.parse(this.props.location.search.slice(1));
		params.date = date || convertDateToNumberDate(new Date());
		let datesParams = { date };
		this.setState(datesParams);

		excludes.forEach(item => {
			delete params[item];
		});

		this.props.history.push({
			pathname: '/search',
			search: `?${queryString.stringify(params)}`
		});
	}

	checkUrlFiltering(param, key) {
		const { isCurrentBox, conditions, addComposedFilter, location, isCheckingBox } = this.props;
		const value = queryString.parse(location.search.slice(1))[param];
		if (Boolean(value) && !Boolean(conditions[key]) && !isCurrentBox && !isCheckingBox) {
			addComposedFilter({ type: `${key}State`, composed: key, value });
			return true;
		}
		return false;
	}

	componentDidMount() {
		const { checkOpenBox, customer, requestCheckOpenBox } = this.props;

		let { date, search, season: seasonQuery, promo_code } = queryString.parse(
			this.props.location.search
		);
		if (!date) {
			date = convertDateToNumberDate(new Date());
		}
		requestCheckOpenBox();
		const season = this.checkUrlFiltering('season', 'season');
		const promoCode = this.checkUrlFiltering('promo_code', 'promoCode');
		const tmpConditions = {};
		if (season) {
			tmpConditions.seasonState = true;
			tmpConditions.season = seasonQuery;
		}
		if (promoCode) {
			tmpConditions.promoCodeState = true;
			tmpConditions.promoCode = promo_code;
		}
		checkOpenBox(customer.customer, date, { ...this.props.conditions, ...tmpConditions }, search);
	}

	receiver = param => {
		const {
			eta,
			location,
			isCheckingBox,
			requestingLoadInventory,
			isCurrentBox,
			requestingLoadInventoryInBackground
		} = this.props;
		const { currentDate, maxSearchDate } = this.state;
		let { date } = queryString.parse(location.search);
		if (!date) {
			date = convertDateToNumberDate(new Date());
			this.generateParams(eta || date);
		} else {
			date = parseInt(date, 10);
		}

		if (!isCheckingBox && (!requestingLoadInventory || isCurrentBox)) {
			if (requestingLoadInventoryInBackground) {
				this.loadInventoryInBackground(date);
			} else {
				this.loadInventory(date, 1, param, currentDate < maxSearchDate && !isCurrentBox);
			}
		}
	};

	loadInventory = (dateParam, page, param, keepSearching) => {
		const { customer, requestInventory, loadInventory, conditions, eta, isCurrentBox } = this.props;
		let { date, search } = queryString.parse(this.props.location.search);
		if (!date) {
			date = convertDateToNumberDate(new Date());
		}
		const tmpConditions = {};
		if (search) {
			tmpConditions.search = search;
		}
		requestInventory(true, isCurrentBox, param);
		this.setState(prev => ({ ...prev, page: 1 }));
		loadInventory(
			eta || dateParam || date,
			customer.customer,
			{ ...conditions, ...tmpConditions },
			page,
			keepSearching
		);
	};

	loadInventoryInBackground = (dateParam, page) => {
		const { customer, loadInventoryInBackground, conditions } = this.props;
		let { date, search } = queryString.parse(this.props.location.search);
		if (!date) {
			date = convertDateToNumberDate(new Date());
		}

		const tmpConditions = {};
		if (search) {
			tmpConditions.search = search;
		}
		this.setState(prev => ({ ...prev, page: 1 }));
		loadInventoryInBackground(
			dateParam || date,
			customer.customer,
			{ ...conditions, ...tmpConditions },
			page
		);
	};

	componentWillUnmount() {
		this.props.restartInventory(this.props.isCurrentBox);
		let { date } = queryString.parse(this.props.location.search);
		this.props.setLastDate(date);
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const {
			isCurrentBox,
			openModal,
			location,
			conditions,
			spinner,
			closeCustomBox,
			showCustomBoxModal,
			customer,
			UIState,
			cleanUIState
		} = this.props;
		//
		let { date } = queryString.parse(location.search);
		if (!date) {
			date = convertDateToNumberDate(new Date());
		}
		switch (UIState) {
			case StateUI.NO_MORE_PRODUCTS_FIT_CUSTOM_BOX:
				openModal({ modal: CLOSE_CUSTOM_BOX_MODAL });
				cleanUIState();
				break;
			case StateUI.ADDED_TO_BOX:
				if (showCustomBoxModal && !spinner && !localStorage.getItem('dontShowCustomBoxModal')) {
					openModal({ modal: OPEN_CUSTOM_BOX });
				}
				cleanUIState();
				break;
			case StateUI.FULL_CUSTOM_BOX:
				closeCustomBox(customer.customer);
				cleanUIState();
				break;
			case StateUI.ADDED_TO_CART:
				this.receiver();
				cleanUIState();
				break;
			case StateUI.PROMO_CODE_INVALID:
				openModal({ modal: PROMO_CODE_INVALID });
				this.generateParams(date, ['promo_code']);
				cleanUIState();
				break;
			case StateUI.SHOW_FIRST_BOX_OPEN:
				openModal({ modal: CUSTOM_BOX_OPEN_MODAL });
				cleanUIState();
				break;
			case StateUI.SHOW_CHECK_CUSTOM_BOX_OPEN:
				openModal({ modal: CUSTOM_BOX_OPEN });
				cleanUIState();
				break;
			default:
				break;
		}

		if (
			prevProps.location.search !== location.search ||
			!_.isEqual(prevProps.conditions, conditions)
		) {
			const customBoxOpen = !prevProps.isCurrentBox && isCurrentBox;
			this.receiver(customBoxOpen);
		}

		if (this.props.conditions.favorite) {
			if (prevProps.setFavorite && !this.props.setFavorite) {
				this.props.updateFavorites(this.props.list);
			}
		}
	}

	scroll = () => {
		const {
			customer: { customer },
			conditions,
			requestPage,
			loadInventoryPageInventory
		} = this.props;
		let { date, search } = queryString.parse(this.props.location.search);
		const tmpConditions = {};
		if (search) {
			tmpConditions.search = search;
		}
		requestPage();
		loadInventoryPageInventory(
			date,
			customer,
			{ ...conditions, ...tmpConditions },
			this.state.page + 1
		);
		this.setState(prevState => ({ ...prevState, page: prevState.page + 1 }));
	};

	render() {
		const { search, date } = queryString.parse(this.props.location.search.slice(1));
		const {
			list,
			isLoading,
			totalItems,
			isCurrentBox,
			openModal,
			cartbox,
			productsStillFitInBox,
			UIState,
			initialLoading,
			isRemovingFromBox,
			addingToCart,
			requestingLoadInventory,
			isCheckingBox,
			spinner,
			toggleCustomBox,
			showToggle,
			showCustomBox,
			isEmpty
		} = this.props;
		const { maxSearchDate, currentDate } = this.state;
		return (
			<Fragment>
				<ProductOverviewComponent
					isCurrentBox={isCurrentBox}
					isCheckingBox={isCheckingBox}
					productsStillFitInBox={productsStillFitInBox}
					spinner={spinner}
					cartbox={cartbox}
					list={list}
					isRemovingFromBox={isRemovingFromBox}
					isLoading={isLoading}
					currentDate={currentDate}
					maxSearchDate={maxSearchDate}
					initialLoading={initialLoading}
					loadMore={this.scroll}
					showToggle={showToggle}
					totalItems={totalItems}
					toggleCustomBox={toggleCustomBox}
					showCustomBox={showCustomBox}
					addingToCart={addingToCart}
					isEmpty={isEmpty}
					nextAvailableModal={() => {
						openModal({
							modal: NEXT_AVAILABLE_DATE_MODAL,
							data: {
								eta: date,
								conditions: { search: search },
								generateParams: this.generateParams
							}
						});
					}}
					requestingLoadInventory={requestingLoadInventory}
					UIState={UIState}
				/>
			</Fragment>
		);
	}
}

function mapStateToProps({
	ProductReducer,
	CustomBoxReducer,
	LoadingReducer,
	AuthReducer,
	FilterReducer,
	ModalReducer,
	UIReducer
}) {
	const {
		list,
		totalItems,
		productsStillFitInBox,
		isEmpty,
		promoCodeStillAvailable
	} = ProductReducer;
	const { isCurrentBox, eta, cartbox, showToggle, isEditingBox } = CustomBoxReducer;
	const { customer } = AuthReducer;
	const { conditions } = FilterReducer;
	const { promoCodeInvalid, closeCustomBoxModal } = ModalReducer;
	const {
		addingToCart,
		isRemovingFromBox,
		isCheckingBox,
		setFavorite,
		initialLoading,
		requestingLoadInventory,
		requestingLoadInventoryInBackground,
		isLoading,
		spinner,
		firstLoadInventory,
		showCustomBoxModal
	} = LoadingReducer;
	const { UIState } = UIReducer;
	return {
		list,
		customer,
		isLoading,
		totalItems,
		isCurrentBox,
		conditions,
		eta,
		cartbox,
		isCheckingBox,
		productsStillFitInBox,
		initialLoading,
		addingToCart,
		requestingLoadInventory,
		requestingLoadInventoryInBackground,
		isRemovingFromBox,
		setFavorite,
		spinner,
		firstLoadInventory,
		isEmpty,
		showToggle,
		promoCodeStillAvailable,
		promoCodeInvalid,
		showCustomBoxModal,
		UIState,
		closeCustomBoxModal,
		isEditingBox
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			loadInventory: ActionsCreators.loadInventory,
			loadInventoryInBackground: ActionsCreators.loadInventoryInBackground,
			requestInventory: ActionsCreators.requestInventory,
			checkOpenBox: ActionsCreators.checkOpenBox,
			closeCustomBox: ActionsCreators.closeCustomBox,
			loadInventoryPageInventory: ActionsCreators.loadInventoryPageInventory,
			restartInventory: ActionsCreators.restartInventory,
			openModal: ActionsCreatorsModal.openModal,
			cleanModal: ActionsCreatorsModal.cleanModal,
			requestPage: ActionsCreators.requestPage,
			requestCheckOpenBox: ActionsCreators.requestCheckOpenBox,
			updateFavorites: ActionsCreators.updateFavorites,
			setLastDate: ActionsCreators.setLastDate,
			searchFilter: ActionsCreatorsFilter.searchFilter,
			clearConditions: ActionsCreatorsFilter.clearConditions,
			addComposedFilter: ActionsCreatorsFilter.addComposedFilter,
			removeComposedFilter: ActionsCreatorsFilter.removeComposedFilter,
			toggleCustomBox: ActionsCreators.toggleCustomBox,
			customBoxOpenModal: ActionsCreators.customBoxOpenModal,
			cleanUIState: ActionsCreators.cleanUIState,
			showCustomBox: ActionsCreators.showCustomBox
		},
		dispatch
	);
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductOverviewContainer);

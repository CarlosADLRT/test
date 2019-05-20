import * as ActionsType from './ActionsTypes';

export const openModal = data => {
	return {
		type: ActionsType.OPEN_MODAL,
		payload: data
	};
};

export const closeModal = data => {
	return {
		type: ActionsType.CLOSE_MODAL,
		payload: data
	};
};

export const cleanModal = data => {
	return {
		type: ActionsType.CLEAN_MODAL,
		payload: data
	};
};

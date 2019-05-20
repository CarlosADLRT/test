import * as ActionsType from './ActionsTypes';

export const addFilter = (data: Object) => {
  return ({
    type: ActionsType.ADD_FILTER,
    payload: data
  });
};

export const removeFilter = (data: Object) => {
  return ({
    type: ActionsType.REMOVE_FILTER,
    payload: data
  });
};

export const toggleSingleFilter = (data: Object) => {
  return ({
    type: ActionsType.TOGGLE_SINGLE_FILTER,
    payload: data
  });
};

export const toggleSortFilter = (data: Object) => {
  return ({
    type: ActionsType.TOGGLE_SORT_FILTER,
    payload: data
  });
};

export const toggleComposedFilter = (data: Object) => {
  return ({
    type: ActionsType.TOGGLE_COMPOSED_FILTER,
    payload: data
  });
};

export const addComposedFilter = (data: Object) => {
  return ({
    type: ActionsType.ADD_COMPOSED_FILTER,
    payload: data
  });
};

export const removeComposedFilter = (data: Object) => {
  return ({
    type: ActionsType.REMOVE_COMPOSED_FILTER,
    payload: data
  });
};

export const removeAllFilters = () => {
  return ({
    type: ActionsType.REMOVE_ALL_FILTERS,
    payload: true
  });
};

export const searchFilter = (search: string) => {
  return ({
    type: ActionsType.ADD_SEARCH_FILTER,
    payload: search
  });
};
export const clearConditions = ({type}) => {
  return ({
    type: ActionsType.CLEAN_CONDITIONS,
    payload: type
  });
};

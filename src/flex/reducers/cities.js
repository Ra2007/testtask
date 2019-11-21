import * as types from '../types';

const initialState = {
  list: [],
  loading: false,
  error: null
};

const tests = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.CITY_ITEM_UPDATE:
      return {
        ...state,
        list: state.list.map(item =>
          item.id === payload.id ? { ...item, ...payload } : item
        )
      };

    case types.CITY_START:
      return {
        ...state,
        loading: true
      };

    case types.CITY_SET_ITEM_LIST:
      return {
        ...state,
        list: [
          ...state.list,
          { id: state.list.length + 1, status: 'ACTIVE', ...payload }
        ],
        loading: false,
        error: null
      };

    case types.CITY_SET_ERROR:
      return {
        ...state,
        loading: false,
        error: payload
      };

    case types.CITY_ITEM_UP:
    case types.CITY_ITEM_DOWN:
    case types.CITY_SET_STATUS:
      return {
        ...state,
        list: payload
      };

    default:
      return state;
  }
};

export default tests;

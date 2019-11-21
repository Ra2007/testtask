import getWeatherRequest from '../../api/getWeather';
import * as types from '../types';

export const getWeatherCity = city => dispatch => {
  return getWeatherRequest(city)
    .then(({ data }) => {
      if (data.count) {
        dispatch({
          type: types.CITY_SET_ITEM_LIST,
          payload: {
            city: data.list[0].name,
            temp: data.list[0].main.temp
          }
        });
      } else {
        dispatch({
          type: types.CITY_SET_ERROR,
          payload: 'City not found'
        });
      }
    })
    .catch(({ response }) =>
      dispatch({
        type: types.CITY_SET_ERROR,
        payload: response.data.message
      })
    );
};

const swapArrayElements = (arr, id, direction, tab) => {
  const indexId = arr.findIndex(x => x.id === id);
  const up = direction === 'up';
  let replIndexId = up ? indexId - 1 : indexId + 1;

  if (tab !== 'ALL') {
    const indexArr = arr
      .map((item, index) => (item.status === tab ? `${index}` : false))
      .filter(f => f)
      .map(item => +item);
    const subIndexId = indexArr.findIndex(x => x === indexId);
    const replSubindex = up ? subIndexId - 1 : subIndexId + 1;
    if (replSubindex > 0 && replSubindex < indexArr.length - 1) {
      replIndexId = indexArr[replSubindex];
    }
  }

  if (arr.length === 1) return arr;
  if (replIndexId < 0 || replIndexId > arr.length - 1) return arr;

  const newArr = arr.map((item, index) => {
    if (index === indexId) return { ...item, id: arr[replIndexId].id };
    if (index === replIndexId) return { ...item, id: arr[indexId].id };
    return item;
  });

  return newArr;
};

export const cityUp = (id, tab) => (dispatch, getState) => {
  const { list } = getState().cities;
  const newList = swapArrayElements(list, id, 'up', tab);
  dispatch({
    type: types.CITY_ITEM_UP,
    payload: newList
  });
};

export const cityDown = (id, tab) => (dispatch, getState) => {
  const { list } = getState().cities;
  const newList = swapArrayElements(list, id, 'down', tab);
  dispatch({
    type: types.CITY_ITEM_DOWN,
    payload: newList
  });
};

export const citySetStatus = id => (dispatch, getState) => {
  const { list } = getState().cities;
  const newList = list.map(city => {
    return city.id === id
      ? { ...city, status: city.status === 'ACTIVE' ? 'DELETED' : 'ACTIVE' }
      : city;
  });
  dispatch({
    type: types.CITY_SET_STATUS,
    payload: newList
  });
};

export const cityUpdate = params => dispatch => {
  dispatch({
    type: types.CITY_ITEM_UPDATE,
    payload: params
  });
};

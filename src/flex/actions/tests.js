import getWeatherRequest from '../../api/getWeather';

export const getWeatherCity = city => dispatch => {
  return getWeatherRequest(city)
    .then(data => console.log(data))
    .catch(error => console.log(error));
};

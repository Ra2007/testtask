import axios from 'axios';

export default city =>
  axios.get('/find', {
    crossdomain: true,
    params: {
      q: city,
      units: 'metric',
      lang: 'ru',
      appid: 'a58d438f61269b43b1131353c9e35833'
    }
  });

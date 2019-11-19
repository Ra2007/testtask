import axios from 'axios';

export default city =>
  axios.get('/weather', {
    params: {
      q: city,
      appid: 'a58d438f61269b43b1131353c9e35833'
    },
    mode: 'cors'
  });

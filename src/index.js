import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import Routes from './Routes';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';

import './index.css';

import store from './flex';

axios.defaults.baseURL = 'https://samples.openweathermap.org/data/2.5';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.params = { appid: 'a58d438f61269b43b1131353c9e35833' };

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

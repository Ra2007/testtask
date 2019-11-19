import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';
import { createLogger } from 'redux-logger';

const middleware = [thunkMiddleware];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const store = createStore(reducers, applyMiddleware(...middleware));

export default store;

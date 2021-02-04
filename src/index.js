import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import middleware from './middleware';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import './css/index.css';
import './css/responsive.css';

const store = createStore(reducers, middleware);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);
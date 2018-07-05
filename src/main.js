import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import mainReducer from './reducer';
import mainSaga from './sagas';

import App from './App';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(mainReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mainSaga);

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>, document.getElementById('app'));

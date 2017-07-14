'use strict';

import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store.js';
import Home from './containers/home.jsx';

import './scss/main.scss';

render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={Home} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);

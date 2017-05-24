'use strict';

import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import store from './store.js';
import Home from './containers/home.jsx';

import './scss/main.scss';

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Home} />
    </Router>
  </Provider>,
  document.getElementById('app')
);

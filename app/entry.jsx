'use strict';

import React, {Component} from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import store from './store.js';

import './scss/main.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {messages: [], username: `Default_${Math.floor(Math.random() * 500 + 1)}`};
  }
  componentDidMount() {
    this.socket = io('/');
    this.socket.username = this.state.username;
  }
  render() {
    const messages = this.state.messages.map((message, index) => <li key={index}>message.text</li>);

    return <div>
      <h1>Hello, world</h1>
      <ul>{messages}</ul>
    </div>;
  }
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  document.getElementById('app')
);

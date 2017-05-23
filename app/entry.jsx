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
    this.socket.on('message', message => this.setState({messages: [...this.state.messages, message]}));
  }
  handleCommand = event => {
    if (event.keyCode === 13) {
      const message = {
        from: this.state.username,
        text: event.target.value
      };

      this.setState({messages: [...this.state.messages, message]});
      this.socket.emit('message', message);
      event.target.value = '';
    }
  }
  render() {
    const messages = this.state.messages.map((message, index) => <li key={index}>
      {message.from ? <span>{message.from}: </span> : null}{message.text}</li>);

    return <div>
      <ul>{messages}</ul>
      <input type="text" placeholder="Enter a command" onKeyUp={this.handleCommand} />
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

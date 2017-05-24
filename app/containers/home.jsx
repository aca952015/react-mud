'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import {newMessage} from '../actions/message-actions.js';

@connect(store => {
  return {
    username: store.user.username,
    messages: store.messages.messages
  };
})
export default class Home extends Component {
  componentDidMount() {
    this.socket = io('/');
    this.socket.username = this.props.username;
    this.socket.on('message', message => this.props.dispatch(newMessage(message)));
  }
  handleCommand = event => {
    if (event.keyCode === 13) {
      const message = {
        from: this.props.username,
        text: event.target.value
      };

      this.props.dispatch(newMessage(message));
      this.socket.emit('message', message);
      event.target.value = '';
    }
  }
  render() {
    const messages = this.props.messages.map((message, index) => <li key={index}>
      {message.from ? <span>{message.from}: </span> : null}{message.text}</li>);

    return <div>
      <ul>{messages}</ul>
      <input type="text" placeholder="Enter a command" onKeyUp={this.handleCommand} />
    </div>;
  }
}

Home.propTypes = {
  username: PropTypes.string,
  dispatch: PropTypes.func,
  messages: PropTypes.array
};

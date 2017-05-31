'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import {Messages} from '../components/messages.jsx';
import socketHandlers from '../handlers/socket-handlers.js';
import commandHandler from '../handlers/command-handler.js';

@connect(store => {
  return {
    username: store.user.username,
    inventory: store.user.inventory,
    messages: store.messages.messages
  };
})
export default class Home extends Component {
  componentDidMount() {
    this.socket = io('/');
    socketHandlers(this.socket, this.props);
    window.addEventListener('beforeunload', () => this.socket.emit('disconnect'));
  }
  handleCommand = event => {
    if (event.keyCode === 13) {
      const line = event.target.value.split(' ');
      const command = line[0].toLowerCase().trim();
      const args = line.length > 1 ? line.slice(1).join(' ').trim() : null;

      let result = commandHandler(command, args, this.props, this.socket);

      if (result.funcsToCall.length) result.funcsToCall.forEach(func => this.props.dispatch(func(result)));
      this.socket.emit(result.emitType, result);
      event.target.value = '';
    }
  }
  render() {
    return <div>
      <Messages messages={this.props.messages} inventory={this.props.inventory} />
      <input type="text" placeholder="Enter a command" onKeyUp={this.handleCommand} />
    </div>;
  }
}

Home.propTypes = {
  username: PropTypes.string,
  dispatch: PropTypes.func,
  messages: PropTypes.array,
  inventory: PropTypes.array
};

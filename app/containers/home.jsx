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
  constructor() {
    super();
    this.state = {input: '', prevCommands: [], index: 0};
  }
  componentDidMount() {
    this.socket = io('/');
    socketHandlers(this.socket, this.props);
    window.addEventListener('beforeunload', () => this.socket.emit('disconnect'));
  }
  handleChange = event => this.setState({input: event.target.value});
  handleCommand = event => {
    if (event.keyCode === 38 || event.keyCode === 40) {
      if (!this.state.prevCommands.length) return;
      if (event.keyCode === 40) {
        if (this.state.index === 1) event.target.value = '';
        this.state.index--;
      }
      if (event.keyCode === 38) {
        this.state.index++;
        if (this.state.index > this.state.prevCommands.length) return this.state.index--;
      }
      this.setState({input: this.state.prevCommands[this.state.prevCommands.length - this.state.index]});
    }
    if (event.keyCode === 13) {
      let currCommand = event.target.value.toLowerCase();
      let lastCommand = this.state.prevCommands.length ? this.state.prevCommands[this.state.prevCommands.length - 1].toLowerCase() : null;
      if (!lastCommand || currCommand !== lastCommand) this.state.prevCommands.push(event.target.value);
      if (this.state.prevCommands.length > 20) this.state.prevCommands.shift();
      this.setState({index: 0});
      const line = event.target.value.split(' ');
      const command = line[0].toLowerCase().trim();
      const args = line.length > 1 ? line.slice(1).join(' ').trim() : null;

      let result = commandHandler(command, args, this.props, this.socket);

      if (result.funcsToCall && result.funcsToCall.length) result.funcsToCall.forEach(func => this.props.dispatch(func(result)));
      this.socket.emit(result.emitType, result);
      this.setState({input: ''});
    }
  }
  render() {
    return <div>
      <Messages messages={this.props.messages} inventory={this.props.inventory} />
      <input type="text" placeholder="Enter a command" value={this.state.input} onChange={this.handleChange} onKeyUp={this.handleCommand} />
    </div>;
  }
}

Home.propTypes = {
  username: PropTypes.string,
  dispatch: PropTypes.func,
  messages: PropTypes.array,
  inventory: PropTypes.array
};

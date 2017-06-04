'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import {Messages} from '../components/messages.jsx';
import {updateInput, updateCommandIndex, updatePrevCommands, truncatePrevCommands} from '../actions/message-actions.js';
import socketHandlers from '../handlers/socket-handlers.js';
import commandHandler from '../handlers/command-handler.js';

@connect(store => {
  return {
    username: store.user.username,
    inventory: store.user.inventory,
    messages: store.messages.messages,
    input: store.messages.input,
    prevCommands: store.messages.prevCommands,
    commandIndex: store.messages.commandIndex
  };
})
export default class Home extends Component {
  componentDidMount() {
    this.socket = io('/');
    socketHandlers(this.socket, this.props);
    window.addEventListener('beforeunload', () => this.socket.emit('disconnect'));
  }
  handleChange = event => this.props.dispatch(updateInput(event.target.value, this.props.commandIndex));
  handleCommand = event => {
    if (event.keyCode === 38 || event.keyCode === 40) {
      if (!this.props.prevCommands.length) return;
      if (event.keyCode === 40) {
        if (this.props.commandIndex === 1) this.props.dispatch(updateInput(''));
        if (this.props.commandIndex > 0) this.props.dispatch(updateCommandIndex(-1));
      }
      if (event.keyCode === 38) {
        Promise.resolve(this.props.dispatch(updateCommandIndex(1))).then(() => {
          if (this.props.commandIndex > this.props.prevCommands.length) return this.props.dispatch(updateCommandIndex(-1));
        });
      }
      Promise.resolve()
      .then(() => this.props.dispatch(updateInput(this.props.prevCommands[this.props.prevCommands.length - this.props.commandIndex])));
    }
    if (event.keyCode === 13) {
      let currCommand = this.props.input.toLowerCase();
      let lastCommand = this.props.prevCommands.length ? this.props.prevCommands[this.props.prevCommands.length - 1].toLowerCase() : null;
      if (!lastCommand || currCommand !== lastCommand) this.props.dispatch(updatePrevCommands(this.props.input));
      if (this.props.prevCommands.length > 20) this.props.dispatch(truncatePrevCommands());
      this.props.dispatch(updateCommandIndex(-(this.props.commandIndex)));
      const line = event.target.value.split(' ');
      const command = line[0].toLowerCase().trim();
      const args = line.length > 1 ? line.slice(1).join(' ').trim() : null;

      let result = commandHandler(command, args, this.props, this.socket);

      if (result.funcsToCall && result.funcsToCall.length) result.funcsToCall.forEach(func => this.props.dispatch(func(result)));
      this.socket.emit(result.emitType, result);
      this.props.dispatch(updateInput(''));
    }
  }
  render() {
    return <div>
      <Messages messages={this.props.messages} inventory={this.props.inventory} />
      <input type="text" placeholder="Enter a command" value={this.props.input} onChange={this.handleChange} onKeyUp={this.handleCommand} />
    </div>;
  }
}

Home.propTypes = {
  username: PropTypes.string,
  dispatch: PropTypes.func,
  messages: PropTypes.array,
  inventory: PropTypes.array,
  commandIndex: PropTypes.number,
  prevCommands: PropTypes.array,
  input: PropTypes.string
};

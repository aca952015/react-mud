'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import {newMessage} from '../actions/message-actions.js';
import {commandHandler} from '../handlers/command-handler.js';
import {whisperProcessor} from '../processors/whisper-processor.js';
import {sayProcessor} from '../processors/say-processor.js';

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
    this.socket.currentRoom = 'nexus';
    this.socket.emit('changeName', this.socket.username);
    this.socket.on('message', result => this.props.dispatch(newMessage(sayProcessor(result, this.socket))));
    this.socket.on('whisperSuccess', result => this.props.dispatch(newMessage(whisperProcessor(result, this.socket))));
    this.socket.on('whisperFail', () => this.props.dispatch(newMessage({text: 'I don\'t see that person here.'})));
  }
  handleCommand = event => {
    if (event.keyCode === 13) {
      const line = event.target.value.split(' ');
      const command = line[0].toLowerCase();
      const args = line.slice(1).join(' ');

      let result = commandHandler(command, args, this.props);

      if (result.funcToCall) this.props.dispatch(result.funcToCall(result));
      this.socket.emit(result.emitType, result);
      event.target.value = '';
    }
  }
  render() {
    const messages = this.props.messages.map((message, index) => {
      const exits = Object.keys(message.exits).map((exit, i) => <li key={i}>{exit}</li>);
      return <li key={index}>
        {message.roomName ?
          <div className="room">
            <h3>{message.roomName}</h3>
            <p>{message.desc}</p>
            <ul>{exits}</ul>
          </div> : null}
        {message.text ?
          <p className="feedback">
            {message.from ? <span>{message.from} </span> : null}{message.text}
          </p> : null}
      </li>;
    });

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

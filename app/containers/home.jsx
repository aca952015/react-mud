'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import Messages from './messages.jsx';
import CommandInput from './command-input.jsx';
import {Prompt} from '../components/prompt.jsx';
import {updateInput} from '../actions/message-actions.js';
import socketHandlers from '../handlers/socket-handlers.js';

@connect(store => {
  return {
    username: store.user.username,
    messages: store.messages.messages,
    inventory: store.user.inventory,
    character: store.user,
    commandIndex: store.messages.commandIndex
  };
})
export default class Home extends Component {
  constructor() {
    super();
    this.state = {justHitEnter: false};
  }
  componentDidMount() {
    this.socket = io('/');
    socketHandlers(this.socket, this.props);
    window.addEventListener('beforeunload', () => this.socket.emit('disconnect'));
    document.querySelector('input').focus();
  }
  handleChange = event => {
    this.setState({justHitEnter: false});
    this.props.dispatch(updateInput(event.target.value, this.props.commandIndex));
  }
  changeEnterStatus = status => this.setState({justHitEnter: status});

  render() {
    return <div>
      <h1>Tempest</h1>
      <Messages username={this.props.username}
        justHitEnter={this.state.justHitEnter}
        messages={this.props.messages}
        inventory={this.props.inventory} />
      <Prompt character={this.props.character} />
      <CommandInput
        socket={this.socket}
        handleChange={this.handleChange}
        changeEnterStatus={this.changeEnterStatus} />
    </div>;
  }
}

Home.propTypes = {
  username: PropTypes.string,
  dispatch: PropTypes.func,
  messages: PropTypes.array,
  inventory: PropTypes.array,
  character: PropTypes.object,
  commandIndex: PropTypes.number
};

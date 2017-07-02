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

function mapStateToProps(state) {
  return {
    messages: state.messages.messages,
    commandIndex: state.messages.commandIndex,
    username: state.user.username,
    inventory: state.user.inventory,
    hp: state.user.hp,
    mp: state.user.mp,
    maxHP: state.user.maxHP,
    maxMP: state.user.maxMP,
    description: state.user.description,
    atk: state.user.atk,
    combat: state.user.combat,
    equipment: state.equipment
  };
}

export class Home extends Component {
  constructor() {
    super();
    this.state = {justHitEnter: false};
  }
  componentDidMount() {
    this.socket = io('/');
    socketHandlers(this);
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
        changeEnterStatus={this.changeEnterStatus}
        inventory={this.props.inventory} />
      <Prompt hp={this.props.hp} mp={this.props.mp} maxHP={this.props.maxHP} maxMP={this.props.maxMP} />
      <CommandInput
        socket={this.socket}
        handleChange={this.handleChange}
        changeEnterStatus={this.changeEnterStatus} />
    </div>;
  }
}

export default connect(mapStateToProps)(Home);

Home.propTypes = {
  username: PropTypes.string,
  dispatch: PropTypes.func,
  messages: PropTypes.array,
  inventory: PropTypes.array,
  character: PropTypes.object,
  commandIndex: PropTypes.number,
  combat: PropTypes.object,
  hp: PropTypes.number,
  mp: PropTypes.number,
  maxHP: PropTypes.number,
  maxMP: PropTypes.number
};

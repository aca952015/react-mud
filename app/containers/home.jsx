'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import Messages from './messages.jsx';
import CommandInput from './command-input.jsx';
import {Prompt} from '../components/prompt.jsx';
import {updateInput} from '../actions/message-actions.js';
import saveCharacter from '../../lib/save-character.js';
import socketHandlers from '../client_sockets/socket-handlers.js';

function mapStateToProps(state) {
  return {
    messages: state.messages.messages,
    commandIndex: state.messages.commandIndex,
    username: state.user.username,
    inventory: state.user.inventory,
    hp: state.user.hp,
    mp: state.user.mp,
    sp: state.user.sp,
    maxHP: state.user.maxHP,
    maxMP: state.user.maxMP,
    maxSP: state.user.maxSP,
    description: state.user.description,
    atk: state.user.atk,
    combat: state.user.combat,
    currentRoom: state.user.currentRoom,
    equipment: state.equipment,
    user: state.user, // Used for saving the character
    effects: state.effects,
    skills: state.skills,
    globalCooldown: state.skills.globalCooldown
  };
}

export class Home extends Component {
  constructor() {
    super();
    this.state = {justHitEnter: false}; // Used to handle the scrollbar in the messages container
  }
  componentDidMount() {
    this.socket = io('/');
    socketHandlers(this);

    // Upon closing the tab, remove user from combat with all mobs, save the character on the server's
    // database, then emit a disconnect event for the server to handle.
    window.addEventListener('beforeunload', () => {
      saveCharacter(this);
    });
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
      <Prompt hp={this.props.hp}
        mp={this.props.mp}
        sp={this.props.sp}
        maxHP={this.props.maxHP}
        maxMP={this.props.maxMP}
        maxSP={this.props.maxSP}
        globalCooldown={this.props.globalCooldown} />
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
  commandIndex: PropTypes.number,
  hp: PropTypes.number,
  mp: PropTypes.number,
  sp: PropTypes.number,
  maxHP: PropTypes.number,
  maxMP: PropTypes.number,
  maxSP: PropTypes.number,
  character: PropTypes.object,
  user: PropTypes.object,
  combat: PropTypes.object,
  equipment: PropTypes.object,
  effects: PropTypes.object,
  globalCooldown: PropTypes.bool
};

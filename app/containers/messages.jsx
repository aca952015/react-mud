'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Room} from '../components/room.jsx';
import {Occupants} from '../components/occupants.jsx';
import {Mobs} from '../components/mobs.jsx';
import {Containers} from '../components/containers.jsx';
import {OnlineUsers} from '../components/online-users.jsx';
import {Feedback} from '../components/feedback.jsx';
import {Communication} from '../components/communication.jsx';
import {HelpFile} from '../components/help-file.jsx';
import {CombatLog} from '../components/combat-log.jsx';
import {Inventory} from '../components/inventory.jsx';
import {Equipment} from '../components/equipment.jsx';
import {PlayerInput} from '../components/player-input.jsx';
import {PlayerDescription} from '../components/player-description.jsx';
import {Skills} from '../components/skills.jsx';
import {Effects} from '../components/effects.jsx';

export default class Messages extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // These component mounting and updating methods check if the scrollbar needs to be
    // moved down or locked in place. The user can scroll through previous messages
    // without having the scrollbar automatically scroll to the bottom, which is checked
    // by comparing scrollHeight and scrollTop.
    // TODO: Does not currently function correctly on slower connections (mobile devices, e.g.)
    this.initialHeight = this.messageList.scrollHeight;
  }
  componentWillUpdate() {
    this.shouldScroll = this.messageList.scrollHeight - this.messageList.scrollTop === this.initialHeight;
  }
  componentDidUpdate() {
    if (this.shouldScroll || this.props.justHitEnter) this.messageList.scrollTop = this.messageList.scrollHeight;
  }

  render() {
    // The game is primarily played through a series of messages rendered to the user. This container checks
    // what type of message needs to be rendered and calls the appropriate presentational component(s).
    const messages = this.props.messages.map((message, index) => {
      return <li key={index}>
        {message.playerInput && <PlayerInput message={message}/>}
        {message.playerDescription && <PlayerDescription description={message.playerDescription}/>}
        {(message.feedback || message.interaction) && <Feedback username={this.props.username} message={message}/>}
        {message.room && <Room message={message}/>}
        {message.occupants && <Occupants message={message}/>}
        {message.mobs && <Mobs message={message}/>}
        {message.skills && <Skills skills={message.skills}/>}
        {message.effects && <Effects effects={message.effects}/>}
        {message.combatLog && <CombatLog username={this.props.username} message={message}/>}
        {message.containedItems && <Containers message={message}/>}
        {message.onlineUsers && <OnlineUsers message={message}/>}
        {message.commType && <Communication username={this.props.username} message={message}/>}
        {message.helpObj && <HelpFile helpObj={message.helpObj}/>}
        {message.inventory && <Inventory inventory={message.inventory}/>}
        {message.equipment && <Equipment name={message.name} equipment={message.equipment}/>}
      </li>;
    });
    return <div ref={messageList => this.messageList = messageList} onScroll={() => this.props.changeEnterStatus(false)} className="messages">
      <ul>{messages}</ul>
    </div>;
  }
}

Messages.propTypes = {
  messages: PropTypes.array,
  justHitEnter: PropTypes.bool,
  username: PropTypes.string,
  changeEnterStatus: PropTypes.func
};

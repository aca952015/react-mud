'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Room} from '../components/room.jsx';
import {Occupants} from '../components/occupants.jsx';
import {OnlineUsers} from '../components/online-users.jsx';
import {Feedback} from '../components/feedback.jsx';
import {Communication} from '../components/communication.jsx';
import {HelpFile} from '../components/help-file.jsx';
import {Inventory} from '../components/inventory.jsx';
import {PlayerInput} from '../components/player-input.jsx';

export default class Messages extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.initialHeight = this.messageList.scrollHeight;
  }
  componentWillUpdate() {
    this.shouldScroll = this.messageList.scrollHeight - this.messageList.scrollTop === this.initialHeight;
  }
  componentDidUpdate() {
    if (this.shouldScroll || this.props.justHitEnter) this.messageList.scrollTop = this.messageList.scrollHeight;
  }

  render() {
    const messages = this.props.messages.map((message, index) => {
      return <li key={index}>
        {message.room ? <Room message={message}/> : null}
        {message.occupants ? <Occupants message={message}/> : null}
        {message.onlineUsers ? <OnlineUsers message={message}/> : null}
        {message.playerInput ? <PlayerInput message={message}/> : null}
        {message.commType ? <Communication message={message}/> : null}
        {message.feedback ? <Feedback username={this.props.username} message={message}/> : null}
        {message.helpObj ? <HelpFile message={message}/> : null}
        {message.inventory ? <Inventory inventory={message.inventory}/> : null}
      </li>;
    });
    return <div ref={messageList => this.messageList = messageList} className="messages">
      <ul>{messages}</ul>
    </div>;
  }
}

Messages.propTypes = {
  messages: PropTypes.array,
  justHitEnter: PropTypes.bool,
  username: PropTypes.string
};

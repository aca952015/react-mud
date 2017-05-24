'use strict';

import React, {Component} from 'react';
import io from 'socket.io-client';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {messages: [], username: `Default_${Math.floor(Math.random() * 500 + 1)}`};
  }
  componentDidMount() {
    this.socket = io('/');
    this.socket.username = this.state.username;
    this.socket.on('message', message => this.setState({messages: [...this.state.messages, message]}));
  }
  handleCommand = event => {
    if (event.keyCode === 13) {
      const message = {
        from: this.state.username,
        text: event.target.value
      };

      this.setState({messages: [...this.state.messages, message]});
      this.socket.emit('message', message);
      event.target.value = '';
    }
  }
  render() {
    const messages = this.state.messages.map((message, index) => <li key={index}>
      {message.from ? <span>{message.from}: </span> : null}{message.text}</li>);

    return <div>
      <ul>{messages}</ul>
      <input type="text" placeholder="Enter a command" onKeyUp={this.handleCommand} />
    </div>;
  }
}

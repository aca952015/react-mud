'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {updateInput, updateCommandIndex, newMessage, updatePrevCommands, truncatePrevCommands} from '../actions/message-actions.js';
import commandHandler from '../handlers/command-handler.js';

@connect(store => {
  return {
    commandIndex: store.messages.commandIndex,
    prevCommands: store.messages.prevCommands,
    input: store.messages.input,
    username: store.user.username,
    inventory: store.user.inventory
  };
})
export default class CommandInput extends Component {
  constructor(props) {
    super(props);
  }
  handleCommand = event => {
    if (event.keyCode === 38 || event.keyCode === 40) {
      if (!this.props.prevCommands.length) return;
      if (event.keyCode === 40) {
        if (this.props.commandIndex === 1) this.props.dispatch(updateInput(''));
        if (this.props.commandIndex > 0) this.props.dispatch(updateCommandIndex(-1));
      }
      if (event.keyCode === 38) {
        // I'm not happy with the use of Promise.resolves here, as they're effectively
        // fixing async issues without actually waiting for some sort of response.
        // They're really just fancy setTimeouts at this point, which is not great.
        // I've attempted a handful of other solutions and at the moment, this is
        // the only thing that's working, so it remains until I find a better solution.
        Promise.resolve(this.props.dispatch(updateCommandIndex(1))).then(() => {
          if (this.props.commandIndex > this.props.prevCommands.length) return this.props.dispatch(updateCommandIndex(-1));
        });
      }
      Promise.resolve()
      .then(() => this.props.dispatch(updateInput(this.props.prevCommands[this.props.prevCommands.length - this.props.commandIndex])));
    }
    if (event.keyCode === 13) {
      this.props.changeEnterStatus(true);
      this.props.dispatch(newMessage({playerInput: this.props.input}));
      let currCommand = this.props.input.toLowerCase();
      let lastCommand = this.props.prevCommands.length ? this.props.prevCommands[this.props.prevCommands.length - 1].toLowerCase() : null;
      if ((!lastCommand || currCommand !== lastCommand) && this.props.input) this.props.dispatch(updatePrevCommands(this.props.input));
      if (this.props.prevCommands.length > 20) this.props.dispatch(truncatePrevCommands());
      this.props.dispatch(updateCommandIndex(-(this.props.commandIndex)));
      const line = this.props.input.split(' ');
      const command = line[0].toLowerCase().trim();
      const args = line.length > 1 ? line.slice(1).join(' ').trim() : null;

      let result = commandHandler(command, args, this.props, this.props.socket);

      if (result.funcsToCall && result.funcsToCall.length) result.funcsToCall.forEach(func => this.props.dispatch(func(result)));
      this.props.socket.emit(result.emitType, result);
      this.props.dispatch(updateInput(''));
    }
  }

  render() {
    return <div className="command-input">
      <input type="text" placeholder="Enter a command" value={this.props.input || ''} onChange={this.props.handleChange} onKeyUp={this.handleCommand} />
    </div>;
  }
}

CommandInput.propTypes = {
  dispatch: PropTypes.func,
  input: PropTypes.string,
  commandIndex: PropTypes.number,
  prevCommands: PropTypes.array,
  handleChange: PropTypes.func,
  changeEnterStatus: PropTypes.func,
  socket: PropTypes.object
};

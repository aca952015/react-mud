'use strict';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {updateInput, updateCommandIndex, newMessage, updatePrevCommands, truncatePrevCommands} from '../actions/message-actions.js';
import saveCharacter from '../../lib/save-character.js';
import commandHandler from '../handlers/command-handler.js';

function mapStateToProps(state) {
  return {
    commandIndex: state.messages.commandIndex,
    prevCommands: state.messages.prevCommands,
    input: state.messages.input,
    username: state.user.username,
    description: state.user.description,
    inventory: state.user.inventory,
    combat: state.user.combat,
    currentRoom: state.user.currentRoom,
    equipment: state.equipment,
    creatingNew: state.login.creatingNew,
    creationStep: state.login.creationStep,
    newUsername: state.login.newUsername,
    firstPassword: state.login.firstPassword,
    effects: state.effects,
    user: state.user // used for logout and saving characters
  };
}

export class CommandInput extends Component {
  constructor(props) {
    super(props);
  }
  handleCommand = event => {
    // If the user hits up or down, they're trying to cycle through previous commands.
    if (event.keyCode === 38 || event.keyCode === 40) {
      if (!this.props.prevCommands.length) return;
      // If they hit down and they're on the last command entered, clear out the input.
      // Otherwise, decrement the index and show that command.
      if (event.keyCode === 40) {
        if (this.props.commandIndex === 1) this.props.dispatch(updateInput(''));
        if (this.props.commandIndex > 0) this.props.dispatch(updateCommandIndex(-1));
      }
      if (event.keyCode === 38) {
        // If they hit up, increment the index. If they go over the number of indexes
        // available, go back to the previous index. Otherwise, show that command.

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
    // If the user hits enter
    if (event.keyCode === 13) {
      // changeEnterStatus refers to the parent Home component and deals with how the
      // Messages component scrolls down to the bottom of its overflow. If justHitEnter
      // is true, that component is scrolled to its bottom.
      this.props.changeEnterStatus(true);
      if (this.props.currentRoom !== 'Login Room') this.props.dispatch(newMessage({playerInput: this.props.input}));

      // If the last command entered is the same as the current command, don't update
      // prevCommands. Otherwise, push it to the prevCommands array.
      // Don't push to the prevCommands array while in the Login Room so that passwords
      // are not recorded.
      if (this.props.currentRoom !== 'Login Room') {
        let currCommand = this.props.input.toLowerCase();
        let lastCommand = this.props.prevCommands.length ? this.props.prevCommands[this.props.prevCommands.length - 1].toLowerCase() : null;
        if ((!lastCommand || currCommand !== lastCommand) && this.props.input) this.props.dispatch(updatePrevCommands(this.props.input));
      }

      // If there are more than 20 prevCommands, truncate the array.
      if (this.props.prevCommands.length > 20) this.props.dispatch(truncatePrevCommands());

      // Since the command just entered will now be the last command and the user will have
      // a different list of commands to cycle through, reset the index back to 0.
      this.props.dispatch(updateCommandIndex(-(this.props.commandIndex)));
      const line = this.props.input.split(' ');
      const command = line[0].toLowerCase().trim();
      const args = line.length > 1 ? line.slice(1).join(' ').trim() : null;

      // commandHandler will return an object, typically with a number of functions
      // to pass to this.props.dispatch and potentially with something that needs
      // to be emitted to the server to handle.
      let result = commandHandler(command, args, this.props);

      // Without the check for funcsToCall, checking length will error out. Sometimes
      // there are no funcsToCall, so this conditional checks for both.
      if (result.funcsToCall && result.funcsToCall.length) result.funcsToCall.forEach(func => this.props.dispatch(func(result)));
      if (result.emitType === 'quit') saveCharacter(this);
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

export default connect(mapStateToProps)(CommandInput);

CommandInput.propTypes = {
  input: PropTypes.string,
  currentRoom: PropTypes.string,
  commandIndex: PropTypes.number,
  prevCommands: PropTypes.array,
  dispatch: PropTypes.func,
  handleChange: PropTypes.func,
  changeEnterStatus: PropTypes.func,
  socket: PropTypes.object
};

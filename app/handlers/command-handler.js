'use strict';

import communicationHandler from './communication-handler.js';
import movementHandler from './movement-handler.js';
import getHandler from './get-handler.js';
import dropHandler from './drop-handler.js';
import lockHandler from './lock-handler.js';
import lookHandler from './look-handler.js';
import giveHandler from './give-handler.js';
import putHandler from './put-handler.js';
import helpHandler from './help-handler.js';
import drinkHandler from './drink-handler.js';
import removeHandler from './remove-handler.js';
import wearHandler from './wear-handler.js';
import examineHandler from './examine-handler.js';
import descriptionHandler from './description-handler.js';
import loginHandler from './login-handler.js';
import quitHandler from './quit-handler.js';
import skillHandler from './skill-handler.js';
import skillAndTargetsProcessor from '../processors/skill-and-targets-processor.js';
import {commandShorthand} from '../data/command-shorthand.js';
import {deathFunctions} from '../data/death-functions.js';
import {newMessage} from '../actions/message-actions.js';

export default function commandHandler(command, args, props) {
  // Disable commands other than "new" and character name if logging in
  if (props.currentRoom === 'Login Room') return loginHandler(command, args, props);

  const helperFunctions = {
    'say': communicationHandler,
    'whisper': communicationHandler,
    'east': movementHandler,
    'north': movementHandler,
    'west': movementHandler,
    'south': movementHandler,
    'up': movementHandler,
    'down': movementHandler,
    'look': lookHandler,
    'who': {emitType: 'who'},
    'get': getHandler,
    'drop': dropHandler,
    'unlock': lockHandler,
    'lock': lockHandler,
    'help': helpHandler,
    'drink': drinkHandler,
    'give': giveHandler,
    'inventory': {funcsToCall: [newMessage], inventory: props.inventory},
    'examine': examineHandler,
    'put': putHandler,
    'kill': {emitType: 'kill', target: args},
    'wear': wearHandler,
    'remove': removeHandler,
    'equipment': {funcsToCall: [newMessage], equipment: props.equipment},
    'description': descriptionHandler,
    'resurrect': {emitType: 'resurrect'},
    'quit': quitHandler,
    'skills': {funcsToCall: [newMessage], skills: props.skills},
    'effects': {funcsToCall: [newMessage], effects: props.effects}
  };

  if (commandShorthand[command]) command = commandShorthand[command];
  if (args && commandShorthand[args.toLowerCase()]) args = commandShorthand[args.toLowerCase()];

  if (props.effects.death && !deathFunctions.includes(command)) {
    return {
      funcsToCall: [newMessage],
      feedback: 'You can\'t do that while dead. You\'ll have to get resurrected first.'
    };
  }

  if (helperFunctions[command]) {
    if (typeof(helperFunctions[command]) === 'object') return helperFunctions[command];
    return helperFunctions[command](command, args, props);
  }

  const targetedSkillObject = skillAndTargetsProcessor(command, args, props);
  const targetedSkill = targetedSkillObject.targetedSkill;
  args = targetedSkillObject.args;

  if (props.skills[targetedSkill]) {
    if (props.globalCooldown) return {funcsToCall: [newMessage], feedback: 'You\'ll have to wait for the global cooldown to finish.'};
    return skillHandler(props.skills[targetedSkill], args, props);
  }

  return {
    funcsToCall: [newMessage],
    feedback: 'I\'m not sure what you\'re trying to do.'
  };
}

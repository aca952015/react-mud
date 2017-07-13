'use strict';

import whisper from './whisper.js';
import movement from './movement.js';
import look from './look.js';
import lookInContainer from './look-in-container.js';
import give from './give.js';
import pickUpItem from './pick-up-item.js';
import dropItem from './drop-item.js';
import put from './put.js';
import unlock from './unlock.js';
import kill from './kill.js';
import damage from './damage.js';
import removeItem from './remove-item.js';
import wearItem from './wear-item.js';
import oneLineListeners from './one-line-listeners.js';
import teleport from './teleport.js';
import checkUserName from './check-username.js';
import createCharacter from './create-character.js';
import login from './login.js';
import saveCharacter from './save-character.js';
import escapeCombat from './escape-combat.js';
import resurrect from './resurrect.js';

// All the various socket listeners for the server, compartmentalized for easy reference and debugging.
export default function serverSocketListeners(io, socket, users, roomData, mobsInCombat, alteredRooms) {
  checkUserName(socket);
  createCharacter(socket);
  damage(socket, roomData, mobsInCombat, alteredRooms);
  dropItem(socket, roomData);
  escapeCombat(io, socket, mobsInCombat);
  give(socket, users);
  kill(socket, roomData, mobsInCombat);
  login(socket);
  look(socket, users, roomData);
  lookInContainer(socket, roomData);
  movement(socket, users, roomData);
  oneLineListeners(socket, users);
  pickUpItem(socket, roomData, alteredRooms);
  put(socket, roomData);
  removeItem(socket);
  resurrect(socket, roomData);
  saveCharacter(socket);
  teleport(socket, users, roomData);
  unlock(socket, roomData);
  wearItem(socket);
  whisper(io, socket, users);
}

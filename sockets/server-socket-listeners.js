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
import wearItem from './wear-item.js';
import oneLineListeners from './one-line-listeners.js';

export default function serverSocketListeners(io, socket, users, roomData, mobsInCombat) {
  oneLineListeners(socket, users);
  pickUpItem(socket, roomData);
  look(socket, users, roomData);
  dropItem(socket, roomData);
  whisper(io, socket, users);
  movement(socket, users, roomData);
  unlock(socket, roomData);
  kill(socket, roomData, mobsInCombat);
  damage(socket, roomData, mobsInCombat);
  give(socket, users);
  put(socket, roomData);
  lookInContainer(socket, roomData);
  wearItem(socket);
}

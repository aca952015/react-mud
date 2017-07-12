'use strict';

import loginHandlers from './login-handlers.js';
import commsHandlers from './comms-handlers.js';
import moveListeners from './move-listeners.js';
import inventoryHandlers from './inventory-handlers.js';
import combatHandlers from './combat-handlers.js';

export default function socketHandlers(homeCtx) {
  loginHandlers(homeCtx);
  commsHandlers(homeCtx);
  moveListeners(homeCtx);
  inventoryHandlers(homeCtx);
  combatHandlers(homeCtx);
}

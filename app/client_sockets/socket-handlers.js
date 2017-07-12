'use strict';

import loginHandlers from './login-handlers.js';
import commsHandlers from './comms-handlers.js';
import moveListeners from './move-listeners.js';
import inventoryHandlers from './inventory-handlers.js';
import combatHandlers from './combat-handlers.js';

export default function socketHandlers(homeCtx) {
  loginHandlers({socket: homeCtx.socket, props: homeCtx.props});
  commsHandlers({socket: homeCtx.socket, props: homeCtx.props});
  moveListeners({socket: homeCtx.socket, props: homeCtx.props});
  inventoryHandlers({socket: homeCtx.socket, props: homeCtx.props});
  combatHandlers({socket: homeCtx.socket, props: homeCtx.props});
}

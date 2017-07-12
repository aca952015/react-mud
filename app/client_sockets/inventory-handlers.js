'use strict';

import {dropItem, getItem, dropAll, getAll} from '../actions/inventory-actions.js';

export default function inventoryHandlers(homeCtx) {
  let socket = homeCtx.socket;
  let props = homeCtx.props;

  socket.on('forceDrop', item => props.dispatch(dropItem({item})));
  socket.on('forceGet', item => props.dispatch(getItem(item)));
  socket.on('forceDropAll', () => props.dispatch(dropAll()));
  socket.on('getAll', itemArray => props.dispatch(getAll(itemArray)));
}

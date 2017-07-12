'use strict';

import {tickRegen} from '../actions/user-actions.js';

export default function tickListeners(homeCtx) {
  let socket = homeCtx.socket;
  let props = homeCtx.props;

  socket.on('tick', () => {
    props.dispatch(tickRegen());
  });
}

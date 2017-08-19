'use strict';

import {changeRoom} from '../actions/move-actions.js';
import {newMessage} from '../actions/message-actions.js';
import moveProcessor from '../processors/move-processor.js';

export default function moveListeners(homeCtx) {
  const socket = homeCtx.socket;
  const props = homeCtx.props;

  socket.on('move', result => props.dispatch(changeRoom(result)));
  socket.on('movementLeave', movement => {
    // Sometimes the server has a socket with no username. This conditional corrects for that error.
    // A better solution would be to ensure the server isn't managing any sockets without usernames,
    // but I haven't gotten to that yet.
    if (movement.username) {
      props.dispatch(newMessage({
        from: movement.username,
        feedback: ` moves ${movement.direction}.`
      }));
    }
  });
  socket.on('movementArrive', movement => props.dispatch(newMessage(moveProcessor(movement))));
}

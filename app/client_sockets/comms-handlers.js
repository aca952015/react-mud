'use strict';

import {newMessage} from '../actions/message-actions.js';
import whisperProcessor from '../processors/whisper-processor.js';

export default function commsHandlers(homeCtx) {
  const socket = homeCtx.socket;
  const props = homeCtx.props;
  
  socket.on('generalMessage', result => props.dispatch(newMessage(result)));
  socket.on('whisperSuccess', result => props.dispatch(newMessage(whisperProcessor(result, homeCtx.props.username))));
  socket.on('whisperFail', () => props.dispatch(newMessage({feedback: 'I don\'t see that person here.'})));
}

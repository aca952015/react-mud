'use strict';

export default function saveCharacter(homeCtx) {
  const socket = homeCtx.socket ? homeCtx.socket : homeCtx.props.socket;
  const character = {
    ...homeCtx.props.user,
    equipment: homeCtx.props.equipment,
    effects: homeCtx.props.effects
  };
  socket.emit('saveCharacter', character);
  socket.emit('escapeCombat');
  socket.emit('disconnect');
}

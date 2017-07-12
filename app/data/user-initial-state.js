'use strict';

export const initialState = {
  username: 'A Faceless One',
  description: ['No description set.'],
  inventory: [],
  hp: 15,
  maxHP: 20,
  mp: 11,
  maxMP: 20,
  level: 1,
  atk: 2,
  def: 0,
  mat: 0,
  mdf: 0,
  currentRoom: 'Nexus',
  combat: {
    active: false,
    targets: []
  }
};

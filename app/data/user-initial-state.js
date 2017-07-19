'use strict';

export const initialState = {
  username: 'A Faceless One',
  description: ['No description set.'],
  inventory: [],
  hp: 20,
  maxHP: 20,
  mp: 20,
  maxMP: 20,
  level: 1,
  atk: 2,
  def: 0,
  mat: 2,
  mdf: 0,
  currentRoom: 'Nexus',
  combat: {
    active: false,
    targets: []
  }
};

'use strict';

export const initialState = {
  username: 'A Faceless One',
  description: ['No description set.'],
  inventory: [],
  hp: 20,
  maxHP: 20,
  mp: 20,
  maxMP: 20,
  sp: 0,
  maxSP: 100,
  level: 1,
  atk: 2,
  def: 0,
  mat: 2,
  mdf: 0,
  currentRoom: 'Login Room',
  combat: {
    active: false,
    targets: []
  }
};

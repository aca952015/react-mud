'use strict';

export const initialState = {
  username: `Robot_${Math.floor(Math.random() * 500 + 1)}`,
  description: ['As actual players do not exist yet, everybody is a robot. They all look the same. They all speak the same. They look just like you.'],
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
  userID: Math.floor(Math.random() * 1000000000),
  currentRoom: 'Nexus',
  combat: {
    active: false,
    targets: []
  }
};

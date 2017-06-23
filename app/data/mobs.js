'use strict';

export default function newMob(mobName) {
  class Mob {
    constructor(properties) {
      Object.keys(properties).forEach(prop => this[prop] = properties[prop]);
    }
  }

  return new Mob(mobData[mobName]);
}


const mobData = {
  'bat': {
    id: Math.floor(Math.random() * 1000000000),
    name: 'The Goddamn Bat', // http://tvtropes.org/pmwiki/pmwiki.php/Main/GoddamnedBats for the reference
    description: 'It\'s a bat. It\'s here for testing.',
    short: 'a small bat',
    long: 'A small, leathery-winged bat is here.',
    terms: ['small', 'bat'],
    hp: 5,
    atk: 2,
    def: 0,
    combat: {
      active: false,
      target: null
    }
  }
};

console.log(newMob('bat'));

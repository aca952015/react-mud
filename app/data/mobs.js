'use strict';

class Mob {
  constructor(properties) {
    let someObj = JSON.parse(JSON.stringify(properties));
    someObj.id = Math.floor(Math.random() * 1000000000);
    return someObj;
  }
}

export default function newMob(mobName) {
  return new Mob(mobData[mobName]);
}

const mobData = {
  'bat': {
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
      targets: []
    }
  }
};

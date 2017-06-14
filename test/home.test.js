'use strict';

import React from 'react';
import sinon from 'sinon';
import {shallow} from 'enzyme';
import {Home} from '../app/containers/home.jsx';

describe('<Home />', () => {
  let home, props;
  beforeEach(done => {
    props = {
      dispatch: sinon.spy(),
      messages: [],
      commandIndex: 0,
      username: 'Tester',
      inventory: [],
      character: {
        username: 'Tester',
        description: 'Test description',
        inventory: [],
        hp: 18,
        maxHP: 20,
        mp: 11,
        maxMP: 20,
        level: 1,
        str: 18,
        int: 18,
        wis: 18,
        con: 18,
        dex: 18
      }
    };
    home = shallow(<Home {...props} />);
    done();
  });

  it('has an initialState of justHitEnter being false', () => {
    expect(home.state().justHitEnter).toEqual(false);
  });
});

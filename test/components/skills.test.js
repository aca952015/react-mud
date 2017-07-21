'use strict';

import React from 'react';
import {shallow} from 'enzyme';
import {Skills} from '../../app/components/skills.jsx';
import {warriorSkills} from '../../app/data/skills/warrior-skills.js';
import {clericSkills} from '../../app/data/skills/cleric-skills.js';

describe('<Skills />', () => {
  const props = {
    skills: {
      ...warriorSkills,
      ...clericSkills
    }
  };
  const skills = shallow(<Skills {...props} />);

  it('should render lists of skills by level', () => {
    expect(skills.find('.dual-box').first().children('.level-box').first().find('p').text()).toEqual('Level 1:');
    expect(skills.find('.level-box').first().children('.skill-list').children('li').first().text()).toEqual('Slash');
  });
});

'use strict';

import sinon from 'sinon';
import {classSkills} from '../../app/data/class-skills.js';
import {changeStat} from '../../app/actions/user-actions.js';

const {clericSkills, warriorSkills} = classSkills;
const dispatch = sinon.spy();

describe('Cleric skills', () => {
  describe('Infusion', () => {
    it('should call changeStat twice, changing atk and mat by -3', () => {
      clericSkills['infusion'].applyFunction(dispatch);
      expect(dispatch.calledWith(changeStat({statToChange: 'atk', amount: -3}))).toEqual(true);
      expect(dispatch.calledWith(changeStat({statToChange: 'mat', amount: -3}))).toEqual(true);
    });
  });
});

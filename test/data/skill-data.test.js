'use strict';

import sinon from 'sinon';
import {classSkills} from '../../app/data/class-skills.js';
import {changeStat} from '../../app/actions/user-actions.js';

const {clericSkills, warriorSkills} = classSkills;
const dispatch = sinon.spy();

describe('Cleric skills', () => {
  describe('Infusion', () => {
    it('should call changeStat twice, changing atk and mat by -3, as its applyFunction', () => {
      clericSkills['infusion'].applyFunction(dispatch);
      expect(dispatch.calledWith(changeStat({statToChange: 'atk', amount: -3}))).toEqual(true);
      expect(dispatch.calledWith(changeStat({statToChange: 'mat', amount: -3}))).toEqual(true);
    });

    it('should call changeStat twice, changing atk and mat by 3, as its expireFunction', () => {
      clericSkills['infusion'].expireFunction(dispatch);
      expect(dispatch.calledWith(changeStat({statToChange: 'atk', amount: 3}))).toEqual(true);
      expect(dispatch.calledWith(changeStat({statToChange: 'mat', amount: 3}))).toEqual(true);
    });
  });

  describe('Conviction', () => {
    it('should call changeStat, changing maxHP by -10, as its applyFunction', () => {
      clericSkills['conviction'].applyFunction(dispatch);
      expect(dispatch.calledWith(changeStat({statToChange: 'maxHP', amount: -10}))).toEqual(true);
    });

    it('should call changeStat, changing maxHP by 10, as its expireFunction', () => {
      clericSkills['conviction'].expireFunction(dispatch);
      expect(dispatch.calledWith(changeStat({statToChange: 'maxHP', amount: 10}))).toEqual(true);
    });
  });
});

describe('Warrior skills', () => {
  describe('Hobble', () => {
    it('should change the target\'s atk by negative 2 as its applyFunction', () => {
      const target = {atk: 5};
      warriorSkills['hobble'].applyFunction(target);
      expect(target.atk).toEqual(3);
    });

    it('should change the target\'s atk by positive 2 as its expireFunction', () => {
      const target = {atk: 5};
      warriorSkills['hobble'].expireFunction(target);
      expect(target.atk).toEqual(7);
    });
  });
});

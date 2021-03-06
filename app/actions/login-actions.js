'use strict';

export function createNew() {
  return {type: 'NEW_CHARACTER'};
}

export function endCreation() {
  return {type: 'CHARACTER_COMPLETE'};
}

export function incrementCreationStep() {
  return {type: 'INCREMENT_CREATION_STEP'};
}

export function loginEffects(effects) {
  return {
    type: 'LOGIN_EFFECTS',
    payload: effects.loginEffects
  };
}

export function loginEquipment(equipment) {
  return {
    type: 'LOGIN_EQUIPMENT',
    payload: equipment.loginEquipment
  };
}

export function loginUser(char) {
  return {
    type: 'LOGIN_USER',
    payload: char.loginUser
  };
}

export function setCreationStep(step) {
  return {
    type: 'SET_CREATION_STEP',
    payload: step.step
  };
}

export function setFirstPassword(password) {
  return {
    type: 'SET_FIRST_PASSWORD',
    payload: password.firstPassword
  };
}

export function setUsername(username) {
  return {
    type: 'SET_USERNAME',
    payload: username.newUsername
  };
}

'use strict';

export function restoreHealth(amount) {
  return {
    type: 'DRINK_POTION',
    payload: {
      statToChange: 'hp',
      amount: amount.amount
    }
  };
}

export function restoreMana(amount) {
  return {
    type: 'DRINK_POTION',
    payload: {
      statToChange: 'mp',
      amount: amount.amount
    }
  };
}

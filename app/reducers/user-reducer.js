'use strict';

const initialState = {
  username: `Default_${Math.floor(Math.random() * 500 + 1)}`,
  password: '',
};

export default function reducer(state=initialState, action) {
  return state;
}

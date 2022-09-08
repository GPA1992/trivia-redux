import { LOGIN_USER } from '../action/types';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_USER:
    return {
      ...state,
      name: action.payload,
    };
  default:
    return state;
  }
};

export default player;

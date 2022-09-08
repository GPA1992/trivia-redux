import { EMAIL_USER, LOGIN_USER } from '../action/types';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_USER:
    return {
      ...state,
      name: action.payload,
    };
  case EMAIL_USER:
    return {
      ...state,
      gravatarEmail: action.payload,
    };
  default:
    return state;
  }
};

export default player;

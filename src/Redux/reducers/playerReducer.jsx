import { LOGIN_USER, DID_ANSWER, PERFORMANCE_USER } from '../action/types';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
  didAnswer: false,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_USER:
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  case DID_ANSWER:
    return {
      ...state,
      didAnswer: true,
    };
  case PERFORMANCE_USER:
    return {
      ...state,
      score: Number(action.payload.score),
    };
  default:
    return state;
  }
};

export default player;

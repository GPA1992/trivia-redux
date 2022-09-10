import {
  LOGIN_USER,
  DID_ANSWER,
  PERFORMANCE_USER,
  GET_PROFILE_PICTURE,
  RESET_ANSWER,
} from '../action/types';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
  gravatarImg: '',
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
      didAnswer: action.payload,
    };
  case RESET_ANSWER:
    return {
      ...state,
      didAnswer: false,
    };
  case PERFORMANCE_USER:
    return {
      ...state,
      score: state.score + action.payload,
    };
  case GET_PROFILE_PICTURE:
    return {
      ...state,
      gravatarImg: action.payload,
    };
  default:
    return state;
  }
};

export default player;

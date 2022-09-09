import {
  LOGIN_USER,
  DID_ANSWER,
} from './types';

export const loginAction = (userData) => ({
  type: LOGIN_USER,
  payload: userData,
});

export const didUserAnswerAction = () => ({
  type: DID_ANSWER,
});

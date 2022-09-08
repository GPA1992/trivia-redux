import {
  LOGIN_USER,
} from './types';

const loginAction = (userData) => ({
  type: LOGIN_USER,
  payload: userData,
});

export default loginAction;

import {
  LOGIN_USER,
  EMAIL_USER,
} from './types';

export const loginAction = (userData) => ({
  type: LOGIN_USER,
  payload: userData,
});

export const getEmail = (emailData) => ({
  type: EMAIL_USER,
  payload: emailData,
});

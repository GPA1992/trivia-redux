import {
  LOGIN_USER,
  EMAIL_USER,
  PERFORMANCE_USER,
} from './types';

export const loginAction = (userData) => ({
  type: LOGIN_USER,
  payload: userData,
});

export const getEmail = (emailData) => ({
  type: EMAIL_USER,
  payload: emailData,
});

export const userPerformance = (performanceData) => ({
  type: PERFORMANCE_USER,
  payload: performanceData,
});

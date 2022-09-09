import {
  LOGIN_USER,
  DID_ANSWER,
  PERFORMANCE_USER,
} from './types';

export const loginAction = (userData) => ({
  type: LOGIN_USER,
  payload: userData,
});

export const didUserAnswerAction = () => ({
  type: DID_ANSWER,
});

export const userPerformance = (performanceData) => ({
  type: PERFORMANCE_USER,
  payload: performanceData,
});

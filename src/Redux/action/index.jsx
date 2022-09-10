import {
  LOGIN_USER,
  DID_ANSWER,
  PERFORMANCE_USER,
  GET_PROFILE_PICTURE,
} from './types';

export const loginAction = (userData) => ({
  type: LOGIN_USER,
  payload: userData,
});

export const didUserAnswerAction = () => ({
  type: DID_ANSWER,
});

export const getProfilePictureAction = (gravatarImg) => ({
  type: GET_PROFILE_PICTURE,
  payload: gravatarImg,
});

export const userPerformance = (performanceData) => ({
  type: PERFORMANCE_USER,
  payload: performanceData,
});

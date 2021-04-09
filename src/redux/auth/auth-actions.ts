import { createAction } from '@reduxjs/toolkit';
import { IUser, TUser } from './auth-reducer';

const loginUserRequest = createAction('auth/loginUserRequest');
const loginUserSuccess = createAction<IUser>('auth/loginUserSuccess');
const loginUserError = createAction<string>('auth/loginUserError');

const logoutUserRequest = createAction('auth/logoutUserRequest');
const logoutUserSuccess = createAction('auth/logoutUserSuccess');
const logoutUserError = createAction<string>('auth/logoutUserError');

const registrationUserRequest = createAction('auth/registrationUserRequest');
const registrationUserSuccess = createAction<IUser>(
  'auth/registrationUserSuccess',
);
const registrationUserError = createAction<string>(
  'auth/registrationUserError',
);

const getCurrentUserRequest = createAction('auth/getCurrentUserRequest');
const getCurrentUserSuccess = createAction<TUser>('auth/getCurrentUserSuccess');
const getCurrentUserError = createAction<string>('auth/getCurrentUserError');

const actions = {
  loginUserRequest,
  loginUserSuccess,
  loginUserError,
  logoutUserRequest,
  logoutUserSuccess,
  logoutUserError,
  registrationUserRequest,
  registrationUserSuccess,
  registrationUserError,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,
};

export default actions;

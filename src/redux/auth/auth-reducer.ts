import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import userAction from './auth-actions';

export type TUser = { name: string; email: string; password?: string };

export interface IUser {
  user: TUser;
  token: string;
}

const initialUserState: TUser = { name: '', email: '' };

const setUser = (payload: IUser) => payload.user;

const user = createReducer(initialUserState, builder => {
  builder
    .addCase(userAction.registrationUserSuccess, (_, { payload }) =>
      setUser(payload),
    )
    .addCase(userAction.loginUserSuccess, (_, { payload }) => setUser(payload))
    .addCase(userAction.logoutUserSuccess, () => initialUserState)
    .addCase(userAction.getCurrentUserSuccess, (_, { payload }) => payload);

  // [userAction.registrationUserSuccess.type]: (_, { payload }) =>
  //   setUser(payload),
  // [userAction.loginUserSuccess.type]: (_, { payload }) => setUser(payload),
  // [userAction.logoutUserSuccess.type]: () => initialUserState,
  // [userAction.getCurrentUserSuccess.type]: (_, { payload }) => payload,
});

const initialToken = '';
const setToken = (payload: IUser) => payload.token;

const token = createReducer(initialToken, builder => {
  builder
    .addCase(userAction.registrationUserSuccess, (_, { payload }) =>
      setToken(payload),
    )
    .addCase(userAction.loginUserSuccess, (_, { payload }) => setToken(payload))
    .addCase(userAction.logoutUserSuccess, () => initialToken);

  // [userAction.registrationUserSuccess.type]: (_, { payload }) =>
  //   setToken(payload),
  // [userAction.loginUserSuccess.type]: setToken,
  // [userAction.logoutUserSuccess.type]: () => initialToken,
});

const setTrue = () => true;
const setFalse = () => false;

const loading = createReducer(
  false,
  builder => {
    builder
      .addCase(userAction.registrationUserRequest, setTrue)
      .addCase(userAction.registrationUserSuccess, setFalse)
      .addCase(userAction.registrationUserError, setFalse)
      .addCase(userAction.loginUserRequest, setTrue)
      .addCase(userAction.loginUserSuccess, setFalse)
      .addCase(userAction.loginUserError, setFalse)
      .addCase(userAction.logoutUserRequest, setTrue)
      .addCase(userAction.logoutUserSuccess, setFalse)
      .addCase(userAction.logoutUserError, setFalse)
      .addCase(userAction.getCurrentUserRequest, setTrue)
      .addCase(userAction.getCurrentUserSuccess, setFalse)
      .addCase(userAction.getCurrentUserError, setFalse);
  },

  //   {
  //   [userAction.registrationUserRequest]: setTrue,
  //   [userAction.registrationUserSuccess]: setFalse,
  //   [userAction.registrationUserError]: setFalse,
  //   [userAction.loginUserRequest]: setTrue,
  //   [userAction.loginUserSuccess]: setFalse,
  //   [userAction.loginUserError]: setFalse,
  //   [userAction.logoutUserRequest]: setTrue,
  //   [userAction.logoutUserSuccess]: setFalse,
  //   [userAction.logoutUserError]: setFalse,
  //   [userAction.getCurrentUserRequest]: setTrue,
  //   [userAction.getCurrentUserSuccess]: setFalse,
  //   [userAction.getCurrentUserError]: setFalse,
  // }
);

const setError = (payload: string) => payload;
const error = createReducer(
  '',
  builder => {
    builder
      .addCase(userAction.registrationUserRequest, () => '')
      .addCase(userAction.registrationUserSuccess, () => '')
      .addCase(userAction.registrationUserError, (_, { payload }) =>
        setError(payload),
      )
      .addCase(userAction.loginUserRequest, () => '')
      .addCase(userAction.loginUserSuccess, () => '')
      .addCase(userAction.loginUserError, (_, { payload }) => setError(payload))
      .addCase(userAction.logoutUserRequest, () => '')
      .addCase(userAction.logoutUserSuccess, () => '')
      .addCase(userAction.logoutUserError, (_, { payload }) =>
        setError(payload),
      )
      .addCase(userAction.getCurrentUserRequest, () => '')
      .addCase(userAction.getCurrentUserSuccess, () => '')
      .addCase(userAction.getCurrentUserError, (_, { payload }) =>
        setError(payload),
      );
  },
  // {
  //   [userAction.registrationUserRequest]: () => '',
  //   [userAction.registrationUserSuccess]: () => '',
  //   [userAction.registrationUserError]: setError,
  //   [userAction.loginUserRequest]: () => '',
  //   [userAction.loginUserSuccess]: () => '',
  //   [userAction.loginUserError]: setError,
  //   [userAction.logoutUserRequest]: () => '',
  //   [userAction.logoutUserSuccess]: () => '',
  //   [userAction.logoutUserError]: setError,
  //   [userAction.getCurrentUserRequest]: () => '',
  //   [userAction.getCurrentUserSuccess]: () => '',
  //   [userAction.getCurrentUserError]: setError,
  // }
);

const isAuthenticated = createReducer(
  false,
  builder => {
    builder
      .addCase(userAction.registrationUserSuccess, setTrue)
      .addCase(userAction.registrationUserError, setFalse)
      .addCase(userAction.loginUserSuccess, setTrue)
      .addCase(userAction.loginUserError, setFalse)
      .addCase(userAction.logoutUserSuccess, setFalse)
      .addCase(userAction.getCurrentUserSuccess, setTrue)
      .addCase(userAction.getCurrentUserError, setFalse);
  },

  //   {
  //   [userAction.registrationUserSuccess]: setTrue
  //   [userAction.registrationUserError]: setFalse,
  //   [userAction.loginUserSuccess]: setTrue,
  //   [userAction.loginUserError]: setFalse,
  //   [userAction.logoutUserSuccess]: setFalse,
  //   [userAction.getCurrentUserSuccess]: setTrue,
  //   [userAction.getCurrentUserError]: setFalse,
  // }
);

const userReducer = combineReducers({
  user,
  isAuthenticated,
  token,
  loading,
  error,
});

export default userReducer;

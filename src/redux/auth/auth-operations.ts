import { AppDispatch } from './../store';
import axios from 'axios';
import authActions from './auth-actions';

axios.defaults.baseURL = 'https://goit-phonebook-api.herokuapp.com';

const token = {
  set(token: string) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

interface INewCredentilas {
  name: string;
  email: string;
  password: string;
}

const registrationUser = (credentials: INewCredentilas) => async (
  dispatch: AppDispatch,
) => {
  dispatch(authActions.registrationUserRequest());

  try {
    const response = await axios.post('/users/signup', credentials);

    token.set(response.data.token);
    dispatch(authActions.registrationUserSuccess(response.data));
  } catch (error) {
    dispatch(authActions.registrationUserError(error.message));
  }
};

interface ICredentilas {
  email: string;
  password: string;
}

const loginUser = (credentials: ICredentilas) => async (
  dispatch: AppDispatch,
) => {
  dispatch(authActions.loginUserRequest());

  try {
    const response = await axios.post('/users/login', credentials);

    token.set(response.data.token);
    dispatch(authActions.loginUserSuccess(response.data));
  } catch (error) {
    dispatch(authActions.loginUserError(error.message));
  }
};

const logoutUser = () => async (dispatch: AppDispatch) => {
  dispatch(authActions.logoutUserRequest());

  try {
    await axios.post('/users/logout');

    token.unset();

    dispatch(authActions.logoutUserSuccess());
  } catch (error) {
    dispatch(authActions.logoutUserError(error.message));
  }
};

const getCurrentUser = (currentToken: string) => async (
  dispatch: AppDispatch,
) => {
  const persistedToken = currentToken;

  if (!persistedToken) {
    return;
  }

  token.set(persistedToken);
  dispatch(authActions.getCurrentUserRequest());

  try {
    const response = await axios.get('/users/current');

    dispatch(authActions.getCurrentUserSuccess(response.data));
  } catch (error) {
    dispatch(authActions.getCurrentUserError(error.message));
  }
};

const operations = { loginUser, registrationUser, logoutUser, getCurrentUser };
export default operations;

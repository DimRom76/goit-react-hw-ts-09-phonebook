import { RootState } from './../store';

const getIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;

const getError = (state: RootState) => state.auth.error;

const getLoading = (state: RootState) => state.auth.loading;

const getUsername = (state: RootState) => state.auth.user.name;

const getToken = (state: RootState) => state.auth.token;

const selectors = {
  getIsAuthenticated,
  getUsername,
  getError,
  getLoading,
  getToken,
};

export default selectors;

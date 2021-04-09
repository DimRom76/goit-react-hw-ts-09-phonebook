import { Route, Switch } from 'react-router-dom';
import { useEffect, Suspense, lazy } from 'react';
import { Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { authOperations, authSelectors } from './redux/auth';

import PrivateRoute from './Components/PrivateRoute';
import PublicRoute from './Components/PublicRoute';
import Navigation from './Components/Navigation';
import Modal from './Components/Modal';
import routes from './routes';

import './App.css';

const HomeView = lazy(
  () => import('./views/HomeView.js' /* webpackChunkName: "home-page" */),
);

const ContactsView = lazy(
  () =>
    import('./views/ContactsView.js' /* webpackChunkName: "contact-page" */),
);

const LoginView = lazy(
  () => import('./views/LoginView.js' /* webpackChunkName: "login-page" */),
);

const RegistrationView = lazy(
  () =>
    import(
      './views/RegistrationView.js' /* webpackChunkName: "registration-page" */
    ),
);

function App() {
  const errorLogin = useSelector(authSelectors.getError);
  const token = useSelector(authSelectors.getToken);
  const isAuthLoading = useSelector(authSelectors.getLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authOperations.getCurrentUser(token));
  }, [dispatch, token]);

  useEffect(() => {
    errorLogin && toast.warn(`Ошибка! ${errorLogin}`);
  }, [errorLogin]);

  const toggleModal = () => {};

  return (
    <Container maxWidth="md">
      <Navigation />
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route path={routes.home} component={HomeView} exact />
          <PublicRoute
            path={routes.register}
            restricted
            component={RegistrationView}
            redirectTo={routes.contacts}
          />
          <PublicRoute
            path={routes.login}
            restricted
            component={LoginView}
            redirectTo={routes.contacts}
          />
          <PrivateRoute
            path={routes.contacts}
            component={ContactsView}
            redirectTo={routes.login}
          />
          <Route render={() => <h1>Page not found</h1>} />
        </Switch>
      </Suspense>
      <ToastContainer />
      {isAuthLoading && (
        <Modal onClose={toggleModal}>
          <h1>Авторизация...</h1>
        </Modal>
      )}
    </Container>
  );
}

export default App;

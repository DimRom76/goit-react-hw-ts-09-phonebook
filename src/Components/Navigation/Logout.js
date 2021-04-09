import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authOperations, authSelectors } from '../../redux/auth';
import { Button } from '@material-ui/core';

function Logout() {
  const name = useSelector(authSelectors.getUsername);
  const dispatch = useDispatch();

  return (
    <div>
      <span>Welcome, {name}</span>
      <Button
        variant="contained"
        color="primary"
        style={{ marginLeft: 10 }}
        onClick={() => dispatch(authOperations.logoutUser())}
      >
        Logout
      </Button>
    </div>
  );
}

export default Logout;

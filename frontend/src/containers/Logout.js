import React, { useContext } from 'react'

import { Redirect } from 'react-router-dom';

import AuthContext from '../context/auth-context';

const Logout = () => {
  const authData = useContext(AuthContext);

  authData.logout();
  return <Redirect to='/' />
}

export default Logout

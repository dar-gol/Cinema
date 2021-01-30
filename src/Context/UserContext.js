import { createContext } from 'react';

const defaultObject = {
  access_token: '',
  email: '',
  isUserLogged: false,
};

const UserContext = createContext(defaultObject);

export default UserContext;

import { createContext } from "react";

const defaultObject = {
  access_token: "",
  email: "",
  isUserLogged: false,
};

export const UserContext = createContext(defaultObject);

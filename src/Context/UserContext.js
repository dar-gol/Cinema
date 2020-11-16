import { createContext } from "react";

const defaultObject = {
  name: "",
  email: "",
  isUserLogged: false,
};

export const UserContext = createContext(defaultObject);

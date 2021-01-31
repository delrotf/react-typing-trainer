import React, { useState } from "react";
import { LoginPage } from "../pages";

export const LoginContext = React.createContext({
  username: null,
  setUsername: null,
  firstname: null,
  setFirstname: null,
  authenticated: null,
  setAuthenticated: null
});

const LoginContextProvider = props => {
  const [username, setFirstname] = useState();
  // TODO get user from somewhere else
  const [firstname, setUsername] = useState('user1');
  const [authenticated, setAuthenticated] = useState();
  return (
    <LoginContext.Provider
      value={{
        username,
        setUsername,
        firstname,
        setFirstname,
        authenticated,
        setAuthenticated
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};

export { LoginContextProvider };

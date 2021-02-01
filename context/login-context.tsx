import React, { useState } from "react";
import { LoginPage } from "../pages";

export const LoginContext = React.createContext({
  username: null,
  setUsername: null,
  authenticated: null,
  setAuthenticated: null
});

const LoginContextProvider = props => {
  const [username, setUsername] = useState('dummyuser');
  const [authenticated, setAuthenticated] = useState();
  return (
    <LoginContext.Provider
      value={{
        username,
        setUsername,
        authenticated,
        setAuthenticated
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};

export { LoginContextProvider };

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
  const [username, setUsername] = useState('user1');
  const [firstname, setFirstname] = useState();
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

import React, { useState } from "react";
import { LoginPage } from "../pages";

export const LoginContext = React.createContext({
  firstname: null,
  setFirstname: null,
  authenticated: null,
  setAuthenticated: null
});

const LoginContextProvider = props => {
  const [firstname, setFirstname] = useState();
  const [authenticated, setAuthenticated] = useState();
  return (
    <LoginContext.Provider
      value={{
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

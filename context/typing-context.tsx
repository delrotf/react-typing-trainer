import React, { useState } from "react";
import { LoginPage } from "../pages";

export const TypingContext = React.createContext({
  typedKey: null,
  setTypedKey: null,
  typedKeys: null,
  setTypedKeys: null,
});

const TypingContextProvider = props => {
  const [typedKey, setTypedKey] = useState();
  const [typedKeys, setTypedKeys] = useState([]);
  return (
    <TypingContext.Provider
      value={{
        typedKey,
        setTypedKey,
        typedKeys,
        setTypedKeys
      }}
    >
      {props.children}
    </TypingContext.Provider>
  );
};

export { TypingContextProvider };

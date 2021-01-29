import React, { useState } from "react";
import { LoginPage } from "../pages";

export const TypingContext = React.createContext({
  typedKey: null,
  setTypedKey: null
});

const TypingContextProvider = props => {
  const [typedKey, setTypedKey] = useState();
  return (
    <TypingContext.Provider
      value={{
        typedKey,
        setTypedKey
      }}
    >
      {props.children}
    </TypingContext.Provider>
  );
};

export { TypingContextProvider };

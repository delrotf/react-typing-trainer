import React, { useState } from "react";
import { LoginPage } from "../pages";

export const TypingContext = React.createContext({
  typedKey: null,
  setTypedKey: null,
  typedTexts: null,
  setTypedTexts: null,
});

const TypingContextProvider = props => {
  const [typedKey, setTypedKey] = useState();
  const [typedTexts, setTypedTexts] = useState([]);
  return (
    <TypingContext.Provider
      value={{
        typedKey,
        setTypedKey,
        typedTexts,
        setTypedTexts
      }}
    >
      {props.children}
    </TypingContext.Provider>
  );
};

export { TypingContextProvider };

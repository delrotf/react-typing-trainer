import React, { useState } from "react";
import { LoginPage } from "../pages";

export const TypingContext = React.createContext({
  text: null,
  setText: null,
  typedTexts: null,
  setTypedTexts: null,
});

const TypingContextProvider = props => {
  const [text, setText] = useState('The quick bron fox jumped over the lazy dog'.split(''));
  const [typedTexts, setTypedTexts] = useState([]);
  return (
    <TypingContext.Provider
      value={{
        text,
        setText,
        typedTexts,
        setTypedTexts
      }}
    >
      {props.children}
    </TypingContext.Provider>
  );
};

export { TypingContextProvider };

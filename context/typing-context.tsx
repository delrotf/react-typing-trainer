import React, { useRef, useState } from "react";
import { LoginPage } from "../pages";

export const TypingContext = React.createContext({
  text: null,
  setText: null,
  typedTexts: null,
  setTypedTexts: null,
  secondsLapsed: null,
  setSecondsLapsed: null
});

const TypingContextProvider = props => {
  const [text, setText] = useState(
    "The quick brown fox jumped over the lazy dog"
  );
  const [typedTexts, setTypedTexts] = useState([]);
  const [secondsLapsed, setSecondsLapsed] = useState(0);

  return (
    <TypingContext.Provider
      value={{
        text,
        setText,
        typedTexts,
        setTypedTexts,
        secondsLapsed,
        setSecondsLapsed
      }}
    >
      {props.children}
    </TypingContext.Provider>
  );
};

export { TypingContextProvider };

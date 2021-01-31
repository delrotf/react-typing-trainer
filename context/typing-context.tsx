import React, { useRef, useState } from "react";

export const TypingContext = React.createContext({
  text: null,
  setText: null,
  typedTexts: null,
  setTypedTexts: null,
  secondsLapsed: null,
  setSecondsLapsed: null,
  done: null,
});

const TypingContextProvider = props => {
  const [text, setText] = useState(
    "The quick brown fox jumped over the lazy dog"
  );
  const [typedTexts, setTypedTexts] = useState([]);
  const [secondsLapsed, setSecondsLapsed] = useState(0);
  const done = useRef(false)

  return (
    <TypingContext.Provider
      value={{
        text,
        setText,
        typedTexts,
        setTypedTexts,
        secondsLapsed,
        setSecondsLapsed,
        done
      }}
    >
      {props.children}
    </TypingContext.Provider>
  );
};

export { TypingContextProvider };

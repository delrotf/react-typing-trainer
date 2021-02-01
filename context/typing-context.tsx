import React, { useRef, useState } from "react";

export const TypingContext = React.createContext({
  text: null,
  setText: null,
  typedTexts: null,
  setTypedTexts: null,
  secondsLapsed: null,
  setSecondsLapsed: null,
  done: null,
  setDone: null,
  timerSecCount: null,
  setTimerSecCount: null,
  reset: null,
  setReset: null
});

const TypingContextProvider = props => {
  const [text, setText] = useState(
    "The quick brown fox jumped over the lazy dog The quick brown fox jumped over the lazy dog "
  );
  const [typedTexts, setTypedTexts] = useState([]);
  const [secondsLapsed, setSecondsLapsed] = useState(0);
  const [done, setDone] = useState(false);
  const [timerSecCount, setTimerSecCount] = useState(1);
  const [reset, setReset] = useState(0);

  return (
    <TypingContext.Provider
      value={{
        text,
        setText,
        typedTexts,
        setTypedTexts,
        secondsLapsed,
        setSecondsLapsed,
        done,
        setDone,
        timerSecCount,
        setTimerSecCount,
        reset,
        setReset
      }}
    >
      {props.children}
    </TypingContext.Provider>
  );
};

export { TypingContextProvider };

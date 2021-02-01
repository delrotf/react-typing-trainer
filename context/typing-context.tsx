import React, { useRef, useState } from "react";

export const TypingContext = React.createContext({
  text: null,
  setText: null,
  arrayOfTexts: null,
  setArrayOfTexts: null,
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
  const [text, setText] = useState(null);
  const [typedTexts, setTypedTexts] = useState([]);
  const [secondsLapsed, setSecondsLapsed] = useState(0);
  const [done, setDone] = useState(false);
  const [timerSecCount, setTimerSecCount] = useState(120);
  const [reset, setReset] = useState(0);
  const [arrayOfTexts, setArrayOfTexts] = useState([]);

  return (
    <TypingContext.Provider
      value={{
        text,
        setText,
        arrayOfTexts,
        setArrayOfTexts,
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

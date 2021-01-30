import React, { useContext, useEffect, useRef } from "react";
import { TypingContext, TypingContextProvider } from "../context/typing-context";
import { useEventListener } from "../hooks/useEventListener";

const ESCAPE_KEYS = ["27", "Escape"];

const TypingTrainer = props => {
  useEffect(()=> {
    console.log('Rendered')
  })

  const {typedKeys, setTypedKeys} = useContext(TypingContext)
  const keyhandler = ({ key }) => {
    setTypedKeys([{...typedKeys}, key])
    console.log("key", key, typedKeys);
    if (ESCAPE_KEYS.includes(String(key))) {
      console.log("Escape key pressed!");
    }
  };

  useEventListener("keydown", keyhandler);

  const mousehandler = key => {
    console.log("key", key);
    if (ESCAPE_KEYS.includes(String(key))) {
      console.log("Escape key pressed!");
    }
  };

  // useEventListener("mousedown", mousehandler, element.current);

  return (
    <TypingContextProvider>
    <div>
    {typedKeys?.map((el, index) => {
      <span key={index}>{el}asdf</span>
    })}
    </div>
    </TypingContextProvider>
    )
}

export { TypingTrainer}
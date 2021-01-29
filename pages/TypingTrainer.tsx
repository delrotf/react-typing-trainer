import React, { useRef } from "react";
import { useEventListener } from "../hooks/useEventListener";

const ESCAPE_KEYS = ["27", "Escape"];

export const TypingTrainer = props => {
  const keyhandler = ({ key }) => {
    console.log("key", key);
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

  return <div>hello world</div>
}

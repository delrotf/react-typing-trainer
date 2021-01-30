import React, { useContext } from "react";
import { TypingContext } from "../context/typing-context";

const Metrics = props => {
  const { text, typedTexts} = useContext(TypingContext)

  return <div>Metrics</div>;
};

export { Metrics };

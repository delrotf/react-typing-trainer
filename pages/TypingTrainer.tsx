import React, { useContext, useEffect, useState } from "react";
import { Metrics } from "../components/Metrics";
import { TypeBox } from "../components/TypeBox";
import { TypingContext } from "../context/typing-context";

const TypingTrainer = props => {
  const { text, typedTexts} = useContext(TypingContext)

  return (
    <div className="typing-trainer p-5">
      <TypeBox />
      {text?.length === typedTexts?.length && <Metrics/>}
    </div>
  );
};

export { TypingTrainer };

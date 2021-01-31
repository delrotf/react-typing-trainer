import React, { useContext, useEffect, useState } from "react";
import { Metrics } from "../components/Metrics";
import { Timer } from "../components/Timer";
import { TypeBox } from "../components/TypeBox";
import { TypingContextProvider } from "../context/typing-context";

const TypingTrainer = props => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 20); // 10 minutes timer

  return (
    <div className="typing-trainer p-5">
      <div>
        <Timer expiryTimestamp={time} />
        <TypeBox />
        <Metrics />
      </div>
    </div>
  );
};

export { TypingTrainer };

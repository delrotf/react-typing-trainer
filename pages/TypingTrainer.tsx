import React, { useContext, useEffect, useState } from "react";
import { Metrics } from "../components/Metrics";
import { Timer } from "../components/Timer";
import { TypeBox } from "../components/TypeBox";
import { TypingContext } from "../context/typing-context";

const TypingTrainer = props => {
  const { timerSecCount } = useContext(TypingContext);
  const time = new Date();
  time.setSeconds(time.getSeconds() + timerSecCount);

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

import React, { useContext, useEffect, useState } from "react";
import { Metrics } from "../components/Metrics";
import { Timer } from "../components/Timer";
import { TypeBox } from "../components/TypeBox";
import { TypingContext } from "../context/typing-context";

const TypingTrainer = props => {
  const { timerSecCount, secondsLapsed } = useContext(TypingContext);
  const time = new Date();
  time.setSeconds(time.getSeconds() + timerSecCount);

  const display = !secondsLapsed ? (
    <div>
      <Timer expiryTimestamp={time} />
      <TypeBox />
    </div>
  ) : (
    <Metrics />
  );

  return <div className="typing-trainer p-5">{display}</div>;
};

export { TypingTrainer };

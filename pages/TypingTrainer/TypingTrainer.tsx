import React, { useContext, useEffect, useReducer, useState } from "react";
import { Metrics } from "../../components/Metrics/Metrics";
import { Timer } from "../../components/Timer/Timer";
import { TypeBox } from "../../components/TypeBox/TypeBox";
import { TypingContext } from "../../context/typing-context";
import './TypingTrainer.scss'

const TypingTrainer = props => {
  const { timerSecCount, secondsLapsed } = useContext(TypingContext);

  const time = new Date();
  time.setSeconds(time.getSeconds() + timerSecCount);

  return (
    <div className="typing-trainer p-5">
      <div>
        <Timer expiryTimestamp={time} />
        <TypeBox />
        <div className={!secondsLapsed ? 'hidden' : 'ontop'}>
          <Metrics />
        </div>
      </div>
    </div>
  );
};

export { TypingTrainer };

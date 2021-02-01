import React, { useContext, useEffect, useReducer, useState } from "react";
import { Metrics } from "../../components/Metrics/Metrics";
import { Timer } from "../../components/Timer/Timer";
import { TypeBox } from "../../components/TypeBox/TypeBox";
import { LoginContext } from "../../context";
import { TypingContext } from "../../context/typing-context";
import "./TypingTrainer.scss";

const TypingTrainer = props => {
  const { username, authenticated } = useContext(LoginContext);

  useEffect(() => {
    if (!authenticated) {
      props.history.push("/");
    }
  }, [authenticated]);

  const { timerSecCount, secondsLapsed } = useContext(TypingContext);

  const time = new Date();
  time.setSeconds(time.getSeconds() + timerSecCount);

  return (
    <div className="typing-trainer">
      <div>
        <div className="accent py-3">Hello, {username}</div>
        <div className="d-flex justify-content-center p-5">
          <div>
            <Timer expiryTimestamp={time} />
            <TypeBox />
            <div className={!secondsLapsed ? "hidden" : "ontop"}>
              <Metrics />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { TypingTrainer };

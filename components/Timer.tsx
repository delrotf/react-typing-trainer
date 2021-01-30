import React, { useContext, useEffect } from "react";
import { useTimer } from "react-timer-hook";
import { TypingContext } from "../context/typing-context";

const Timer = ({ expiryTimestamp }) => {
  const { text, typedTexts } = useContext(TypingContext);
  const typedTextsLength = typedTexts.length;

  const onExpireHandler = () => {
    pause();
  };

  const {
    seconds,
    minutes,
    isRunning,
    start,
    pause,
    resume,
    restart
  } = useTimer({
    expiryTimestamp,
    onExpire: onExpireHandler
  });

  useEffect(() => {
    if (!typedTextsLength) {
      pause();
    } else if (!isRunning && typedTextsLength === 1) {
      restart(expiryTimestamp);
    }
  }, [typedTextsLength]);

  return (
    <div className="timer">
      <div>
        <div className="d-inline-flex">
          <span className="digit">{minutes}</span>
          <span className="colon">
            <span />
            <span />
          </span>
          {seconds.toString().split("").length === 1 && (
            <span className="digit">0</span>
          )}
          {seconds
            .toString()
            .split("")
            .map((el, index) => (
              <span key={index} className="digit">
                {el}
              </span>
            ))}
        </div>
        <p>{isRunning ? "Running" : "Not running"}</p>
      </div>
    </div>
  );
};

export { Timer };

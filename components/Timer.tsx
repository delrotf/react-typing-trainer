import React, { useContext, useEffect, useRef } from "react";
import { useTimer } from "react-timer-hook";
import { TypingContext } from "../context/typing-context";

const Timer = ({ expiryTimestamp }) => {
  const { text, typedTexts, setSecondsLapsed } = useContext(TypingContext);
  const typedTextsLength = typedTexts.length;
  const textLength = text.length;

  const onExpireHandler = () => {
    pause();
    console.log(startMin.current, startSec.current, minutes, seconds);
    setSecondsLapsed(startMin.current * 60 + startSec.current);
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

  const startMin = useRef(0);
  const startSec = useRef(0);

  useEffect(() => {
    if (!typedTextsLength || textLength === typedTextsLength) {
      pause();

      if (textLength === typedTextsLength) {
        setSecondsLapsed(
          startMin.current * 60 + startSec.current - (minutes * 60 + seconds)
        );
      }
    } else if (!isRunning && typedTextsLength === 1) {
      restart(expiryTimestamp);
      startMin.current = minutes;
      startSec.current = seconds;
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
        <div className="d-flex justify-content-center text-muted">
          <span>{isRunning ? "Running" : "Not running"}</span>
        </div>
      </div>
    </div>
  );
};

export { Timer };

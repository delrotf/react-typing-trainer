import React, { useContext, useEffect, useRef, useState } from "react";
import { useTimer } from "react-timer-hook";
import { TypingContext } from "../../context/typing-context";
import "./Timer.scss";

const Timer = ({ expiryTimestamp }) => {
  const {
    typedTexts,
    setSecondsLapsed,
    done,
    setDone,
    timerSecCount
  } = useContext(TypingContext);
  const typedTextsLength = typedTexts.length;

  const onExpireHandler = () => {
    pause();
    setDone(true);
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

  const [startMin] = useState(minutes);
  const [startSec] = useState(seconds);

  // pause time
  useEffect(() => {
    if (!typedTextsLength || done) {
      if (isRunning) {
        pause();
      }
    }
  }, [isRunning]);

  useEffect(() => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + timerSecCount);

    if (!typedTextsLength || done) {
      //reset time first then pause with useEffect
      restart(time);

      if (done) {
        setSecondsLapsed(startMin * 60 + startSec - (minutes * 60 + seconds));
      }
    } else if (!isRunning && typedTextsLength === 1) {
      restart(time);
    }
  }, [done, typedTextsLength]);

  return (
    <div className="timer">
      <div>
        <div className="d-inline-flex">
          <span className="digit">{minutes}</span>
          <span className="colon">
            <span />
            <span />
          </span>
          {!isRunning && startSec.toString().split("").length === 1 && (
            <span className="digit">0</span>
          )}
          {isRunning && seconds.toString().split("").length === 1 && (
            <span className="digit">0</span>
          )}
          {!isRunning &&
            startSec
              .toString()
              .split("")
              .map((el, index) => (
                <span key={index} className="digit">
                  {el}
                </span>
              ))}
          {isRunning &&
            seconds
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

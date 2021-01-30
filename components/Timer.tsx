import React, { useContext, useEffect } from 'react';
import { useTimer } from 'react-timer-hook';
import { TypingContext } from '../context/typing-context';

const Timer = ({ expiryTimestamp }) => {
  const { text, typedTexts } = useContext(TypingContext);

  const time = new Date();
  time.setSeconds(time.getSeconds() + 180);

  const {
    seconds,
    minutes,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

  if (!typedTexts.length) {
    pause()
  }

  useEffect(() => {
    if (!isRunning) {
      restart(time)
    }
  }, [isRunning])

  return (
    <div className='timer' style={{textAlign: 'center'}}>
      <div style={{fontSize: '100px'}}>
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <p>{isRunning ? 'Running' : 'Not running'}</p>

    </div>
  );
}

export { Timer }
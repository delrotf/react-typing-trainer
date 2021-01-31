import React, { useContext } from "react";
import { TypingContext } from "../context/typing-context";

const Metrics = props => {
  const { text, typedTexts, secondsLapsed } = useContext(TypingContext);
  const typedTextsLength = typedTexts.length;
  const textLength = text.length;

  const word = 5;
  const wordCount = typedTextsLength / word;

  const wpm = secondsLapsed
    ? wordCount / secondsLapsed * 60
    : 0;

  let accuracy = 0;
  if (JSON.stringify(text) === JSON.stringify(typedTexts)) {
    accuracy = 100;
  } else {
    let correctCount = 0;

    typedTexts.forEach((el, index) => {
      const textChar = text[index];
      if (el === textChar) {
        correctCount++;
      }
    });

    if (correctCount) {
      accuracy = (correctCount / typedTextsLength) * 100;
    }
  }

  const completion = (typedTextsLength / textLength) * 100;

  return (
    <div className="metrics">
      <div className="accuracy">
        <span className="label">Accuracy</span>
        <span className="value">{accuracy.toFixed(2)}</span>
      </div>
      <div className="completion">
        <span className="label">Completion</span>
        <span className="value">{completion.toFixed(2)}</span>
      </div>
      <div className="wpm">
        <span className="label">wpm</span>
        <span className="value">{wpm.toFixed(2)}</span>
      </div>{" "}
    </div>
  );
};

export { Metrics };

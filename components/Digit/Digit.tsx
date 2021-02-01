import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

const Digit = props => {
  const { digit, onUp, onDown } = props;
  return (
    <div className="digit">
      <FontAwesomeIcon icon={faAngleUp} />
      <span className="digit-number">{digit}</span>
      <FontAwesomeIcon icon="{faAngleDown}" />
    </div>
  );
};

export { Digit };

import React, { useContext, useEffect, useState } from "react";
import { TypeBox } from "../components/TypeBox";

const TypingTrainer = props => {
  return (
    <div className="typing-trainer p-5">
      <TypeBox />
    </div>
  );
};

export { TypingTrainer };

import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Main } from "./Main";
import "bootstrap/dist/css/bootstrap.min.css";

import "./style.scss";
import { TypingTrainer } from "./pages/TypingTrainer";

const App = () => {
  return (
    <BrowserRouter>
      {/*TODO put main here*/}
      <TypingTrainer />
    </BrowserRouter>
  );
};

render(<App />, document.getElementById("root"));

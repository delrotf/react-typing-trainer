import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Main } from "./Main";
import "bootstrap/dist/css/bootstrap.min.css";

import "./style.scss";
import { TypingTrainer } from "./pages/TypingTrainer";
import { TypingContextProvider } from "./context/typing-context";

const App = () => {
  return (
    <BrowserRouter>
      {/*TODO put main here*/}
        <Main />
    </BrowserRouter>
  );
};

render(<App />, document.getElementById("root"));

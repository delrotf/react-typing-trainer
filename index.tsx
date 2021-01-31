import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Main } from "./Main";
import "bootstrap/dist/css/bootstrap.min.css";

import "./style.scss";

const App = () => {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
};

render(<App />, document.getElementById("root"));

import React from "react";
import { LoginPage } from "./pages";
import { Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginContextProvider } from "./context";
import { TypingTrainer } from "./pages/TypingTrainer";

const Main = props => {
  return (
    <div>
      <LoginContextProvider>
        {/*<Route path="/" exact component={LoginPage} />
        <Route path="/home" exact component={HomePage} />
        <Route path="/" exact component={TypingTrainer} />*/}
        <TypingTrainer />
      </LoginContextProvider>
    </div>
  );
};

export { Main };

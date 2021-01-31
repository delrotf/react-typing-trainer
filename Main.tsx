import React from "react";
import { LoginPage } from "./pages";
import { Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginContextProvider } from "./context";
import { TypingTrainer } from "./pages/TypingTrainer";
import { TypingContextProvider } from "./context/typing-context";

const Main = props => {
  return (
    <div>
      <LoginContextProvider>
        {/*<Route path="/" exact component={LoginPage} />
        <Route path="/home" exact component={HomePage} />
        <Route path="/" exact component={TypingTrainer} />*/}
        <TypingContextProvider>
          <TypingTrainer />
        </TypingContextProvider>
      </LoginContextProvider>
    </div>
  );
};

export { Main };

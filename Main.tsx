import React from "react";
import { Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginContextProvider } from "./context";
import { TypingContextProvider } from "./context/typing-context";
import { TypingTrainer } from "./pages/TypingTrainer/TypingTrainer";
import { LoginPage } from "./pages/LoginPage/LoginPage";

const Main = props => {
  return (
    <div>
      <LoginContextProvider>
        <Route path="/" exact component={LoginPage} />
        <Route path="/home" exact component={HomePage} />
        <TypingContextProvider>
          <Route path="/typing-trainer" exact component={TypingTrainer} />
        </TypingContextProvider>
      </LoginContextProvider>
    </div>
  );
};

export { Main };

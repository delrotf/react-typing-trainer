import React, { useContext, useEffect } from "react";
import { Jumbotron } from "react-bootstrap";
import { LoginContext } from "../context";

const HomePage = props => {
  const { firstname, authenticated } = useContext(LoginContext);

  useEffect(() => {
    if (!authenticated) {
      props.history.push('/')
    }
  }, [authenticated])

  return (
    <div>
      <Jumbotron>
        <h1>Hello, {firstname}!</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </Jumbotron>
    </div>
  );
};

export { HomePage };

import React from "react";
import { FormCard } from "../components";

const LoginPage = props => {
  return (
    <div className="login-page mt-5 pt-5 d-flex justify-content-center">
      <FormCard {...props}/>
    </div>
  );
};

export { LoginPage };

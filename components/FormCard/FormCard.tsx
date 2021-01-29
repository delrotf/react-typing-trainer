
import React from "react";
import { LoginForm } from "..";

const FormCard = props => {
  return (
    <div className="form-card border">
      <div className="header text-center p-2 text-light">header</div>
      <div>
        <LoginForm {...props} />
      </div>
    </div>
  );
};

export { FormCard };

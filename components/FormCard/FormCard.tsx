import React from "react";
import { LoginForm } from "..";
import "./FormCard.scss";

const FormCard = props => {
  return (
    <div className="form-card border">
      <div className="header text-center p-2">Typing Trainer</div>
      <div>
        <LoginForm {...props} />
      </div>
    </div>
  );
};

export { FormCard };

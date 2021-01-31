import React from "react";

import "./ErrorModal.scss";

const ErrorModal = React.memo(props => {
  const { onClose } = props;
  return (
    <React.Fragment>
      <div className="backdrop" onClick={onClose} />
      <div className="error-modal">
        <h2>An Error Occurred!</h2>
        <p>{props.children}</p>
        <div className="error-modal__actions">
          <button type="button" onClick={onClose}>
            Okay
          </button>
        </div>
      </div>
    </React.Fragment>
  );
});

export default ErrorModal;

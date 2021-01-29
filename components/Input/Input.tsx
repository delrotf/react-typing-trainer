import React from "react";
import { Col, Form } from "react-bootstrap";
import { Field } from "formik";

const Input = props => {
  const { controlId, label, name, type, placeholder, hint, ...rest } = props;

  return (
    <Form.Group as={Col} controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <Field name={name}>
        {props => {
          const { field, form, meta } = props;
          return (
            <React.Fragment>
              <Form.Control
                type={type}
                placeholder={placeholder}
                isValid={meta.touched && !!!meta.error}
                isInvalid={meta.touched && !!meta.error}
                {...field}
              />
              {(!meta.touched || (meta.touched && !meta.error)) && (
                <Form.Text muted>{hint}</Form.Text>
              )}
              <Form.Control.Feedback type="invalid">
                {meta.error}
              </Form.Control.Feedback>
            </React.Fragment>
          );
        }}
      </Field>
    </Form.Group>
  );
};

export { Input };

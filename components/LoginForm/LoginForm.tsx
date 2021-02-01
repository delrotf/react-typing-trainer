import { Formik, Form } from "formik";
import React, { useContext } from "react";
import { Button, Form as BsForm } from "react-bootstrap";
import * as Yup from "yup";
import { Input } from "..";
import {
  LoginContext,
  LoginContextProvider
} from "../../context/login-context";

const LoginForm = props => {
  const { setUsername, setAuthenticated } = useContext(LoginContext);

  const formValues = {
    username: ""
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .required("This field is required.")
      .min(4, "At least ${min} characters.")
  });

  const onSubmit = values => {
    console.log("values", values);
    setUsername(values.username);
    setAuthenticated(true);
    props.history.push("/typing-trainer");
  };

  return (
    <LoginContextProvider>
      <Formik
        initialValues={formValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {formik => (
          <Form>
            <div className="p-3">
              <BsForm.Row>
                <Input
                  controlId="username"
                  name="username"
                  type="text"
                  label="Username"
                  hint="Can be any username"
                />
              </BsForm.Row>
            </div>
            <hr />
            <div className="d-flex p-3">
              <Button variant="primary" className="flex-fill" type="submit">
                Let me in.
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </LoginContextProvider>
  );
};

export { LoginForm };

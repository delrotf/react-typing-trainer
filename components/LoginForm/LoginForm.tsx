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
  const { setFirstname, setAuthenticated } = useContext(LoginContext);

  const formValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  };

  const validationSchema = Yup.object({
    firstname: Yup.string().required("This field is required."),
    lastname: Yup.string().required("This field is required."),
    email: Yup.string()
      .required("This field is required.")
      .email("Invalid format."),
    password: Yup.string()
      .required("This field is required.")
      .min(8, "At least ${min} characters.")
  });

  const onSubmit = values => {
    console.log("values", values);
    setFirstname(values.firstname);
    setAuthenticated(true);
    props.history.push("/home");
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
                  controlId="firstname"
                  name="firstname"
                  type="text"
                  label="Firstname"
                  hint="firstname"
                  placeholder="Firstname"
                />
                <Input
                  controlId="lastname"
                  name="lastname"
                  type="text"
                  label="Lastname"
                  hint="Lastname"
                  placeholder="Lastname"
                />
              </BsForm.Row>
              <BsForm.Row>
                <Input
                  controlId="email"
                  name="email"
                  type="email"
                  label="Email"
                  hint="email"
                  placeholder="Email"
                />
                <Input
                  controlId="password"
                  name="password"
                  type="password"
                  label="Password"
                  hint="password"
                  placeholder="Password"
                />
              </BsForm.Row>
            </div>
            <hr />
            <div className="d-flex p-3">
              <Button variant="primary" className="flex-fill" type="submit">
                Create
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </LoginContextProvider>
  );
};

export { LoginForm };

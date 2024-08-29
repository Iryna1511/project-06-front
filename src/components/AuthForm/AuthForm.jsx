import React, { useState } from "react";
import { useId } from "react";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import css from "./AuthForm.module.css";
import { PiEyeLight } from "react-icons/pi";
import { PiEyeSlash } from "react-icons/pi";

//<PiEyeLight />
// <PiEyeSlash />

const signUpValidationSchema = yup.object().shape({
  email: yup.string().email("Must be a valid email!").required("Required"),
  password: yup
    .string()
    .min(6, "Must be at least 6 characters!")
    .required("Required"),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const AuthForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [action, setAction] = useState("Sign Up");
  const emailFieldId = useId();
  const passwordFieldId = useId();
  const repeatPasswordFieldId = useId();

  const initialValues = { email: "", password: "", repeatPassword: "" };

  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
  };

  return (
    <div className={css.wrap_form}>
      <Formik
        initialValues={initialValues}
        validationSchema={signUpValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className={css.form}>
            <h2 className={css.title}>{action}</h2>

            <div>
              <label className={css.label} htmlFor={emailFieldId}>
                Enter your email
              </label>
              <Field
                className={css.field}
                type='email'
                name='email'
                id={emailFieldId}
                placeholder='Email'
              />
              {touched.email && errors.email && <div>{errors.email}</div>}
            </div>

            <div>
              <label className={css.label} htmlFor={passwordFieldId}>
                Enter your password
              </label>
              <Field
                className={css.field}
                type={showPassword ? "text" : "password"}
                name='password'
                id={passwordFieldId}
                placeholder='Password'
              />
              <div
                className={css.iconWrapper}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <PiEyeSlash /> : <PiEyeLight />}
              </div>

              {touched.password && errors.password && (
                <div>{errors.password}</div>
              )}
            </div>

            {action === "Sign In" ? (
              <div></div>
            ) : (
              <div>
                <label className={css.label} htmlFor={repeatPasswordFieldId}>
                  Repeat password
                </label>
                <Field
                  className={css.field}
                  type={showPassword ? "text" : "password"}
                  name='repeatPassword'
                  id={repeatPasswordFieldId}
                  placeholder='Repeat password'
                />

                <div
                  className={css.iconWrapper}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <PiEyeSlash /> : <PiEyeLight />}
                </div>
                {touched.repeatPassword && errors.repeatPassword && (
                  <div>{errors.repeatPassword}</div>
                )}
              </div>
            )}

            <button className={css.button} type='submit'>
              {action}
            </button>
            <div
              onClick={() =>
                setAction(action === "Sign In" ? "Sign Up" : "Sign In")
              }
            >
              {action === "Sign Up" ? "Sign In" : "Sign Up"}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AuthForm;

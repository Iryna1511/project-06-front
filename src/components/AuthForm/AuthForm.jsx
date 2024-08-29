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
            <h2 className={css.title}>Sign Up</h2>

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

            <label className={css.label} htmlFor={passwordFieldId}>
              Enter your password
            </label>
            <div>
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
            </div>

            {touched.password && errors.password && (
              <div>{errors.password}</div>
            )}

            <label className={css.label} htmlFor={repeatPasswordFieldId}>
              Repeat password
            </label>

            <div>
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
            </div>

            {touched.repeatPassword && errors.repeatPassword && (
              <div>{errors.repeatPassword}</div>
            )}

            <button className={css.button} type='submit'>
              Sign Up
            </button>
            <p>Sign in</p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AuthForm;

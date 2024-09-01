import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { useId } from "react";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { PiEyeLight } from "react-icons/pi";
import { PiEyeSlash } from "react-icons/pi";

import css from "./AuthForm.module.css";
import { login, register } from "../../redux/auth/operations.js";
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
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [action, setAction] = useState("Sign Up");
  const emailFieldId = useId();
  const passwordFieldId = useId();
  const repeatPasswordFieldId = useId();

  const initialValues = { email: "", password: "", repeatPassword: "" };

  // const handleSubmit = (values, actions) => {
  //   const { repeatPassword, ...loginValues } = values;

  //   switch (action) {
  //     case "Sign Up":
  //       dispatch(register(loginValues))
  //         .unwrap()
  //         .catch(alert("Registration error!"));
  //       break;
  //     case "Sign In":
  //       dispatch(login(loginValues));
  //       break;
  //     default:
  //       break;
  //   }

  //   actions.resetForm();
  // };

  const handleSubmit = async (values, actions) => {
    const { repeatPassword, ...loginValues } = values;

    try {
      switch (action) {
        case "Sign Up":
          await dispatch(register(loginValues)).unwrap();
          break;
        case "Sign In":
          await dispatch(login(loginValues)).unwrap();
          break;
        default:
          break;
      }
      actions.resetForm();
    } catch (error) {
      setErrorMessage(error); // Встановлюємо повідомлення про помилку
    }
  };

  return (
    <>
      <div
        className={css.containerBackground}
        style={{
          backgroundImage: "url(/img-sign-pages/signpage-d-bg-1x-min.png)",
        }}
      >
        {" "}
        <div className={css.wrap_section}>
          <div className={css.containerImageBottle}>
            <img src='/img-sign-pages/bottle-d-1x-min.png' />
          </div>

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
                      className={`${css.field} ${
                        errors.email && touched.email ? css.errorField : ""
                      }`}
                      type='email'
                      name='email'
                      id={emailFieldId}
                      placeholder='Email'
                    />
                    <ErrorMessage
                      name='email'
                      component='div'
                      className={css.errorText}
                    />
                    {/* {touched.email && errors.email && <div>{errors.email}</div>} */}
                  </div>

                  <div className={css.inputWrapper}>
                    <label className={css.label} htmlFor={passwordFieldId}>
                      Enter your password
                    </label>
                    <Field
                      className={`${css.field} ${
                        touched.password && errors.password
                          ? css.errorField
                          : ""
                      }`}
                      type={showPassword ? "text" : "password"}
                      name='password'
                      id={passwordFieldId}
                      placeholder='Password'
                    />
                    <div
                      className={css.iconWrapper}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <PiEyeSlash className={css.icon} />
                      ) : (
                        <PiEyeLight className={css.icon} />
                      )}
                    </div>
                    <ErrorMessage
                      name='password'
                      component='div'
                      className={css.errorText}
                    />
                    {/* {touched.password && errors.password && (
                      <div>{errors.password}</div>
                    )} */}
                  </div>

                  {action === "Sign In" ? (
                    <div></div>
                  ) : (
                    <div className={css.inputWrapper}>
                      <label
                        className={css.label}
                        htmlFor={repeatPasswordFieldId}
                      >
                        Repeat password
                      </label>
                      <Field
                        className={`${css.field} ${
                          touched.password && errors.password
                            ? css.errorField
                            : ""
                        }`}
                        type={showPassword ? "text" : "password"}
                        name='repeatPassword'
                        id={repeatPasswordFieldId}
                        placeholder='Repeat password'
                      />

                      <div
                        className={css.iconWrapper}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <PiEyeSlash className={css.icon} />
                        ) : (
                          <PiEyeLight className={css.icon} />
                        )}
                      </div>

                      <ErrorMessage
                        name='repeatPassword'
                        component='div'
                        className={css.errorText}
                      />
                      {/* {touched.repeatPassword && errors.repeatPassword && (
                        <div>{errors.repeatPassword}</div>
                      )} */}
                    </div>
                  )}

                  <button className={css.btn} type='submit'>
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
        </div>
      </div>
    </>
  );
};

export default AuthForm;

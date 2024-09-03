import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useId } from "react";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

import { PiEyeLight } from "react-icons/pi";
import { PiEyeSlash } from "react-icons/pi";

import css from "./AuthForm.module.css";
import { login, register } from "../../redux/auth/operations.js";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { selectUser } from "../../redux/auth/selectors";
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
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [action, setAction] = useState("Sign Up");
  const emailFieldId = useId();
  const passwordFieldId = useId();
  const repeatPasswordFieldId = useId();

  const user = useSelector(selectUser);

  const initialValues = {
    email: user.email ?? "",
    password: "",
    repeatPassword: "",
  };

  const handleClickAction = () => {
    setAction((prevAction) =>
      prevAction === "Sign In" ? "Sign Up" : "Sign In"
    );
  };

  useEffect(() => {
    if (location.pathname === "/signin") {
      setAction("Sign In");
    } else if (location.pathname === "/signup") {
      setAction("Sign Up");
    }
  }, [location.pathname]);

  const handleSubmit = (values, actions) => {
    const { repeatPassword, ...loginValues } = values;

    switch (action) {
      case "Sign Up":
        dispatch(register(loginValues))
          .unwrap()
          .then(() => {
            alert("Registration successful!");
            navigate("/signin"); // Тут змінила на /signin, бо має направляти на сторінку логування після умпішної реєстрації  @Olena Lytovchenko
          })
          .catch((e) => {
            console.log("Registration error! ", e);
            alert("Registration error!");
          });
        break;
      case "Sign In":
        dispatch(login(loginValues))
          .unwrap()
          .then(() => {
            alert("Login successful!");
            // navigate("/"); // тут не потрібна навігація, бо коли редакс повертає isLoggedIn = true, то спрацьовую саршрутизація і користувача кидає на /home  @ OlenaLytovchenko
          });
        break;
      default:
        break;
    }

    actions.resetForm();
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

                  <nav>
                    <Link
                      to={action === "Sign In" ? "/signup" : "/signin"}
                      className={css.link}
                      onClick={() =>
                        setAction(action === "Sign In" ? "Sign Up" : "Sign In")
                      }
                    >
                      {action === "Sign In" ? "Sign Up" : "Sign In"}
                    </Link>
                  </nav>
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

import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logoo.png";
import { MyContext } from "../providers/MyProvider";
import { MdPerson } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Button from "@mui/material/Button";
import { Spinner } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { object, string } from "yup";
import { useLogin } from "../hooks/custom/useLogin";

function Login() {
  document.title = "MyShop | Login";

  const navigate = useNavigate();
  const [isShowPassword, setisShowPassword] = useState<boolean>(false);
  const context = useContext(MyContext);

  const { login, isLoading } = useLogin();

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      navigate("/product");
    }
  }, [navigate]);

  useEffect(() => {
    context?.setisHideSidebarAndHeader(true);
  }, [context]);

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = object({
    username: string().required("Username is required"),
    password: string()
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(
        /[@$!%*?&]/,
        "Password must contain at least one special character (@$!%*?&)"
      )
      .min(12, "Password must be at least 12 characters")
      .required("Password is required"),
  });

  return (
    <>
      <img src={logo} className="loginPatern" alt="MyShop Logo" />
      <section className="loginSection">
        <div className="loginBox">
          <div className="logo text-center">
            <img src={logo} width="60px" alt="MyShop Logo" />
            <h5 className="font-weight-bold">Login to MyShop Admin</h5>
          </div>

          <div className="wrapper mt-3 card border">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={login} // Use the login function from the hook
            >
              {({ handleSubmit }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <div className="form-group position-relative">
                    <span className="icon">
                      <MdPerson />
                    </span>
                    <Field
                      type="text"
                      className="form-control"
                      placeholder="Enter your username"
                      name="username"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="form-group position-relative">
                    <span className="icon">
                      <RiLockPasswordFill />
                    </span>
                    <Field
                      type={isShowPassword ? "text" : "password"}
                      className="form-control"
                      placeholder="Enter your password"
                      name="password"
                    />
                    <span
                      className="toggleShowPassword"
                      onClick={() => setisShowPassword(!isShowPassword)}
                    >
                      {isShowPassword ? <IoMdEyeOff /> : <IoMdEye />}
                    </span>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="form-group">
                    <Button
                      className="btn-blue btn-lg w-100 btn-big"
                      type="submit"
                      disabled={isLoading}
                    >
                      <Spinner
                        animation="border"
                        as="span"
                        size="sm"
                        className="me-2"
                        hidden={!isLoading}
                      />
                      Sign In
                    </Button>
                    <small
                      style={{
                        marginTop: "2.5rem",
                        marginBottom: "0.5rem",
                        display: "block",
                        textAlign: "center",
                        color: "#5e5d72",
                        fontWeight: "bold",
                      }}
                    >
                      Don't have an account?{" "}
                      <NavLink to="/register">Register</NavLink>
                    </small>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;

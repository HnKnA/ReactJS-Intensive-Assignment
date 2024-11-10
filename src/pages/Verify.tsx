import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useVerifyUserMutation } from "../services/apis/auth";
import { toast } from "react-toastify";
import { UserContext } from "../providers/UserProvider";
import logo from "../assets/logoo.png";
import { MyContext } from "../providers/MyProvider";
import { MdPerson } from "react-icons/md";
import { RiCodeBoxFill } from "react-icons/ri";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import Button from "@mui/material/Button";
import { Spinner } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { string, object } from "yup";

function Verify() {
  document.title = "MyShop | Verify";

  const [verify, { isLoading }] = useVerifyUserMutation();
  const [isShowCode, setIsShowCode] = useState<boolean>(false);

  const context = useContext(MyContext);
  const userContext = useContext(UserContext);
  const navigate = useNavigate();

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
    code: "",
  };

  const validationSchema = object({
    username: string().required("Username is required"),
    code: string().required("Verification code is required"),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const res = await verify({
        userName: values.username,
        code: values.code,
      }).unwrap();
      const token = res.data?.token;
      const refreshToken = res.data?.refreshToken;

      if (token && refreshToken) {
        userContext?.doLogin(
          { userName: values.username },
          token,
          refreshToken
        );
        toast.success(res.message || "Verify successful.");
        context?.setisHideSidebarAndHeader(false);
        navigate("/product");
      } else {
        toast.error(
          res.message || "You are not authorized to access this application."
        );
        userContext?.doLogout();
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "An error occurred during verify.");
    }
  };

  return (
    <>
      <img src={logo} className="loginPatern" alt="MyShop Logo" />
      <section className="loginSection">
        <div className="loginBox">
          <div className="logo text-center">
            <img src={logo} width="60px" alt="MyShop Logo" />
            <h5 className="font-weight-bold">
              Check your email for Verification
            </h5>
          </div>

          <div className="wrapper mt-3 card border">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ handleSubmit }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <div className="form-group position-relative">
                    <span className="icon">
                      <MdPerson />
                    </span>
                    <Field
                      type="text"
                      name="username"
                      className="form-control"
                      placeholder="Enter your username"
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="form-group position-relative">
                    <span className="icon">
                      <RiCodeBoxFill />
                    </span>
                    <Field
                      type={isShowCode ? "text" : "password"}
                      name="code"
                      className="form-control"
                      placeholder="Enter your verification code"
                    />
                    <span
                      className="toggleShowPassword"
                      onClick={() => setIsShowCode(!isShowCode)}
                    >
                      {isShowCode ? <IoMdEyeOff /> : <IoMdEye />}
                    </span>
                    <ErrorMessage
                      name="code"
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
                      Verify
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
                      Back to log in <NavLink to="/">Log in</NavLink>
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

export default Verify;

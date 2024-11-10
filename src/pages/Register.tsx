import { useState, useContext, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import Button from "@mui/material/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../services/apis/auth";
import { toast } from "react-toastify";
import logo from "../assets/logoo.png";
import { MyContext } from "../providers/MyProvider";
import { MdDetails, MdInfo, MdMail, MdPerson } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useFormik } from "formik";
import { object, string } from "yup";

function Register() {
  document.title = "MyShop | Register";

  const [register, { isLoading }] = useRegisterUserMutation();
  const [inputIndex, setInputIndex] = useState<number | null>(null);
  const [isShowPassword, setisShowPassword] = useState<boolean>(false);

  const navigate = useNavigate();
  const context = useContext(MyContext);

  useEffect(() => {
    context?.setisHideSidebarAndHeader(true);
  }, [context]);

  const validationSchema = object({
    username: string().required("Username is required"),
    email: string().email("Invalid email format").required("Email is required"),
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
    firstname: string().required("First name is required"),
    lastname: string().required("Last name is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      firstname: "",
      lastname: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const apiData = {
          userName: values.username,
          password: values.password,
          email: values.email,
          firstName: values.firstname,
          lastName: values.lastname,
        };

        const response = await register(apiData).unwrap();
        if (response.status === 200) {
          toast.success("Registration successful");
          navigate("/");
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error("Registration failed");
      }
    },
  });

  const focusInput = (index: number) => {
    setInputIndex(index);
  };

  return (
    <>
      <img src={logo} className="loginPatern" alt="MyShop Logo" />
      <section className="loginSection">
        <div className="loginBox">
          <div className="logo text-center">
            <img src={logo} width="60px" alt="MyShop Logo" />
            <h5 className="font-weight-bold">Register for MyShop</h5>
          </div>

          <div className="wrapper mt-3 card border">
            <form noValidate onSubmit={formik.handleSubmit}>
              <div
                className={`form-group position-relative ${
                  inputIndex === 0 ? "focus" : ""
                }`}
              >
                <span className="icon">
                  <MdPerson />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="enter your username"
                  name="username"
                  onFocus={() => focusInput(0)}
                  onBlur={() => setInputIndex(null)}
                  autoFocus
                  autoComplete="on"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />
                {formik.touched.username && formik.errors.username && (
                  <small className="text-danger">
                    {formik.errors.username}
                  </small>
                )}
              </div>

              <div
                className={`form-group position-relative ${
                  inputIndex === 1 ? "focus" : ""
                }`}
              >
                <span className="icon">
                  <RiLockPasswordFill />
                </span>
                <input
                  type={isShowPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="enter your password"
                  name="password"
                  onFocus={() => focusInput(1)}
                  onBlur={() => setInputIndex(null)}
                  autoComplete="on"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                <span
                  className="toggleShowPassword"
                  onClick={() => setisShowPassword(!isShowPassword)}
                >
                  {isShowPassword ? <IoMdEyeOff /> : <IoMdEye />}
                </span>
                {formik.touched.password && formik.errors.password && (
                  <small className="text-danger">
                    {formik.errors.password}
                  </small>
                )}
              </div>

              <div
                className={`form-group position-relative ${
                  inputIndex === 2 ? "focus" : ""
                }`}
              >
                <span className="icon">
                  <MdMail />
                </span>
                <input
                  type="email"
                  className="form-control"
                  placeholder="enter your email"
                  name="email"
                  onFocus={() => focusInput(2)}
                  onBlur={() => setInputIndex(null)}
                  autoFocus
                  autoComplete="on"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <small className="text-danger">{formik.errors.email}</small>
                )}
              </div>

              <div
                className={`form-group position-relative ${
                  inputIndex === 3 ? "focus" : ""
                }`}
              >
                <span className="icon">
                  <MdInfo />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="enter your firstname"
                  name="firstname"
                  onFocus={() => focusInput(3)}
                  onBlur={() => setInputIndex(null)}
                  autoFocus
                  autoComplete="on"
                  onChange={formik.handleChange}
                  value={formik.values.firstname}
                />
                {formik.touched.firstname && formik.errors.firstname && (
                  <small className="text-danger">
                    {formik.errors.firstname}
                  </small>
                )}
              </div>

              <div
                className={`form-group position-relative ${
                  inputIndex === 4 ? "focus" : ""
                }`}
              >
                <span className="icon">
                  <MdDetails />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="enter your lastname"
                  name="lastname"
                  onFocus={() => focusInput(4)}
                  onBlur={() => setInputIndex(null)}
                  autoFocus
                  autoComplete="on"
                  onChange={formik.handleChange}
                  value={formik.values.lastname}
                />
                {formik.touched.lastname && formik.errors.lastname && (
                  <small className="text-danger">
                    {formik.errors.lastname}
                  </small>
                )}
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
                  Register
                </Button>
                <small
                  style={{
                    marginTop: "1.5rem",
                    marginBottom: "0.5rem",
                    display: "block",
                    textAlign: "center",
                    color: "#5e5d72",
                    fontWeight: "bold",
                  }}
                >
                  Already have an account? <NavLink to="/">Sign in</NavLink>
                </small>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;

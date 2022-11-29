import PropTypes from "prop-types";
import React, { useState, useEffect, Fragment } from "react";
import MetaTags from "react-meta-tags";
import { Link, useHistory } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Frontlayout from "../../layouts/Frontlayout";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import axios from "axios";
const apiKey = process.env.REACT_APP_YK_API_KEY;
const serverURL = process.env.REACT_APP_SERVER_URL;

const Login = ({ location }) => {
  const { pathname } = location;
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      history.push(`/accounts/${localStorage.getItem("user_id")}`);
    }
  }, []);

  const [error, setError] = useState({});
  const [values, setValues] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    address: "",
    date_of_birth: "",
    mobile: "",
  });
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  async function signIn(e) {
    e.preventDefault();
    let item = {
      ...values,
    };
    let axiosConfig = {
      headers: {
        "yourkoseli-api-key": `${apiKey}`,
      },
    };
    await axios
      .post(`${serverURL}` + "login", item, axiosConfig)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user_id", JSON.stringify(response.data.user_id));
        localStorage.setItem("user_name", JSON.stringify(response.data.user_name));
        history.push(`/accounts/${localStorage.getItem("user_id")}`);
      })
      .catch((error) => {
        setError(error.response.data.errors);
      });
  }
  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Login</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Login
      </BreadcrumbsItem>
      <Frontlayout headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <div className="login-form-container">
                    <div className="login-register-form">
                      <form>
                        {error.auth ? <p>{error.auth}</p> : ""}
                        <label className="label">Email</label>
                        <input
                          name="email"
                          placeholder="Email"
                          type="email"
                          value={values.email}
                          onChange={handleChange}
                        />
                        {error.email ? <p>{error.email}</p> : ""}
                        <label className="label">Password</label>
                        <input
                          type="password"
                          name="password"
                          placeholder="Password"
                          value={values.password}
                          onChange={handleChange}
                        />
                        {error.password ? <p>{error.password}</p> : ""}
                        <div className="button-box">
                          <div className="login-toggle-btn">
                            <input type="checkbox" />
                            <label className="ml-10">Remember me</label>
                            <Link to={process.env.PUBLIC_URL + "/"}>
                              Forgot Password?
                            </Link>
                          </div>
                          <button type="submit" onClick={signIn}>
                            <span>Login</span>
                          </button>
                        </div>
                        <div className="button-box">
                          <div className="login-toggle-btn">
                            <Link to={process.env.PUBLIC_URL + "/register"}>
                              Don't have an accout? Signup from here !
                            </Link>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Frontlayout>
    </Fragment>
  );
};

Login.propTypes = {
  location: PropTypes.object,
};

export default Login;

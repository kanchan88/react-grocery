import PropTypes from "prop-types";
import React, { useState, Fragment } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Frontlayout from "../../layouts/Frontlayout";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import axios from "axios";
const apiKey = process.env.REACT_APP_YK_API_KEY;
const serverURL = process.env.REACT_APP_SERVER_URL;

const Register = ({ location }) => {
  const { pathname } = location;

  const [error, setError] = useState({});
  const [token, setToken] = useState({});
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    date_of_birth: "",
    mobile: "",
  });
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  async function signUp(e){
    e.preventDefault();
    console.log("METHOD CALLED");
    const newUser = {
      "username": values.name,
      "password": values.password,
      "email": values.email,
      "customer": {
          "phone": values.mobile,
          "date_of_birth": values.date_of_birth
      }
  }
    await axios
    .post(
      'http://127.0.0.1:8080/api/customer',
       newUser,
       )
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error.message)
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
        Register
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
                        <label className="label">Unqiue Username</label>
                        <input
                          type="text"
                          name="name"
                          placeholder="username"
                          defaultValue={values.name}
                          onChange={handleChange}
                          required
                        />
                        <label className="label">Date of Birth</label>
                        <input
                          name="date_of_birth"
                          type="date"
                          value={values.date_of_birth}
                          onChange={handleChange}
                          required
                        />
                        {error.date_of_birth ? (
                          <p>{error.date_of_birth}</p>
                        ) : (
                          ""
                        )}
                        <label className="label">Mobile Number</label>
                        <input
                          name="mobile"
                          placeholder="Contact Number"
                          type="text"
                          pattern="[0-9]*"
                          maxLength="10"
                          value={values.mobile}
                          onChange={handleChange}
                          required
                        />
                        {error.mobile ? <p>{error.mobile}</p> : ""}
                        <label className="label">Email</label>
                        <input
                          name="email"
                          placeholder="Email"
                          type="email"
                          value={values.email}
                          onChange={handleChange}
                          required
                        />
                        {error.email ? <p>{error.email}</p> : ""}
                        <label className="label">Password</label>
                        <input
                          type="password"
                          name="password"
                          placeholder="Password"
                          defaultValue={values.password}
                          onChange={handleChange}
                          autoComplete="on"
                          required
                        />
                        {error.password ? <p>{error.password}</p> : ""}
                        <div className="button-box">
                          <button type="submit" onClick={signUp}>
                            <span>Register</span>
                          </button>
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

Register.propTypes = {
  location: PropTypes.object,
};

export default Register;

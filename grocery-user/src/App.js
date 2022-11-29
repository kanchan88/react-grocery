import PropTypes from "prop-types";
import React, { useState, useEffect, Suspense, lazy } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { multilanguage, loadLanguages } from "redux-multilanguage";
import { connect } from "react-redux";
import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";

const Home = lazy(() => import("./pages/home/Home"));
//shop page
const Shop = lazy(() => import("./pages/shop/Shop"));
// product page
const Product = lazy(() => import("./pages/shop-product/Product"));

const Cart = lazy(() => import("./pages/other/Cart"));

const Checkout = lazy(() => import("./pages/other/Checkout"));

const Register = lazy(() => import("./pages/other/Register"));

const Login = lazy(() => import("./pages/other/Login"));

const ProtectedRoutes = lazy(() => import("./protected/ProtectedRoutes"));

const MyAccount = lazy(() => import("./pages/other/MyAccount"));

const PayPal = lazy(() => import("./pages/payments/PayPal"));

const Esewa = lazy(() => import("./pages/payments/Esewa"));

const Khalti = lazy(() => import("./pages/payments/Khalti"));

const Success = lazy(() => import("./pages/other/Success"));

const App = (props) => {
  useEffect(() => {
    props.dispatch(
      loadLanguages({
        languages: {
          en: require("./translations/english.json"),
          fn: require("./translations/french.json"),
          de: require("./translations/germany.json"),
          ne: require("./translations/nepali.json"),
        },
      })
    );
  });
  return (
    <ToastProvider placement="bottom-left">
      <BreadcrumbsProvider>
        <Router>
          <ScrollToTop>
            <Suspense
              fallback={
                <div className="flone-preloader-wrapper">
                  <div className="flone-preloader">
                    <span></span>
                    <span></span>
                  </div>
                </div>
              }
            >
              <Switch>
                {/* {home pages} */}
                <Route
                  exact
                  path={process.env.PUBLIC_URL + "/"}
                  component={Home}
                />
                {/* {shop pages} */}
                <Route
                  exact
                  path={process.env.PUBLIC_URL + "/shop"}
                  component={Shop}
                />
                {/*Product Pages*/}
                <Route
                  exact
                  path={
                    process.env.PUBLIC_URL +
                    "/products/:id/:slug"
                  }
                  component={Product}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/login"}
                  component={Login}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/register"}
                  component={Register}
                />

                <ProtectedRoutes path="/accounts/:id" component={MyAccount} />

                <Route
                  path={process.env.PUBLIC_URL + "/cart"}
                  component={Cart}
                />
                <Route
                  path={process.env.PUBLIC_URL + "/checkout"}
                  component={Checkout}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/payments/paypal"}
                  component={PayPal}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/payments/esewa"}
                  component={Esewa}
                />

                <Route
                  path={process.env.PUBLIC_URL + "/payments/khalti"}
                  component={Khalti}
                />
                <Route
                  exact
                  path={process.env.PUBLIC_URL + "/success"}
                  component={Success}
                />
              </Switch>
            </Suspense>
          </ScrollToTop>
        </Router>
      </BreadcrumbsProvider>
    </ToastProvider>
  );
};

App.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(multilanguage(App));

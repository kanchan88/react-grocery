import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";

const MobileNavMenu = ({ strings }) => {
  return (
    <nav className="offcanvas-navigation" id="offcanvas-navigation">
      <ul>
        <li>
            <img className="responsive-img" src="/assets/img/logo/logo.png" height="50px"/>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + "/"}>
            {strings["home"]}
          </Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + "/shop"}>
            {strings["shop"]}
          </Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
            Cakes
          </Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + "/contact"}>
            Gifts
          </Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + "/contact"}>
            {strings["about"]}
          </Link>
        </li>
        <li>
          <Link to={process.env.PUBLIC_URL + "/contact"}>
            {strings["contact_us"]}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

MobileNavMenu.propTypes = {
  strings: PropTypes.object
};

export default multilanguage(MobileNavMenu);

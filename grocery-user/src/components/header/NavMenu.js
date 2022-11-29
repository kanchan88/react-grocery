import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";
import { getSectionData } from "../../data/product-section/AllProductsData";

const NavMenu = ({ strings, menuWhiteClass, sidebarMenu }) => {
  const [sections, setSections] = useState([]);

  const init = () => {
    getSectionData().then((data) => {
      setSections(data.data.data);
    });
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <div
      className={` ${
        sidebarMenu
          ? "sidebar-menu"
          : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`
      } `}
    >
      <nav>
        <ul>
          <li>
            <Link to={process.env.PUBLIC_URL + "/"}>{strings["home"]}</Link>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/shop"}>{strings["shop"]}</Link>
          </li>
          <li>
            <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
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
    </div>
  );
};

NavMenu.propTypes = {
  menuWhiteClass: PropTypes.string,
  sidebarMenu: PropTypes.bool,
  strings: PropTypes.object,
};

export default multilanguage(NavMenu);

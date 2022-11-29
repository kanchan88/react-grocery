import PropTypes from "prop-types";
import React, { Fragment } from "react";
import HeaderFront from "../wrappers/header/HeaderFront";
import FooterFront from "../wrappers/footer/FooterFront";
import MobileNavigation from "../wrappers/footer/MobileNavigation";

const Frontlayout = ({ children, footerBgClass }) => {
  return (
    <Fragment>
      <HeaderFront/>
      {children}
      <MobileNavigation />
      <FooterFront
        backgroundColorClass={footerBgClass ? footerBgClass : "bg-gray"}
        spaceTopClass="pt-100"
        spaceBottomClass="pb-70"
      />
    </Fragment>
  );
};

Frontlayout.propTypes = {
  children: PropTypes.any,
  footerBgClass: PropTypes.string,
};

export default Frontlayout;

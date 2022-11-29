import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const BannerSingle = ({ data, spaceBottomClass }) => {
  return (
    <div className="col-lg-3 col-md-3">
      <div
        className={`single-banner-2 ${
          spaceBottomClass ? spaceBottomClass : ""
        }`}
      >
        <Link to={process.env.PUBLIC_URL + data.link}>
          <img src={process.env.PUBLIC_URL + data.image} alt="" />
        </Link>
      </div>
    </div>
  );
};

BannerSingle.propTypes = {
  data: PropTypes.object,
  spaceBottomClass: PropTypes.string,
};

export default BannerSingle;

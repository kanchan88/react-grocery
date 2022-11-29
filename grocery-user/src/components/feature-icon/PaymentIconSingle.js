import PropTypes from "prop-types";
import React from "react";

const FeatureIconSingle = ({ singleFeature }) => {
  return (
    <div className="col-sm">
      <div className="payment-wrap">
        <div className="payment-icon">
          <img
            className="animated"
            src={process.env.PUBLIC_URL + singleFeature.image}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

FeatureIconSingle.propTypes = {
  singleFeature: PropTypes.object,
};

export default FeatureIconSingle;

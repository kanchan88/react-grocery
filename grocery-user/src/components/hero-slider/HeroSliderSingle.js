import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const HeroSliderSingle = ({ data, sliderClass }) => {
  return (
    <div
      className={`slider-height-2 d-flex align-items-center ${
        sliderClass ? sliderClass : ""
      }`}
    >
      <div className="container">
        <div className="row align-items-center slider-h9-mrg" style={{height:'500px'}}>
              <img
                className="animated"
                src={data.offer_image}
                alt=""
                height="450px"
              />
        </div>
      </div>
    </div>
  );
};

HeroSliderSingle.propTypes = {
  data: PropTypes.object,
  sliderClass: PropTypes.string
};

export default HeroSliderSingle;
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const CategorySingle = ({ data, sliderClass }) => {
  return (
    <div className={`collection-product-2 ${sliderClass ? sliderClass : ""}`}>
      <Link to={process.env.PUBLIC_URL + data.link}>
        <img src={process.env.PUBLIC_URL + data.image} alt="" />
      </Link>
      <div className="collection-content-2 text-center">
        <span  className="text-bg-c">{data.name}</span>
      </div>
    </div>
  );
};

CategorySingle.propTypes = {
  data: PropTypes.object,
  sliderClass: PropTypes.string
};

export default CategorySingle;

import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";
import Swiper from "react-id-swiper";

const ThumbnailGallery = ({ data,key }) => {

  return (
      <div key={key}>
        <div className="single-image">
          <img
            src={process.env.PUBLIC_URL + data}
            className="img-fluid"
            alt=""
          />
        </div>
      </div>
  );
};

// ProductImageGallery.propTypes = {
//   product: PropTypes.object
// };

export default ThumbnailGallery;

import PropTypes from "prop-types";
import React from "react";
import bannerData from "../../data/banner/banner.json";
import BannerSingle from "../../components/banner/BannerSingle.js";

const Banner = ({ spaceBottomClass }) => {
  return (
    <div className={`banner-area ${spaceBottomClass ? spaceBottomClass : ""}`}>
      <div className="container-fluid d-none d-lg-block shadow-lg bg-white rounded">
        <div className="row">
          {bannerData &&
            bannerData.map((single, key) => {
              return (
                <BannerSingle
                  data={single}
                  key={key}
                  spaceBottomClass="mb-30"
                />
              );
            })}
        </div>
      </div>
      <div className="container-fluid d-lg-none d-md-block d-xs-block">
        <p>Make a small device menu here</p>
      </div>
    </div>
  );
};

Banner.propTypes = {
  spaceBottomClass: PropTypes.string,
};

export default Banner;

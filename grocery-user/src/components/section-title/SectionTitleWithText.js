import PropTypes from "prop-types";
import React from "react";

const SectionTitleWithText = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div
      className={`welcome-area ${spaceTopClass ? spaceTopClass : ""} ${
        spaceBottomClass ? spaceBottomClass : ""
      }`}
    >
      <div className="container">
        <div className="welcome-content text-center">
          <h2>Why Should We Celebrate?</h2>
          <p>
          We are always running for success. We are always plan to enjoy later. Life is all about creating memories and enjoying it. You should not only live your life but should celebrate as well. Yappiness Store is the Nepal’s First Complete Celebration Portal. We started this venture with aim of promoting the culture of “Live Life to Fullest“. Life Chha – Live it Up.{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

SectionTitleWithText.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default SectionTitleWithText;
import React, { Fragment, useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import Frontlayout from "../../layouts/Frontlayout";
import SectionTitleWithText from "../../components/section-title/SectionTitleWithText";
// import TabProduct from "../../wrappers/product/TabProduct";
import Banner from "../../wrappers/banner/Banner";
import Testimonial from "../../wrappers/testimonial/Testimonial";
import BlogFeatured from "../../wrappers/blog-featured/BlogFeatured";
// import CategorySlider from "../../wrappers/category/CategorySlider";
import HeroSlider from "../../wrappers/hero-slider/HeroSlider";
import FeatureIcon from "../../wrappers/feature-icon/FeatureIcon";
import HomeProductGrid from "../../wrappers/product/HomeProductGrid";
import HomePageProductGrid from "../../wrappers/product/HomePageProducts";
// import PricedProductGrid from "../../wrappers/product/PricedProductGrid";

const Home = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>Yourkoseli </title>
        <meta name="description" content="complete celebration portal nepal." />
      </MetaTags>
      <Frontlayout>
        <HeroSlider />
        <HomeProductGrid limit={6} />
        <br/>
        <br/>
        <HomePageProductGrid limit={6} />
      </Frontlayout>
    </Fragment>
  );
};

export default Home;

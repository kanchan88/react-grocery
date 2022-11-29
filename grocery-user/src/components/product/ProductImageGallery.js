import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";
import Swiper from "react-id-swiper";
import ThumbnailGallery from "./ThumbnailGallery";

const ProductImageGallery = ({ product }) => {
  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);

  // effect for swiper slider synchronize
  useEffect(() => {
    if (
      gallerySwiper !== null &&
      gallerySwiper.controller &&
      thumbnailSwiper !== null &&
      thumbnailSwiper.controller
    ) {
      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;
    }
  }, [gallerySwiper, thumbnailSwiper]);

  // swiper slider settings
  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    spaceBetween: 10,
    loopedSlides: 4,
    loop: true,
    effect: "fade",
  };

  const thumbnailSwiperParams = {
    getSwiper: getThumbnailSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    loopedSlides: 4,
    touchRatio: 0.2,
    freeMode: true,
    loop: true,
    slideToClickedSlide: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav">
        <i className="pe-7s-angle-left" />
      </button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav">
        <i className="pe-7s-angle-right" />
      </button>
    ),
  };

  return (
    <Fragment>
      <div className="product-large-image-wrapper">
        {product.product_discount || product.new ? (
          <div className="product-img-badges">
            {product.product_discount ? (
              <span className="pink">-{product.product_discount}%</span>
            ) : (
              ""
            )}
            {product.new ? <span className="purple">New</span> : ""}
          </div>
        ) : (
          ""
        )}
        <LightgalleryProvider>
          <Swiper {...gallerySwiperParams}>
            {product.images &&
              product.images.map((single, key) => {
                return (
                  <div key={key}>
                    <LightgalleryItem
                      group="any"
                      src={single.image}
                    >
                      <button>
                        <i className="pe-7s-expand1"></i>
                      </button>
                    </LightgalleryItem>
                    <div className="single-image">
                      <img
                        src={single.image}
                        className="img-fluid"
                        alt=""
                      />
                    </div>
                  </div>
                );
              })}
          </Swiper>
        </LightgalleryProvider>
      </div>
      {/* <div className="product-small-image-wrapper mt-15">
        <Swiper {...thumbnailSwiperParams}>
          {product.product_gallery &&
            product.product_gallery.map((single, key) => {
              return (
                // <div key={key}>
                //   <div className="single-image">
                //     <img
                //       src={process.env.PUBLIC_URL + single}
                //       className="img-fluid"
                //       alt=""
                //     />
                //   </div>
                // </div>
                <ThumbnailGallery
                  data={single}
                  key={key}
                  sliderClass="swiper-slide"
                />
              );
            })}
        </Swiper>
      </div> */}
    </Fragment>
  );
};

// ProductImageGallery.propTypes = {
//   product: PropTypes.object
// };

export default ProductImageGallery;

// import PropTypes from "prop-types";
// import React from "react";

// const ProductImageGallery = ({ product }) => {
//   return (
//     <div className="product-large-image-wrapper">
//       {product.product_discount || product.new ? (
//         <div className="product-img-badges">
//           {product.product_discount ? (
//             <span className="pink">-{product.product_discount}%</span>
//           ) : (
//             ""
//           )}
//           {product.new ? <span className="purple">New</span> : ""}
//         </div>
//       ) : (
//         ""
//       )}

//       <div className="product-fixed-image">
//         {product.product_image ? (
//           <img
//             src={process.env.PUBLIC_URL + product.product_image}
//             alt=""
//             className="img-fluid"
//           />
//         ) : (
//           ""
//         )}
//       </div>
//     </div>
//   );
// };

// ProductImageGallery.propTypes = {
//   // product: PropTypes.object
// };

// export default ProductImageGallery;

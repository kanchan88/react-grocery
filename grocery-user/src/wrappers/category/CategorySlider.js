import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Swiper from "react-id-swiper";
// import categoryData from "../../data/category/category.json";
import { AllCategoryData } from "../../data/product-section/AllProductsData";
import CategorySingle from "../../components/category/CategorySingle.js";

const CategorySlider = ({ spaceBottomClass }) => {

  const [category, setCategory] = useState([])

  const init = () =>{
    AllCategoryData().then(
      data =>{
          setCategory(data.data.data)
        }
        
      );
  };
    useEffect(() => {
      init();
    },[]);

  // console.log(category)
  // swiper slider settings
  const settings = {
    spaceBetween: 30,
    breakpoints: {
      992: {
        slidesPerView: 4
      },
      576: {
        slidesPerView: 2
      },
      320: {
        slidesPerView: 1
      }
    }, 
    autoplay: {
      loop: true,
      delay: 2500,
      disableOnInteraction: false
    },
  };
  return (
    <div
      className={`collections-area ${spaceBottomClass ? spaceBottomClass : ""}`}
    >
      <div className="container">
        <div className="collection-wrap-2">
          <div className="collection-active-2">
            <Swiper {...settings} shouldSwiperUpdate>
              {category &&
              category.map((single, key) => {
                  return (
                    <CategorySingle
                      data={single}
                      key={key}
                      sliderClass="swiper-slide"
                    />
                  );
                })}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

CategorySlider.propTypes = {
  spaceBottomClass: PropTypes.string
};

export default CategorySlider;

// import React from "react";
import Swiper from "react-id-swiper";
// import heroSliderData from "../../data/hero-sliders/hero-slider.json";
import HeroSliderSingle from "../../components/hero-slider/HeroSliderSingle.js";
import React, { useEffect, useState } from "react";
// import axios from 'axios';
import { getSliderData } from "../../data/hero-sliders/SliderData";

// const HeroSlider = () => {
//   const [banner, setBanner] = useState([])

//   const init = () =>{
//     getSliderData().then(
//       data =>{
//           setBanner(data.data.data)
//           console.log(data.data.data)
//         }

//       );
//   };
//     useEffect(() => {
//       init();
//     },[]);

//   const params = {
//     effect: "fade",
//     speed: 1000,
//     autoplay: {
//       loop:true,
//       delay: 5000,
//       disableOnInteraction: false
//     },
//     // watchSlidesVisibility: true,
//     // navigation: {
//     //   nextEl: ".swiper-button-next",
//     //   prevEl: ".swiper-button-prev"
//     // },
//     // renderPrevButton: () => (
//     //   <button className="swiper-button-prev ht-swiper-button-nav">
//     //     <i className="pe-7s-angle-left" />
//     //   </button>
//     // ),
//     // renderNextButton: () => (
//     //   <button className="swiper-button-next ht-swiper-button-nav">
//     //     <i className="pe-7s-angle-right" />
//     //   </button>
//     // )
//   };

//   return (
//     <div className="slider-area">
//       <div className="slider-active nav-style-1">
//         <Swiper {...params} shouldSwiperUpdate>
//           {banner &&
//           banner.map((single, key) => {
//               return (
//                 <HeroSliderSingle
//                   data={single}
//                   key={key}
//                   sliderClass="swiper-slide"
//                 />
//               );
//             })}
//         </Swiper>
//       </div>
//     </div>
//   );
// };

// export default HeroSlider;

const HeroSlider = () => {
  const [banner, setBanner] = useState([]);

  const init = () => {
    getSliderData().then((data) => {
      setBanner(data.data);
    });
  };
  useEffect(() => {
    init();
  }, []);
  const params = {
    effect: "fade",
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 10,
      disableOnInteraction: false,
    },
    watchSlidesVisibility: true,
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
    <div className="slider-area">
      <div className="slider-active nav-style-1">
        <Swiper {...params}>
          {banner &&
            banner.map((single, key) => {
              return (
                <HeroSliderSingle
                  data={single}
                  key={key}
                  sliderClass="swiper-slide"
                />
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default HeroSlider;

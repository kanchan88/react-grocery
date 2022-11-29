import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import Swiper from "react-id-swiper";
import { getProductCartQuantity } from "../../helpers/product";
import { Modal } from "react-bootstrap";
import Rating from "./sub-components/ProductRating";
import { connect } from "react-redux";
import paymentIconData from "../../data/payment-options/payment-icon.json";
import PaymentIconSingle from "../../components/feature-icon/PaymentIconSingle";

function ProductModal(props) {
  const { product } = props;
  const { currency } = props;
  const { discountedprice } = props;
  const { finalproductprice } = props;
  const { finaldiscountedprice } = props;

  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);
  const [quantityCount, setQuantityCount] = useState(1);
  const [weightCount, setWeightCount] = useState(0);

  const wishlistItem = props.wishlistitem;
  const compareItem = props.compareitem;

  const addToCart = props.addtocart;
  const addToWishlist = props.addtowishlist;
  const addToCompare = props.addtocompare;

  const addToast = props.addtoast;
  const cartItems = props.cartitems;

  const [message, setMessage] = useState("");

  const [eggless, setEggless] = useState(false);
  const [sugarless, setSugarless] = useState(false);
  const [juicy, setJuicy] = useState(false);

  const productCartQty = getProductCartQuantity(cartItems, product);

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

  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    spaceBetween: 10,
    loopedSlides: 4,
    loop: true,
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
      <Modal
        show={props.show}
        onHide={props.onHide}
        className="product-quickview-modal-wrapper"
      >
        <Modal.Header closeButton></Modal.Header>

        <div className="modal-body">
          <div className="row">
            <div className="col-md-5 col-sm-12 col-xs-12">
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
                <Swiper {...gallerySwiperParams}>
                  {product.product_gallery &&
                    product.product_gallery.map((single, key) => {
                      return (
                        <div key={key}>
                          <div className="single-image">
                            <img
                              src={process.env.PUBLIC_URL + single}
                              className="img-fluid"
                              alt=""
                            />
                          </div>
                        </div>
                      );
                    })}
                </Swiper>
              </div>
              <div className="product-small-image-wrapper mt-15">
                <Swiper {...thumbnailSwiperParams}>
                  {product.product_gallery &&
                    product.product_gallery.map((single, key) => {
                      return (
                        <div key={key}>
                          <div className="single-image">
                            <img
                              src={process.env.PUBLIC_URL + single}
                              className="img-fluid"
                              alt=""
                            />
                          </div>
                        </div>
                      );
                    })}
                </Swiper>
              </div>
            </div>
            <div className="col-md-7 col-sm-12 col-xs-12">
              <div className="product-details-content quickview-content mt-20">
                <h2>{product.product_name}</h2>
                <div className="product-details-price mr-20">
                  {/* {discountedprice !== null ? (
                    <Fragment>
                      <span>
                        {currency.currencySymbol + (finaldiscountedprice * (product.product_min_weight + weightCount))}
                      </span>{" "}
                      <span className="old">
                        {currency.currencySymbol + (finalproductprice * (product.product_min_weight + weightCount))}
                      </span>
                    </Fragment>
                  ) : (
                    <span>{currency.currencySymbol + (finalproductprice * (product.product_min_weight + weightCount))} </span>
                  )} */}
                  {discountedprice !== null ? (
                    <Fragment>
                      {eggless && sugarless ? (
                        <span>
                          {currency.currencySymbol +
                            (finaldiscountedprice *
                              (product.product_min_weight + weightCount) +
                              150)}
                        </span>
                      ) : eggless ? (
                        <span>
                          {currency.currencySymbol +
                            (finaldiscountedprice *
                              (product.product_min_weight + weightCount) +
                              100)}
                        </span>
                      ) : sugarless ? (
                        <span>
                          {currency.currencySymbol +
                            (finaldiscountedprice *
                              (product.product_min_weight + weightCount) +
                              50)}
                        </span>
                      ) : (
                        <span>
                          {currency.currencySymbol +
                            finaldiscountedprice *
                              (product.product_min_weight + weightCount)}
                        </span>
                      )}
                    </Fragment>
                  ) : eggless && sugarless ? (
                    <span>
                      {currency.currencySymbol +
                        (finalproductprice *
                          (product.product_min_weight + weightCount) +
                          150)}
                    </span>
                  ) : eggless ? (
                    <span>
                      {currency.currencySymbol +
                        (finalproductprice *
                          (product.product_min_weight + weightCount) +
                          100)}
                    </span>
                  ) : sugarless ? (
                    <span>
                      {currency.currencySymbol +
                        (finalproductprice *
                          (product.product_min_weight + weightCount) +
                          50)}
                    </span>
                  ) : (
                    <span>
                      {currency.currencySymbol +
                        finalproductprice *
                          (product.product_min_weight + weightCount)}
                    </span>
                  )}
                </div>
                <h2>Payment Options</h2>
                <div className="payment-icons-details">
                  {paymentIconData.map((singleFeature) => {
                    return (
                      <PaymentIconSingle
                        singleFeature={singleFeature}
                        key={singleFeature.id}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="product-details-content">
                {product.section === "Cakes" ? (
                  <div className="cake-form-wrapper">
                    <div className="cake-form-container">
                      <div className="cake-form">
                        <h3>Customize Your Cake</h3>
                        <form>
                          <label>Message on Cake</label>
                          <input
                            id="message"
                            type="text"
                            name="message"
                            value={message}
                            placeholder="Happy Birthday...."
                            onChange={(e) => setMessage(e.target.value)}
                            required
                          />
                          <div className="button-box">
                            <div className="login-toggle-btn">
                              <input
                                type="checkbox"
                                defaultChecked={eggless}
                                onChange={() => {
                                  setEggless(!eggless);
                                }}
                              />

                              <label className="mr-10 ml-10">
                                <h5>Eggless</h5>
                              </label>
                              <input
                                type="checkbox"
                                defaultChecked={sugarless}
                                onChange={() => {
                                  setSugarless(!sugarless);
                                }}
                              />
                              <label className="mr-10 ml-10">
                                <h5>Sugarless</h5>
                              </label>
                              <input
                                type="checkbox"
                                defaultChecked={juicy}
                                onChange={() => setJuicy(!juicy)}
                              />
                              <label className="ml-10">
                                <h5>Juicy</h5>
                              </label>
                            </div>
                            <div className="login-toggle-btn">
                              <span>
                                {" "}
                                <button>
                                  {" "}
                                  Make it Photo Printed{" "}
                                  <i className="fa fa-upload"></i>
                                </button>
                              </span>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div className="cake-weight">
                        <span className="mr-10">
                          <h5>Increase Cake Weight</h5>
                        </span>
                        <div className="cart-plus-minus">
                          <button
                            onClick={() =>
                              setWeightCount(
                                weightCount > 1 ? weightCount - 0.5 : 0
                              )
                            }
                            className="dec qtybutton"
                          >
                            -
                          </button>
                          <input
                            className="cart-plus-minus-box"
                            type="text"
                            value={Number(
                              product.product_min_weight + weightCount
                            )}
                            readOnly
                          />
                          <button
                            onClick={() => setWeightCount(weightCount + 0.5)}
                            className="inc qtybutton"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="product-details-content quickview-content mt-20">
                <div className="product-details-price mr-20">
                  <div className="pro-details-quality">
                    <div className="cart-plus-minus">
                      <button
                        onClick={() =>
                          setQuantityCount(
                            quantityCount > 1 ? quantityCount - 1 : 1
                          )
                        }
                        className="dec qtybutton"
                      >
                        -
                      </button>
                      <input
                        className="cart-plus-minus-box"
                        type="text"
                        value={quantityCount}
                        readOnly
                      />
                      <button
                        onClick={() =>
                          setQuantityCount(
                            quantityCount < product.product_sku - productCartQty
                              ? quantityCount + 1
                              : quantityCount
                          )
                        }
                        className="inc qtybutton"
                      >
                        +
                      </button>
                    </div>
                    <div className="pro-details-cart btn-hover">
                      {product.product_sku && product.product_sku > 0 ? (
                        <button
                          onClick={() =>
                            addToCart(
                              product,
                              addToast,
                              quantityCount,
                              weightCount
                            )
                          }
                          disabled={productCartQty >= product.product_sku}
                        >
                          {" "}
                          Buy Now{" "}
                        </button>
                      ) : (
                        <button disabled>Out of Stock</button>
                      )}
                    </div>
                  </div>
                </div>
                {product.rating && product.rating > 0 ? (
                  <div className="pro-details-rating-wrap">
                    <div className="pro-details-rating">
                      <Rating ratingValue={product.rating} />
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="pro-details-list">
                  <p>{product.shortDescription}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
}

ProductModal.propTypes = {
  addtoast: PropTypes.func,
  addtocart: PropTypes.func,
  addtocompare: PropTypes.func,
  addtowishlist: PropTypes.func,
  cartitems: PropTypes.array,
  compareitem: PropTypes.object,
  currency: PropTypes.object,
  discountedprice: PropTypes.number,
  finaldiscountedprice: PropTypes.number,
  finalproductprice: PropTypes.number,
  onHide: PropTypes.func,
  product: PropTypes.object,
  show: PropTypes.bool,
  wishlistitem: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    cartitems: state.cartData,
  };
};

export default connect(mapStateToProps)(ProductModal);

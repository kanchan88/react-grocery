import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import { Link, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getProductCartQuantity } from "../../helpers/product";
import { addToCart } from "../../redux/actions/cartActions";
import { addToWishlist } from "../../redux/actions/wishlistActions";
import { addToCompare } from "../../redux/actions/compareActions";
import Rating from "./sub-components/ProductRating";
import paymentIconData from "../../data/payment-options/payment-icon.json";
import PaymentIconSingle from "../../components/feature-icon/PaymentIconSingle";
import { Icon } from "@material-ui/core";

const ProductDescriptionInfo = ({
  props,
  product,
  discountedPrice,
  currency,
  finalDiscountedPrice,
  finalProductPrice,
  cartItems,
  wishlistItem,
  compareItem,
  addToast,
  addToCart,
  addToWishlist,
  addToCompare,
}) => {
  const [quantityCount, setQuantityCount] = useState(1);
  const [showPopup, setShowPopup] = useState(false);
  const productCartQty = getProductCartQuantity(cartItems, product);
  const [weightCount, setWeightCount] = useState(0);
  const [message, setMessage] = useState("");

  const [eggless, setEggless] = useState(false);
  const [sugarless, setSugarless] = useState(false);
  const [juicy, setJuicy] = useState(false);

  return (
    <div>
    <div className="product-details-content ml-70">
      <h2 style={{fontSize:'22px'}}>{product.name}</h2>
      <div className="product-details-price">
        {
        product.marked_price>product.price?(
          <span><strike className="old">Rs.{product.marked_price}</strike> {' '}Rs.{product.price}</span>
        ):(
          <span>Rs.{product.price}</span>
        )}
        
      </div>
      <div className="product-description">
          {product.description}
      </div>
      <div className="pro-details-quality">
        <div className="cart-plus-minus">
          <button
            onClick={() =>
              setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
            }
            className="dec qtybutton"
            style={{fontSize:'22px'}}
          >
            -
          </button>
          <input
            className="cart-plus-minus-box"
            type="text"
            style={{fontSize:'20px', color:"black"}}
            value={quantityCount}
            readOnly
          />
          <button
            onClick={() =>
              setQuantityCount(
                quantityCount+1
              )
            }
            className="inc qtybutton"
            style={{fontSize:'22px'}}
          >
            +
          </button>
        </div>
        <div className="pro-details-cart btn-hover">
            <button
              onClick={() => {
                addToCart(product, addToast, quantityCount, weightCount);
              }}
              disabled={productCartQty >= product.product_sku}
              >
              {" "}
              Buy Now{" "}
            </button>
        </div>
        <div className="pro-details-wishlist">
          <button
            className={wishlistItem !== undefined ? "active" : ""}
            disabled={wishlistItem !== undefined}
            title={
              wishlistItem !== undefined
                ? "Added to wishlist"
                : "Add to wishlist"
            }
            onClick={() => addToWishlist(product, addToast)}
          >
            <i className="pe-7s-like" />
          </button>
        </div>
        <div className="pro-details-compare">
          <button
            className={compareItem !== undefined ? "active" : ""}
            disabled={compareItem !== undefined}
            title={
              compareItem !== undefined ? "Added to compare" : "Add to compare"
            }
            onClick={() => addToCompare(product, addToast)}
          >
            <i className="pe-7s-shuffle" />
          </button>
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

      {product.category ? (
        <div className="pro-details-meta">
          <span>Categories :</span>
          <ul>
            {product.category.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={process.env.PUBLIC_URL + "/shop"}>{single}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )}
      {product.tag ? (
        <div className="pro-details-meta">
          <span>Tags :</span>
          <ul>
            {product.tag.map((single, key) => {
              return (
                <li key={key}>
                  <Link to={process.env.PUBLIC_URL + "/shop"}>{single}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
    </div>
  );
};

ProductDescriptionInfo.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  addToast: PropTypes.func,
  cartItems: PropTypes.array,
  compareItem: PropTypes.array,
  currency: PropTypes.object,
  discountedPrice: PropTypes.number,
  finalDiscountedPrice: PropTypes.number,
  finalProductPrice: PropTypes.number,
  wishlistItem: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (
      item,
      addToast,
      quantityCount,
      weightCount,
      message,
      eggless,
      sugarless,
      juicy
    ) => {
      dispatch(
        addToCart(
          item,
          addToast,
          quantityCount,
          weightCount,
          message,
          eggless,
          sugarless,
          juicy
        )
      );
    },
    addToWishlist: (item, addToast) => {
      dispatch(addToWishlist(item, addToast));
    },
    addToCompare: (item, addToast) => {
      dispatch(addToCompare(item, addToast));
    },
  };
};

export default connect(null, mapDispatchToProps)(ProductDescriptionInfo);

import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import MenuCart from "./sub-components/MenuCart";
import { deleteFromCart } from "../../redux/actions/cartActions";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ShoppingBasketOutlinedIcon from '@material-ui/icons/ShoppingBasketOutlined';
import { Container, Row, Col } from 'reactstrap';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';


const IconGroup = ({ currency, cartData, deleteFromCart, iconWhiteClass }) => {
  const handleClick = (e) => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };

  return (
    <div
      className={`header-right-wrap ${iconWhiteClass ? iconWhiteClass : ""}`}
    >
      <div className="header__nav d-none d-lg-flex">
          <Container>
            <Row>
              <Col className="top-icon" style={{paddingRight:'-2px'}}>
                <i onClick=""><PersonOutlineOutlinedIcon fontSize="small"/></i>
                <b style={{paddingRight:'15px'}}>Account</b> 
                <i onClick=""><FavoriteBorderOutlinedIcon fontSize="small"/></i>
                <b style={{paddingRight:'15px'}}>Items</b> 
                <i className="icon-cart" >
                <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
                  <ShoppingBasketOutlinedIcon fontSize="small"/>
                </Link>
                </i>
                <b className="count-style">
                    {cartData && cartData.length ? cartData.length : 0}
                </b>
              </Col>
            </Row>
          </Container>
     </div>
      <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
          <ShoppingCartIcon/>
          <span className="count-style">
            {cartData && cartData.length ? cartData.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => triggerMobileMenu()}
        >
          <i className="pe-7s-menu" />
        </button>
      </div>
    </div >
  );
};

IconGroup.propTypes = {
  cartData: PropTypes.array,
  compareData: PropTypes.array,
  currency: PropTypes.object,
  iconWhiteClass: PropTypes.string,
  deleteFromCart: PropTypes.func,
  wishlistData: PropTypes.array,
};

const mapStateToProps = (state) => {
  return {
    currency: state.currencyData,
    cartData: state.cartData,
    wishlistData: state.wishlistData,
    compareData: state.compareData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteFromCart: (item, addToast) => {
      dispatch(deleteFromCart(item, addToast));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IconGroup);














     
    
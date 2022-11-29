import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setCurrency } from "../../redux/actions/currencyActions";
import { multilanguage } from "redux-multilanguage";
import Logo from "../../components/header/Logo";
import IconGroup from "../../components/header/IconGroup";
import NavMenu from "../../components/header/NavMenu";
import MobileMenu from "../../components/header/MobileMenu";
import LanguageCurrencyChanger from "../../components/header/sub-components/LanguageCurrencyChanger";
import SearchBar from "../../components/header/sub-components/SearchBar";
import MenuIcon from '@material-ui/icons/Menu';

const HeaderFront = ({
  currency,
  setCurrency,
  currentLanguageCode,
  dispatch,
}) => {
  const [scroll, setScroll] = useState(0);
  const [headerTop, setHeaderTop] = useState(0);

  useEffect(() => {
    const header = document.querySelector(".sticky-bar");
    setHeaderTop(header.offsetTop);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };

  return (
    <header className="header-area clearfix header-hm8">
      <div className="header-top-area header-padding-2 d-lg-block d-none">
        <div className="container-fluid">
          <div className="top__header">
            <div className="d-none d-lg-block text-center topheader__content ">
              {/* language currency changer */}
              <LanguageCurrencyChanger/>
            </div>
          </div>
          <div className="header-top-wap">
            <div className="col-lg-1 col-md-8 col-xs-12">
                <i className="mobile-aside-button"
                  onClick={() => triggerMobileMenu()}>
                  <MenuIcon fontSize='large'/>
                </i>
          </div>
            <div>
            <img className="responsive-img" src="/assets/img/logo/logo.png" height="70px"/>
            </div>
            <div className="col-lg-6 col-md-8 col-xs-12 text-center">
              <SearchBar />
            </div>
            <div className="col-lg-3 d-none d-lg-block">
              <IconGroup/>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`header-bottom sticky-bar header-res-padding header-padding-2 ${
          scroll > headerTop ? "stick" : ""
        }`}
      >
        <div className="container-fluid">
          <div className="row">
            <div className="col-7 d-block d-lg-none">
              {/* header logo */}
              <img className="responsive-img" src="/assets/img/logo/logo.png" height="50px"/>
            </div>
            <div className="col-2 d-block d-lg-none">
            </div>
            <div className="col-3 d-block d-lg-none">
              {/* Icon group */}
              <IconGroup />
            </div>
          </div>
          <div className="row">
            <div className="col-12 d-block d-lg-none">
              <SearchBar />
            </div>
          </div>
          <MobileMenu/>
        </div>
      </div>
    </header>
  );
};

HeaderFront.propTypes = {
  setCurrency: PropTypes.func,
  currency: PropTypes.object,
  currentLanguageCode: PropTypes.string,
  dispatch: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    currency: state.currencyData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrency: (currencyName) => {
      dispatch(setCurrency(currencyName));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(multilanguage(HeaderFront));

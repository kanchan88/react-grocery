import React from "react";

const closeMobileMenu = () => {
    const closeMenu = () => {
        const offcanvasMobileMenu = document.querySelector(
            "#offcanvas-mobile-menu"
        );
        offcanvasMobileMenu.classList.remove("active");
    };
    return (
        <button
            className="offcanvas-menu-close"
            id="mobile-menu-close-trigger"
            onClick={() => closeMenu()}
        >
            <i className="pe-7s-close"></i>
        </button>
    );
}
export default closeMobileMenu;
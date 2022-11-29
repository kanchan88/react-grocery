import React from "react";
import BottomNav from "./BottomNav";

function MobileNavigation() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 d-block d-md-none d-lg-none">
          <nav className="navbar fixed-bottom">
            <BottomNav />
          </nav>
        </div>
      </div>
    </div>
  );
}

export default MobileNavigation;

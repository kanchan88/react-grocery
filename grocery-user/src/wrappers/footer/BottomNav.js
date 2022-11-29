import React from "react";
import { Link } from "react-router-dom";
import { makeStyles, withTheme } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import StorefrontIcon from "@material-ui/icons/Storefront";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

export default function BottomNav() {
  const pathname = window.location.pathname;
  const classes = useStyles();
  const [value, setValue] = React.useState(pathname);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <BottomNavigation
      value={value}
      onClick={handleChange}
      className={classes.root}
    >
      <BottomNavigationAction
        label="Home"
        value="/"
        icon={<HomeIcon color="secondary" />}
        component={Link}
        to="/"
      />
      <BottomNavigationAction
        label="Shop"
        value="/shop"
        icon={<StorefrontIcon color="secondary" />}
        component={Link}
        to="/shop"
      />
      <BottomNavigationAction
        label="Cart"
        value="/cart"
        icon={<ShoppingBasketIcon color="secondary" />}
        component={Link}
        to="/cart"
      />
      <BottomNavigationAction
        label="Account"
        value="/my-account"
        icon={<AccountCircleIcon color="secondary" />}
        component={Link}
        to="/my-account"
      />
    </BottomNavigation>
  );
}

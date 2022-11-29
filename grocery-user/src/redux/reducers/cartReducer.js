import uuid from "uuid/v4";
import {
  ADD_TO_CART,
  DECREASE_QUANTITY,
  DELETE_FROM_CART,
  DELETE_ALL_FROM_CART
} from "../actions/cartActions";

const initState = [];

const cartReducer = (state = initState, action) => {
  const cartItems = state,
    product = action.payload;
  // console.log(action.payload)

  if (action.type === ADD_TO_CART) {
    const cartItem = cartItems.filter(
      item =>
        item.id === product.id &&
        (product.cartItemId ? product.cartItemId === item.cartItemId : true)
    )[0];
    if (cartItem === undefined) {
      return [

        ...cartItems,
        {
          ...product,
          quantity: product.quantity ? product.quantity : 1,
          weight: product.product_min_weight + product.weight,
          cartItemId: uuid(),

        }
      ];
    } else {
      return cartItems.map(item =>
        item.cartItemId === cartItem.cartItemId
          ? {
            ...item,
            weight: product.product_min_weight + item.weight
              ? product.product_min_weight + item.weight
              : product.product_min_weight,
            quantity: product.quantity
              ? item.quantity + product.quantity
              : item.quantity + 1,
          }
          : item
      );
    }
  }

  if (action.type === DECREASE_QUANTITY) {
    if (product.quantity === 1) {
      const remainingItems = (cartItems, product) =>
        cartItems.filter(
          cartItem => cartItem.cartItemId !== product.cartItemId
        );
      return remainingItems(cartItems, product);
    } else {
      return cartItems.map(item =>
        item.cartItemId === product.cartItemId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    }
  }

  if (action.type === DELETE_FROM_CART) {
    const remainingItems = (cartItems, product) =>
      cartItems.filter(cartItem => cartItem.cartItemId !== product.cartItemId);
    return remainingItems(cartItems, product);
  }

  if (action.type === DELETE_ALL_FROM_CART) {
    return cartItems.filter(item => {
      return false;
    });
  }

  return state;
};

export default cartReducer;

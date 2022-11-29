export const ADD_TO_CART = "ADD_TO_CART";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";
export const DELETE_FROM_CART = "DELETE_FROM_CART";
export const DELETE_ALL_FROM_CART = "DELETE_ALL_FROM_CART";


//add to cart
export const addToCart = (
  item,
  addToast,
  quantityCount,
  weightCount,
  message,
  eggless,
  sugarless,
  juicy
) => {
  return dispatch => {
    if (addToast) {
      addToast("Added To Cart", { appearance: "success", autoDismiss: true });
    }
      
    dispatch({
      type: ADD_TO_CART,
      payload: {
        ...item,
        quantity: quantityCount,
        weight: weightCount ? weightCount : 0,
        message: message ? message : "",
        eggless: eggless ? "Yes" : "No",
        sugarless: sugarless ? "Yes" : "No",
        juicy: juicy ? "Yes" : "No"
      }
    });
  };
};

//decrease from cart
export const decreaseQuantity = (item, addToast) => {
  return dispatch => {
    if (addToast) {
      addToast("Item Decremented From Cart", {
        appearance: "warning",
        autoDismiss: true
      });
    }
    dispatch({ type: DECREASE_QUANTITY, payload: item });
  };
};
//delete from cart
export const deleteFromCart = (item, addToast) => {
  return dispatch => {
    if (addToast) {
      addToast("Removed From Cart", { appearance: "error", autoDismiss: true });
    }
    dispatch({ type: DELETE_FROM_CART, payload: item });
  };
};
//delete all from cart
export const deleteAllFromCart = (addToast) => {
  return dispatch => {
    if (addToast) {
      addToast("Removed All From Cart", {
        appearance: "error",
        autoDismiss: true
      });
    }
    dispatch({ type: DELETE_ALL_FROM_CART });
  };
};

// get stock of cart item
export const cartItemStock = (item) => {
  if (item.stock) {
    return item.stock;
  }
};

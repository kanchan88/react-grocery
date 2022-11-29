import PropTypes from "prop-types";
import React, { useState, useEffect, Fragment } from "react";
import { Link, useHistory } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { deleteAllFromCart } from "../../redux/actions/cartActions";
import Frontlayout from "../../layouts/Frontlayout";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { UserData } from "../../data/userdata/UserData";
import DatePicker from "react-datepicker";
import { useToasts } from "react-toast-notifications";

import "react-datepicker/dist/react-datepicker.css";

// import { setCurrency } from "../../redux/actions/currencyActions";
import axios from "axios";
const apiKey = process.env.REACT_APP_YK_API_KEY;
const serverURL = process.env.REACT_APP_SERVER_URL;

const Checkout = ({ location, cartItems, deleteAllFromCart, currency }) => {
  const { pathname } = location;
  const { addToast } = useToasts();
  const history = useHistory();
  let cartTotalPrice = 0;

  const [user, setUser] = useState([]);
  const [error, setError] = useState({});
  const [billError, setBillError] = useState({});
  const [shipError, setShipError] = useState({});
  const [cart, setCart] = useState([]);
  const [paymentMode, setPaymentMode] = useState([]);
  const [deliveryDate, setDeliveryDate] = useState([]);

  const [payPal, setPayPal] = useState(false);
  const [esewa, setEsewa] = useState(false);
  const [khalti, setKhalti] = useState(false);
  const [bankTransfer, setBankTransfer] = useState(false);
  const [cash, setCash] = useState(false);

  const [startDate, setStartDate] = useState();
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };

  const [finalDate, setFinalDate] = useState();
  const dateConverter = () => {
    const cDate = "" + startDate;
    var month = "01";
    const myDate = cDate.split(" ");
    if (myDate[1] == "Jan") {
      month = "01";
    }
    if (myDate[1] == "Feb") {
      month = "02";
    }
    if (myDate[1] == "Mar") {
      month = "03";
    }
    if (myDate[1] == "April") {
      month = "04";
    }
    if (myDate[1] == "May") {
      month = "05";
    }
    if (myDate[1] == "Jun") {
      month = "06";
    }
    if (myDate[1] == "Jul") {
      month = "07";
    }
    if (myDate[1] == "Aug") {
      month = "08";
    }
    if (myDate[1] == "Sep") {
      month = "09";
    }
    if (myDate[1] == "Oct") {
      month = "10";
    }
    if (myDate[1] == "Nov") {
      month = "11";
    }
    if (myDate[1] == "Dec") {
      month = "12";
    }

    var theDate = myDate[3] + "-" + month + "-" + myDate[2];
    setFinalDate(theDate);
  };

  useEffect(() => {
    dateConverter();
    loadCarts();
  }, [startDate]);

  const [billValues, setBillValues] = useState({
    full_name: "",
    country: "",
    state: "",
    street_address: "",
    city: "",
    contact_number: "",
    second_contact_number: "",
    email: "",
  });

  const handleBillChange = (e) => {
    setBillValues({
      ...billValues,
      [e.target.name]: e.target.value,
    });
  };

  const [shipValues, setShipValues] = useState({
    full_name: "",
    country: "",
    state: "",
    street_address: "",
    city: "",
    contact_number: "",
    second_contact_number: "",
  });

  const handleShipChange = (e) => {
    setShipValues({
      ...shipValues,
      [e.target.name]: e.target.value,
    });
  };

  const [sameAddress, setSameAddress] = useState(false);

  if (sameAddress) {
    Object.assign(shipValues, billValues);
  }

  const loadCarts = (e) => {
    {
      cartItems.map((cartItem, key) => {
        setCarts((carts) => [
          ...carts,
          {
            prod: cartItem.id,
            quantity: cartItem.quantity,
          },
        ]);
      });
    }
  };

  const processOrder = async () => {
    const order = {
      items: carts,
      delivery_date: `${finalDate}T06:05:35Z`,
      price: cartTotalPrice,
      payment_method: paymentMode,
      delivery_status: "Processing",
      order_address: [
        {
          address_1: shipValues.street_address,
          address_2: shipValues.city,
          city: shipValues.city,
          state: shipValues.state,
          postcode: "44600",
          country: shipValues.country,
        },
      ],
      order_user: 16,
    };
    console.log(order);
    await axios
      .post("http://127.0.0.1:8000/api/order", order)
      .then((response) => {
        history.push({
          pathname: "/success",
          state: {
            order_number: response.data.order_number,
            delivery_date: response.data.delivery_date,
            price: response.data.price,
            payment: response.data.payment_method,
            location: `${response.data.order_address[0].address_1},${response.data.order_address[0].city}`,
          },
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const [carts, setCarts] = useState([]);

  const placeOrder = (e) => {
    e.preventDefault();
    console.log("Before Process Order");
    processOrder();
    console.log("After Process Order");
    deleteAllFromCart(addToast);
  };

  return (
    <Fragment>
      <MetaTags>
        <title>Checkout - Alpha Grocery</title>
        <meta
          name="description"
          content="Checkout page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Home</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/shop"}>
        Shop
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Checkout
      </BreadcrumbsItem>
      <Frontlayout headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <form>
                <div className="row">
                  <div className="col-lg-7">
                    <div className="billing-info-wrap">
                      <h3>Billing(Sender) Details</h3>
                      <br />
                      <div className="row">
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>Full Name *</label>
                            <input
                              name="first_name"
                              type="text"
                              value={billValues.first_name}
                              onChange={handleBillChange}
                              required
                            />
                            {billError.first_name ? (
                              <p>{billError.first_name}</p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>Your Email Address *</label>
                            <input
                              name="email"
                              type="email"
                              value={billValues.email}
                              onChange={handleBillChange}
                              required
                            />
                            {billError.last_name ? (
                              <p>{billError.last_name}</p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-select mb-20">
                            <label>Country *</label>
                            <select
                              name="country"
                              value={billValues.country}
                              required
                              onChange={handleBillChange}
                            >
                              <option>Select a country</option>
                              <option value="Nepal">Nepal</option>
                              <option value="India">India</option>
                              <option value="USA">USA</option>
                              <option value="Canada">Canada</option>
                              <option value="Australia">Australia</option>
                              <option value="Middle East">Middle East</option>
                            </select>
                            {billError.country ? (
                              <p>{billError.country}</p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>State *</label>
                            <input
                              name="state"
                              type="text"
                              value={billValues.state}
                              onChange={handleBillChange}
                              required
                            />
                            {billError.state ? <p>{billError.state}</p> : ""}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>Town / City *</label>
                            <input
                              name="city"
                              type="text"
                              value={billValues.city}
                              onChange={handleBillChange}
                              required
                            />
                            {billError.city ? <p>{billError.city}</p> : ""}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>Street Address *</label>
                            <input
                              name="street_address"
                              type="text"
                              value={billValues.street_address}
                              onChange={handleBillChange}
                              required
                            />
                            {billError.street_address ? (
                              <p>{billError.street_address}</p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>Contact Number *</label>
                            <input
                              name="contact_number"
                              type="text"
                              pattern="[0-9]*"
                              maxLength="10"
                              value={billValues.contact_number}
                              onChange={handleBillChange}
                              required
                            />
                            {billError.contact_number ? (
                              <p>{billError.contact_number}</p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                          <div className="billing-info mb-20">
                            <label>Secondary Contact *</label>
                            <input
                              name="second_contact_number"
                              placeholder="Another - incase of unreachable"
                              type="text"
                              pattern="[0-9]*"
                              maxLength="10"
                              value={billValues.second_contact_number}
                              onChange={handleBillChange}
                            />
                            {billError.second_contact_number ? (
                              <p>{billError.second_contact_number}</p>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 mb-20">
                          <span>Delivery Date</span>
                          <DatePicker
                            placeholderText="Preffered Delivery Date"
                            selected={startDate}
                            minDate={new Date()}
                            onChange={(date) => {
                              setStartDate(date);
                              dateConverter();
                            }}
                            filterTime={filterPassedTime}
                            dateFormat="yyyy/MM/dd"
                            isClearable={true}
                            required
                          />
                        </div>
                      </div>
                      <div className="billing-info-wrap">
                        <h3>Shipping (Receiver) Details</h3>
                        <div className="row">
                          <div
                            className="col-lg-12"
                            style={{ paddingLeft: "4px" }}
                          >
                            <div className="billing-info mb-20">
                              <div className="same_address">
                                <span className="check">
                                  <input
                                    type="checkbox"
                                    defaultChecked={sameAddress}
                                    onChange={() => {
                                      setSameAddress(!sameAddress);
                                    }}
                                  />
                                </span>
                                <label>
                                  My billing and shipping address is same
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label>First Name *</label>
                              <input
                                name="first_name"
                                type="text"
                                value={shipValues.first_name}
                                onChange={handleShipChange}
                                required
                              />
                              {shipError.first_name ? (
                                <p>{shipError.first_name}</p>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label>Last Name *</label>
                              <input
                                name="last_name"
                                type="text"
                                value={shipValues.last_name}
                                onChange={handleShipChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="billing-select mb-20">
                              <label>Country *</label>
                              <select
                                name="country"
                                value={shipValues.country}
                                required
                                onChange={handleShipChange}
                              >
                                <option>Select a country</option>
                                <option value="Nepal">Nepal</option>
                                <option value="India">India</option>
                                <option value="USA">USA</option>
                                <option value="Canada">Canada</option>
                                <option value="Australia">Australia</option>
                                <option value="Middle East">Middle East</option>
                              </select>
                              {shipError.country ? (
                                <p>{shipError.country}</p>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label>State *</label>
                              <input
                                name="state"
                                type="text"
                                value={shipValues.state}
                                onChange={handleShipChange}
                                required
                              />
                              {shipError.state ? <p>{shipError.state}</p> : ""}
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label>Town / City *</label>
                              <input
                                name="city"
                                type="text"
                                value={shipValues.city}
                                onChange={handleShipChange}
                                required
                              />
                              {shipError.city ? <p>{shipError.city}</p> : ""}
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label>Street Address *</label>
                              <input
                                name="street_address"
                                type="text"
                                value={shipValues.street_address}
                                onChange={handleShipChange}
                                required
                              />
                              {shipError.street_address ? (
                                <p>{shipError.street_address}</p>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label>Receiver Contact Number *</label>
                              <input
                                name="contact_number"
                                type="text"
                                pattern="[0-9]*"
                                maxLength="10"
                                value={shipValues.contact_number}
                                onChange={handleShipChange}
                                required
                              />
                              {shipError.contact_number ? (
                                <p>{shipError.contact_number}</p>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="billing-info mb-20">
                              <label>Second Contact Number *</label>
                              <input
                                name="second_contact_number"
                                type="text"
                                pattern="[0-9]*"
                                maxLength="10"
                                value={shipValues.second_contact_number}
                                onChange={handleShipChange}
                              />
                              {shipError.second_contact_number ? (
                                <p>{shipError.second_contact_number}</p>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="additional-info-wrap">
                          <h4>Additional information</h4>
                          <div className="additional-info">
                            <label>Order notes</label>
                            <textarea
                              placeholder="Notes about your order, e.g. special notes for delivery. "
                              name="message"
                              defaultValue={""}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-5">
                    <div className="your-order-area">
                      <h3>Your order</h3>
                      <div className="your-order-wrap gray-bg-4">
                        <div className="your-order-product-info">
                          <div className="your-order-top">
                            <ul>
                              <li>Product</li>
                              <li>Total</li>
                            </ul>
                          </div>
                          <div className="your-order-middle">
                            <ul>
                              {cartItems.map((cartItem, key) => {
                                cartTotalPrice =
                                  cartTotalPrice +
                                  cartItem.quantity * cartItem.price;
                                return (
                                  <li key={key}>
                                    <span className="order-middle-left">
                                      {cartItem.name} X {cartItem.quantity}
                                    </span>{" "}
                                    <span className="order-price">
                                      Rs. {cartItem.quantity * cartItem.price}
                                    </span>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                          <div className="your-order-bottom">
                            <ul>
                              <li className="your-order-shipping">Shipping</li>
                              <li className="shipping-option">Free shipping</li>
                            </ul>
                          </div>
                          <div className="your-order-total">
                            <ul>
                              <li className="order-total">Total</li>
                              <li>Rs. {cartTotalPrice.toFixed(2)}</li>
                            </ul>
                          </div>
                        </div>
                        <div className="payment-method">
                          <div className="payment-lists">Payment Methods </div>
                          <div className="paymentGroup">
                            <input
                              id="paypal"
                              name="payment"
                              onChange={() => {
                                setPaymentMode("PAYPAL");
                                setPayPal(!payPal);
                              }}
                              type="radio"
                              required
                            />
                            <label htmlFor="paypal">PayPal | MasterCard</label>
                          </div>

                          <div className="paymentGroup">
                            <input
                              id="bank-transfer"
                              name="payment"
                              onChange={() => {
                                setPaymentMode("BANK");
                                setBankTransfer(!bankTransfer);
                              }}
                              type="radio"
                            />
                            <label htmlFor="bank-transfer">
                              International Bank Transfer
                            </label>
                          </div>

                          <div className="paymentGroup">
                            <input
                              id="esewa"
                              name="payment"
                              onChange={() => {
                                setPaymentMode("ESEWA");
                                setEsewa(!esewa);
                              }}
                              type="radio"
                            />
                            <label htmlFor="esewa">Esewa</label>
                          </div>

                          <div className="paymentGroup">
                            <input
                              id="khalti"
                              name="payment"
                              onChange={() => {
                                setKhalti(!khalti);
                              }}
                              type="radio"
                            />
                            <label htmlFor="khalti">
                              Khalti, Bank transfer or Connect Ips
                            </label>
                          </div>

                          <div className="paymentGroup">
                            <input
                              id="cod"
                              name="payment"
                              onChange={() => {
                                setPaymentMode("COD");
                                setCash(!cash);
                              }}
                              type="radio"
                            />
                            <label htmlFor="cod">Cash on Delivery</label>
                          </div>
                        </div>
                      </div>

                      <div className="place-order mt-25">
                        <button
                          className="btn-hover"
                          type="submit"
                          onClick={placeOrder}
                        >
                          Place Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart to checkout <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop"}>
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Frontlayout>
    </Fragment>
  );
};

Checkout.propTypes = {
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object,
  setCurrency: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // deleteAllFromCart: addToast => {
    //   dispatch(deleteAllFromCart(addToast));
    // }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

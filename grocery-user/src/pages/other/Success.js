import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { brown } from "@material-ui/core/colors";

function Success(props) {
    const history = useHistory();

    const [orderNumber, setorderNumber] = useState(0);
    const [deliverDate, setDeliveryDate] = useState([]);
    const [price, setPrice] = useState([]);
    const [payment, setPayment] = useState([]);
    const [location, setLocation] = useState([]);

    useEffect(() => {
        if(props.location.state==undefined){
            console.log("No Orders");
            history.push(
                {
                    pathname:"/",
                }
            )
        }
        else{
            console.log("This is called");
            setorderNumber(props.location.state.order_number);
            setDeliveryDate(props.location.state.delivery_date);
            setPrice(props.location.state.price);
            setPayment(props.location.state.payment);
            setLocation(props.location.state.location);
        }

    }, [orderNumber]);

    return (
        <div className="container justify-content-center">
            <div className="row">
                <div className="col-lg-2">
                </div>
                <div className="col-lg-10 mt-100">
                <div className="cake-form-wrapper">
                    <div className="cake-form-container" style={{fontSize:'14px',}}>
                        <div className="cake-form pt-30 pr-30 pl-30 pb-30">
                            <h4>Yaahoo. Your Order is Completed!</h4>
                            <div style={{fontSize:'14px', color:'grey'}}>Thank you so much for placing order with Alpha Grocery. Please check the details below. Your Order is on-hold untill we process it.
                            You will get a order confirmation at your mobile number and email. </div>
                            <ul>
                                <li className="mb-10 mt-10">
                                    <b>Order:</b> #{orderNumber}
                                </li>
                                <li className="mb-10">
                                    <b>Payment:</b> Rs.{price} via {payment}
                                </li>
                                <li className="mb-10">
                                    <b>Location:</b> {location}
                                </li>
                                <li className="mb-10">
                                    <b>To be delivered on:</b> {deliverDate}
                                </li>
                            </ul>
                            <div className="place-order mt-25">
                                <Link
                                    to={
                                      "/"
                                    }>
                                    Go Back!
                                </Link>
                            </div>
                        </div>
                        </div>
                    </div>
            </div>
            </div>
        </div>
    )
}

export default Success

import {React,useRef,useEffect} from 'react';
import { useLocation } from "react-router-dom";



function PayPal(props){
   const location = useLocation();


    const paypal = useRef();

    // console.log(props.location.state.amount);

    useEffect(()=>{
        window.paypal.Buttons({
            createOrder:(data,actions) =>{
                return actions.order.create({
                    intent:"CAPTURE",
                    purchase_units:[{
                        Description:"Place your order at Yourkoseli",
                        amount:{
                            currency_code:"USD",
                            value:props.location.state.amount
                        }
                    }]
                })
            },
            onApprove: async (data,actions) =>{
                const order = await actions.order.capture();
                localStorage.setItem("transaction_id", order.id);
                localStorage.setItem("status", order.status);
                console.log(order);
            },
            onError: err =>{
                console.log(err);
            }
        }).render(paypal.current)
    },[])
    return (
        <div className="container">
        <div className="row">
        <div className="col-lg-7 col-md-12 mt-200 ml-auto mr-auto">
        <h2 className="continue_pay">Continue your payment with PayPal Or Mastercard</h2>
        </div>
        <div className="col-lg-7 col-md-12 mt-20 ml-auto mr-auto" ref={paypal}></div>
        </div>
    </div>
    )
}

export default PayPal;
import React from 'react';
import KhaltiCheckout from "khalti-checkout-web";

function Khalti(props) {
    var $amount = props.location.state.amount;
    var $pid=localStorage.getItem("item_id");
    let config = {
        // replace this key with yours
        "publicKey": "test_public_key_dc74e0fd57cb46cd93832aee0a390234",
        "productIdentity": $pid,
        "productName": "Koseli",
        "productUrl":"www.yourkoseli.com",
        "eventHandler": {
            onSuccess (payload) {
                // hit merchant api for initiating verfication
                console.log(payload);
            },
            // onError handler is optional
            onError (error) {
                // handle errors
                console.log(error);
            },
            onClose () {
                console.log('widget is closing');
            }
        },
        "paymentPreference": ["KHALTI", "EBANKING","MOBILE_BANKING", "CONNECT_IPS", "SCT"],
    };
    
    let checkout = new KhaltiCheckout(config);
    const khaltiPay=() =>{
        checkout.show({
            amount:($amount*100)
        })
    }
    return (
        <div>
            <div className="row">
                <div className="col-lg-7 col-md-12 mt-200 ml-auto mr-auto">
                    <h2 className="continue_pay">Continue your payment with Khalti, Bank Transfer From Nepal or Connect Ips Payment</h2>
                </div>
                <div className="khalti col-lg-7 col-md-12 mt-20 ml-auto mr-auto" >
                    <button className="khalti_button" onClick={() => khaltiPay()} />
                </div>
            </div>
        </div>
    )
}

export default Khalti




import React from 'react';

function Esewa(props) {
    var $amount = props.location.state.amount;
    console.log(typeof($amount))
    var $pid=localStorage.getItem("item_id");
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-7 col-md-12 mt-200 ml-auto mr-auto">
                    <h2 className="continue_pay">Continue your payment with Esewa</h2>
                </div>
                <div className="esewa col-lg-7 col-md-12 mt-20 ml-auto mr-auto" >
                    <form className="esewa_form" action="https://uat.esewa.com.np/epay/main" method="POST">
                        <input defaultValue={$amount} name="tAmt" type="hidden" />
                        <input defaultValue={$amount} name="amt" type="hidden" />
                        <input defaultValue={0} name="txAmt" type="hidden" />
                        <input defaultValue={0} name="psc" type="hidden" />
                        <input defaultValue={0} name="pdc" type="hidden" />
                        <input defaultValue="EPAYTEST" name="scd" type="hidden" />
                        <input defaultValue={$pid} name="pid" type="hidden" />
                        <input defaultValue="http://merchant.com.np/page/esewa_payment_success?q=su" type="hidden" name="su" />
                        <input defaultValue="http://merchant.com.np/page/esewa_payment_failed?q=fu" type="hidden" name="fu" />
                        <input defaultValue="Submit" type="submit" />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Esewa
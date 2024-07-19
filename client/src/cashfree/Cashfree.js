import React, {useState, useEffect} from "react";
import { cashfree  } from "./util";


const handlepayment = (a) => {
    let checkoutOptions = {
        paymentSessionId: a,
        returnUrl: "http://localhost:3000",
        
    }
    cashfree.checkout(checkoutOptions).then(function(result){
        if(result.error){
            alert(result.error.message)
        }
        if(result.redirect){
            console.log("Redirection")
        }
    });
}

export default handlepayment;
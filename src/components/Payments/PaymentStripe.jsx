import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import FormPayment from "./FormPayment";

const URL_SERVER = process.env.REACT_APP_URL_SERVER || "http://localhost:3001/";

const stripePromise = loadStripe("pk_test_51MIDLTE3EcHe9rVfm0X877Xsv8Vvogu6p1cZ3SkYaVBbbdrVWdWqCujkpHQuqepA3f7VuMDFhNaWOImlPRmA8gS400yopZeduV");

const PaymentStripe = () => {
	const [clientSecret, setClientSecret] = useState("");
	const elementsCart = localStorage.getItem("dishes")

	useEffect(() => {
		console.log("elementos del carrito no tienen la cantidad ", elementsCart);
    // Create PaymentIntent as soon as the page loads
    fetch(`${URL_SERVER}payment/payment-stripe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
			body: elementsCart
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [elementsCart]);
  
	const options = {
    clientSecret
  };

	return (
		<div>
			{clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <FormPayment />
        </Elements>
      )}
		</div>
	)
}

export default PaymentStripe
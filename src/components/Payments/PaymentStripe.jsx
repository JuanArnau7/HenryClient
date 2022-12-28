import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import FormPayment from "./FormPayment";

const stripePromise = loadStripe("pk_test_51MIDLTE3EcHe9rVfm0X877Xsv8Vvogu6p1cZ3SkYaVBbbdrVWdWqCujkpHQuqepA3f7VuMDFhNaWOImlPRmA8gS400yopZeduV");

const PaymentStripe = () => {

	return (
		<div>
			<Elements stripe={stripePromise}>
				<FormPayment />
			</Elements>
		</div>
	)
}

export default PaymentStripe
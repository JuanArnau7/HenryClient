import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import FormPayment from "./FormPayment";
import "./formPayStyles.css";
import NavBar from "../Utils/NavBar/NavBar";

const stripePromise = loadStripe("pk_test_51MIDLTE3EcHe9rVfm0X877Xsv8Vvogu6p1cZ3SkYaVBbbdrVWdWqCujkpHQuqepA3f7VuMDFhNaWOImlPRmA8gS400yopZeduV");

const PaymentStripe = () => {

	return (
		<>
			<NavBar />			
			<div className="flex  items-center justify-center h-screen w-full " id="fondo">
			<Elements stripe={stripePromise}>
				<FormPayment />
			</Elements>
			</div>
		</>
	)
}

export default PaymentStripe
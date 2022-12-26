import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
const URL_APP = process.env.REACT_APP_URL || "http://localhost:3000/";

const FormPayment = () => {
	const stripe = useStripe();
	const elements = useElements();
	const navigate = useNavigate();

	const [message, setMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!stripe) {
			return;
		}

		const clientSecret = new URLSearchParams(window.location.search).get(
			"payment_intent_client_secret"
		);

		if (!clientSecret) {
			return;
		}

		stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
			switch (paymentIntent.status) {
				case "succeeded":
					setMessage("Payment succeeded!");
					break;
				case "processing":
					setMessage("Your payment is processing.");
					break;
				case "requires_payment_method":
					setMessage("Your payment was not successful, please try again.");
					break;
				default:
					setMessage("Something went wrong.");
					break;
			}
		});
	}, [stripe]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js has not yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}

		setIsLoading(true);

		const { error } = await stripe.confirmPayment({
			elements,
			confirmParams: {
				return_url: `${URL_APP}local/alterHome`,
			}
		});

		if (error.type === "card_error" || error.type === "validation_error") {
			setMessage(error.message);
		} else {
			setMessage("An unexpected error occurred.");
		}

		setIsLoading(false);
	};

	const paymentElementOptions = {
		layout: "tabs"
	}

	const goToHome = () => navigate('/local/alterHome')

	return (
		<div className="w-10/12 md:w-8/12 mx-auto border border-blue-400 px-4 py-6 mt-6 shadow-2xl rounded-lg">
			<form id="payment-form" onSubmit={handleSubmit}>
				<PaymentElement id="payment-element" options={paymentElementOptions} />

				<div className="flex justify-around mt-6">
					<button
						className="px-5 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-800 shadow-lg"
						disabled={isLoading || !stripe || !elements} id="submit">
						<span id="button-text">
							{isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
						</span>
					</button>

					<button
						className='rounded-md bg-yellow-500 text-white px-4 pb-1 hover:bg-yellow-600'
						onClick={goToHome}
					>
						Back to home
						<div className='flex justify-center'>
							<AiOutlineHome className='text-4xl' />
						</div>
					</button>

				</div>
				{/* Show any error or success messages */}
				{message && <div id="payment-message">{message}</div>}
			</form>
		</div>
	);
}

export default FormPayment
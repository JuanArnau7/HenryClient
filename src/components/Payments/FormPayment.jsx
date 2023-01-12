import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder, getLengthCart } from '../../redux/Actions/actions';
import { AiOutlineHome } from "react-icons/ai";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import Swal from "sweetalert2";
const URL_SERVER = process.env.REACT_APP_URL_SERVER || "http://localhost:3001/";

const FormPayment = () => {
	const stripe = useStripe();
	const elements = useElements();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = useSelector(state => state.userProfile)

	const [message, setMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const elementsCart = localStorage.getItem("dishes")

	useEffect(() => {
		if (!elementsCart || JSON.parse(elementsCart).length === 0) {
			Swal.fire("Your cart is empty!!", "We invite you to browse our page to add products to your shopping cart", "info")
			navigate('/local/alterHome')
		}
		
		if(!user.fullName){
			Swal.fire("Unable to proceed with the purchase", "In order to attend to your request, you first have to log in or register on our page.", "info")
			navigate("/login")
		}

		if(!user.address){
			Swal.fire("Unable to proceed with the purchase", "In order to serve your address, you must first update your residence address", "info")
			navigate("/perfil")
		}

	}, [elementsCart, dispatch, navigate, user ])

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		setIsLoading(true);

		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card: elements.getElement(CardElement)
		})

		if (!error) {
			const { id } = paymentMethod;
			try {
				const { data } = await axios.post(`${URL_SERVER}payment/payment-stripe`, {
					id, items: JSON.parse(elementsCart), user
				})
				setMessage(data.message)
				elements.getElement(CardElement).clear()
				Swal.fire("Successful purchase", "Everything has gone well in the purchase process. \nThank you for your purchase", "success")
				localStorage.setItem("dishes", "[]")
				dispatch(getLengthCart())
				dispatch(createOrder(user._id, JSON.parse(elementsCart), "DELIVERY", null, user.address))
				navigate('/local/alterHome')
			} catch (error) {
				if (error.response.data) {
					Swal.fire({
						title: "Error in purchase process",
						text: `Purchase process failed due to ${error.response.data}. Please try again`,
						icon: "info",
						timer: 3000
					})
					setMessage(error.response.data)
				} else {
					Swal.fire({
						title: "Error in purchase process",
						text: `Purchase process failed due to a general error. please try again`,
						icon: "warning",
						timer: 3000
					})
					setMessage(error)
				}
			}
		} else {
			console.log("Error on get payment", error);
			Swal.fire({
				title: "Error in purchase process",
				text: `Checkout failed due to Stripe error ${error.message}`,
				icon: "warning",
				timer: 6000
			})
		}

		setIsLoading(false);
	};

	const goToHome = () => navigate('/local/alterHome')

	return (
		<div className="xl:w-1/3 lg:w-1/3 md:w-1/2 sm:w-3/4 mx-auto border border-blue-400 py-6 mt-6 shadow-2xl rounded-lg bg-white dark:bg-gray-800">
			<h4 className="text-center mb-6 text-xl font-semibold bg-blue-500 py-3 text-white -mt-6 rounded-t-lg">Enter your card details</h4>
			<form id="payment-form" onSubmit={handleSubmit}>
				<CardElement id="card-element" />

				<div className="text-red-500 mt-4">
					{/* Show any error or success messages */}
					{message && <div id="payment-message">{message}</div>}
				</div>

				<div className="flex flex-col w-full justify-around mt-6 gap-5 h-1/2">
					<button
						className=" rounded-lg bg-blue-600 text-white hover:bg-blue-800 shadow-lg w-full h-12 font-bold"
						disabled={isLoading || !stripe || !elements} id="submit">
						<span id="button-text">
							{isLoading ? <div className="spinner" id="spinner">  </div> : "Pay now"}
						</span>
					</button>

					<button
						className='rounded-md bg-yellow-500 text-white font-bold hover:bg-yellow-600 w-full h-12'
						onClick={goToHome}
					>
						Back to home
					</button>

				</div>
			</form>
		</div>
	);
}

export default FormPayment
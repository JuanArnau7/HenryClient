import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa"
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import Swal from "sweetalert2";
const URL_SERVER = process.env.REACT_APP_URL_SERVER || "http://localhost:3001/";

const FormPayment = () => {
	const stripe = useStripe();
	const elements = useElements();
	const navigate = useNavigate();

	const [message, setMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const elementsCart = localStorage.getItem("dishes")

	useEffect(() => {
		console.log("elementos del carrito", elementsCart.length);
		if(!elementsCart || elementsCart.length === 0){
			Swal.fire("Tu carrito esta vacio!!", "No se puede hacer el proceso de compras porque tu carrito de compras esta vacio, te invitamos a navegar por nuestra pagina para agregar productos a tu carrito de compras", "info")
			navigate('/local/alterHome')
		}
	}, [])
	
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
					id, items: JSON.parse(elementsCart)
				})
				console.log("Data on send form payment", data);
				setMessage(data.message)
				elements.getElement(CardElement).clear()
				Swal.fire("Compra exitosa","Todo ha salido bien en el proceso de compra. \n Gracias por tu compra", "success")
				localStorage.removeItem("dishes")
				navigate('local/alterHome')
			} catch (error) {
				if(error.response.data){
					Swal.fire({
						title: "Error en proceso de compras",
						text: `Proceso de compras fallido debido a ${error.response.data}. Por favor intenta de nuevo`,
						icon: "info",
						timer: 3000
					})
					setMessage(error.response.data)
				} else {
					Swal.fire({
						title: "Error en proceso de compras",
						text: `Proceso de compras fallido debido a un error general. Por favor intenta de nuevo`,
						icon: "warning",
						timer: 3000
					})
					setMessage(error)
				}
			}
		} else {
			console.log("Error on get payment", error);
			Swal.fire({
				title: "Error en proceso de compras",
				text: `Proceso de compras fallido debido a un error de Stripe ${error}`,
				icon: "warning",
				timer: 6000
			})
		}

		setIsLoading(false);
	};

	const goToHome = () => navigate('/local/alterHome')

	return (
		<div className="w-10/12 md:w-8/12 mx-auto border border-blue-400 px-4 py-6 mt-6 shadow-2xl rounded-lg">
			<form id="payment-form" onSubmit={handleSubmit}>				
				<CardElement />
				
				<div className="text-red-500 mt-4">
					{/* Show any error or success messages */}
					{message && <div id="payment-message">{message}</div>}
				</div>
				
				<div className="flex justify-around mt-6">
					<button
						className="px-5 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-800 shadow-lg"
						disabled={isLoading || !stripe || !elements} id="submit">
						<span id="button-text">
							{isLoading ? <FaSpinner /> : "Pay now"}
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
			</form>
		</div>
	);
}

export default FormPayment
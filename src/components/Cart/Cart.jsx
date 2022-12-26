import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { IoIosRestaurant } from "react-icons/io";
import { TbTruckDelivery } from "react-icons/tb";
import { AiOutlineHome } from "react-icons/ai";
import { RiDeleteBinFill } from "react-icons/ri";

const Cart = () => {
	const [cartDishes, setCartDishes] = useState(JSON.parse(localStorage.getItem("dishes")))
	const navigate = useNavigate();
	let total = cartDishes.reduce((sum, curr) => sum + curr.price * curr.cant, 0)

	const handleChange = (e, index) => {
		const data = [...cartDishes]
		data[index].cant = e.target.value;
		setCartDishes(data)
	}

	const currencyFormat = (num) => num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

	// El campo de cantidad platillos solo recibira numeros
	const justNumbers = (e) => {
		((e.key === 'Backspace') || (e.key === 'Tab') || (e.key.includes('Arrow')) || (!/[0-9]/.test(e.key))) && (e.preventDefault())
	}

	const checkOutPayment = () => navigate('/paymentStripe')

	const deleteFromCart = async (dish) => {
		console.log("receiving to delete...", dish);
	}

	const goToHome = () => navigate('/local/alterHome')

	return (
		<div className='mx-auto'>
			<div className="flex my-4 justify-center">
				<h5 className="font-bold text-2xl">
					Carrito de compras
				</h5>
			</div>
			{cartDishes.length === 0
				? <div>
					Tu carrito de compras esta vacio
				</div> :
				cartDishes.map((el, index) => {
					return (
						<div key={index} className="w-11/12 px-4 border rounded-lg shadow-md border-gray-700 mb-3 mx-auto">
							<div className="flow-root">
								<ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
									<li className="py-3">
										<div className="flex flex-col sm:flex-row items-center">
											<div className='w-full md:w-3/5 flex flex-row'>
												<div className="flex-shrink-0">
													<img className="w-20 h-20" src={el.img} alt={el.name} />
												</div>
												<div className="flex flex-col justify-center">
													<p className="pl-4 text-sm font-medium text-gray-900 lowercase first-letter:capitalize">
														{el.name}
													</p>
													<p className="pl-4 text-sm text-gray-500 truncate">
														Precio unitario ${el.price}
													</p>
												</div>
											</div>
											<div className='flex flex-row justify-between w-full md:w-2/5'>
												<div className='flex flex-col'>
													<label htmlFor="cant" className='text-sm'>Cantidad a agregar</label>
													<input type="number"
														id='cant'
														name="cant"
														className="shadow appearance-none border rounded border-gray-500 w-1/2 py-2 pl-3 text-xs text-gray-700 leading-tight focus:ring-blue-500 focus:border-blue-500"
														min={1}
														value={el.cant}
														onChange={(e) => handleChange(e, index)}
														onKeyPress={justNumbers} />
												</div>
												<div className="flex flex-col align-middle items-center pt-1">
													<p className="text-sm font-semibold text-gray-900 truncate">
														Sub-total
													</p>
													${el.price * el.cant}
												</div>
												<div onClick={() => deleteFromCart(el)}
													className="flex align-middle items-center cursor-pointer p-3">
													<span className='sr-only'>Delete from cart</span>
													<RiDeleteBinFill className='text-red-500 text-2xl' />
												</div>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</div>
					)
				})
			}
			<div className='w-11/12 px-4 py-6 border rounded-lg shadow-md border-gray-700 mb-3 mx-auto'>
				<span className='font-bold font-sans text-xl'>Total a pagar =</span>  $ {currencyFormat(total)}
			</div>
			<div className='mt-4 w-full flex justify-around'>
				<button
					className='rounded-md bg-blue-500 text-white px-4 pb-1 hover:bg-blue-600 '
				>
					Order to table
					<div className='flex justify-center'>
						<IoIosRestaurant className='text-4xl' />
					</div>
				</button>

				<button onClick={checkOutPayment}
					className='rounded-md bg-green-500 text-white px-4 pb-1 hover:bg-green-600'
				>
					Order at home
					<div className='flex justify-center'>
						<TbTruckDelivery className='text-4xl' />
					</div>
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
		</div>
	)
}

export default Cart
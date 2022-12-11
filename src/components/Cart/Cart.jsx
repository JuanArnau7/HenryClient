import React, { useState } from 'react';
import { IoIosRestaurant } from "react-icons/io";
import { TbTruckDelivery } from "react-icons/tb";

const Cart = () => {
	const [cartDishes, setCartDishes] = useState(JSON.parse(localStorage.getItem("dishes")))

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

	return (
		<div className='mb-16'>
			<div className="flex mb-4">
				<h5 className="font-bold text-center">
					Carrito de compras
				</h5>
			</div>
			{cartDishes.length === 0
				? <div>
					Tu carrito de compras esta vacio
				</div> :
				cartDishes.map((el, index) => {
					return (
						<div key={index} className="w-11/12 ml-3 mx-auto px-4 bg-white border rounded-lg shadow-md dark:border-gray-700 mb-3">
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
														onKeyPress={justNumbers}/>
												</div>
												<div className="flex flex-col align-middle items-center pt-1">
													<p className="text-sm font-semibold text-gray-900 truncate">
														Sub-total
													</p>
													${el.price * el.cant}
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
			<div className='flex justify-end mr-16'>
				Total a pagar = $ {currencyFormat(total)}
			</div>
			<div className='mt-4 w-full flex justify-around'>
				<button
					className='rounded-md bg-blue-500 text-white px-4 pb-1 hover:bg-blue-600 '
				>
					Pedir a la mesa
					<div className='flex justify-center'>
						<IoIosRestaurant className='text-4xl' />
					</div>
				</button>

				<button
					className='rounded-md bg-green-500 text-white px-4 pb-1 hover:bg-green-600'
				>
					Pedido a domicilio
					<div className='flex justify-center'>
						<TbTruckDelivery className='text-4xl' />
					</div>
				</button>
			</div>
		</div>
	)
}

export default Cart
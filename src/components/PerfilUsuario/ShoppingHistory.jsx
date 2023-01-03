import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const ShoppingHistory = () => {
	const historyShopping = useSelector(state => state.userOrders)
	const currencyFormat = (num) => num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

	return (
		<div>
			<h3 className='text-center font-bold mb-4 text-xl'>History of your purchases </h3>

			<div className='mb-16'>
				{historyShopping.length === 0
					? <div className="flex flex-col">
						<h3 className='mr-3 font-bold'>You have no registered purchases</h3>
						<img src="https://img.freepik.com/vector-premium/pequenos-personajes-enorme-historial-transacciones-receta-pago-comprador-hombre-tarjeta-credito-pago-linea-mujer-vidrio-pago-efectivo-compras-tienda-ilustracion-vector-gente-dibujos-animados_87771-11353.jpg" alt="Sin historial de compras" />
						<Link to={'/local/alterHome'}
							className="bg-blue-500 text-center w-1/2 mx-auto mt-6 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
							Go to Home
						</Link>
					</div>
					: historyShopping.map((dish, index) => {
						let total = 0
						return (
							<div key={index} className='mb-5'>
								<div className="flex mb-2">
									<p className='mr-2 font-bold'>{index + 1} -</p>
									<p className='font-semibold'> Order status:</p>
									<p>{dish.stateOrder}</p>
								</div>

								<div className="mr-4	">
									<table className="w-full mx-auto text-sm text-left">
										<thead className="text-xs uppercase border-b border-t dark:border-gray-700 bg-blue-300">
											<tr>
												<th scope="col" className="py-3 pl-2">
													No
												</th>
												<th scope="col" className="py-3 px-5">
													Product
												</th>
												<th scope="col" className="py-3 px-4">
													Amount <br /> <small className='font-light'>(pending🥴)</small>
												</th>
												<th scope="col" className="py-3 px-3">
													Value
												</th>
												<th scope="col" className="py-3 px-5 text-right">
													SubTotal
												</th>
											</tr>
										</thead>
										{dish.order.map((detail, index) => {
											total += (1 * detail.price)

											return (
												<tbody key={index}>
													<tr className="bg-white border-b dark:border-gray-700">
														<th scope="row" className="py-4 px-2 text-gray-900">
															{index + 1}
														</th>
														<th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-wrap overflow-hidden">
															{detail.lenguage.es.name}
														</th>
														<td className="py-4 px-12">
															1
														</td>
														<td className="py-4 px-6">
															{detail.price}
														</td>
														<td className="py-4 px-6 text-right">
															{currencyFormat(detail.price)}
														</td>
													</tr>
												</tbody>
											)
										})}
										<tfoot>
											<tr className="font-semibold text-gray-900 border-b border-gray-700 bg-blue-300">
												<th scope="row" colSpan={4} className="py-3 px-6 text-base">Total</th>
												<td className="py-3 pr-6 font-bold text-right">$ {currencyFormat(total)}</td>
											</tr>
										</tfoot>
									</table>
								</div>
							</div>
						)
					})}
			</div>
		</div>
	)
}

export default ShoppingHistory
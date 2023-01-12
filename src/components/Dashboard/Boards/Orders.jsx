import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getAllDishes, updateOrderFromAdmin, updateUserFromAdmin } from '../../../redux/Actions/actions';
import './Review.css';
import { GiCook, GiRun, GiHappySkull } from "react-icons/gi"
import Swal from "sweetalert2";
import axios from "axios";

const Orders = () => {
	const allOrders = useSelector(state => state.allOrders)
	const allDishes = useSelector(state => state.allDishes)
	const dispatch = useDispatch()
	const [showModal, setShowModal] = useState(false)
	const [infoOrder, setInfoOrder] = useState({ _id: "", fullName: "", stateOrder: "" })
	const statusOrder = ["DESPACHADO", "ENPROCESO", "RECHAZADO", "ENTREGADO"]

	const handleChanges = (e) => {
		console.log("cambios", e.target.name, e.target.value);
		setInfoOrder({...infoOrder, [e.target.name]: e.target.value})
	}

	useEffect(() => { 
		dispatch(getAllDishes())
	}, [dispatch])
	
	const loadOrder = (idOrder, fullName) => {
		setShowModal(true)
		const findOrder = allOrders.find(o => o._id === idOrder)
		setInfoOrder({...infoOrder, _id: findOrder._id, fullName})
	}

	const updateOrder = async (e) => {
		e.preventDefault()
		const response = await dispatch(updateOrderFromAdmin(infoOrder))
		if(response.status === 201){
			Swal.fire("Succesfull update", "You have updated the user information correctly", "success")
			setShowModal(false)
			setTimeout(() => {
				window.location.reload()
			}, "5000")
						
		} else {
			Swal.fire("Something was wrong", "Cannot update user information, please try again later", "error")
		}
	}

	const deleteAnOrder = (idOrder) => {
		console.log("vorrar orden", idOrder);
	}

	return (
		<div className="w-11/12 mx-auto shadow-md rounded-lg mt-8">
			<div className="w-full border border-gray-300 mb-4 py-3 text-center rounded-md bg-slate-100">
				<span className="font-bold text-xl">List of all orders</span>
			</div>
			<table className="w-full text-sm text-left border border-gray-400 text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" className="px-6 py-3 border border-gray-400 text-center">
							Customer
						</th>
						<th scope="col" className="px-6 py-3 border border-gray-400 text-center">
							Type order
						</th>
						<th scope="col" className="px-6 py-3 border border-gray-400 text-center">
							State order
						</th>
						<th scope="col" className="px-6 py-3 border border-gray-400 text-center">
							Detail Order
						</th>
						<th scope="col" className="px-6 py-3 border border-gray-400 text-center">
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{allOrders.map((order, index) => (
						<tr key={index} className="bg-white border border-gray-400 dark:bg-gray-800 dark:border-gray-700">
							<th scope="col" className="w-56 px-6 py-4 border border-gray-400 font-medium text-gray-900 dark:text-white">
								{order.userid ? order.userid.fullName : "Guest user"}
							</th>
							<td className="border border-gray-400">
								{order.typeOrder === "DELIVERY" ?
									<div className="text-center">
										<p className="font-semibold">Delivery at address</p>
										<p>{order.address}</p>
									</div> :
									<div className="text-center">
										<p className="font-semibold">Delivery at the table</p>
										<p>Table No {order.table ? order.table : "12"}</p>
									</div>
								}
							</td>
							<td className="text-center border border-gray-400">
								{order.stateOrder === "ENPROCESO" ?
									<div className="flex-col">
										<GiCook className="text-yellow-500 mx-auto text-xl"/>
										<p>Proccesing order</p>
									</div> :
									order.stateOrder === "DESPACHADO" ?
										<div>
											<GiRun className="text-blue-500 mx-auto text-xl" />
											<p>Order dispatched</p>
										</div> :
										order.stateOrder === "ENTREGADO" ?
										<div>
											<GiHappySkull className="text-green-500 mx-auto text-xl"/>
											<p>Order delivered</p>
										</div> : "Proccess"
								}
							</td>
							<td className="px-2 py-4 border border-gray-400">
								{order.order.map((detail, index) => (
									<ul key={index} className="list-disc list-inside">
										<li className="font-semibold lowercase first-letter:capitalize">{allDishes.length > 0 && (allDishes.find(dish => dish._id === detail._id)?.lenguage?.en?.name ? allDishes.find(dish => dish._id === detail._id)?.lenguage?.en?.name : "delicius plate" )}</li>
										<p className="mb-2">Price: ${detail.price}</p>
									</ul>
								))}
							</td>
							<td className="flex flex-col gap-3 pt-6 px-4">
								<button onClick={() => loadOrder(order._id, order.userid?.fullName )}
									className="focus:outline-none text-white md:text-center bg-blue-500 hover:bg-blue-700 focus:ring-4  font-medium rounded-lg text-sm px-5 py-1 dark:text-gray-900 dark:bg-gray-400 dark:hover:bg-gray-600">
									Update
								</button>
								<button onClick={() => deleteAnOrder(order._id)}
									className="focus:outline-none text-white md:text-center bg-red-500 hover:bg-red-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-1 dark:text-gray-900 dark:bg-gray-400 dark:hover:bg-gray-600">
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{showModal &&
				<div className={showModal ? "fixed top-24 left-1/3 w-3/4" : "hidden"}>
					<div className="relative w-full h-full max-w-md md:h-auto">
						<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
							<button onClick={() => setShowModal(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
								<svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
								<span className="sr-only">Close modal</span>
							</button>
							<div className="px-6 py-6 lg:px-8">
								<h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Update user information</h3>
								<form onSubmit={updateOrder} className="space-y-6">
									<div>
										<label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name customer <small>(Cannot be edited)</small></label>
										<input type="text" name="fullName" id="name" value={infoOrder.fullName} onChange={handleChanges} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" disabled />
									</div>	
									<div>
										<label htmlFor="stateOrder" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status order</label>
										<select name="stateOrder" id="stateOrder" value={infoOrder.stateOrder} onChange={handleChanges} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
											<option defaultValue hidden>Select an option... </option>
											{statusOrder.map((o, i) => (
												<option key={i} value={o}>{o}</option>
											))}
										</select>
										
									</div>									
									<button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update user</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			}

		</div>
	)
}

export default Orders
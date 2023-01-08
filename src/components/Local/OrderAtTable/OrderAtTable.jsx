import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { createOrder, getUserById } from '../../../redux/Actions/actions'
import NavBar from '../../Utils/NavBar/NavBar'

const OrderAtTable = () => {
	const dishes = JSON.parse(localStorage.getItem("dishes"))
	const user = useSelector(state => state.userProfile)
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const token = localStorage.getItem("token")
	const [input, setInput] = useState({
		user: {},
		moment: "",
		tableNumber: 0,
		selectedDate: "",
		nowDate: "",
		maxDate: ""
	})

	useEffect(() => {
		async function perfilUser() {
			if (token) {
				const tokenDecoded = JSON.parse(window.atob(token.split('.')[1]))
				await dispatch(getUserById(tokenDecoded.id))
			}
		}
		perfilUser()
	}, [dispatch, token])

	const handleChanges = (e) => {
		const now = new Date()
		now.setDate(now.getDate())
		const max = new Date()
		max.setDate(max.getDate() + 10)
		setInput({
			...input,
			[e.target.name]: e.target.value,
			nowDate: now.toISOString().split("T")[0],
			maxDate: max.toISOString().split("T")[0]
		})
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (input.moment === "RESERVATION" && !user._id) {
			Swal.fire("Debes tener sesion iniciada", "Para poder hacer una reserva tienes que iniciar sesion", "info")
			navigate('/login')
		}

		if (input.moment === "RESERVATION" && user._id) {
			const res = await dispatch(createOrder(user._id, dishes, "RESERVATION", null, null, input.selectedDate))
			if(res){
				Swal.fire("Reserva realizada con exito", `Te esperamos el ${input.selectedDate} en nuestras instalaciones`, "info")
			} else{
				Swal.fire("Error en el proceso", "Reporta este incidente a nuestro personal e intenta de nuevo en proximos minutos", "warning")
			}
			navigate('/local/alterHome')

		}
		if (input.moment === "LOCAL") {
			!user._id && (user._id = "63b7640c3b0250ae1d856098") // este es un id con credenciales de invitado NO BORRAR DE BD
			const res = await dispatch(createOrder(user._id, dishes, "LOCAL", input.tableNumber, null))
			if(res){
				Swal.fire("Hemos recibido tu pedido", `En pocos minutos estara llegan tu pedido a la mesa No ${input.tableNumber}`, "info")
			}else{
				Swal.fire("Error en el proceso", "Reporta este incidente a nuestro personal e intenta de nuevo en proximos minutos", "warning")
			}
			navigate('/local/alterHome')
		}
	}

	return (
		<div>
			<NavBar />
			<div className='w-11/12 mt-6 px-4 py-6 border rounded-lg shadow-md border-gray-700 mb-3 mx-auto'>
				<div className='text-center mb-4'>
					<h4 className='text-2xl font-semibold'>Crea tu orden</h4>
				</div>
				<form onSubmit={handleSubmit}>
					<div className='mb-2'>
						<label className="block text-gray-700 text-sm font-bold mb-1">
							Cuando quieres tu orden
						</label>
						<select
							name="moment"
							value={input.moment}
							onChange={handleChanges}
							className="mb-4 shadow border rounded border-gray-500 w-full pl-2 text-gray-500 bg-white leading-tight focus:ring-blue-500 focus:border-blue-300"
						>
							<option defaultValue hidden>Selecciona...</option>
							<option value="LOCAL">Consumir ahora</option>
							<option value="RESERVATION">Reservar</option>
						</select>
					</div>
					{input.moment === "LOCAL" && (
						<div>
							<label className="block text-gray-700 text-sm font-bold mb-1">
								Elegir mesa
							</label>
							<select
								name="tableNumber"
								value={input.TableNumber}
								onChange={handleChanges}
								className="mb-4 shadow border rounded border-gray-500 w-full pl-2 text-gray-500 bg-white leading-tight focus:ring-blue-500 focus:border-blue-300"
							>
								<option defaultValue hidden>Seleccionar numero de mesa...</option>
								{Array.from({ length: 10 }, (_, i) => i + 1).map((table, index) => (
									<option key={index} value={table}>{table}</option>
								))}

							</select>
						</div>
					)}
					{input.moment === "RESERVATION" && (
						<div>
							<label className="block text-gray-700 text-sm font-bold mb-1">
								Elegir fecha <small>(Maximo 10 dias)</small>
							</label>
							<input type="date"
								min={input.nowDate}
								max={input.maxDate}
								onChange={handleChanges}
								name="selectedDate"
								value={input.selectedDate}
								className="mb-4 shadow appearance-none border rounded border-gray-400 w-full pl-2 text-gray-400 leading-tight focus:ring-blue-500 focus:border-blue-300"
							/>
						</div>
					)}
					{input.moment === "reservation" && input.selectedDate && (
						<div></div>
					)}
					<div className='mt-4 flex justify-around'>
						{input.moment === "LOCAL" && (
							<button type='submit'
								className='rounded-md bg-green-500 text-white px-4 pb-1 hover:bg-green-600'
								disabled={!input.tableNumber}>
								Pedir a la mesa
							</button>
						)}
						{input.moment === "RESERVATION" && (
							<button type='submit'
								className='rounded-md bg-green-500 text-white px-4 pb-1 hover:bg-green-600'
								disabled={!input.selectedDate}>
									Hacer reservacion
							</button>
						)}

						<button type='reset'
							className='rounded-md bg-yellow-500 text-white px-4 pb-1 hover:bg-yellow-600' >
							Borrar formulario
						</button>
					</div>
				</form>

			</div>
		</div>
	)
}

export default OrderAtTable
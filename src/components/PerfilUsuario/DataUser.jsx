import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { deleteUser } from '../../redux/Actions/actions';

const DataUser = () => {
	const user = useSelector(state => state.userProfile)
	const navigate = useNavigate()
	const dispatch = useDispatch();

	const deleteUserById = async (userId) => {
		const confirm = await Swal.fire({
			title: "Are you sure?",
			text: "We are sorry you want to leave us. Do you really want to delete your profile?",
			icon: 'question',
			showCancelButton: true
		})
		if (confirm.isConfirmed) {
			dispatch(deleteUser(userId))
			Swal.fire("Deleted successfull", "The proccess to delete of our database was sucessfully, you are welcome back when you want it", "success")
			navigate("/local/alterHome")
		}
	}

	const logOut = () => {

	}

	return (
		<div>
			<div className='mb-14'>
				{!user.fullName
					? <div>
						<h3 className='text-center font-bold mb-4 text-xl'>You are not logged</h3>
						<img src="https://baja.website/wp-content/uploads/2021/04/error-404-not-found.jpg" alt="No encontrado" />
						<div className='flex justify-around mt-6'>
							<Link to={'/login'}
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							>Go to login</Link>
							<Link to={'/'}
								className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							>Go to home</Link>
						</div>
					</div>
					: !user.state
						? <div>
							<h3 className='text-center font-bold mb-4 text-xl'>Debes activar tu cuenta</h3>
							<img src="https://img.freepik.com/vector-premium/senal-bandeja-entrada-concepto-captura-todos-correos-electronicos-ilustracion-acciones-intercambio-correo-electronico-envio-recepcion_135661-353.jpg?w=2000" alt="Cuenta inactiva" />
							<p>Tu cuenta esta desactivada, por favor revisa el enlace que enviamos a tu correo para proceder a activar</p>
							<div className='flex justify-around mt-6'>
								<Link to={'/login'}
									className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								>Ir a la pagina de login</Link>
								<Link to={'/'}
									className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								>Ir al inicio</Link>
							</div>
						</div>
						: <div className='mb-14'>
							<h3 className='text-center font-bold mb-4 text-xl'>These are your users credentials</h3>
							<p className='mb-2'><span className='font-bold'>Fullname:   </span> {user?.fullName} </p>
							<p className='mb-2'><span className='font-bold'>Email:   </span> {user?.email}</p>
							<p className='mb-2'><span className='font-bold'>Country:     </span> {user?.country || "You have not registred your country"}</p>
							<p className='mb-2'><span className='font-bold'>City:   </span> {user?.city || "You have not registred your city"}</p>
							<div className='flex justify-around mt-8'>
								<button onClick={logOut}
									className="rounded-md bg-yellow-400 text-blue-900 px-5 pb-1 hover:bg-yellow-500 hover:font-semibold"
								>
									Logout
								</button>

								<button onClick={() => deleteUserById(user._id)}
									className="rounded-md bg-red-500 text-white px-5 pb-1 hover:bg-red-600"
								>
									Delete profile
								</button>
							</div>
						</div>
				}
			</div>
		</div>
	)
}

export default DataUser
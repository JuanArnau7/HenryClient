import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { deleteUser, logOut } from '../../redux/Actions/actions';

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

	const closeSesion = async () => {
		const confirm = await Swal.fire({
			title: "Are you sure?",
			text: "Sure you want logout this page?",
			icon: 'question',
			showCancelButton: true
		})
		if (confirm.isConfirmed) {
			dispatch(logOut())
			localStorage.removeItem("token")
			navigate(`/local/alterHome`);
		}
	}

	return (
		<div>
			<div className='mb-14 dark:text-gray-200'>
				{!user.fullName
					? <div>
						<h3 className='text-center font-bold mb-4 text-xl'>You are not logged</h3>
						<img src="https://baja.website/wp-content/uploads/2021/04/error-404-not-found.jpg" alt="No encontrado" />
						<div className='flex justify-around mt-6'>
							<Link to={'/login'}
								className="bg-blue-500 dark:bg-gray-400 dark:hover:bg-gray-600 dark:text-gray-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							>Go to login</Link>
							<Link to={'/'}
								className="bg-green-500 dark:bg-gray-400 dark:hover:bg-gray-600 dark:text-gray-900 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							>Go to home</Link>
						</div>
					</div>
					: !user.state
						? <div>
							<h3 className='text-center font-bold mb-4 text-xl'>You must activate your account</h3>
							<img src="https://img.freepik.com/vector-premium/senal-bandeja-entrada-concepto-captura-todos-correos-electronicos-ilustracion-acciones-intercambio-correo-electronico-envio-recepcion_135661-353.jpg?w=2000" alt="Cuenta inactiva" />
							<p>Your account is deactivated, please check the link we sent to your email to proceed to activate</p>
							<div className='flex justify-around mt-6'>
								<Link to={'/login'}
									className="bg-blue-500 dark:bg-gray-400 dark:hover:bg-gray-600 dark:text-gray-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								>Go to login page</Link>
								<Link to={'/'}
									className="bg-green-500 dark:bg-gray-400 dark:hover:bg-gray-600 dark:text-gray-900 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								>Go to Home</Link>
							</div>
						</div>
						: <div className='mb-14 flex flex-col items-center justiify-center gap-2'>
							<h3 className='text-center font-bold mb-4 text-xl'>These are your users credentials</h3>
							{user.img && <img src={user.img} height={250} width={250} alt="no imgen" className='rounded-full' />}
							{!user.img && <img src="https://static.vecteezy.com/system/resources/previews/000/379/162/non_2x/add-user-vector-icon.jpg" height={250} width={250} alt="aqui" />}
							<p className='mb-2'><span className='font-bold'>Fullname:   </span> {user?.fullName} </p>
							<p className='mb-2'><span className='font-bold'>Email:   </span> {user?.email}</p>
							<p className='mb-2'><span className='font-bold'>Country:     </span> {user?.country || "You have not registred your country"}</p>
							<p className='mb-2'><span className='font-bold'>City:   </span> {user?.city || "You have not registred your city"}</p>
							<p className='mb-2'><span className='font-bold'>Address:   </span> {user?.address || "You have not registred your address"}</p>
							<div className='flex justify-around w-full mt-8'>
								<button onClick={closeSesion}
									className="rounded-md bg-yellow-400  text-blue-900 px-5 pb-1 hover:bg-yellow-500  font-semibold"
								>
									Logout
								</button>

								<button onClick={() => deleteUserById(user._id)}
									className="rounded-md bg-red-500 text-white px-5 pb-1 hover:bg-red-600  font-semibold"
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
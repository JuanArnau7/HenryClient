import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, updateUserFromAdmin } from '../../../redux/Actions/actions';
import './Review.css';
import Swal from "sweetalert2";

const BoardUser = () => {
	const users = useSelector(state => state.allUsers)
	const [showModal, setShowModal] = useState(false)
	const [userData, setUserData] = useState({_id: "", fullName: "", email: ""})
	const dispatch = useDispatch()
	const roles = [
		'USER_ROLE', 
		'ADMIN_ROLE', 
		'VIP_ROLE', 
		// 'WAITER_ROLE', 
		// 'COOK_ROLE', 
		// 'CASHIER_ROLE'
	]

	const handleChanges = (e) => {
		setUserData({...userData, [e.target.name]: e.target.value})
	}

	const loadInfoUser = async (idUser) => {
		setShowModal(true)
		setUserData(users.find(u => u._id === idUser))
	}
	
	const updateUser = async (e) =>{
		e.preventDefault()
		const response = await dispatch(updateUserFromAdmin(userData))
		if(response.status === 201){
			Swal.fire("Succesfull update", "You have updated the user information correctly", "success")
			setShowModal(false)
		} else {
			Swal.fire("Something was wrong", "Cannot update user information, please try again later", "success")
		}
	}

	const deleteAnUser = async (idUser) => {
		const confirm = await Swal.fire({
			title: "Are you sure",
			text: "Do you want continue with the procces of delete user?",
			icon: "question",
			showCancelButton: true
		})
		if(confirm.isConfirmed){
			dispatch(deleteUser(idUser))
			Swal("User deleted correctly", "", "success")
		}
	}

	return (
		<div className="w-11/12 md:w-9/12 mx-auto shadow-md rounded-lg mt-8">
			<div className="w-full border border-gray-300 mb-4 py-3 text-center rounded-md bg-slate-100">
				<span className="font-bold text-xl">List of all users</span>
			</div>
			<table className="w-full text-sm text-left border border-gray-400 text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" className="px-6 py-3 border border-gray-400 text-center">
							Name
						</th>
						<th scope="col" className="px-6 py-3 border border-gray-400 text-center">
							E-mail
						</th>
						<th scope="col" className="px-6 py-3 border border-gray-400 text-center">
							Rol
						</th>
						<th scope="col" className="px-6 py-3 border border-gray-400 text-center">
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{users.map((u, i) => (
						<tr key={i} className="bg-white border border-gray-400 dark:bg-gray-800 dark:border-gray-700">
							<th scope="row" className="px-6 py-4 border border-gray-400 font-medium text-gray-900 whitespace-nowrap dark:text-white">
								{u.fullName}
							</th>
							<td className="px-6 py-4 border border-gray-400 ">
								{u.email}
							</td>
							<td className="px-6 py-4 border border-gray-400">
								{u.rol}
							</td>
							<td className="flex py-4 gap-4 justify-center">
								<button onClick={() => loadInfoUser(u._id)}
									className="focus:outline-none text-white md:text-center bg-blue-500 hover:bg-blue-700 focus:ring-4  font-medium rounded-lg text-sm px-5 py-1 dark:text-gray-900 dark:bg-gray-400 dark:hover:bg-gray-600">
									Update
								</button>
								<button onClick={() => deleteAnUser(u._id)}
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
								<form onSubmit={updateUser} className="space-y-6">
									<div>
										<label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
										<input type="text" name="fullName" id="name" value={userData.fullName} onChange={handleChanges} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="" required />
									</div>
									<div>
										<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
										<input type="email" name="email" id="email" value={userData.email} onChange={handleChanges} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
									</div>									
									<div>
										<label htmlFor="rol" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User role</label>
										<select name="rol" id="rol" value={userData.rol} onChange={handleChanges} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
											<option defaultValue hidden>Select an option... </option>
											{roles.map((rol, i) => (
												<option key={i} value={rol}>{rol}</option>
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
	);
}

export default BoardUser

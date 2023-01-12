import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import NavBar from "../Utils/NavBar/NavBar"

const RecoveryPassword = () => {
	const URL_SERVER = process.env.REACT_APP_URL_SERVER || "http://localhost:3001/";
	const token = localStorage.getItem('tokenRestorePasswd');
	const initialState = { password: '', reTypePassword: '' }
	const [input, setInput] = useState(initialState)
	const [errors, setErrors] = useState({})
	const navigate = useNavigate()

	const validateFields = (field) => {
		const errors = {}
		if (!field.password.match(/[a-z]/g)) {
			errors.password = "The password field must contain a lowercase letter"
		}
		if (!field.password.match(/[A-Z]/g)) {
			errors.password = "The password field must contain a capital letter"
		}
		if (!field.password.match(/[0-9]/g)) {
			errors.password = "The password field must contain at least one number"
		}
		if (field.password.length < 5) {
			errors.password = "The password field must contain at least 5 characters"
		}
		if (field.password !== field.reTypePassword) {
			errors.noMatchPass = "Passwords do not match"
		}
		return errors
	}

	const handleChanges = (e) => {
		setInput({ ...input, [e.target.name]: e.target.value })
		setErrors(validateFields({ ...input, [e.target.name]: e.target.value }))

	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const response = await axios.post(`${URL_SERVER}users/setNewPassword`, { password: input.password, token })
			// console.log("answer recover password", response);
			if (response.status === 200) {
				localStorage.removeItem("tokenRestorePasswd")
				Swal.fire({
					title: "successful process",
					text: response.data,
					icon: "success"
				})
				navigate('/perfil')
			}
		} catch (error) {
			if (error.response.data) {
				Swal.fire({
					title: 'Oops... Failed to reset password',
					text: error.response.data,
					icon: 'error'
				})
			} else {
				Swal.fire({
					title: 'Error trying to recover password',
					text: "Oops... Failed to reset password, please try again later or contact administrator",
					icon: 'error'
				})
				// console.log("Error general al reset password", error);
			}
		}
	}
	return (
		<div>
			<NavBar />
			<div className='flex justify-center py-6 mb-40'>
				<div className="w-11/12 md:w-8/12 border-blue-300 shadow-md shadow-blue-300 rounded px-8 pt-6 pb-8 mb-4">
					<div className='text-base text-center font-bold md:text-2xl pb-4'>
						<h3>Password recovery</h3>
					</div>
					<form onSubmit={handleSubmit}>
						<div className="mb-4">
							<label className="block text-gray-700 text-xs md:text-sm font-bold mb-2" htmlFor="">
								Assign new password
							</label>
							<input
								type="password"
								className="shadow appearance-none border rounded border-gray-500 text-xs w-full py-1 md:py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								placeholder="Enter your new password"
								name='password'
								value={input.password}
								onChange={handleChanges}
								required
								autoFocus
								autoComplete='false'
							/>
							{errors.password && <p className='text-red-600'>{errors.password}</p>}
						</div>
						<div className="mb-6">
							<label className="block text-gray-700 text-xs md:text-sm font-bold mb-2" htmlFor="">
								Repeat the new password
							</label>
							<input
								type="password"
								className="shadow appearance-none border rounded border-gray-500 text-xs w-full py-1 md:py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
								placeholder="Repeat password"
								name='reTypePassword'
								value={input.reTypePassword}
								onChange={handleChanges}
								required
								autoComplete='false'
							/>
							{errors.noMatchPass && <p className='text-red-600'>{errors.noMatchPass}</p>}
						</div>

						<div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-around">
							<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 sm:py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
							Change Password
							</button>

							<button type='button'
								className="bg-yellow-400 hover:bg-yellow-500 font-bold py-1 sm:py-2 px-4 rounded focus:outline-none focus:shadow-outline"
								onClick={() => navigate('/')} >
								Cancel
							</button>
						</div>

					</form>
				</div>
			</div>
		</div>
	)
}

export default RecoveryPassword
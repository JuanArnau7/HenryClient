import React, { useRef } from "react";
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { postUserCreate } from "../../redux/Actions/actions"
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai"
import ReCAPTCHA from "react-google-recaptcha";
const Register = () => {
	const [visible, setVisible] = useState(true)
	const captcha = useRef(null)
	const [form, setForm] = useState({
		"fullName": "",
		"email": "",
		"country": "",
		"img": "",
		"password": "",
	})
	const [pass, setPass] = useState({
		"passwordV": "",
		"repeatPassword": ""
	})
	const [error, setError] = useState({
		eFullName: '',
		eEmail: '',
		eImg: '',
		ePassword: ''
	})
	const reset = () => {
		setForm({
			"fullName": "",
			"email": "",
			"country": "",
			"img": "",
			"password": "",
		});
		setPass({
			"passwordV": "",
			"repeatPassword": ""
		});
		setError({
			eFullName: '',
			eEmail: '',
			eImg: '',
			ePassword: ''
		})
	}

	const validacionFullName = (input) => {
		if (input.length < 7) {
			return "Full name required min 7 characters"
		}
		if (!input.includes(' ')) {
			return "Full name required at least one space."
		}
		if (!/^[A-ZÑa-zñáéíóúÁÉÍÓÚ'°,. ]+$/.test(input) && input !== "") {
			return "Only leters "
		}
		return ''
	}
	const validacionEmail = (input) => {
		if (!/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(input) && input !== "") {
			return "enter a valid email"
		}
		return ''
	}
	const validacionPassword = (input) => {
		if (pass.passwordV.length < 6) {
			return "Password required min 6 characters"
		}
		if (pass.passwordV !== pass.repeatPassword) {
			setForm({ ...form, password: "" })
			return "Password must match"
		} else {
			setForm({ ...form, password: pass.repeatPassword })
		}
		return ''
	}

	useEffect(() => {
		setError({ ...error, ePassword: validacionPassword(pass) })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pass])

	const dispatch = useDispatch()
	const navigate = useNavigate()
	const errorConection = () => {
		Swal.fire({
			title: "Error to connect to server",
			text: "",
			icon: "warning",
			confirmButtonText: "OK",
		});
	};
	const errorRepeat = () => {
		Swal.fire({
			title: "Existing user",
			text: "",
			icon: "warning",
			confirmButtonText: "OK",
		});
	};
	const correctCreation = () => {
		Swal.fire({
			title: "User created successfully",
			text: "",
			icon: "success",
			confirmButtonText: "OK",
		});
	};
	const reactivateAcc = () => {
		Swal.fire({
			title: "User reactivate successfully",
			text: "",
			icon: "success",
			confirmButtonText: "OK",
		});
	};
	const handleClickSubmit = async (e) => {
		e.preventDefault()
		if (captcha.current.getValue()) {
			const creacion = await dispatch(postUserCreate(form))
			console.log("CREACION ", creacion.status === 400)
			if (creacion?.payload?.status === 200) {
				correctCreation()
				reset()
				navigate("/perfil")
			}
			if (creacion?.payload?.status === 201) {
				reactivateAcc()
				reset()
				navigate("/perfil")
			}

			if (creacion.status === 400) {
				errorRepeat()
			}
			if (!creacion) {
				errorConection()
			}
		} else {
			Swal.fire({
				title: "Captcha Error!",
				text: "",
				icon: "error",
				confirmButtonText: "OK",
			});
		}
	}
	const irAtras = () => {
		navigate("/login")
	}

	const handleChange = (e) => {
		if (e.target.name === "fullName") setError({ ...error, eFullName: (validacionFullName(e.target.value)) })
		if (e.target.name === "email") setError({ ...error, eEmail: (validacionEmail(e.target.value)) })
		if (e.target.name === "passwordV") setError({ ...error, ePassword: (validacionPassword(e.target.value)) })
		if (e.target.name === "repeatPassword") setError({ ...error, ePassword: (validacionPassword(e.target.value)) })

		setForm({
			...form,
			[e.target.name]: e.target.value
		})
	}

	const handleChangePass = (e) => {
		if (e.target.name === "passwordV") setError({ ...error, eRPassword: (validacionPassword(e.target.value)) })
		if (e.target.name === "repeatPassword") setError({ ...error, eRPassword: (validacionPassword(e.target.value)) })
		setPass({
			...pass,
			[e.target.name]: e.target.value
		})
	}

	const desabilitado = (
		form.country.length &&
		form.email.length &&
		form.fullName.length &&
		form.password.length &&
		form.country !== "Select country"
		&&
		!error.eFullName.length &&
		!error.eEmail.length &&
		!error.ePassword.length
	)

	return (
		<>
			<div className="flex items-center justify-center h-screen Center">
				<div className="w-11/12 md:w-9/12 lg:w-1/2 flex-col border bg-white px- py-4 shadow-md rounded-[4px]">
					<form action="#" method="POST">
						<div className="md:col-span-1">
							<div className="px-4 sm:px-0">
								<h3 className="text-lg font-semibold leading-6 bg-white text-gray-900 text-center">Create User form</h3>
							</div>
						</div>
						<div className="bg-white px-6 py-5 sm:p-6">
							<div className="mb-5">
								<label htmlFor="first-name" className="block text-base font-medium text-gray-700">Full name</label>
								<input onChange={handleChange} type="text" name="fullName" id="first-name" className="h-10 mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-3" />
								<p className="block text-sm font-medium text-red-700">{error.eFullName}</p>
							</div>
							<div className="mb-5">
								<label htmlFor="email-address" className="block text-base font-medium text-gray-700">Email address</label>
								<input onChange={handleChange} type="text" name="email" id="email-address" className="h-10 mt-1 relative w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-3" />
								<p className="block text-sm font-medium text-red-700">{error.eEmail}</p>
							</div>
							<div className="mb-5">
								<label htmlFor="country" className="block text-base font-medium text-gray-700">Country</label>
								<select onChange={handleChange} id="country" name="country" className="mt-1 block w-full h-10 rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm pl-3">
									<option defaultValue="">Select country</option>
									<option value="Argentina">Argentina</option>
									<option value="Mexico">Mexico</option>
									<option value="United States">United States</option>
									<option value="Canada">Canada</option>
									<option value="Peru">Peru</option>
									<option value="Paraguay">Paraguay</option>
									<option value="Bolivia">Bolivia</option>
									<option value="Uruguay">Uruguay</option>
									<option value="Ecuador">Ecuador</option>
								</select>
							</div>
							<div className="mb-5">
								<label className="block text-base font-medium text-gray-700">Password</label>
								<div className="relative w-full">
									<div className="absolute inset-y-0 right-0 flex items-center px-2" >
										<input className="hidden js-password-toggle" id="toggle" type="checkbox" onClick={() => visible ? setVisible(false) : setVisible(true)} />
										<label className="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label" htmlFor="toggle">{visible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</label>
									</div>
									<input onChange={handleChangePass} name={"passwordV"} className="appearance-none border-2 rounded w-full py-3 px-3 leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-indigo-700 focus:bg-white text-gray-700 pr-16 font-mono js-password" type={visible ? "password" : "text"} />
								</div>
							</div>
							<div className="mb-5">
								<label className="block text-base font-medium text-gray-700">Repeat password</label>
								<div className="relative w-full">
									<div className="absolute inset-y-0 right-0 flex items-center px-2" >
										<input className="hidden js-password-toggle" id="togglee" type="checkbox" onClick={() => visible ? setVisible(false) : setVisible(true)} />
										<label className="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label" htmlFor="toggle">{visible ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</label>
									</div>
									<input onChange={handleChangePass} name={"repeatPassword"} className="appearance-none border-2 rounded w-full py-3 px-3 leading-tight border-gray-300 bg-gray-100 focus:outline-none focus:border-indigo-700 focus:bg-white text-gray-700 pr-16 font-mono js-password" type={visible ? "password" : "text"} />
								</div>
								<p className="block text-sm font-medium text-red-700">{error.ePassword}</p>

								<div className="flex justify-center items-center mt-5">
									<ReCAPTCHA
										sitekey="6LfWi34jAAAAAGh1rW_GwTTSd-7B9KG18NEId5Pz"
										ref={captcha}
									/>
								</div>
								
							</div>
						</div>
						<div className="bg-white px-4 py-3 text-right sm:px-6  flex justify-between">
							<button className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={() => irAtras()}>Go Back</button>
							
							<button className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={() => navigate("/local/alterHome")}>Go to home</button>

							{(desabilitado) ? (
								<button onClick={handleClickSubmit} type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" >Save</button>)
								:
								(<button className=" inline-flex justify-center rounded-md border border-transparent bg-indigo-600 opacity-50 cursor-not-allowed py-2 px-4 text-sm font-medium text-white shadow-sm" disabled>Save</button>)
							}
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

export default Register
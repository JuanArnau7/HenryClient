import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../redux/Actions/actions';
import Swal from "sweetalert2";
import { useFormik } from 'formik';

const validate = values => {
	const errors = {};
	if (!values.fullName) {
		errors.fullName = "Full name is required"
	} else if (values.fullName.length < 5) {
		errors.fullName = 'Full name must be 5 characters at least';
	}

	if (!values.country) {
		errors.country = "The country is required"
	}

	if (!values.password) {
		errors.password = "Type your password"
	}

	if (!values.city) {
		errors.city = "The field city is required"
	}

	if (!values.address) {
		errors.address = "Field address is required"
	}

	return errors;
};

const UpdateUser = () => {
	const user = useSelector(state => state.userProfile);
	const dispatch = useDispatch();
	const [countries, setCountries] = useState([]);
	const [cities, setCities] = useState([]);

	const customCountries = [
		{ name: "Argentina" },
		{ name: "Bolivia" },
		{ name: "Brazil" },
		{ name: "Canada" },
		{ name: "Chile" },
		{ name: "Colombia" },
		{ name: "Ecuador" },
		{ name: "Mexico" },
		{ name: "Paraguay" },
		{ name: "Peru" },
		{ name: "United States" },
	]

	const formik = useFormik({
		initialValues: {
			fullName: '',
			email: '',
			password: '',
			country: '',
			city: '',
			address: ''
		},
		validate,
		onSubmit: async values => {
			const response = await dispatch(updateUser(user._id, values))
			if(response.status === 404){
				Swal.fire("Fail", "The update proflie failed because your password is wrong", "error")
			} else if(response.status === 200){
				Swal.fire("Update data successfully", "You have updated your data profile successfully", "success")
			}
		},
	});

	useEffect(() => {
		const getAllContries = async () => {
			const response = await (await fetch('https://countriesnow.space/api/v0.1/countries'))
			const data = await response.json();
			const findCountries = customCountries.map((el) => data.data.find(country => country.country === el.name))
			setCountries(findCountries)
		}
		getAllContries()

		if (user.fullName) {
			formik.setFieldValue("fullName", user.fullName || "")
			formik.setFieldValue("email", user.email || "")
			formik.setFieldValue("country", user.country || "")
			formik.setFieldValue("city", user.city || "")
			formik.setFieldValue("address", user.address || "")
		}
		if(user.google || user.thirdAuth){
			formik.setFieldValue("password", "noPasword")
		}
	}, [user])

	const handleChange = (e) => {
		formik.setFieldValue("country", e.target.value)
		const getCities = async () => {
			const findCountry = countries.find(c => c.country === e.target.value)
			setCities(findCountry.cities)
		}
		getCities()
	}

	return (
		<div className='mr-6'>
			<form onSubmit={formik.handleSubmit}>
				<label htmlFor="fullName"
					className="block text-gray-700 text-sm font-bold mb-1"
				>Full Name</label>
				<input
					id="fullName"
					name="fullName"
					type="text"
					className="mb-4 shadow appearance-none border rounded border-gray-500 w-full pl-2 text-gray-700 leading-tight focus:ring-blue-500 focus:border-blue-300"
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
					value={formik.values.fullName}
				/>
				{formik.errors.fullName && formik.touched.fullName &&
					<div className='text-red-500 -mt-4 mb-3'>{formik.errors.fullName}</div>
				}

				<label htmlFor="email"
					className="block text-gray-700 text-sm font-bold mb-1"
				>Email Address <small className='font-normal'>(cannot be edited)</small></label>
				<input
					id="email"
					name="email"
					type="email"
					className="mb-4 shadow appearance-none border rounded border-gray-400 w-full pl-2 text-gray-400 leading-tight focus:ring-blue-500 focus:border-blue-300"
					onChange={formik.handleChange}
					value={formik.values.email}
					disabled
				/>

				{(!user.google || user.thirdAuth !== "") &&
					<div>
						<label htmlFor="password"
							className="block text-gray-700 text-sm font-bold mb-1"
						>Password</label>
						<input
							id="password"
							name="password"
							type="password"
							className="mb-4 shadow appearance-none border rounded border-gray-400 w-full pl-2 text-gray-500 leading-tight focus:ring-blue-500 focus:border-blue-300"
							onChange={formik.handleChange}
							value={formik.values.password}
							autoComplete="false"
						/>
						{formik.errors.password && formik.touched.password &&
							<div className='text-red-500 -mt-4 mb-3'>{formik.errors.password}</div>
						}
					</div>
				}

				<label htmlFor="country"
					className="block text-gray-700 text-sm font-bold mb-1"
				>Country</label>
				<select
					id='country'
					name="country"
					className="mb-4 shadow border rounded border-gray-500 w-full pl-2 text-gray-500 bg-white leading-tight focus:ring-blue-500 focus:border-blue-300"
					onBlur={formik.handleBlur}
					onChange={handleChange}
					value={formik.values.country}
				>
					<option defaultValue hidden>Selecciona una opcion... </option>
					{countries.map((country, index) => (
						<option key={index} value={country.country}>{country.country}</option>)
					)}
				</select>
				{formik.errors.country && formik.touched.country &&
					<div className='text-red-500 -mt-4 mb-3'>{formik.errors.country}</div>
				}

				<label htmlFor="city" className="block text-gray-700 text-sm font-bold mb-2">
					City
				</label>
				<select
					id='city'
					name="city"
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
					value={formik.values.city}
					className="mb-4 shadow border rounded border-gray-500 w-full pl-2 text-gray-500 bg-white leading-tight focus:ring-blue-500 focus:border-blue-300"
				>
					<option defaultValue hidden>Selecciona una opcion... </option>
					{cities.map((city, index) => {
						return (<option key={index} value={city}>{city}</option>)
					})}
				</select>
				{formik.errors.city && formik.touched.city &&
					<div className='text-red-500 -mt-4 mb-3'>{formik.errors.city}</div>
				}

				<label htmlFor="address"
					className="block text-gray-700 text-sm font-bold mb-1"
				>Address</label>
				<input
					id="address"
					name="address"
					type="text"
					className="mb-4 shadow appearance-none border rounded border-gray-500 w-full pl-2 text-gray-700 leading-tight focus:ring-blue-500 focus:border-blue-300"
					onBlur={formik.handleBlur}
					onChange={formik.handleChange}
					value={formik.values.address}
				/>
				{formik.errors.address && formik.touched.address &&
					<div className='text-red-500 -mt-4 mb-3'>{formik.errors.address}</div>
				}

				<div className='flex justify-around mt-4 mb-8'>
					<button type="submit"
						className="bg-blue-500 dark:bg-gray-400 dark:hover:bg-gray-300 dark:text-black hover:bg-blue-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline">
						Update info
					</button>
					<button type="reset"
						className="bg-yellow-400 dark:bg-gray-400 dark:hover:bg-gray-300 dark:text-black hover:bg-yellow-500 font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline">
						Reset
					</button>

				</div>
			</form>
		</div>
	);
}

export default UpdateUser

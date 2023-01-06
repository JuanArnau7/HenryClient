import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { postDishCreate } from '../../redux/Actions/actions'
import NavBarCreateFoods from './components/NavBarCreateFoods'
import "./CreateFood.css"

const CreateFood = props => {
	const dispatch = useDispatch()
	const [Form, setForm] = useState({
		"adminid": {
			"_id": "638b0101aff092a52beda5a5",
			"name": "kossito"
		},
		"img": "",
		"price": 0,
		"lenguage": {
			es: {
				name: "",
				descripcion: "",
				type: ""
			},
			en: {
				name: "",
				descripcion: "",
				type: ""
			},
		},
	})
	const [InglesCompletado, setInglesCompletado] = useState(false)
	const validar = () => {
		if (!Form.lenguage.es.name) {
			return false
		}
		if (!Form.lenguage.en.name) {
			return false
		}
		if (!Form.lenguage.es.descripcion) {
			return false
		}
		if (!Form.lenguage.en.descripcion) {
			return false
		}
		if (!Form.lenguage.es.type) {
			return false
		}
		if (!Form.lenguage.en.type) {
			return false
		}
		if (!Form.img) {
			return false
		}
		if (!Form.price) {
			return false
		}
		return true
	}
	const agregado = () => {
		Swal.fire({
			title: 'Plato de comida Agregado Correctamente!',
			text: '',
			icon: 'success',
			confirmButtonText: 'OK'
		})
	}
	const noAgregado = () => {
		Swal.fire({
			title: 'Error al agregar el Plato de Comida!',
			text: '',
			icon: 'warning',
			confirmButtonText: 'OK'
		})
	}
	const completar = () => {
		Swal.fire({
			title: 'Complete todos los campos!',
			text: '',
			icon: 'warning',
			confirmButtonText: 'OK'
		})
	}
	const handleNameSpanish = (e) => {
		setForm({
			...Form,
			lenguage: {
				...Form.lenguage,
				es: {
					...Form.lenguage.es,
					name: e.target.value
				}
			}
		})
	}
	const handleDescriptionSpanish = (e) => {
		setForm({
			...Form,
			lenguage: {
				...Form.lenguage,
				es: {
					...Form.lenguage.es,
					descripcion: e.target.value
				}
			}
		})
	}
	const handleNameEnglish = (e) => {
		setForm({
			...Form,
			lenguage: {
				...Form.lenguage,
				en: {
					...Form.lenguage.en,
					name: e.target.value
				}
			}
		})
	}
	const handleDescriptionEnglish = (e) => {
		setForm({
			...Form,
			lenguage: {
				...Form.lenguage,
				en: {
					...Form.lenguage.en,
					descripcion: e.target.value
				}
			}
		})
	}
	const handleTypeSpanish = (e) => {
		setForm({
			...Form,
			lenguage: {
				...Form.lenguage,
				es: {
					...Form.lenguage.es,
					type: e.target.value
				}
			}
		})
	}
	const handleTypeEnglish = (e) => {
		setForm({
			...Form,
			lenguage: {
				...Form.lenguage,
				en: {
					...Form.lenguage.en,
					type: e.target.value
				}
			}
		})
	}
	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(Form)
		if (validar(Form) === true) {
			let agg = dispatch(postDishCreate(Form))
			if (agg !== null) {
				agregado()
				reset()
			} else {
				noAgregado()
			}
		} else {
			completar()
		}
	}
	const handleChange = (e) => {
		setForm({
			...Form,
			[e.target.name]: e.target.value
		})
	}
	const reset = () => {
		setInglesCompletado(false)
		setForm({
			"adminid": {
				"_id": "638b0101aff092a52beda5a5",
				"name": "kossito"
			},
			"img": "",
			"price": 0,
			"lenguage": {
				"es": {
					"name": "",
					"descripcion": "",
					"type": ""
				},
				"en": {
					"name": "",
					"descripcion": "",
					"type": ""
				},
			},
		})
	}
	return (
		<>
			<NavBarCreateFoods />
			<div className="flex items-center justify-center h-screen Center">
				<div className="w-11/12 lg:w-1/2 flex-col border bg-white pt-4 shadow-md rounded-[4px] px-5">
					<form onSubmit={handleSubmit} method="POST">
						<h4 className="font-semibold text-xl text-center">General information of plate</h4>
						<div className="flex flex-wrap justify-between mt-6 mb-8">
							<div className="w-full sm:w-8/12 mb-3">
								<label className="block text-sm font-medium text-gray-700">Imagen URL</label>
								<input type="url"
									onChange={handleChange}
									name="img"
									value={Form.img}
									className="mt-1 block w-full rounded-md h-9 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-3"
									placeholder='Ex http//someimage.com/..jpg' />
							</div>
							<div className="w-full sm:w-3/12">
								<label className="block text-sm font-medium text-gray-700">Price / Precio</label>
								<input
									onChange={handleChange}
									type="number"
									name="price"
									value={Form.price}
									className="mt-1 block w-full rounded-md h-9 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-3"
								/>
							</div>
						</div>
						<hr />
						{!InglesCompletado ?
							<>
								<div className="overflow-hidden shadow sm:rounded-md mt-3">
									<div className="flex flex-col items-center justify-center">
										<h1 className="font-semibold">Create plate of food</h1>
										<small>English version</small>
									</div>

									<div className="mb-5 mt-3">
										<label className="block text-sm font-medium text-gray-700">Plate name <small>(on English)</small></label>
										<input type="text"
											value={Form.lenguage.en.name}
											name="lenguague.en.name"
											onChange={handleNameEnglish}
											className="mt-1 block w-full rounded-md  h-9 border  border-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-3"
											placeholder='Plate name ' />
									</div>

									<div className="mb-5">
										<label className="block text-sm font-medium text-gray-700">Description <small>(on English)</small></label>
										<textarea id="about" onChange={handleDescriptionEnglish} name="description" value={Form.lenguage.en.descripcion} rows="3" className="mt-1 block w-full h-full rounded-md  border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3" placeholder="eg ingredients...."></textarea>
									</div>
									<div className="mb-5">
										<label className="block text-sm font-medium text-gray-700">Type of dish <small>(on English)</small></label>
										<input onChange={handleTypeEnglish} type="text" value={Form.lenguage.en.type} name="price" id="last-name" className="mt-1 block w-full rounded-md h-9 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-3" />
									</div>
								</div>

								<div className="bg-gray-50 px-4 py-3 text-center sm:px-6">
									<button type='button'
										onClick={() => setInglesCompletado(true)}
										className="inline-flex justify-center align-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
										Next / Siguiente
									</button>
								</div>
							</>
							:
							<>
								<div className="overflow-hidden shadow sm:rounded-md mt-3">
									<div className="flex flex-col items-center justify-center">
										<h1 className="font-semibold">Crear plato de comida</h1>
										<small>Version en español</small>
									</div>

									<div className="mb-5 mt-3">
										<label className="block text-sm font-medium text-gray-700">Nombre del plato <small>(version español)</small> </label>
										<input type="text"
											onChange={handleNameSpanish}
											name="lenguague.es.name"
											value={Form.lenguage.es.name}
											className="mt-1 block w-full rounded-md h-9 border border-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-3"
											placeholder='Nombre del plato'/>
									</div>

									<div className="mb-5">
										<label className="block text-sm font-medium text-gray-700">Descripcion <small>(version español)</small> </label>
										<div className="mt-1 w-full">
											<textarea
												onChange={handleDescriptionSpanish}
												value={Form.lenguage.es.descripcion}
												name="description"
												rows="3"
												className="mt-1 block w-full rounded-md  border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-3"
												placeholder="Por ejemplo ingredientes...."></textarea>
										</div>
									</div>
									<div className="mb-5">
										<label className="block text-sm font-medium text-gray-700">Tipo de Plato <small>(version español)</small> </label>
										<input onChange={handleTypeSpanish} type="text" name="price" id="last-name" value={Form.lenguage.es.type} className="mt-1 block min-w-full rounded-md h-9 border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm pl-3"/>
									</div>

									<div className="bg-gray-50 px-4 py-3 text-center sm:px-6">
										<button type="button" 
											className="inline-flex justify-center mr-5 align-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" 
											onClick={() => setInglesCompletado(false)}>
												Anterior
											</button>
										<button type="submit" 
											className="inline-flex justify-center align-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
												Crear
											</button>
									</div>
								</div>
							</>
						}
					</form>
				</div>
			</div>
		</>
	)
}


export default CreateFood
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { detailsDish } from '../../redux/Actions/actions';

const CardFood = () => {
	const dispatch = useDispatch()
	const id = useParams()
	const dish = useSelector(state => state.detailDish)

	useEffect(() => {
		dispatch(detailsDish(id))
	}, [dispatch])

	const currencyFormat = (num) => num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

	return (
		<div>
			<div className="sm:flex sm:flex-col md:flex-row mx-auto sm:w-full md:w-11/12 lg:w-10/12">
				<div className="sm:w-full md:w-1/3 md:mr-3 lg:w-1/4 border border-gray-300 rounded-lg shadow-md">
					<div className="">
						<img className="max-sm:w-32 max-md:w-48 pt-8 pb-4 px-4 rounded-t-lg mx-auto" src={dish.img} alt={dish.name} />
					</div>
					<div className="px-5 pb-5">
						<h5 className="text-xl font-semibold tracking-tight text-gray-900 lowercase first-letter:capitalize">{dish.name}</h5>
						<p className="text-lg font-semibold text-blue-500">Antes <span className="ml-2 line-through font-light text-black"> $ {currencyFormat(dish.price * 1.25)}</span></p>
						<p className="text-xl font-bold text-emerald-600">Ahora ✳️✅ 🤩 <span className="block text-orange-500 text-2xl">$ {currencyFormat(dish.price * 1)}</span></p>

						<div className="flex flex-col mt-2.5 mb-5">
							{dish.ratings?.length > 0
								? <div className='flex flex-col'>
									<div className="flex align-middle justify-between">
										<span className="inline-flex">⭐⭐⭐⭐</span>
									</div>
									<small>{dish.ratings?.length} calificaciones</small>
								</div>
								: <small>Este platillo aun no tiene revisiones</small>
							}

						</div>
						<div className="flex items-center justify-center">
							<button className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Agregar al carrito 🛒</button>
						</div>
					</div>
				</div>
				<div className="sm:w-full sm:mt-4 md:w-2/3 md:mt-6 lg:w-3/4 bg-white rounded-lg shadow-md">
					<div>
						<h5 className="text-xl font-semibold tracking-tight text-blue-500 text-center mb-4">Detalles de <span className='lowercase'>{dish.name}</span></h5>
						<p>{dish.description}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CardFood
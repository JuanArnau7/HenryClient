import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { detailsDish } from '../../redux/Actions/actions';
import { FaCartArrowDown } from "react-icons/fa";
import { MdRemoveShoppingCart } from "react-icons/md";
import Swal from "sweetalert2";

const CardFood = () => {
	const dispatch = useDispatch()
	const id = useParams()
	const dish = useSelector(state => state.detailDish)

	const cartDishes = JSON.parse(localStorage.getItem("dishes"))
	const findDish = cartDishes.find(dish => dish.id === id.id)
	
	const [dishInCart, setDishInCart] = useState(findDish ? true : false)

	const addOrRemoveFromCart = async (id) =>{
		const index = cartDishes.findIndex(el => el.id === id)
		if(index < 0){
			cartDishes.push({ id: dish._id, name: dish.name, img: dish.img, price: dish.price })
			setDishInCart(true)
			localStorage.setItem("dishes", JSON.stringify(cartDishes))
			Swal.fire({
				title: "Elemento agregado",
				text: `Haz agregado ${dish.name} correctamente`,
				icon: "success",
				timer: 2000
			})
		} else {
			const confirm = await Swal.fire({
				title: "Estas seguro",
				text: `Seguro deseas eliminar ${dish.name} de tu carrito de compras`,
				icon: "question",
				showCancelButton: true,
				confirmButtonText: "Eliminar",
				cancelButtonText: "Cancelar"
			})
			if (confirm.isConfirmed) {
				cartDishes.splice(index, 1)
				setDishInCart(false)
				localStorage.setItem("dishes", JSON.stringify(cartDishes))
				Swal.fire({
					title: "Platillo eliminado",
					text: `Haz eliminado ${dish.name} correctamente`,
					icon: "info",
					timer: 2000
				})
			}
		}
	}

	useEffect(() => {
		dispatch(detailsDish(id))
	}, [dispatch, id])

	const currencyFormat = (num) => num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

	return (
		<div>
			<div className="sm:flex sm:flex-col md:flex-row mx-auto sm:w-full md:w-11/12 lg:w-10/12">
				<div className="sm:w-full md:w-1/3 md:mr-3 lg:w-2/5 border border-gray-300 rounded-lg shadow-md">
					<div className="">
						<img className="max-sm:w-32 max-md:w-48 pt-8 pb-4 px-4 rounded-t-lg mx-auto" src={dish?.img} alt={dish?.lenguage?.en?.name} />
					</div>
					<div className="px-5 pb-5">
						<h5 className="text-xl font-semibold tracking-tight text-gray-900 lowercase first-letter:capitalize">{dish?.lenguage?.en?.name}</h5>
						<p className="text-lg font-semibold text-blue-500">Antes <span className="ml-2 line-through font-light text-black"> $ {currencyFormat(dish?.price * 1.25)}</span></p>
						<p className="text-xl font-bold text-emerald-600">Ahora ✳️✅ 🤩 <span className="block text-orange-500 text-2xl">$ {currencyFormat(dish?.price * 1)}</span></p>

						<div className="flex items-center justify-center mt-4">
							<button
								onClick={() => addOrRemoveFromCart(dish._id)}
								className={dishInCart ? "rounded-md bg-blue-500 text-white px-3 pb-1 hover:bg-blue-600" : "rounded-md bg-green-500 text-white px-3 pb-1 hover:bg-green-600"}
							>{dishInCart
								? <span className='inline-flex align-middle'>Eliminar del carrito <MdRemoveShoppingCart className='mt-1 mx-2 text-lg'/></span>
								: <span className='inline-flex align-middle'>Agregar al carrito <FaCartArrowDown className='mt-1 mx-2 text-xl'/></span>  
								}
							</button>
						</div>
					</div>
				</div>
				<div className="sm:w-full sm:mt-4 md:w-2/3 md:mt-6 lg:w-3/5 bg-white rounded-lg shadow-md">
					<div>
						<h5 className="text-xl font-semibold tracking-tight text-blue-500 text-center mb-4">Detalles de <span className='lowercase'>{dish?.lenguage?.en?.name}</span></h5>
						<p>{dish?.lenguage?.en?.descripcion}</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CardFood
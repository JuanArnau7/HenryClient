import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaCartArrowDown } from "react-icons/fa";
import { MdRemoveShoppingCart } from "react-icons/md";
import Swal from "sweetalert2";

const Pages = ({ data }) => {
	const navigate = useNavigate()
	const [cartDishes, setCartDishes] = useState(JSON.parse(localStorage.getItem("dishes")))

	const addCart = async (dish) => {
		const index = cartDishes.findIndex(el => el.id === dish._id)
		const addDish = { id: dish._id, name: dish.name, img: dish.img, price: dish.price }
		if (index < 0) {
			const addDishes = [...cartDishes, addDish]
			localStorage.setItem("dishes", JSON.stringify(addDishes))
			setCartDishes(addDishes)
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
				const updateDishes = cartDishes.filter(el => el.id !== dish._id)
				localStorage.setItem("dishes", JSON.stringify(updateDishes))
				setCartDishes(updateDishes)
				Swal.fire({
					title: "Platillo eliminado",
					text: `Haz eliminado ${dish.name} correctamente`,
					icon: "info",
					timer: 2000
				})
			}
		}
	}

	const moreDetails = (dish) => {
		navigate(`/detailDish/${dish._id}`)
	}

	return (
		<div className='flex flex-wrap justify-around'>
			{data.length > 0 &&
				data.map((dish, index) => (
					<div key={index} className="sm:w-11/12 md:w-5/12 lg:w-3/12 border border-gray-200 rounded-lg shadow-md m-3 hover:shadow-2xl hover:border-gray-700 cursor-pointer">
						<div onClick={() => moreDetails(dish)}>
							<img className="rounded-t-lg w-full" src={dish.img} alt={dish.name} />
							<div className="px-4 pt-2 pb-4">
								<h6 className="lowercase first-letter:capitalize">{dish.name}</h6>
								<h6>$ {dish.price}</h6>
							</div>
						</div>
						<div className="flex justify-center mb-3">
							<button
								onClick={() => addCart(dish)}
								className={cartDishes.find(d => d.id === dish._id) ? "rounded-md bg-blue-500 text-white px-3 pb-1 hover:bg-blue-600" : "rounded-md bg-green-500 text-white px-3 pb-1 hover:bg-green-600"}
							>{cartDishes.find(d => d.id === dish._id)
								? <span className='inline-flex align-middle'>Eliminar del carrito <MdRemoveShoppingCart className='mt-1 mx-2 text-lg'/></span>
								: <span className='inline-flex align-middle'>Agregar al carrito <FaCartArrowDown className='mt-1 mx-2 text-xl'/></span>  
								}
							</button>
						</div>
					</div>
				))}
		</div>
	)
}

export default Pages
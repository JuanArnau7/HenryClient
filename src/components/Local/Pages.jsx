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
		const addDish = { id: dish._id, name: dish.lenguage.en.name, img: dish.img, price: dish.price, cant: 1 }
		if (index < 0) {
			const addDishes = [...cartDishes, addDish]
			localStorage.setItem("dishes", JSON.stringify(addDishes))
			setCartDishes(addDishes)
			Swal.fire({
				title: "Elemento agregado",
				text: `Haz agregado ${dish?.lenguage?.en?.name} correctamente`,
				icon: "success",
				timer: 2000
			})
		} else {
			const confirm = await Swal.fire({
				title: "Estas seguro",
				text: `Seguro deseas eliminar ${dish?.lenguage?.en?.name} de tu carrito de compras`,
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
					text: `Haz eliminado ${dish?.lenguage?.en?.name} correctamente`,
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
					<div key={index} className="sm:w-11/12 md:w-5/12 lg:w-3/12 rounded-lg shadow-md hover:shadow-xl transition m-3 cursor-pointer flex flex-col">
						<div onClick={() => moreDetails(dish)}>
							<img className="rounded-t-lg w-fit h-56 object-cover" src={dish.img} alt={dish?.lenguage?.en?.name} />
							<div className="px-4 pt-2 pb-4 h-24 flex flex-col justify-center">
								<h6 className="font-sans text-center font-semibold lowercase first-letter:capitalize">{dish?.lenguage?.en?.name}</h6>
								<h6 className='text-right font-mono mt-2'>$ {dish.price}</h6>
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
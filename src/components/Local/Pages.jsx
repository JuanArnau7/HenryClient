import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaCartArrowDown } from "react-icons/fa";
import { MdRemoveShoppingCart } from "react-icons/md";
import Swal from "sweetalert2";
import { useDispatch } from 'react-redux';
import { getLengthCart } from '../../redux/Actions/actions';

const Pages = ({ data }) => {
	const navigate = useNavigate()
	const [cartDishes, setCartDishes] = useState(JSON.parse(localStorage.getItem("dishes")))
	const dispatch = useDispatch()

	const addCart = async (dish) => {
		const index = cartDishes.findIndex(el => el.id === dish._id)
		const addDish = { id: dish._id, name: dish.lenguage.en.name, img: dish.img, price: dish.price, cant: 1 }
		if (index < 0) {
			const addDishes = [...cartDishes, addDish]
			localStorage.setItem("dishes", JSON.stringify(addDishes))
			setCartDishes(addDishes)
			dispatch(getLengthCart())
			Swal.fire({
				title: "Added element",
				text: `You have added ${dish.lenguage.en.name} correctly`,
				icon: "success",
				timer: 2000
			})
		} else {
			const confirm = await Swal.fire({
				title: "Are you sure?",
				text: `Are you sure you want to remove ${dish.lenguage.en.name} from your shopping cart?`,
				icon: "question",
				showCancelButton: true,
				confirmButtonText: "Remove",
				cancelButtonText: "Cancel"
			})
			if (confirm.isConfirmed) {
				const updateDishes = cartDishes.filter(el => el.id !== dish._id)
				localStorage.setItem("dishes", JSON.stringify(updateDishes))
				setCartDishes(updateDishes)
				dispatch(getLengthCart())
				Swal.fire({
					title: "Dish removed",
					text: `You have removed ${dish.lenguage.en.name} correctly`,
					icon: "info",
					timer: 2000
				})
			}
		}
	}

	const moreDetails = (dish) => {
		navigate(`/detailDish/${dish}`)
	}

	return (
		<div className='flex flex-wrap justify-around'>
			{data.length > 0 &&
				data.map((dish, index) => {
					return (
						<div key={index} className="sm:w-11/12 md:w-5/12 lg:w-3/12 rounded-lg shadow-md hover:shadow-xl transition m-3 cursor-pointer hover:-translate-y-1 hover:scale-105  w-fit  justify-center bg-white ">
							<div onClick={() => moreDetails(dish._id)}>
								<img className="rounded-t-lg w-full h-56 object-cover" src={dish.img} alt={dish.lenguage.en.name} />
								<div className="px-4 pt-2 pb-4 h-24 flex flex-col justify-center">
									<h6 className="font-sans text-center font-semibold lowercase first-letter:capitalize">{dish.lenguage.en.name}</h6>
									<h6 className='text-right font-mono mt-2'>$ {dish.price}</h6>
								</div>
							</div>
							<div className="flex justify-center mb-3">
								<button
									onClick={() => addCart(dish)}
									className={cartDishes.find(d => d.id === dish._id) ? "rounded-md dark:bg-gray-400 dark:hover:bg-gray-600 dark:text-gray-900 bg-red-500  text-white px-3 pb-1 hover:bg-red-600" : "rounded-md dark:bg-gray-400 dark:hover:bg-gray-600 dark:text-gray-900 bg-green-500 text-white px-3 pb-1 hover:bg-green-600"}
								>{cartDishes.find(d => d.id === dish._id)
									? <span className='inline-flex align-middle'>Remove from Cart <MdRemoveShoppingCart className='mt-1 mx-2 text-lg' /></span>
									: <span className='inline-flex align-middle'>Add to Cart <FaCartArrowDown className='mt-1 mx-2 text-xl' /></span>
									}
								</button>
							</div>
						</div>
					)
				})}
		</div>
	)
}

export default Pages
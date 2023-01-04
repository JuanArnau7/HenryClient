import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import { detailsDish, getFoodsReviews, getLengthCart } from '../../redux/Actions/actions';
import { FaCartArrowDown } from "react-icons/fa";
import { MdRemoveShoppingCart } from "react-icons/md";
import Swal from "sweetalert2";
import "./CardFood.css"
import NavBar from "../Utils/NavBar/NavBar";
import ModalAddReviewDish from '../Reviews/components/ModalAddReviewDish';
import ReviewsFoods from '../Reviews/ReviewsFoods';
import Loading from '../Utils/Loading/Loading';

const CardFood = () => {
	const dispatch = useDispatch()
	const id = useParams()
	const [userId, setuserId] = useState(null)
	const dish = useSelector(state => state.detailDish);
	const reviews = useSelector(state => state.reviewsDishes);
	const [ModalReviewDish, setModalReviewDish] = useState(false);
	const [ReadReviews, setReadReviews] = useState(false);
	const [Reviews, setReviews] = useState([])
	const [Visible, setVisible] = useState(true)
	const [FoodId, setFoodId] = useState(null)

	const establecerToken = async () => {
		let tk = localStorage.getItem('token');
		let userToken = await JSON.parse(atob(tk.split('.')[1]));
		if (userToken) {
			setuserId(userToken.id)
		}
	}
	const establecerReviews = () => {
		let rev = reviews.filter(r => {
			if (r.foodId === FoodId) {
				return r
			} else {
				return
			}
		})
		if (rev) {
			setReviews(rev)
		}
	}

	const cartDishes = JSON.parse(localStorage.getItem("dishes"))
	const findDish = cartDishes.find(dish => dish.id === FoodId)

	const [dishInCart, setDishInCart] = useState(findDish ? true : false)

	const addOrRemoveFromCart = async (id) => {
		const index = cartDishes.findIndex(el => el.id === id)
		if (index < 0) {
			cartDishes.push({ id: dish._id, name: dish.name, img: dish.img, price: dish.price, cant: 1 })
			setDishInCart(true)
			localStorage.setItem("dishes", JSON.stringify(cartDishes))
			dispatch(getLengthCart())
			Swal.fire({
				title: "Added element",
				text: `You have added ${dish?.name} correctly`,
				icon: "success",
				timer: 2000
			})
		} else {
			const confirm = await Swal.fire({
				title: "Are you sure?",
				text: `Are you sure you want to remove ${dish?.name} from your shopping cart?`,
				icon: "question",
				showCancelButton: true,
				confirmButtonText: "Remove",
				cancelButtonText: "Cancel"
			})
			if (confirm.isConfirmed) {
				cartDishes.splice(index, 1)
				setDishInCart(false)
				localStorage.setItem("dishes", JSON.stringify(cartDishes))
				dispatch(getLengthCart())
				Swal.fire({
					title: "Dish removed",
					text: `You have removed ${dish?.name} correctly`,
					icon: "info",
					timer: 2000
				})
			}
		}
	}

	useEffect(() => {
		console.log("dish", dish)
		dispatch(detailsDish(id))
		establecerToken()
		establecerReviews()
		dispatch(getFoodsReviews())
		setFoodId(id)
		setTimeout(() => {
			setVisible(false)
		}, 1500)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dish])

	const currencyFormat = (num) => num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

	return (
		<>
			<div className='BackgroundFood h-screen w-screen overflow-y'>
				<NavBar></NavBar>
				{/* <NavBarCreateFoods/> */}
				<div className=' h-screen  flex justify-center items-center BackgroundFood overflow-y-hidden'>

					<div className="max-sm:flex-col md:flex-row mx-auto sm:w-full md:w-11/12 lg:w-10/12  bg-white flex lg:flex-row justify-center  items-center rounded-lg  h-5/6">
						<div className="sm:w-full s:h-full md:w-1/3  lg:w-2/5 border border-gray-300 rounded-l-lg lg:m-0 md:m-0 sm:m-0 h-full">
							<div className=" rounded-t-lg ">
								<img className="max-sm:w-full max-md:w-full object-fit rounded-tl-lg lg:w-full" src={dish?.img} alt={dish?.lenguage?.en?.name} />
							</div>
							<div className="px-5 pb-5 m-4">
								<div className='flex '>
									<h5 className="text-xl font-semibold tracking-tight text-gray-900 lowercase first-letter:capitalize">{dish?.lenguage?.en?.name}</h5>
									<div className="flex items-center justify-center ml-4">
										<svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Rating star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
										<p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">4.95</p>
										<span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
										<a href="#" className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">73 reviews</a>
									</div>
								</div>
								<p className="text-lg font-semibold text-blue-500">Before <span className="ml-2 line-through font-light text-black"> $ {currencyFormat(dish?.price * 1.25)}</span></p>
								<p className="text-xl font-bold text-emerald-600">Now ✳️✅ 🤩 <span className="block text-orange-500 text-2xl">$ {currencyFormat(dish?.price * 1)}</span></p>

								<div className="flex items-center justify-around mt-4">

									{/* <Link to="/local/alterHome" className="rounded-md bg-green-500 text-white px-3 pb-1 hover:bg-green-600">Home</Link> */}
									<Link to="/local/alterHome" className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-blue-800">Home</Link>
									<button type="button" onClick={() => addOrRemoveFromCart(dish._id)}
										className={dishInCart ? "focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" : "focus:outline-none text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"}>{dishInCart
											? <span className='flex items-center'>Remove from Cart <MdRemoveShoppingCart className='mt-1 mx-2 text-lg' /></span>
											: <span className='flex items-center'>Add to Cart <FaCartArrowDown className='mt-1 mx-2 text-xl' /></span>
										}</button>
								</div>
							</div>
						</div>
						<div className="sm:w-full sm:mt-4 md:w-2/3 md:mt-6 lg:w-3/5 bg-white rounded-r-lg lg:m-0 w-full h-full">
							{!ReadReviews ?
								<div className='m-6 h-full flex flex-col justify-center items-center '>
									<h5 className="text-xl font-semibold tracking-tight text-blue-500 text-center mb-4">Detail of <span className='lowercase'>{dish?.lenguage?.en?.name}</span></h5>
									<p className='mx-8'>{dish?.lenguage?.en?.descripcion}</p>
									<div className='flex justify-center items-center mt-5'>
										<button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" data-modal-toggle="authentication-modal" onClick={() => setModalReviewDish(true)}>Add Review</button>
										<button type="button" className="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() => setReadReviews(true)}>Read Reviews</button>
									</div>
								</div>
								:
								<ReviewsFoods setReadReviews={setReadReviews} />
							}
						</div>
					</div>
				</div>
			</div>
			<ModalAddReviewDish
				DishId={id.id}
				ModalReviewDish={ModalReviewDish}
				setModalReviewDish={setModalReviewDish}
			/>
		</>
				// }
		
		// </>
	)
}

export default CardFood
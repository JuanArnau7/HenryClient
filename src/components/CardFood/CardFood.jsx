import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from "react-router-dom";
import { detailsDish, getLengthCart, getAllDishes } from '../../redux/Actions/actions';
import { FaCartArrowDown } from "react-icons/fa";
import { MdRemoveShoppingCart } from "react-icons/md";
import Swal from "sweetalert2";
import "./CardFood.css"
import NavBar from "../Utils/NavBar/NavBar";
import ModalAddReviewDish from '../Reviews/components/ModalAddReviewDish';
import ReviewsFoods from '../Reviews/ReviewsFoods';

const CardFood = () => {
	const dispatch = useDispatch()
	const id = useParams()
	const [userId, setuserId] = useState(null)
	const dish = useSelector(state => state.detailDish);
	const reviews = useSelector(state => state.reviewsDishes);
	const [ModalReviewDish, setModalReviewDish] = useState(false);
	const [ReadReviews, setReadReviews] = useState(false);
	const [Reviews, setReviews] = useState([])

	const establecerToken = async () => {
		let tk = localStorage.getItem('token');
		if(tk){ 
			let userToken = await JSON.parse(window.atob(tk.split('.')[1]));
			if (userToken) {
				setuserId(userToken.id)
			}
		}
	}


	const cartDishes = JSON.parse(localStorage.getItem("dishes"))
	const findDish = cartDishes.find(dish => dish.id === id.id)

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
	const establecerReviews = ()=>{
		let rev = reviews.filter(r => {
		  if (r.foodId === id.id){
		  return r
		  } 
		})
		if (rev) {
		  setReviews(rev)
		}
		}
	const rating = () => {
		let rat = Reviews.map(r=>r.score).reduce((prev, curr)=> prev+curr, 0)
		let cantReviews = Reviews.length
		return (rat/cantReviews).toFixed(2)
	}

	useEffect(() => {
		// Se incluye esta action para que no se rompa la pagina al recargar
		dispatch(getAllDishes())
		dispatch(detailsDish(id))
		establecerToken()
		establecerReviews()
		
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dish, reviews])
	const currencyFormat = (num) => num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

	return (
		<>
			<div className='BackgroundFood h-screen w-screen overflow-y'>
				<NavBar></NavBar>
				{/* <NavBarCreateFoods/> */}
				<div className=' xl:h-screen lg:h-screen md:min-h-sceen sm:min-h-screen md:h-fit sm:h-fit  flex justify-center items-center BackgroundFood overflow-y-hidden dark:bg-gray-800'>

					<div className="sm:flex-col md:flex-col mx-auto sm:w-full md:w-11/12 lg:w-10/12 dark:bg-gray-500 bg-white flex lg:flex-row justify-center  items-center rounded-lg h-5/6 dark:bg-gray-800">
						<div className="sm:w-full md:w-full  lg:w-2/5 border border-gray-300 rounded-l-lg lg:m-0 md:m-0 sm:m-0 h-full">
							<div className=" rounded-t-lg ">
								<img className="max-sm:w-full max-md:w-full object-fit rounded-tl-lg lg:w-full" src={dish?.img} alt={dish?.lenguage?.en?.name} />
							</div>
							<div className="px-5 pb-5 m-4 h-full">
								<div className='flex'>
									<h5 className="text-xl font-semibold tracking-tight text-gray-900 lowercase first-letter:capitalize dark:text-gray-200">{dish?.lenguage?.en?.name}</h5>
									<div className="flex items-center justify-center ml-4">
										<svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Rating star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
										<p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">{Reviews.length? rating() : 5}</p>
										<span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
									</div>
								</div>
								<p className="text-lg font-semibold text-blue-500 dark:text-blue-800">Before <span className="ml-2 line-through font-light text-black"> $ {currencyFormat(dish?.price * 1.25)}</span></p>
								<p className="text-xl font-bold text-emerald-600">Now ✳️✅ 🤩 <span className="block text-orange-500 text-2xl">$ {currencyFormat(dish?.price * 1)}</span></p>

								<div className="flex justify-between md:flex-col sm:flex-col md:gap-3 lg:flex-row mt-4 items-center sm:gap-3">
									<Link to="/local/alterHome" className=" sm:w-full md:w-1/2 text-white md:text-center sm:text-center bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:text-gray-200   focus:outline-none h-12 ">Home</Link>
									
									<button type="button" onClick={() => addOrRemoveFromCart(dish._id)}
										className={dishInCart ? "sm:w-full md:w-1/2  focus:outline-none text-white dark:text-gray-200 md:text-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 h-12" : "h-12 sm:w-full md:w-1/2  focus:outline-none text-white md:text-center bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:text-gray-200 "}>{dishInCart
											? <span className='flex items-center justify-center'>Remove from Cart <MdRemoveShoppingCart className='mt-1 mx-2 text-lg' /></span>
											: <span className='flex items-center justify-center'>Add to Cart <FaCartArrowDown className='mt-1 mx-2 text-xl' /></span>
										}</button>									
								</div>
							</div>
						</div>
						<div className="sm:w-full md:w-2/3 lg:w-3/5 dark:bg-gray-500 bg-white rounded-r-lg mx-2 w-full h-full dark:bg-gray-800">
							{!ReadReviews ?
								<div className='m-6 flex flex-col justify-center items-center h-full '>
									<h5 className="text-xl font-semibold tracking-tight dark:text-blue-600 text-blue-500 text-center mb-4">Detail of <span className='lowercase'>{dish?.lenguage?.en?.name}</span></h5>
									<p className='mx-8 dark:text-gray-200'>{dish?.lenguage?.en?.descripcion}</p>
									<div className='flex sm:flex-col md:flex-row lg:flex-row xl:flex-row  justify-center items-center mt-5 w-full'>
										<button type="button" className="sm:w-full md:w-3/4 lg:w-1/3 xl:w-1/4 text-white dark:text-gray-200 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none " data-modal-toggle="authentication-modal" onClick={() => setModalReviewDish(true)}>Add Review</button>
										<button type="button" className= 'sm:w-full md:w-3/4 lg:w-1/3 xl:w-1/4  text-white dark:text-gray-200 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none ' onClick={() => setReadReviews(true)}>Read Reviews</button>
									</div>
								</div>
								:
								<ReviewsFoods setReadReviews={setReadReviews} FoodId={id.id} establecerToken={establecerToken} />
							}
						</div>
					</div>
				</div>
			</div>
			<ModalAddReviewDish
				DishId={id.id}
				ModalReviewDish={ModalReviewDish}
				setModalReviewDish={setModalReviewDish}
				userId={userId}
				establecerToken={establecerToken}
			/>
		</>
	)
}

export default CardFood
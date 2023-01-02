import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { BsCart4 } from "react-icons/bs"
import { useState, useEffect } from "react"
import SearchBar from "../SearchBar/SearchBar"
import { useDispatch, useSelector } from "react-redux"
import { getLengthCart, logOut } from "../../../redux/Actions/actions";
import { FaStoreAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import Sidebar from "../SideBar/Sidebar";

const NavBar = () => {
	const [Menu, setMenu] = useState(false)

	// Set menu
	const manageMenu = () => Menu ? setMenu(false) : setMenu(true)

	const carrito = useSelector(state => state.elementsCart)
	const user = useSelector(state => state.userProfile)
	const location = useLocation()
	const { pathname } = location;
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const goToCart = () => {
		navigate('/cart')
	}

	useEffect(() => {
		dispatch(getLengthCart())
	}, [carrito, dispatch, pathname, user])

	const handleLogOut = async () => {
		const confirm = await Swal.fire({
			title: "Are you sure?",
			text: "Sure you want logout this page?",
			icon: 'question',
			showCancelButton: true
		})
		if (confirm.isConfirmed) {
			dispatch(logOut())
			localStorage.removeItem("token")
			navigate(`/local/alterHome`);
		}
	}

	const handleCreate = () => {
		navigate(`/createFood`);
	}

	return (
		<>
			<nav className="px-2 sm:px-4 py-2.5 bg-green-700 shadow-xl w-full sticky top-0 z-50">
				<div className="flex flex-wrap px-6 items-center justify-center md:justify-between mx-auto">
					<div className="flex flex-row gap-3">
						<Sidebar  pathname={pathname} userId={user._id}/>
						<Link to='/' >
							<span className="flex items-center">
								<span className="self-center text-xl text-white font-semibold whitespace-nowrap dark:text-white">Henry's Foods</span>
							</span>
						</Link>
						<Link to={'/local/alterHome'}
							className="hover:border hover:border-white rounded-lg px-4">
							<span className="sr-only">Go to all dishes</span>
							<FaStoreAlt className="text-white text-3xl" />
						</Link>
					</div>				

					{/* El boton para crear nuevos platos estara disponible solo para adminsitradores */}
					{ user.rol === "ROL_ADMIN" &&
						<button onClick={() => handleCreate()} className="px-5 py-1 bg-red-600 text-white rounded hover:bg-red-800" >
							Create
						</button>
					}

					<div className="flex justify-between w-full mt-4 md:mt-0 md:w-1/2 lg:w-5/12 gap-3">
						{!user._id && pathname === '/login' ? (
							<Link
								className="px-5 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-800 shadow-lg"
								to={"/register"}
							>
								Signup
							</Link>
						) : !user._id && pathname === '/register' ? (
							<Link
								className="px-5 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-800 shadow-lg"
								to={"/login"}
							>
								Login
							</Link>
						) : !user._id ? (
							<div className="flex gap-4">
								<Link
									className="px-5 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-800 shadow-lg"
									to={"/register"}
								>
									Signup
								</Link>
								<Link
									className="px-5 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-800 shadow-lg"
									to={"/login"}
								>
									Login
								</Link>

							</div>
						) : user._id && pathname === "/perfil" ? (
              <>
                <button
                className="px-5 py-1 rounded-lg bg-yellow-400 text-blue-900 hover:bg-orange-600 hover:text-white shadow-lg"
                onClick={handleLogOut}
							  >
								  Logout
							  </button>
              </>
						) 
					: <></>}

						<SearchBar manageMenu={manageMenu} />
						
						<div onClick={goToCart}
							className="flex cursor-pointer hover:rounded-md mt-1">
							<BsCart4 className="text-3xl text-white" />
							<sup className="text-gray-600 font-bold bg-white mb-3 px-2 pt-2.5 rounded-full">{carrito}</sup>
						</div>
						
					</div>
				</div>
			</nav>


		</>
	)
}

export default NavBar
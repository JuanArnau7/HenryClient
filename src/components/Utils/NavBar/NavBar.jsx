import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { BsCart4 } from "react-icons/bs"
import { useEffect } from "react"
import SearchBar from "../SearchBar/SearchBar"
import { useDispatch, useSelector } from "react-redux"
import { getLengthCart } from "../../../redux/Actions/actions";
import { FaStoreAlt, FaUserCircle } from "react-icons/fa";
import Sidebar from "../SideBar/Sidebar";

const NavBar = () => {
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

	const handleCreate = () => {
		navigate(`/dashboard/Home`);
	}

	return (
		<>
			<nav className="sm:px-4 py-2.5 bg-green-700 dark:bg-gray-500 shadow-xl w-full sticky top-0 z-50">
				<div className="flex flex-wrap px-6 items-center justify-between mx-auto">
					<div className="flex flex-row items-center gap-3">
                        {pathname === '/local/alterHome'?
						<Sidebar pathname={pathname} userId={user._id} />
                        :
                        <>
                        </>}
						<Link to='/' >
							<span className="flex items-center">
								<span className="text-lg md:text-xl -ml-4 text-white font-semibold whitespace-nowrap dark:text-black">Henry's Foods</span>
							</span>
						</Link>
						<Link to={'/local/alterHome'}
							className="hover:border hover:border-white rounded-lg pl-1">
							<span className="sr-only">Go to all dishes</span>
							<FaStoreAlt className="text-white dark:text-black text-xl md:text-3xl" />
						</Link>
					</div>

					{/* El boton para crear nuevos platos estara disponible solo para adminsitradores */}
					{user.rol !== "ROL_ADMIN" &&
						<button onClick={() => handleCreate()} className="px-5 py-1 bg-red-600 dark:text-black text-white rounded hover:bg-red-800 dark:bg-gray-300" >
							Dashboard
						</button>
					}

					<div className="flex items-center gap-2 md:gap-4">
						<div className="hidden sm:block">
							<SearchBar />
						</div>
						{pathname !== "/perfil" &&
							<FaUserCircle
								className="text-2xl md:text-4xl text-white dark:text-black pt-1 cursor-pointer"
								onClick={() => navigate('/perfil')} />
						}

						<div onClick={goToCart}
							className="flex cursor-pointer hover:rounded-md mt-1">
							<BsCart4 className="text-xl sm:text-3xl dark:text-black text-white" />
							<sup className="text-gray-600 font-bold dark:text-white dark:bg-black bg-white mb-1 sm:mb-3 px-2 pt-2 rounded-full">{carrito}</sup>
						</div>
					</div>
				</div>
				<div className="block w-11/12 mx-auto my-2 sm:hidden">
					<SearchBar />
				</div>
			</nav>
		</>
	)
}


export default NavBar
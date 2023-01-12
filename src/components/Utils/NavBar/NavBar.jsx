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
		navigate(`/dashboard/`);
	}

	return (
		<>
			<nav className="sm:px-4 py-2.5 bg-green-700 dark:bg-gray-800 dark:text-white shadow-xl w-screen sticky top-0 z-50">
				<div className="flex flex-wrap px-6 items-center justify-between mx-auto dark:text-white">
					<div className="flex flex-row items-center gap-3 dark:text-white">
                        {pathname === '/local/alterHome'?
						<Sidebar pathname={pathname} userId={user._id} />
                        :
                        <>
                        </>}
						<Link to='/' >
							<span className="flex items-center">
								<span className="text-lg md:text-xl ml-1 text-white font-semibold whitespace-nowrap dark:text-white">Henry's Foods</span>
							</span>
						</Link>
						<Link to={'/local/alterHome'}
							className="hover:border hover:border-white rounded-lg pl-1">
							<span className="sr-only">Go to all dishes</span>
							<FaStoreAlt className="text-white dark:text-white text-xl md:text-3xl" />
						</Link>
					</div>

					{/* El boton para crear nuevos platos estara disponible solo para adminsitradores */}
					{user.rol === "ADMIN_ROLE" &&
						<button onClick={() => handleCreate()} className="px-5 py-1 bg-red-600 dark:text-black text-white self-align-center rounded hover:bg-red-800 dark:bg-gray-300" >
							Dashboard
						</button>
					}

					<div className="flex items-center gap-2 md:gap-4">
						<div className="hidden sm:block">
						{pathname === '/local/alterHome'?
						<SearchBar />
                        :
                        <>
                        </>}
						</div>
						{pathname !== "/perfil" &&
						<>
						{user.img?
							<>
							<img src={user.img}
							alt="not found"
								className="  w-10 h-10 text-white dark:text-black  cursor-pointer rounded-full"
								onClick={() => navigate('/perfil')} />
							</>
						:
						<FaUserCircle
						className="text-2xl md:text-4xl text-white dark:text-black pt-1 cursor-pointer"
						onClick={() => navigate('/perfil')} />
					}
					</>
						}

						<div onClick={goToCart}
							className="flex cursor-pointer hover:rounded-md mt-1">
							<BsCart4 className="text-xl sm:text-3xl dark:text-white text-white" />
							<sup className="text-gray-600 font-bold dark:text-black dark:bg-white bg-white mb-1 sm:mb-3 px-2 pt-2 rounded-full ">{carrito}</sup>
						</div>
					</div>
				</div>
				<div className="w-9/12 ml-20 my-2 sm:hidden">
				{pathname === '/local/alterHome'?
						<SearchBar />
                        :
                        <>
                        </>}
					
				</div>
			</nav>
		</>
	)
}


export default NavBar
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getFilterDishes } from "../../../redux/Actions/actions";
import Paginator from "../../Paginator/Paginator";
import FiltroCategoria from "../../Utils/Filter/FiltroCategoria";
import FiltroPrecios from "../../Utils/Filter/FiltroPrecios";
import Pages from "../Pages";
import { useNavigate } from "react-router-dom";
import { FaFilter, FaSort } from "react-icons/fa";
import "./AlterHome.css"
import Loading from "../../Utils/Loading/Loading";
import NavBar from "../../Utils/NavBar/NavBar";

const AlterHome = () => {
	const dishes = useSelector(state => state.filterDishes)
	const dispatch = useDispatch()
	const [Visible, setVisible] = useState(true)
	useEffect(() => {
		dispatch(getFilterDishes())
	}, [dispatch])
	useEffect(() => {
		setTimeout(() => {
			setVisible(false)
		}, 1500)
	}, [dishes])

	// Information for paginator component
	const [currentPage, setCurrentPage] = useState(1);
	const postPerPage = 8
	const lastPostIndex = currentPage * postPerPage;
	const firstPostIndex = lastPostIndex - postPerPage;
	const currentPost = dishes.slice(firstPostIndex, lastPostIndex);

	const tabs = [
		{ name: "Sort", content: "precio", icon: <FaSort /> },
		{ name: "Categories", content: "Categoria", icon: <FaFilter /> }
	];

	const [toogleMenu, setToogleMenu] = useState(true)
	const btnToogleMenu = () => setToogleMenu(prev => !prev)

	const navigate = useNavigate();
	
	return (
		<>
		
			{Visible ?
				<>
					<div className="AlterHome h-fit">
						<div className="flex flex-col w-11/12 mx-auto p-6 shadow-xl h-fit bg-white">
							<div className="flex justify-center items-center shadow-xl h-screen w-full bg-white">
								<Loading Visible={Visible} />
							</div>
						</div>
					</div>
				</>
				:
				<>
					<div className="AlterHome h-fit">
						<div className="flex flex-col w-11/12 mx-auto px-6 shadow-xl h-fit bg-white">
							<div className="w-full mt-3 md:mt-0">

								<button type="button"
									className="flex mx-2 text-sm text-gray-500 md:hidden"
									onClick={btnToogleMenu}
								>
									<span className="sr-only">Ver seccion filtros</span>
									<svg className="w-8 h-8 rounded-full text-white bg-blue-500 hover:text-gray-200 hover:bg-blue-700" aria-hidden="true" fill="currentColor" viewBox="-5 -5 30 30">
										<path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
									</svg>
								</button>
								<div className={toogleMenu ? "hidden md:block h-fit mt-4" : "h-fit mt-4"}>
									<div className="flex-1">
										<ul className="flex flex-col md:flex-row justify-end items-center pb-4 space-y-1 text-sm mx-auto">
											{tabs.map((tab, index) => (
												<li key={index} className="flex justify-center items-center w-11/12">
													<div className="flex items-center p-2 sm:space-x-2 md:space-x-3 mb-3">
														<span className='text-2xl'>{tab.icon}</span>
														<span>{tab.name}</span>
													</div>
													{tab.name === "Sort" ?
														<FiltroPrecios />
														:
														<FiltroCategoria dishes={dishes} />
													}
												</li>
											))}
										</ul>
									</div>

								</div>
							</div>

							<div className={toogleMenu ? "w-full" : "max-md:w-11/12 max-lg:w-11/12"}>
								<h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
									Our dishes:
									<small className="font-normal text-sm ml-3">(showing {lastPostIndex > dishes.length ? dishes.length : lastPostIndex} of {dishes.length} available dishes)</small>
								</h1>
								<div className="flex flex-wrap justify-between min-h-screen min-w-screen">
									{currentPost &&
										<div>
											<Paginator
												totalPosts={dishes.length}
												postPerPage={postPerPage}
												setCurrentPage={setCurrentPage}
												currentPage={currentPage}
											/>
											<Pages data={currentPost} />
											<Paginator
												totalPosts={dishes.length}
												postPerPage={postPerPage}
												setCurrentPage={setCurrentPage}
												currentPage={currentPage}
											/>
										</div>

									}
								</div>
							</div>
						</div>
					</div>
				</>}
		</>

	)
}

export default AlterHome
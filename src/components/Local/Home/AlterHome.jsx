import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getAllDishes } from "../../../redux/Actions/actions";
import Paginator from "../../Paginator/Paginator";
import FiltroCategoria from "../../Utils/Filter/FiltroCategoria";
import FiltroPrecios from "../../Utils/Filter/FiltroPrecios";
import Pages from "../Pages";

const AlterHome = () => {
	const dishes = useSelector(state => state.allDishes)
	const dispatch = useDispatch()

	// Information for paginator component
	const [currentPage, setCurrentPage] = useState(1);
	const postPerPage = 8
	const lastPostIndex = currentPage * postPerPage;
	const firstPostIndex = lastPostIndex - postPerPage;
	const currentPost = dishes.slice(firstPostIndex, lastPostIndex);
	
	useEffect(() => {
		dispatch(getAllDishes())
	}, [dispatch])

	const tabs = [
		{ name: "Precios", content: "precio", icon: "💵" },
		{ name: "Categorias", content: "Categoria", icon: "🍽️" }
	];

	const [toogleMenu, setToogleMenu] = useState(true)
	const btnToogleMenu = () => setToogleMenu(prev => !prev)

	return (
		<div className="flex w-11/12 mx-auto border-solid border-2 border-green-300">
			<div className="">
				<button type="button"
					className="flex m-4 text-sm text-gray-500 md:hidden"
					onClick={btnToogleMenu}
				>
					<span className="sr-only">Ver seccion filtros</span>
					<svg className="w-8 h-8 rounded-full text-white bg-blue-500 hover:text-gray-200 hover:bg-blue-700" aria-hidden="true" fill="currentColor" viewBox="-5 -5 30 30">
						<path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
					</svg>
				</button>
				<div className={toogleMenu ? "hidden md:block max-md:w-3/12 max-lg:w-4/12 h-screen" : "max-md:w-3/12 max-lg:w-4/12 h-screen"}>
					<div className="space-y-3">
						<div className="flex flex-col">
							<h2 className="font-bold ">Filtros....</h2>
						</div>
						<div className="flex-1">
							<ul className="pt-2 pb-4 space-y-1 text-sm">
								{tabs.map((tab, index) => (
									<li key={index}>
										<div className="flex items-center p-2 sm:space-x-2 md:space-x-3">
											<span className='text-2xl'>{tab.icon}</span>
											<span>{tab.name}</span>
										</div>
										{tab.name === "Precios"?
										<FiltroPrecios/>
										:
										<FiltroCategoria dishes={dishes}/>
										}
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>

			<div className={toogleMenu ? "w-full" : "max-md:w-11/12 max-lg:w-11/12"}>
				<h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
					Nuestros platos: 
					<small className="font-normal text-sm ml-3">(mostrando {lastPostIndex > dishes.length ? dishes.length : lastPostIndex} de {dishes.length} platos disponibles)</small>
				</h1>
				<div className="flex flex-wrap justify-between">
					{currentPost &&
						<div>
							<Paginator
								totalPosts={dishes.length}
								postPerPage={postPerPage}
								setCurrentPage={setCurrentPage}
								currentPage={currentPage}
							/>
							<Pages data={currentPost} />
						</div>
					}
				</div>
			</div>
		</div>
	)
}

export default AlterHome
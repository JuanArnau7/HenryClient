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
	const currentPost = dishes.length > 7 ? dishes.slice(firstPostIndex, lastPostIndex) : dishes

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
					<div className="AlterHome h-fit ">
						<div className="flex flex-col w-11/12 mx-auto p-6 shadow-xl h-fit bg-white">
							<div className="flex justify-center items-center shadow-xl h-screen w-full bg-white dark:bg-gray-800">
								<Loading Visible={Visible} />
							</div>
						</div>
					</div>
				</>
				:
				<>
					<NavBar></NavBar>
					
					<div className="AlterHome h-fit">
						<div className="flex flex-col w-11/12 mx-auto px-6 shadow-xl h-fit bg-gray-100 dark:bg-gray-500">

							<div className={toogleMenu ? "w-full" : "max-md:w-11/12 max-lg:w-11/12 dark:bg-gray-800"}>
								<h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-4 mt-5 dark:text-white">
									Our dishes:
									<small className="font-normal text-sm ml-3">(showing {lastPostIndex > dishes.length ? dishes.length : lastPostIndex} of {dishes.length} available dishes)</small>
								</h1>
									{currentPost &&
										<div className="min-w-screen min-h-screen">
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
				</>}
		</>

	)
}

export default AlterHome
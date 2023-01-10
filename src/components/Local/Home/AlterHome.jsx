import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getFilterDishes, getUserById } from "../../../redux/Actions/actions";
import Paginator from "../../Paginator/Paginator";
import Pages from "../Pages";
import "./AlterHome.css"
import Loading from "../../Utils/Loading/Loading";
import NavBar from "../../Utils/NavBar/NavBar";

const AlterHome = () => {
	const dishes = useSelector(state => state.filterDishes)
	const dispatch = useDispatch()
	const [Visible, setVisible] = useState(true)
	const token = localStorage.getItem("token")

	useEffect(() => {
		setTimeout(() => {
			setVisible(false)
		}, 1500)
		dispatch(getFilterDishes())
		async function perfilUser(){
			if(token){
				const tokenDecoded = JSON.parse(window.atob(token.split('.')[1]))
				await dispatch(getUserById(tokenDecoded.id))
			}
		}
		perfilUser()
	}, [dispatch, token])  

	// useEffect(() => {
		
		
	// }, [dishes])
	
	
	// Information for paginator component
	const [currentPage, setCurrentPage] = useState(1);
	const postPerPage = 8
	const lastPostIndex = currentPage * postPerPage;
	const firstPostIndex = lastPostIndex - postPerPage;
	const currentPost = dishes.length > 7 ? dishes.slice(firstPostIndex, lastPostIndex) : dishes

	const [toogleMenu, setToogleMenu] = useState(true)

	return (
		<>
			{Visible ?
			
				<>
				<NavBar></NavBar>
					<div className="AlterHome h-fit">
						<div className="flex  flex-col w-screen mx-auto p-6  h-fit bg-white">
							<div className="flex justify-center items-center  h-screen w-full bg-white ">
								<Loading Visible={Visible} />
							</div>
						</div>
					</div>
				</>
				:
				<>
					<NavBar></NavBar>
					
					<div className="AlterHome h-fit">
						<div className="flex flex-col ml-16 shadow-xl h-fit bg-green-100 dark:bg-gray-100">

							<div className="w-full">
								<h1 className="text-lg sm:text-2xl font-bold tracking-tight text-gray-900 ml-5 sm:ml-8 mb-4 mt-5">
									Our dishes:
									<small className="font-normal text-xs sm:text-sm ml-2">(showing {lastPostIndex > dishes.length ? dishes.length : lastPostIndex} of {dishes.length} available dishes)</small>
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
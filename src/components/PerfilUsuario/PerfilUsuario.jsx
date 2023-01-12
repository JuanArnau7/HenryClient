import React, { useState, useEffect } from 'react';
import DataUser from './DataUser';
import ShoppingHistory from './ShoppingHistory';
import UpdateUser from './UpdateUser';
import { NavLink, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { getUserById, getUserOrders } from '../../redux/Actions/actions';
import NavBar from '../Utils/NavBar/NavBar';
import Sidebar from '../Utils/SideBar/Sidebar';

const PerfilUsuario = () => {
	const [openTab, setOpenTab] = useState("Recorded data")
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const token = localStorage.getItem("token")
	
	const tabs = [
		{ name: "Recorded data", content: <DataUser /> },
		{ name: "Update profile", content: <UpdateUser /> },
		{ name: "Purchase history", content: <ShoppingHistory /> },
	];
  
	useEffect(() => {
		if(!token){
			Swal.fire({
				title: "You are not logged in",
				text: "Please login or register on our page",
				icon: "info",
				timer: 5000
			})
			navigate("/login")
		} else {
			async function perfilUser(){
				const tokenDecoded = JSON.parse(window.atob(token.split('.')[1]))
				await dispatch(getUserById(tokenDecoded.id))
				await dispatch(getUserOrders(tokenDecoded.id))
			}
			perfilUser()
		}
	}, [dispatch, token, navigate])
	
	return (
		<div className=' w-screen flex flex-col  min-h-screen h-screen' id='fondo'>
			<NavBar />
			<div className='flex items-center justify-center h-full '>
			<div className='bg-white flex flex-col mt-4  xl:w-1/2 lg:w-1/2 md:w-2/3 sm:w-full  md:mx-auto border-2 border-blue-300 dark:border-blue-500 shadow-md shadow-blue-300 dark:shadow-gray-800 dark:bg-gray-800 dark:text-grat-200 rounded-lg'>
				<div className='w-full  '>
					<ul className="flex  justify-around  items-center xl:flex-row lg:flex-row md:flex-row sm:flex-col  mt-3  w-full ">
						{tabs.map((tab) => (
							<li
								key={tab.name}
								className="mb-3  px-3 w-full"
							>
								<NavLink
									to={tab.link}
									onClick={() => setOpenTab(tab.name)}
									className={tab.name === openTab ? "bg-blue-500  dark:text-white text-white hover:bg-blue-700 px-3 py-4 rounded-md  flex inline-flex w-1/4 sm:w-full font-bold" : "  font-bold w-1/4 sm:w-full flex inline-flex bg-blue-300 hover:text-white hover:bg-blue-500 px-3 py-4 rounded-md "}
								>
									{tab.name}
								</NavLink>
							</li>
						))}
					</ul>
				</div>
				
				<div className="w-full  pl-6 pt-4 flex items-center justify-center mt-5">
					{tabs.map((tab) => (
						<div
							key={tab.name}
							className={tab.name === openTab ? "block" : "hidden"}
						>
							{tab.content}
						</div>
					))}
				</div>
			</div>
			</div>
		</div>
  )
}

export default PerfilUsuario
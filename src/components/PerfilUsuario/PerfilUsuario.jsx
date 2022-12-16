import React, { useState, useEffect } from 'react';
import DataUser from './DataUser';
import ShoppingHistory from './ShoppingHistory';
import UpdateUser from './UpdateUser';
import { NavLink, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { getUserById } from '../../redux/Actions/actions';

const PerfilUsuario = () => {
	const [openTab, setOpenTab] = useState("Datos registrados")
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const token = localStorage.getItem("token")
	
	const tabs = [
		{ name: "Datos registrados", content: <DataUser /> },
		{ name: "Actualizar perfil", content: <UpdateUser /> },
		{ name: "Historial compras", content: <ShoppingHistory /> },
	];
  
	useEffect(() => {
		if(!token){
			Swal.fire({
				title: "No haz iniciado sesion",
				text: "Por favor inicia sesion o registrate en nuestra pagina",
				icon: "info",
				timer: 5000
			})
			navigate("/login")
		} else {
			async function perfilUser(){
				const tokenDecoded = JSON.parse(window.atob(token.split('.')[1]))
				await dispatch(getUserById(tokenDecoded.id))
			}
			perfilUser()
		}
	}, [dispatch, token, navigate])
	
	return (
		<div className='mt-45 pt-15'>
			<div className='flex flex-row w-5/6 mx-auto border-2 border-blue-300 shadow-md shadow-blue-300'>
				<div className='w-1/3 border-r-4 border-blue-300'>
					<ul className="flex flex-col mt-6">
						{tabs.map((tab) => (
							<li
								key={tab.name}
								className="mb-4 px-3"
							>
								<NavLink
									to={tab.link}
									onClick={() => setOpenTab(tab.name)}
									className={tab.name === openTab ? "bg-blue-500 text-white hover:bg-blue-700 px-3 py-1 rounded-md m-3" : "bg-blue-300 hover:text-white hover:bg-blue-500 px-3 py-1 rounded-md m-3"}
								>
									{tab.name}
								</NavLink>
							</li>
						))}
					</ul>
				</div>
				<div className="w-2/3 pl-6 pt-4">
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
  )
}

export default PerfilUsuario
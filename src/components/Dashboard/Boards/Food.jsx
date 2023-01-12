import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteFood, updateFood, updateUserFromAdmin } from '../../../redux/Actions/actions';
import './Review.css';
import Swal from "sweetalert2";

const BoardFood = () => {
	const dishes = useSelector(state => state.allDishes)
  const navigate = useNavigate();
	const [showModal, setShowModal] = useState(false)

	const [dishesData, setdishesData] = useState({
	  lenguage: {
		es: {
		  name: "",
		  descripcion: "",
		},
		en: {
		  name: "",
		  descripcion: "",
		},
	  },
	  img:"",
	})
	
  const dispatch = useDispatch()


	const handleChangeUrl = (e) => {
		setdishesData({...dishesData, img: e.target.value})
	}

	const handleNameSpanish = (e) => {
		setdishesData({
		  ...dishesData,
		  lenguage: {
			...dishesData.lenguage,
			es: {
			  ...dishesData.lenguage.es,
			  name: e.target.value,
			},
		  },
		});
	  };
	  const handleDescriptionSpanish = (e) => {
		setdishesData({
		  ...dishesData,
		  lenguage: {
			...dishesData.lenguage,
			es: {
			  ...dishesData.lenguage.es,
			  descripcion: e.target.value,
			},
		  },
		});
	  };
	  const handleNameEnglish = (e) => {
		setdishesData({
		  ...dishesData,
		  lenguage: {
			...dishesData.lenguage,
			en: {
			  ...dishesData.lenguage.en,
			  name: e.target.value,
			},
		  },
		});
	  };
	  const handleDescriptionEnglish = (e) => {
		setdishesData({
		  ...dishesData,
		  lenguage: {
			...dishesData.lenguage,
			en: {
			  ...dishesData.lenguage.en,
			  descripcion: e.target.value,
			},
		  },
		});
	  };
	

	const loadInfoUser = async (idFood) => {
		setShowModal(true)
		setdishesData(dishes.find(u => u._id === idFood))		
	}
	
	const validar = () => {
		if (!dishesData.nameEN) {
		  return false;
		}
		if (!dishesData.nameES) {
		  return false;
		}
		if (!dishesData.descripcionEN) {
		  return false;
		}
		if (!dishesData.descripcionES) {
		  return false;
		}
		if (!dishesData.imagen) {
		  return false;
		}
		return true;
	  };
	const handleSubmit = async (e) =>{
		e.preventDefault()		
		const response = await dispatch(updateFood(dishesData._id, dishesData))
		if(response.payload.status === 200){
			new Swal.fire("Succesfull update", "You have updated the user information correctly", "success")
			setShowModal(false)
			// if(confirm.isConfirmed){
			window.location.reload()
			// }
		} else {
			new Swal.fire("Something was wrong", "Cannot update user information, please try again later", "success")
		}
	}

	const handleDeleteFood = async (e, idFood) => {
		const confirm = await Swal.fire({
			title: "Are you sure",
			text: "Do you want continue with the procces of delete user?",
			icon: "question",
			showCancelButton: true
		})
		if(confirm.isConfirmed){
			await dispatch(deleteFood(idFood))
            window.location.reload()
			new Swal("User deleted correctly", "", "success")
		}
	}
  const handleClickCreate = async (e) => {
    e.preventDefault()
    navigate('/createFood')
    
    
  } 

	return (
		<div className="w-11/12 md:w-9/12 mx-auto shadow-md rounded-lg mt-8">
			<div className="w-full border border-gray-300 mb-4 py-3 text-center rounded-md bg-slate-100">
				<span className="font-bold text-xl">List of all dishes</span>
        
			</div>
      <div className="flex flex-col items-center">

      <button onClick={(e) => handleClickCreate(e)}
									className="focus:outline-none text-white m-5 md:text-center bg-green-500 hover:bg-green-900 py-4 focus:ring-4 font-medium rounded-lg text-md px-5 py-1 dark:text-gray-900 dark:bg-gray-400 dark:hover:bg-gray-600">
									Create new food
								</button>
      </div>
			<table className="w-full text-sm text-left border border-gray-400 text-gray-500 dark:text-gray-400">
				<thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" className="px-6 py-3 border border-gray-400 text-center">
							ID
						</th>
						<th scope="col" className="px-6 py-3 border border-gray-400 text-center">
              				Title
						</th>
						<th scope="col" className="px-6 py-3 border border-gray-400 text-center">
							Visible in home
						</th>
						<th scope="col" className="px-6 py-3 border border-gray-400 text-center">
							Description
						</th>
						<th scope="col" className="px-6 py-3 border border-gray-400 text-center">
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{dishes?.map((u, i) => (
						<tr key={i} className="bg-white border border-gray-400 dark:bg-gray-800 dark:border-gray-700">
							<th scope="row" className="px-6 py-4 border border-gray-400 font-medium text-gray-900 whitespace-nowrap dark:text-white">
								{u._id}
							</th>
							<th scope="row" className="px-6 py-4 border border-gray-400 font-medium text-gray-900 dark:text-white">
								{u.lenguage.en.name}
							</th>
							<td className="px-6 py-4 border border-gray-400 ">
								{u.state.toString()}
							</td>
							<td className="px-6 py-4 border border-gray-400">
								{u.lenguage.en.descripcion}
							</td>
							<td className="flex flex-col m-2 py-4 gap-4 justify-center">
								<button onClick={() => loadInfoUser(u._id)}
									className="focus:outline-none text-white md:text-center bg-blue-500 hover:bg-blue-700 focus:ring-4  font-medium rounded-lg text-sm px-5 py-1 dark:text-gray-900 dark:bg-gray-400 dark:hover:bg-gray-600">
									Update
								</button>
								<button onClick={(e) => handleDeleteFood(e, u._id)}
									className="focus:outline-none text-white md:text-center bg-red-500 hover:bg-red-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-1 dark:text-gray-900 dark:bg-gray-400 dark:hover:bg-gray-600">
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
            <br></br>
            <br></br>
			{showModal &&
				<div className={showModal ? "fixed top-24 left-1/3 w-3/4" : "hidden"}>
					<div className="relative w-full h-full max-w-md md:h-auto">
						<div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
							<button onClick={() => setShowModal(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
								<svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
								<span className="sr-only">Close modal</span>
							</button>
							<div className="px-6 py-6 lg:px-8">
								<h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Update user information</h3>
								<form onSubmit={handleSubmit} className="space-y-6">
									<div>
										<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
										<input type="text" name="lenguage.en.name" id="lenguage.en.name" value={dishesData.lenguage.en.name} onChange={handleNameEnglish} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Name..." required />
									</div>
									<div>
										<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
										<textarea name="lenguage.en.descripcion" id="lenguage.en.descripcion" defaultValue={dishesData.lenguage.en.descripcion} onChange={ handleDescriptionEnglish} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Description..." required />
									</div>
									<div>
										<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
										<input type="text" name="lenguage.es.name" id="lenguage.es.name" defaultValue={dishesData.lenguage.es.name} onChange={handleNameSpanish} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Nombre..." required />
									</div>									
									<div>
										<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
										<textarea name="lenguage.es.descripcion" id="lenguage.es.descripcion" defaultValue={dishesData.lenguage.es.descripcion} onChange={handleDescriptionSpanish} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Descripción..." required />
									</div>									
									<div>
										<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Imagen/Image</label>
										<input type="url" name="img" id="img" value={dishesData.img} onChange={handleChangeUrl} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="url.com" required />
									</div>									
																	
									<button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update user</button>
								</form>
							</div>
						</div>
					</div>
				</div>
			}

		</div>
	);
}

export default BoardFood

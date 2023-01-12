import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { deleteReview, deleteUser } from '../../../redux/Actions/actions';
import './Review.css';
import Swal from "sweetalert2";

const BoardReview = () => {
	const reviews = useSelector(state => state.reviewsDishes)
  const dispatch = useDispatch()

	

	// const loadInfoUser = async (idUser) => {
		// setShowModal(true)}
		// setUserData(reviews.find(u => u._id === idUser))
	// }

	const deleteAnReview = async (idReview) => {		
		const confirm = await Swal.fire({
			title: "Are you sure",
			text: "Do you want continue with the procces of delete Review?",
			icon: "question",
			showCancelButton: true
		})
		if(confirm.isConfirmed){
			dispatch(deleteReview(idReview))
			new Swal("Review deleted correctly", "", "success")
			window.location.reload()
		}
	}

	return (
		<div className="w-11/12 md:w-9/12 mx-auto shadow-md rounded-lg mt-8">
			<div className="w-full border border-gray-300 mb-4 py-3 text-center rounded-md bg-slate-100">
				<span className="font-bold text-xl">List of all reviews</span>
        
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
							Score
						</th>
						
						<th scope="col" className="px-6 py-3 border border-gray-400 text-center">
							Actions
						</th>
					</tr>
				</thead>
				<tbody>
					{reviews.map((u, i) => (
						<tr key={i} className="bg-white border border-gray-400 dark:bg-gray-800 dark:border-gray-700">
							<th scope="row" className="px-6 py-4 border border-gray-400 font-medium text-gray-900 whitespace-nowrap dark:text-white">
								{u._id}
							</th>
							<th scope="row" className="px-6 py-4 border border-gray-400 font-medium text-gray-900 dark:text-white">
								{u.title}
							</th>
							<td className="px-6 py-4 border border-gray-400 ">
								{u.state.toString()}
							</td>
							<td className="px-6 py-4 border border-gray-400">
								{u.descriptions}
							</td>
							<td className="px-6 py-4 border border-gray-400">
								{u.score} 
							</td>
							<td className="flex flex-col m-2 py-4 gap-4 justify-center">
								<button onClick={() => deleteAnReview(u._id)}
									className="focus:outline-none text-white md:text-center bg-red-500 hover:bg-red-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-1 dark:text-gray-900 dark:bg-gray-400 dark:hover:bg-gray-600">
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default BoardReview

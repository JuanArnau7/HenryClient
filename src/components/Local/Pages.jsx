import React from 'react'
import { useNavigate } from 'react-router-dom';

const Pages = ({ data }) => {
	const navigate = useNavigate()
	const moreDetails = (dish) =>{
		navigate(`/detailDish/${dish._id}`)
	}
	return (
		<div className='flex flex-wrap justify-around'>
			{data.length > 0 && 
				data.map((dish, index) => (
					<div key={index} className="sm:w-11/12 md:w-5/12 lg:w-3/12 border border-gray-200 rounded-lg shadow-md m-3">
						<img className="rounded-t-lg w-full" src={dish.img} alt={dish?.lenguage?.en?.name} />
						<div className="px-4 pt-2 pb-4">
							<h6 className="lowercase first-letter:capitalize">{dish?.lenguage?.en?.name}</h6>
							<h6>$ {dish.price}</h6>
						</div>
						<div className="flex justify-around mb-3">
							<button 
								className="rounded-md bg-green-500 text-white px-3 pb-1 hover:bg-green-600">Add cart</button>
							<button 
								onClick={() => moreDetails(dish)}
								className="rounded-md bg-blue-500 text-white px-3 pb-1 hover:bg-blue-600">Detail</button>
						</div>
					</div>
			))}
		</div>
	)
}

export default Pages
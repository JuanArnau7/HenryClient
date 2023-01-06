import React from 'react';

const Paginator = ({ totalPosts, postPerPage, setCurrentPage, currentPage }) => {
	let pages = []

	for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
		pages.push(i)
	}

	const nextPage = () =>{
		currentPage < pages.length && setCurrentPage(currentPage + 1)
	} 
	const prevPage = () => {
		currentPage > 1 && setCurrentPage(currentPage - 1)
	} 

	return (
		<div className='flex justify-center mb-4 my-5'>
			<button onClick={prevPage} className='shadow-lg text-lg rounded-l-md px-3 hover:text-white hover:bg-red-500 bg-white'>Previous</button>
			{pages.map((page, index) => {
				return <button
					key={index}
					className={page === currentPage 
						? 'text-lg bg-red-500 text-white px-3 shadow-lg' 
						: 'text-lg hover:bg-red-500 hover:text-white px-3 shadow-lg'}
					onClick={() => setCurrentPage(page)}
				>
					{page}
				</button>
			})}
			<button onClick={nextPage} className='shadow-lg text-lg rounded-r-md px-3 hover:text-white hover:bg-red-500'>Next</button>
		</div>
	)
}

export default Paginator;
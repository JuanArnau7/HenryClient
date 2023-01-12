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
			<button onClick={prevPage} className='shadow-lg text-lg rounded-l-md px-3 hover:text-white hover:bg-red-500 bg-white dark:bg-gray-800 dark:text-whit dark:hover:bg-gray-300 dark:hover:text-black'>Previous</button>
			{pages.map((page, index) => {
				return <button
					key={index}
					className={page === currentPage 
						? 'text-lg bg-red-500 text-white px-3 shadow-lg dark:bg-teal-900' 
						: 'text-lg hover:bg-red-500 hover:text-white px-3 shadow-lg dark:hover:bg-gray-800 dark:bg-gray-800'}
					onClick={() => setCurrentPage(page)}
				>
					{page}
				</button>
			})}
			<button onClick={nextPage} className='shadow-lg text-lg rounded-r-md px-3 hover:text-white hover:bg-red-500 bg-white dark:bg-gray-800 dark:hover:bg-gray-300 dark:hover:text-black'>Next</button>
		</div>
	)
}

export default Paginator;
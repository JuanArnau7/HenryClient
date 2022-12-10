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
		<div className='flex justify-center mb-3'>
			<button onClick={nextPage} className='border border-blue-600 rounded-l-lg px-3 hover:bg-blue-500 hover:text-white'>Next ⏩</button>
			{pages.map((page, index) => {
				return <button
					key={index}
					className={page === currentPage 
						? 'bg-blue-500 text-white px-3' 
						: 'border border-blue-600 px-3 hover:bg-blue-300'}
					onClick={() => setCurrentPage(page)}
				>
					{page}
				</button>
			})}
			<button onClick={prevPage} className='border border-blue-600 rounded-r-lg px-3 hover:bg-blue-500 hover:text-white'>⏪ Anterior</button>
		</div>
	)
}

export default Paginator;
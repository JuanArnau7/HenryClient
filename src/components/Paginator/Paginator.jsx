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
			<button onClick={prevPage} className='bg-gray-900 border-gray-200 px-5 hover:bg-blue-500 text-white hover:text-white'>⏪ Preview</button>
			{pages.map((page, index) => {
				return <button
					key={index}
					className={page === currentPage 
						? 'bg-gray-900 border-gray-200 border-l border-r px-5 hover:bg-blue-500 text-white hover:text-white' 
						: 'bg-gray-900 border-gray-200 border-l border-r px-5 hover:bg-blue-500 text-white hover:text-white '}
					onClick={() => setCurrentPage(page)}
				>
					{page}
				</button>
			})}
			<button onClick={nextPage} className='bg-gray-900 border-gray-200 px-5 hover:bg-blue-500 text-white hover:text-white'>Next ⏩</button>
		</div>
	)
}

export default Paginator;
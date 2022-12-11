import React from 'react';

// https://github.com/bradtraversy/simple_react_pagination
const Pagination = ({ postsPerPage, totalPosts, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const prevPage = () => {
		currentPage > 1 && paginate(currentPage - 1)
	} 
  const nextPage = () =>{
		currentPage < pageNumbers.length && paginate(currentPage + 1)
	} 

  return (
    <div className='flex justify-center mb-3'>
      <button onClick={prevPage} className='bg-gray-900 border-gray-200 px-3 hover:bg-blue-500 text-white hover:text-white rounded-l-sm '>Previous</button>
      {pageNumbers.map(number => (
        <button key={`page-${number}`} onClick={() => paginate(number)} className='bg-gray-900 border-gray-200 px-3 hover:bg-blue-500 text-white hover:text-white'>
          {number}</button>
      ))}
      <button onClick={nextPage} className='bg-gray-900 border-gray-200 px-3 hover:bg-blue-500 text-white hover:text-white rounded-r-sm'>Next</button>
    </div>
  );
};

export default Pagination;
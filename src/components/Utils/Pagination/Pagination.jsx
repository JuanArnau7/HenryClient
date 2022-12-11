import React from 'react';

// https://github.com/bradtraversy/simple_react_pagination
const Pagination = ({ postsPerPage, totalPosts, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const prevPage = () => {
		// currentPage > 1 && paginate(currentPage - 1)
    paginate(currentPage - 1)
	} 
  const nextPage = () =>{
		// currentPage < pageNumbers.length && paginate(currentPage + 1)
    paginate(currentPage + 1)
	} 
	

  return (
    <div>
      <button disable={currentPage = 1} onClick={prevPage}>Previous</button>
      {pageNumbers.map(number => (
        <button key={`page-${number}`} onClick={() => paginate(number)}>
          {number}</button>
      ))}
      <button disable={currentPage = pageNumbers.length} onClick={nextPage}>Next</button>
    </div>
  );
};

export default Pagination;
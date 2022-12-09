import React from 'react';

// https://github.com/bradtraversy/simple_react_pagination
const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      {pageNumbers.map(number => (
        <button key={`page-${number}`} onClick={() => paginate(number)}>
          {number}</button>
      ))}
    </div>
  );
};

export default Pagination;
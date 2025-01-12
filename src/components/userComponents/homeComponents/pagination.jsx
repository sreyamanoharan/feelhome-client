import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="pagination ">
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`mx-3 p-2 bg-gray-400 ${number === currentPage ? 'active' : ''}`}
          onClick={() => onPageChange(number)} 
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;

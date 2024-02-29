import React, { useState, useEffect } from 'react';

const Pagination = ({ pageNumber, handlePageClick, totalPages }) => {
  const [number, setNumber] = useState();
  useEffect(() => {
    if (totalPages > 500) {
      setNumber(500);
    } else {
      setNumber(totalPages);
    }
  }, [totalPages]);

  return (
    <div className='bg-red-600 flex flex-row justify-center gap-5'>
      <span onClick={() => handlePageClick(1)}>1</span>
      {Array.from({ length: 5 }, (_, index) => {
        const page = Number(pageNumber) - 2 + index; // Convert to number
        return (
          page > 1 &&
          page <= number - 1 && (
            <>
              <span className="separator">|</span>
              <span
                key={page}
                className={Number(pageNumber) === page ? 'active' : ''}
                onClick={() => handlePageClick(page)}
              >
                {page}
              </span>
            </>
          )
        );
      })}
      <span className="separator">|</span>
      <span onClick={() => handlePageClick(number)}>{number}</span>
    </div>
  );
};

export default Pagination;

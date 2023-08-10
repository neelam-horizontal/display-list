import React from "react";

const TabsPagination = ({
  data,
  currentPage,
  itemsPerPage,
  setCurrentPage,
}) => (
  <>
    {data.length > itemsPerPage && (
      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    )}
  </>
);

export default TabsPagination;

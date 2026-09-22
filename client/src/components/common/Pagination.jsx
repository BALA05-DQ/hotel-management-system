function Pagination({ page, setPage, hasNext }) {
  return (
    <div>
            <button
           disabled={page === 1}
           onClick={() => setPage(page - 1)}
      >
        Previous
      </button>
      <span> Page {page} </span>
         <button
  disabled={!hasNext}
   onClick={() => setPage(page + 1)}
      >
  Next
          </button>
 </div>
);
}
export default Pagination;
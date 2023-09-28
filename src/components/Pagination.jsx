import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Pagination({ page, setPage, data }) {
  const handleNextPage = () => {
    setPage(page + 1);
  };
  const handlePrevPage = () => {
    setPage(page - 1);
  };
  return (
    <div className="flex items-center justify-center">
      {data?.page === 1 ? (
        <></>
      ) : (
        <button
          onClick={handlePrevPage}
          className="flex items-center justify-center mt-7 px-2 py-1 text-sm font-semibold hover:bg-sky-100 border border-slate-300 rounded-md"
        >
          <FontAwesomeIcon className="text-xs mr-2" icon={faChevronLeft} />
          Prev
        </button>
      )}
      <div className=" mx-7 mt-7 px-2 py-1 text-sm font-semibold border border-slate-300 rounded-md">
        {`Page ${data?.page}`}
      </div>
      {page < data?.total_pages ? (
        <button
          onClick={handleNextPage}
          className="flex items-center justify-center mt-7 px-2 py-1 text-sm font-semibold hover:bg-sky-100 border border-slate-300 rounded-md"
        >
          Next
          <FontAwesomeIcon className="text-xs ml-2" icon={faChevronRight} />
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Pagination;

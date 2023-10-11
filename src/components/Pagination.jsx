import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function Pagination({ page, setPage, data }) {
  const [inputPage, setInputPage] = useState(page);
  const handleChange = (e) => {
    const searchValue = e.target.value.trim();
    setInputPage(searchValue);
  };
  const handleNextPage = () => {
    setPage(++page);
  };
  const handlePrevPage = () => {
    setPage(--page);
  };
  const handleChangePage = (e) => {
    e.preventDefault();
    setPage(inputPage);
    setInputPage("");
  };
  return (
    <div className="flex items-center justify-center">
      {data?.page === 1 ? (
        <></>
      ) : (
        <button
          onClick={handlePrevPage}
          className="flex items-center justify-center mt-7 mx-2 px-2 py-1 text-sm font-semibold hover:bg-sky-100 border border-slate-300 rounded-md"
        >
          <FontAwesomeIcon className="text-xs mr-2" icon={faChevronLeft} />
          Prev
        </button>
      )}
      <form className="flex" onSubmit={handleChangePage}>
        <p className="flex items-center justify-center mt-7 mx-2 px-2 py-1 text-sm font-semibold border border-slate-300 rounded-md">{`Page : ${page}`}</p>
        <input
          onChange={handleChange}
          placeholder={`in ${data?.total_pages} page`}
          type="number"
          className="mt-7 mx-2 w-[110px] px-2 py-1 text-sm border border-slate-300 rounded-md"
        />
        <button type="submit"></button>
      </form>
      {/* {`Page ${data?.page}`}
      </input> */}
      {page < data?.total_pages ? (
        <button
          onClick={handleNextPage}
          className="flex items-center justify-center mt-7 mx-2 px-2 py-1 text-sm font-semibold hover:bg-sky-100 border border-slate-300 rounded-md"
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

import { NavLink } from "react-router-dom";

function TableFilter({ type, lists, genres }) {
  const listsTable = lists;
  const genresTable = genres;
  return (
    <div className="">
      <div className=" rounded-md border border-slate-300 shadow shadow-slate-200">
        <h2 className="text-xl uppercase font-semibold px-3 py-2 bg-slate-200 rounded-t-md">
          {`${type} Lists`}
        </h2>
        <div className="flex flex-col bg-gradient-to-r from-sky-50 to-green-50">
          {listsTable.map((item, index) => (
            <NavLink
              key={index}
              to={`/${type}/${item.fetch}`}
              className={({ isActive }) =>
                isActive
                  ? "px-3 py-1 cursor-pointer hover:bg-slate-200 bg-gradient-to-r from-sky-300 to-green-100"
                  : "px-3 py-1 cursor-pointer hover:bg-slate-200"
              }
            >
              {item.title}
            </NavLink>
          ))}
        </div>
      </div>
      <div className=" mt-3 rounded-md border border-slate-300 shadow shadow-slate-200">
        <h2 className="text-xl uppercase font-semibold px-3 py-2 bg-slate-200 rounded-t-md">
          Genres
        </h2>
        <div className="flex flex-col bg-gradient-to-r from-sky-50 to-green-50">
          {genresTable.map((genre, index) => (
            <NavLink
              key={index}
              to={`/${type}/${genre.id}`}
              className={({ isActive }) =>
                isActive
                  ? "px-3 py-1 cursor-pointer hover:bg-slate-200 bg-gradient-to-r from-sky-300 to-green-100"
                  : "px-3 py-1 cursor-pointer hover:bg-slate-200"
              }
            >
              {genre?.name}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TableFilter;

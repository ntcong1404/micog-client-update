import { NavLink } from "react-router-dom";

function TableFilter({ type, lists, genres }) {
  const listsTable = lists;
  const genresTable = genres;
  return (
    <div>
      <div className="rounded-md shadow-[0_2px_4px_2px_rgba(0,0,0,0.1)]">
        <h2 className="text-lg uppercase px-3 py-2 border-b-[1px] border-slate-200 rounded-t-md">
          {`${type} Lists`}
        </h2>
        <div className="flex flex-col ">
          {listsTable?.map((item, index) => (
            <NavLink
              key={index}
              to={`/${type}/${item?.fetch}`}
              className={({ isActive }) =>
                isActive
                  ? "px-3 py-1 cursor-pointer hover:bg-slate-200 bg-slate-200 text-gray-500"
                  : "px-3 py-1 cursor-pointer hover:bg-slate-100 text-gray-500"
              }
            >
              {item.title}
            </NavLink>
          ))}
        </div>
      </div>
      <div className=" mt-6 rounded-md shadow-[0_2px_4px_2px_rgba(0,0,0,0.1)]">
        <h2 className="text-lg uppercase px-3 py-2 border-b-[1px] border-slate-200 rounded-t-md">
          Genres
        </h2>
        <div className="flex flex-col ">
          {genresTable?.map((genre, index) => (
            <NavLink
              key={index}
              to={`/${type}/${genre?.id}`}
              className={({ isActive }) =>
                isActive
                  ? "px-3 py-1 cursor-pointer hover:bg-slate-200 bg-slate-200 text-gray-500"
                  : "px-3 py-1 cursor-pointer hover:bg-slate-100 text-gray-500"
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

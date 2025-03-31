import clsx from "clsx";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const notActive =
  "relative text-black hover:text-[#E51F40] after:content-[''] after:absolute after:left-1 after:bottom-[-3px] after:w-[90%] after:h-[2px] after:bg-[#E51F40] after:scale-x-0 hover:after:scale-x-100 p-2 mx-0.5";

const active =
  "relative text-[#E51F40] after:content-[''] after:absolute after:left-1 after:bottom-[-3px] after:w-[90%] after:h-[2px] after:bg-[#E51F40] after:scale-x-100 p-2 mx-0.5";

const Navigation = () => {
  const { categories } = useSelector((state) => state.app);
  return (
    <div
      className={clsx(
        "text-white font-medium h-10 flex items-center bg-white rounded-md shadow-sm"
      )}
    >
      <div className="w-main mx-auto flex items-center h-full">
        <NavLink
          to={"/"}
          className={({ isActive }) => (isActive ? active : notActive)}
        >
          Trang chủ
        </NavLink>
        {categories?.map((el) => (
          <NavLink
            key={el.id}
            to={el.slug}
            className={({ isActive }) => (isActive ? active : notActive)}
          >
            {el.value}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Navigation;

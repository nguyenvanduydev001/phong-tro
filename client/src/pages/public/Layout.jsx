/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Contact, Header, Introduce, Navigation, Search } from "@/components";
import withBaseTopping from "@/hocs/withBaseTopping";
import path from "@/ultils/path";
import clsx from "clsx";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

const Layout = ({ location }) => {
  const [isFixed, setIsFixed] = useState(false);
  return (
    <div
      onScroll={(e) =>
        e.target.scrollTop > 90 ? setIsFixed(true) : setIsFixed(false)
      }
      className="max-h-screen bg-[#fdf5ed] overflow-y-auto"
    >
      <Header />
      <div className={clsx(isFixed && "fixed z-[10000] top-0 left-0 right-0")}>
        <Navigation />
      </div>
      {!location.pathname.includes(path.DETAIL_POST) && <Search />}
      <div className="mx-auto h-full w-main">
        <Outlet />
      </div>
      <div className="flex flex-col mx-auto w-main gap-4">
        <Introduce />
        <Contact />
      </div>
      <div className="w-full h-[20px]"></div>
    </div>
  );
};

export default withBaseTopping(Layout);

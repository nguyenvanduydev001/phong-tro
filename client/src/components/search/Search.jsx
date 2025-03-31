import React, { useEffect } from "react";
import { Button, Select } from "..";
import { CiSearch } from "react-icons/ci";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import withBaseTopping from "@/hocs/withBaseTopping";
import { modal } from "@/redux/appSlice";
import SearchAddress from "./SearchAddress";
import SearchRange from "./SearchRange";
import path from "@/ultils/path";
import { createSearchParams } from "react-router-dom";
import { GrPowerReset } from "react-icons/gr";
import { BiReset } from "react-icons/bi";

const Search = ({ dispatch, navigate, location }) => {
  const { categories, prices, areas } = useSelector((s) => s.app);
  const { setValue, watch } = useForm();
  const categoryCode = watch("categoryCode");
  const priceRange = watch("priceRange");
  const areaRange = watch("areaRange");
  const address = watch("address");
  useEffect(() => {
    if (location.pathname === "/") reset();
  }, [location.pathname]);
  const reset = () => {
    setValue("categoryCode", "");
    setValue("priceRange", "");
    setValue("areaRange", "");
    setValue("address", "");
    navigate({
      pathname: `/`,
    });
  };

  const handleSearchPost = () => {
    const queries = {};
    if (categoryCode) queries.category = categoryCode.id;
    if (priceRange)
      queries.price = priceRange.value?.filter((el) => el !== null);
    if (areaRange) queries.area = areaRange.value?.filter((el) => el !== null);
    if (address) queries.address = address;
    navigate({
      pathname: `/${path.FILTER}`,
      search: createSearchParams(queries).toString(),
    });
  };
  return (
    <div className="my-4 w-main mx-auto bg-main-yellow p-2 rounded-md gap-2 grid grid-cols-5">
      <div className="col-span-1text-sm">
        <Select
          gap="gap-0"
          options={categories?.map((el) => ({
            ...el,
            name: el.value,
            label: el.value,
            value: el.id,
          }))}
          onChange={(val) => setValue("categoryCode", val)}
          value={categoryCode}
          placeholder="📋 Tất cả"
          className="placeholder:text-xs"
        />
      </div>
      <div
        onClick={() =>
          dispatch(
            modal({
              isShowModal: true,
              modalContent: (
                <SearchAddress getAddress={(val) => setValue("address", val)} />
              ),
            })
          )
        }
        className="col-span-1 p-2 rounded-[0.25rem] line-clamp-1 w-full flex items-center cursor-pointer text-gray-500 bg-white"
      >
        <span className="line-clamp-1">{address || "🚩 Địa chỉ"}</span>
      </div>
      <div
        className="col-span-1 p-2 rounded-[0.25rem] flex items-center cursor-pointer text-gray-500 bg-white"
        onClick={() =>
          dispatch(
            modal({
              isShowModal: true,
              modalContent: (
                <SearchRange
                  unit="triệu/tháng"
                  type="PRICE"
                  targetNumber={15}
                  options={prices}
                  getValue={(val) => setValue("priceRange", val)}
                  valRange={priceRange?.value}
                  exp={6}
                />
              ),
            })
          )
        }
      >
        <span className="line-clamp-1">
          {priceRange?.text || "💲 Giá thuê"}
        </span>
      </div>
      <div
        className="col-span-1 p-2 rounded-[0.25rem] flex items-center cursor-pointer text-gray-500 bg-white"
        onClick={() =>
          dispatch(
            modal({
              isShowModal: true,
              modalContent: (
                <SearchRange
                  unit="m2"
                  type="AREA"
                  targetNumber={90}
                  options={areas}
                  getValue={(val) => setValue("areaRange", val)}
                  valRange={areaRange?.value}
                  typeCode="AREA"
                />
              ),
            })
          )
        }
      >
        <span className="line-clamp-1">
          {areaRange?.text || "🔳 Diện tích"}
        </span>
      </div>
      <div className="col-span-1 h-full flex items-center justify-center gap-2">
        <Button className="flex-auto h-full" onClick={handleSearchPost}>
          <CiSearch size={18} />
          <span>Tìm kiếm</span>
        </Button>
        <Button className="bg-main-red h-full flex-auto" onClick={reset}>
          <BiReset color="white" size={18} />
          <span>Reset</span>
        </Button>
      </div>
    </div>
  );
};

export default withBaseTopping(Search);

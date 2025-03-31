import { FilterBox, List, LocationTop } from "@/components"
import React from "react"
import { useSelector } from "react-redux"

const Filter = ({ id }) => {
  const { categories, prices, areas } = useSelector(state => state.app)
  return (
    <section>
      <div className="my-6 grid grid-cols-10 gap-4">
        <div className="col-span-7">
          <List />
        </div>
        <div className="col-span-3 flex flex-col text-gray-700 gap-4">
          <FilterBox
            title="Danh mục cho thuê"
            data={categories?.map(el => ({ ...el, name: el.value }))}
            className="flex flex-col pl-2"
            id="category"
          />
          <FilterBox
            title="Xem theo giá"
            data={prices?.map(el => ({ ...el, name: el.value }))}
            className="grid grid-cols-2"
            id="price"
            type="MINMAX"
          />
          <FilterBox
            title="Xem theo diện tích"
            data={areas?.map(el => ({ ...el, name: el.value }))}
            className="grid grid-cols-2"
            id="area"
            type="MINMAX"
          />
        </div>
      </div>
    </section>
  )
}

export default Filter

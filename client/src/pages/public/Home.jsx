import { FilterBox, List, LocationTop } from "@/components"
import React from "react"
import { useSelector } from "react-redux"

const Home = () => {
  const { categories, prices, areas } = useSelector((state) => state.app)
  return (
    <section>
      <h1 className="text-3xl font-bold">Kênh thông tin Phòng Trọ số 1 Việt Nam</h1>
      <p className="text-gray-700 text-sm mt-2">
        Kênh thông tin Phòng Trọ số 1 Việt Nam - Website đăng tin cho thuê phòng trọ, nhà nguyên căn, căn hộ, ở ghép
        nhanh, hiệu quả với 100.000+ tin đăng và 2.500.000 lượt xem mỗi tháng.
      </p>
      {/* <LocationTop /> */}
      <div className="my-6 grid grid-cols-10 gap-4">
        <div className="col-span-7">
          <List />
        </div>
        <div className="col-span-3 flex flex-col text-gray-700 gap-4">
          <FilterBox
            title="Danh mục cho thuê"
            data={categories?.map((el) => ({ ...el, name: el.value }))}
            className="flex flex-col pl-2"
            id="category"
          />
          <FilterBox
            title="Xem theo giá"
            data={prices?.map((el) => ({ ...el, name: el.value }))}
            className="grid grid-cols-2"
            id="price"
            type="MINMAX"
          />
          <FilterBox
            title="Xem theo diện tích"
            data={areas?.map((el) => ({ ...el, name: el.value }))}
            className="grid grid-cols-2"
            id="area"
            type="MINMAX"
          />
        </div>
      </div>
    </section>
  )
}

export default Home

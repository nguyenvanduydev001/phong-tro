import { apiGetPosts } from "@/apis/post"
import React, { useEffect, useRef, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Card, Pagination } from ".."
import clsx from "clsx"
import { twMerge } from "tailwind-merge"

const List = ({ category }) => {
  const [searchParams] = useSearchParams()
  const [posts, setPosts] = useState(null)
  const [sort, setSort] = useState("DEFAULT")
  const listRef = useRef()
  const fetchPosts = async (params) => {
    const response = await apiGetPosts(params)
    if (response.success) setPosts(response.posts)
  }
  useEffect(() => {
    const price = searchParams.getAll("price")
    const area = searchParams.getAll("area")
    const params = Object.fromEntries([...searchParams])
    delete params.price
    delete params.area
    if (price.length > 0) params.price = price.filter((el) => el !== "null")
    if (area.length > 0) params.area = area.filter((el) => el !== "null")
    if (sort === "LATEST") params.order = ["createdAt", "DESC"]
    if (category) params.category = category
    params.isPublic = true
    fetchPosts(params)
    // listRef.current.scrollIntoView({ block: 'end' })
  }, [searchParams, sort])
  return (
    <>
      <div ref={listRef} className="p-4 rounded-md drop-shadow-sm bg-white">
        <h1 className="font-semibold text-xl text-gray-800">{`Tổng ${posts?.count || 0} kết quả`}</h1>
        <div className="mt-4 flex items-center gap-3">
          <span>Sắp xếp:</span>
          <span
            onClick={() => setSort("DEFAULT")}
            className={twMerge(
              clsx(
                "p-2 cursor-pointer bg-gray-100 text-gray-600 rounded-md hover:underline",
                sort === "DEFAULT" && "text-black font-medium underline"
              )
            )}
          >
            Mặc định
          </span>
          <span
            onClick={() => setSort("LATEST")}
            className={twMerge(
              clsx(
                "p-2 cursor-pointer bg-gray-100 text-gray-600 rounded-md hover:underline",
                sort === "LATEST" && "text-black font-medium underline"
              )
            )}
          >
            Mới nhất
          </span>
        </div>
        <div className="flex flex-col my-4">
          {posts?.rows?.map((el) => (
            <Card {...el} key={el.id} />
          ))}
        </div>
      </div>
      <div className="w-full flex items-center justify-center my-6">
        <Pagination totalCount={posts?.count || 0} />
      </div>
    </>
  )
}

export default List

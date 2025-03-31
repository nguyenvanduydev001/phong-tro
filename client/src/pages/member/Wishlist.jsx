import { Card, Title } from "@/components"
import React from "react"
import { useSelector } from "react-redux"

const Wishlsit = () => {
  const { current } = useSelector((s) => s.user)
  return (
    <section>
      <Title title="Danh sách yêu thích" />
      <div className="p-4 my-6 grid grid-cols-2 gap-4">
        {current?.wishlistData?.map((el) => (
          <div className="col-span-1" key={el.id}>
            <Card className="border border-gray-100 p-2 rounded-md" {...el.postData} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default Wishlsit

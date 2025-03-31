import React from "react"
import DOMPurify from "dompurify"
import { Button } from ".."
import { formatMoney } from "@/ultils/fn"
import withBaseTopping from "@/hocs/withBaseTopping"
import path from "@/ultils/path"
import { useSelector } from "react-redux"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { apiUpdateWishlist } from "@/apis/post"
import { toast } from "react-toastify"
import { getCurrent } from "@/redux/actions"
import { twMerge } from "tailwind-merge"
import clsx from "clsx"
const Card = ({
  images = [],
  title,
  price,
  area,
  description,
  address,
  author = {},
  navigate,
  id: pid,
  dispatch,
  className,
}) => {
  const { current } = useSelector((s) => s.user)
  const handleUpdateWishlist = async () => {
    const response = await apiUpdateWishlist(pid)
    if (response.success) {
      dispatch(getCurrent())
      toast.success(response.mes)
    } else toast.error(response.mes)
  }
  return (
    <div className={twMerge(clsx("w-full py-4 border-t border-red-500 gap-3 grid grid-cols-10", className))}>
      <div className="col-span-4 relative">
        {current && (
          <span
            onClick={handleUpdateWishlist}
            className="absolute text-main-red p-2 cursor-pointer bg-gray-100 rounded-full top-4 left-4"
          >
            {current?.wishlistData?.some((el) => el.pid === pid) ? (
              <AiFillHeart size={22} />
            ) : (
              <AiOutlineHeart size={22} />
            )}
          </span>
        )}
        <div className="absolute bottom-4 right-4 px-2 rounded-md bg-overlay-70 text-white">{`${images.length} ảnh`}</div>
        <img src={images[0]} alt="avatar" className="w-full h-[220px] object-cover rounded-md" />
      </div>
      <div className="col-span-6">
        <h2
          onClick={() => navigate(`/${path.DETAIL_POST}/${pid}/${title}`)}
          className="text-main-red hover:underline cursor-pointer font-semibold text-lg line-clamp-2 uppercase"
        >
          {title}
        </h2>
        <div className="w-full flex items-center gap-4">
          <span className="col-span-4 text-green-500 text-base font-semibold">
            {formatMoney(price) + " đồng/tháng"}
          </span>
          <span className="col-span-1">
            {area + "m"}
            <sup>2</sup>
          </span>
        </div>
        <span className="col-span-6 line-clamp-2 text-sm">{address}</span>
        <div
          className="my-3 text-sm text-gray-500 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
        />
        <div className="flex items-center flex-wrap gap-2 justify-between mt-4">
          <div className="flex items-center gap-2">
            <img src="/user.svg" alt="user" className="w-6 h-6 object-cover rounded-full border" />
            <span className="font-medium text-sm">{author.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button className="bg-transparent text-main-blue border border-blue-600">
              <img src="/phone.svg" alt="" className="w-4 h-4 object-cover" />
              <span>{author.phone}</span>
            </Button>
            <a target="_blank" href={`https://zalo.me/${author.phone}`}>
              <Button>
                <img src="/zalo.svg" alt="" className="w-4 h-4 object-cover" />
                <span>{author.phone}</span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withBaseTopping(Card)

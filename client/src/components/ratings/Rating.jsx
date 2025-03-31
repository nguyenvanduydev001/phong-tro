import React, { memo } from "react"
import Votebar from "./Votebar"
import { useSelector } from "react-redux"
import Swal from "sweetalert2"
import { Button, ModalVote } from ".."
import withBaseTopping from "@/hocs/withBaseTopping"
import { renderStarFromNumber } from "@/ultils/fn"
import path from "@/ultils/path"
import { modal } from "@/redux/appSlice"

const Rating = ({ name, votes, star = 0, pid, dispatch, navigate }) => {
  const { current } = useSelector((state) => state.user)
  return (
    <div className="relative border rounded-md mt-6 bg-white p-4">
      <h3 className="text-base font-bold">{`Đánh giá & nhận xét ${name}`}</h3>
      <div className="flex border rounded-md mt-8">
        <div className="flex-auto w-2/5 border-r flex flex-col gap-1 items-center justify-center">
          <span className="text-[24px] font-bold">{`${
            votes?.length > 0
              ? Math.round((votes?.reduce((sum, item) => +item.score + sum, 0) * 100) / votes?.length) / 100
              : 0
          }/5`}</span>
          <span className="flex items-center">
            {renderStarFromNumber(star)?.map((item, index) => (
              <span key={index}>{item}</span>
            ))}
          </span>
          <span className="text-base text-gray-600">{`${votes?.length} lượt đánh giá và nhận xét`}</span>
        </div>
        <div className="flex-auto w-3/5 p-[10px]">
          {[...Array(5).keys()].map((item) => (
            <Votebar
              key={item}
              star={5 - item}
              voter={votes?.filter((i) => +i.score === 5 - item)?.length}
              percent={Math.round((votes?.filter((i) => +i.score === 5 - item)?.length * 100) / votes?.length)}
            />
          ))}
        </div>
      </div>
      <div className="w-full flex justify-center items-center text-main-500 gap-2 flex-col mt-4">
        <span>Bạn đánh giá sao sản phẩm này</span>
        <Button
          onClick={() => {
            if (current) {
              dispatch(
                modal({
                  isShowModal: true,
                  modalContent: <ModalVote pid={pid} />,
                })
              )
            } else {
              Swal.fire("Oops!", "Hãy đăng nhập trước nhé~", "info").then(() => {
                navigate(path.LOGIN)
              })
            }
          }}
        >
          Đánh giá ngay
        </Button>
      </div>
      {votes?.map((item) => (
        <div key={item.id} className="flex gap-2 flex-col mt-4">
          <div className="flex gap-2">
            <span className="font-bold">{item?.userData?.name}</span>
          </div>
          <div className="ml-[28px] p-4 gap-2 flex flex-col bg-gray-100 rounded-md text-sm">
            <span className="font-semibold flex gap-2">
              <span>Đánh giá: </span>
              <span className="flex items-center">
                {renderStarFromNumber(item.score)?.map((item, index) => (
                  <span key={index}>{item}</span>
                ))}
              </span>
            </span>
            <span className="font-semibold flex gap-2">
              <span>Nhận xét:</span>
              <span>{item.content || "Chưa có nhận xét"}</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default withBaseTopping(memo(Rating))

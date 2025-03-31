import moment from "moment"
import React, { useEffect, useState } from "react"
import "moment/locale/vi"
import { twMerge } from "tailwind-merge"
import clsx from "clsx"
import { ImReply } from "react-icons/im"
import { TypeBox } from ".."

const Comment = ({ commentator, content, createdAt, handleReplies, id, replies, parents = [], parentCommentId }) => {
  // id - id của comment hiện tại
  // parentCommentId - id của parent cấp đầu
  const [isShowMore, setIsShowMore] = useState(false)
  const [finalParents, setFinalParents] = useState([])
  useEffect(() => {
    if (!isShowMore) setFinalParents(() => parents.filter((_, idx) => idx < 1))
    else setFinalParents(parents)
  }, [isShowMore])
  return (
    <div className="flex gap-3">
      <img
        src={commentator?.avatar || "/user.svg"}
        alt="user"
        className="w-12 h-12 flex-none object-cover border rounded-full"
      />
      <div className="col-span-11 flex flex-col gap-2 relative flex-auto">
        <div className="w-full bg-gray-100 px-4 py-3 rounded-md relative">
          <span
            onClick={() => handleReplies(id)}
            title="Trả lời"
            className="text-main-blue absolute cursor-pointer hover:text-main-red bottom-3 right-3"
          >
            <ImReply size={22} />
          </span>
          <span className="flex items-center mb-2 justify-between">
            <span className="text-main-blue font-medium">
              {commentator?.name}{" "}
              <span
                className={twMerge(
                  clsx(
                    "text-xs p-[2px] border font-normal",
                    commentator?.role === "1010" && "border-main-pink text-main-pink",
                    commentator?.role === "102" && "border-green-500 text-green-500"
                  )
                )}
              >
                {commentator?.roleData?.value}
              </span>
            </span>
            <span className="font-normal text-xs italic text-gray-500">{moment(createdAt).fromNow()}</span>
          </span>
          <p>{content}</p>
        </div>
        {replies.some((el) => el === id) && (
          <div className="w-full">
            <TypeBox parentComment={id} parentCommentId={parentCommentId} handleReplies={handleReplies} />
          </div>
        )}
        {finalParents?.length > 0 && (
          <div className="flex flex-col gap-2">
            {finalParents?.map((el) => (
              <Comment
                parentCommentId={parentCommentId}
                handleReplies={handleReplies}
                replies={replies}
                key={el.id}
                {...el}
              />
            ))}
            {parents?.length > 1 && (
              <span
                onClick={() => setIsShowMore(!isShowMore)}
                className="text-sm text-main-blue cursor-pointer hover:underline"
              >
                Xem thêm / Ẩn bớt
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Comment

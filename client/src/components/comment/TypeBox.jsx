import { apiCreateNewComment } from "@/apis/comment"
import withBaseTopping from "@/hocs/withBaseTopping"
import { render } from "@/redux/commentSlice"
import React, { useRef, useState } from "react"
import { AiOutlineSend } from "react-icons/ai"
import { useParams } from "react-router-dom"

const TypeBox = ({ parentCommentId, parentComment, dispatch, handleReplies }) => {
  const { pid } = useParams()
  const typeBoxRef = useRef()
  const handleSendComment = async () => {
    const response = await apiCreateNewComment({
      pid,
      content: typeBoxRef.current?.innerText,
      parentComment: parentCommentId,
    })
    if (response.success) {
      typeBoxRef.current.innerText = ""
      dispatch(render())
      if (handleReplies) handleReplies(parentComment)
    }
  }
  return (
    <div className="grid grid-cols-12 mb-6 rounded-md">
      <div
        data-text="Để lại bình luận của bạn ở đây..."
        contentEditable
        className="col-span-11 outline-none p-4 bg-gray-100 rounded-md"
        ref={typeBoxRef}
      />
      <div className="col-span-1 flex justify-center">
        <button
          type="button"
          title="Gửi"
          className="w-12 h-12 text-main-blue border-main-blue rounded-full border flex items-center justify-center"
          onClick={() => handleSendComment()}
        >
          <AiOutlineSend />
        </button>
      </div>
    </div>
  )
}

export default withBaseTopping(TypeBox)

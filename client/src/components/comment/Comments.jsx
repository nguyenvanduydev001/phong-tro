import React, { Fragment, useEffect, useState } from "react"
import { apiGetComments } from "@/apis/comment"
import { useParams } from "react-router-dom"
import Comment from "./Comment"
import { useSelector } from "react-redux"

const Comments = () => {
  const { pid } = useParams()
  const [comments, setComments] = useState([])
  const { updateComments } = useSelector((s) => s.comment)
  const [replies, setReplies] = useState([])
  const fetchComments = async () => {
    const response = await apiGetComments(pid)
    if (response.success) setComments(response.comments)
  }
  useEffect(() => {
    fetchComments()
  }, [pid, updateComments])
  const handleReplies = (commentId) => {
    if (replies.some((el) => el === commentId)) setReplies((prev) => prev.filter((el) => el !== commentId))
    else setReplies((prev) => [...prev, commentId])
  }
  return (
    <div className="flex flex-col gap-4">
      {comments?.map((el, _, self) => (
        <Fragment key={el.id}>
          {!el.parentComment && (
            <Comment
              parents={self.filter((cmt) => cmt.parentComment === el.id)}
              handleReplies={() => handleReplies()}
              replies={replies}
              {...el}
              parentCommentId={el.id}
            />
          )}
        </Fragment>
      ))}
    </div>
  )
}

export default Comments

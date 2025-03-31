import { apiGetExpireds, apiRemoveExpired, apiUpdateExpired } from "@/apis/post"
import { Pagination, Select, Title } from "@/components"
import withBaseTopping from "@/hocs/withBaseTopping"
import useDebounce from "@/hooks/useDebounce"
import { formatMoney } from "@/ultils/fn"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"
import { useSelector } from "react-redux"
import { useSearchParams } from "react-router-dom"
import { toast } from "react-toastify"
import Swal from "sweetalert2"

const optionals = [
  {
    name: "Pending",
    value: "Pending",
    label: "Pending",
  },
  {
    name: "Accepted",
    value: "Accepted",
    label: "Accepted",
  },
  {
    name: "Cancelled",
    value: "Cancelled",
    label: "Cancelled",
  },
]

const ManageExpired = () => {
  const { setValue, watch } = useForm()
  const keyword = watch("keyword")
  const status = watch("status")
  const [searchParams] = useSearchParams()
  const [expireds, setExpireds] = useState(null)
  const [update, setUpdate] = useState(false)
  const [isEditStatus, setIsEditStatus] = useState(false)
  const fetchExpireds = async (params) => {
    const response = await apiGetExpireds(params)
    if (response.success) setExpireds(response.expireds)
  }
  const debounceValue = useDebounce(keyword, 500)
  useEffect(() => {
    const params = Object.fromEntries([...searchParams])
    params.limit = import.meta.env.VITE_LIMIT
    if (debounceValue) params.keyword = debounceValue
    fetchExpireds(params)
  }, [searchParams, update, debounceValue])
  const render = () => {
    setUpdate(!update)
  }
  const handleUpdateExpired = async ({ id, pid, days }) => {
    const response = await apiUpdateExpired({ status: status.value, pid, days }, id)
    if (response.success) {
      setIsEditStatus(false)
      toast.success(response.mes)
      render()
    } else toast.error(response.mes)
  }
  const handleDeleteExpired = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Xác nhận thao tác",
      text: "Bạn có chắc muốn xóa?",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Quay lại",
    }).then(async (rs) => {
      if (rs.isConfirmed) {
        const response = await apiRemoveExpired(id)
        if (response.success) {
          toast.success(response.mes)
          render()
        } else toast.error(response.mes)
      }
    })
  }

  return (
    <section className="mb-[200px]">
      <Title title="Quản lý gia hạn tin đăng"></Title>
      <div className="p-4">
        <div className="flex items-center justify-end">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setValue("keyword", e.target.value)}
            className="max-w-[500px] w-full outline-none border p-2 placeholder:text-sm"
            placeholder="Tìm kiếm tên chủ cho thuê..."
          />
        </div>
        <div className="mt-6 w-full">
          <table className="table-auto w-full">
            <thead>
              <tr className="border bg-main-blue text-white">
                <th className="p-2 font-medium text-center">Bài đăng</th>
                <th className="p-2 font-medium text-center">Người cho thuê</th>
                <th className="p-2 font-medium text-center">Số ngày gia hạn</th>
                <th className="p-2 font-medium text-center">Tiền thanh toán</th>
                <th className="p-2 font-medium text-center">Trạng thái</th>
                <th className="p-2 font-medium text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {expireds?.rows?.map((el) => (
                <tr className="border" key={el.id}>
                  <td className="p-2 text-center">{el.requestPost?.title}</td>
                  <td className="p-2 text-center">{el.requestUser?.name}</td>
                  <td className="p-2 text-center">{el.days}</td>
                  <td className="p-2 text-center">{formatMoney(el.price) + "đ"}</td>
                  <td className="p-2 text-center">
                    {isEditStatus === el.id ? (
                      <Select
                        value={status}
                        onChange={(val) => setValue("status", val)}
                        options={optionals}
                        className="py-0"
                      />
                    ) : (
                      <span>{el.status}</span>
                    )}
                  </td>
                  <td className="p-2">
                    <span className="flex items-center justify-center gap-3">
                      {isEditStatus === el.id ? (
                        <span
                          title="Sửa trạng thái"
                          className="text-sm text-main-blue cursor-pointer"
                          onClick={() => handleUpdateExpired(el)}
                        >
                          Update
                        </span>
                      ) : (
                        <span
                          title="Sửa trạng thái"
                          className="text-xl text-main-blue cursor-pointer"
                          onClick={() => {
                            setValue("status", {
                              code: el.status,
                              name: el.status,
                              label: el.status,
                            })
                            setIsEditStatus(el.id)
                          }}
                        >
                          <AiOutlineEdit />
                        </span>
                      )}
                      <span
                        onClick={() => handleDeleteExpired(el.id)}
                        title="Xóa"
                        className="text-xl text-main-blue cursor-pointer"
                      >
                        <AiOutlineDelete />
                      </span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6">
          <Pagination totalCount={expireds?.count} />
        </div>
      </div>
    </section>
  )
}

export default withBaseTopping(ManageExpired)

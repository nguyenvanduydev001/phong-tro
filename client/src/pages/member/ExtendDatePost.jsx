import { apiCreateRequestExpired } from "@/apis/post"
import { Button, Payment } from "@/components"
import withBaseTopping from "@/hocs/withBaseTopping"
import { modal } from "@/redux/appSlice"
import { formatMoney } from "@/ultils/fn"
import React, { useState } from "react"
import { toast } from "react-toastify"
import Swal from "sweetalert2"

const ExtendDatePost = ({ title, id, dispatch }) => {
  const [days, setDays] = useState(0)
  const handleSubmit = async (flag) => {
    if (!days) return alert("Hãy điền số ngày cần gia hạn")
    const payload = {
      pid: id,
      price: import.meta.env.VITE_PRICE_EXTEND * days,
      days,
    }
    if (flag === "OFF") {
      const response = await apiCreateRequestExpired(payload)
      if (response.success) {
        Swal.fire({
          title: "Xong!",
          icon: "success",
          text: response.mes,
          showConfirmButton: true,
          confirmButtonText: "Liên hệ Admin",
        }).then((rs) => {
          if (rs.isConfirmed) {
            dispatch(modal({ isShowModal: false, modalContent: null }))
            window.open(`https://zalo.me/${import.meta.env.VITE_PHONE_ADMIN}`, "_blank")
          }
        })
      } else toast.error(response.mes)
    }
    if (flag === "ON") {
      dispatch(modal({ isShowModal: true, modalContent: <Payment payload={payload} /> }))
    }
  }

  return (
    <div onClick={(e) => e.stopPropagation()} className="max-w-[550px] w-full bg-white p-4 rounded-md">
      <h1 className="text-xl font-bold pb-4 border-b">
        Gia hạn tin đăng <span className="text-main-blue">#{id}</span>
      </h1>
      <div className="py-4 text-sm">
        <p className="text-sm border-orange-500 text-orange-500 p-2 rounded-md border text-center">
          Phí gia hạn cho 1 bài đăng 1 ngày là <span>{import.meta.env.VITE_PRICE_EXTEND}</span>đ. Vui lòng nhập số ngày
          muốn gia hạn, sau đó chọn phương thức gia hạn bên dưới. Xin cảm ơn!
        </p>
        <span className="flex items-center mt-4 gap-4">
          <span className="font-semibold">Tin đăng:</span>
          <span className="text-main-blue">{title}</span>
        </span>
        <span className="grid grid-cols-10 mt-4 gap-4">
          <span className="font-semibold col-span-3 flex items-center">Số ngày gia hạn:</span>
          <input
            type="number"
            onChange={(e) => setDays(e.target.value)}
            id="days"
            className="px-4 py-2 border col-span-4 outline-none rounded-md"
            value={days}
          />
          <span className="col-span-3 flex justify-center items-center">{`${formatMoney(
            days * +import.meta.env.VITE_PRICE_EXTEND || 0
          )}đ`}</span>
        </span>
        <span className="flex flex-col mt-4 gap-4">
          <span className="font-semibold">Chọn cách thức gia hạn:</span>
          <span className="text-main-blue grid grid-cols-2 gap-4">
            <Button onClick={() => handleSubmit("OFF")} className="col-span-1">
              <span className="flex flex-col">
                <span>Thanh toán Offline cho Admin</span>
                <span className="text-white font-light text-xs inline-block">(Liên hệ trao đổi với admin)</span>
              </span>
            </Button>
            <Button onClick={() => handleSubmit("ON")} className="col-span-1">
              <span className="flex flex-col">
                <span>Thanh toán Online</span>
                <span className="text-white font-light text-xs inline-block">(Thanh toán PAYPAL)</span>
              </span>
            </Button>
          </span>
        </span>
      </div>
    </div>
  )
}

export default withBaseTopping(ExtendDatePost)

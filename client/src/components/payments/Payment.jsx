import React from "react"
import { Title } from ".."
import Paypal from "./Paypal"

const Payment = ({ payload }) => {
  return (
    <div className="bg-white w-[500px] py-4 rounded-md">
      <h3 className="px-4 text-2xl font-bold pb-4 border-b text-main-blue">Thanh toán gia hạn online</h3>
      <div className="p-4 flex flex-col gap-2">
        <span>
          Số ngày gia hạn: <span>{payload?.days}</span> ngày
        </span>
        <span>
          Số tiền thanh toán: <span>{payload?.price}</span> VNĐ
        </span>
        <div className="w-full bg-gray-100 rounded-md mt-8">
          <Paypal amount={payload.price} payload={payload} />
        </div>
      </div>
    </div>
  )
}

export default Payment

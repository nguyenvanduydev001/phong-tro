import React, { useState } from "react"
import { BsFillShieldLockFill } from "react-icons/bs"
import { CgSpinner } from "react-icons/cg"
import OtpInput from "react-otp-input"
import { apiRegister, apiVerifyOtp } from "@/apis/user"
import Swal from "sweetalert2"
import { toast } from "react-toastify"
import withBaseTopping from "@/hocs/withBaseTopping"
import { modal } from "@/redux/appSlice"
const OtpVerify = ({
  loading,
  setLoading,
  setShowOtp,
  setVariant,
  payload,
  setIsPermit,
  dispatch,
  phone,
}) => {
  const [otp, setOtp] = useState("")

  const onOTPVerify = async () => {
    setLoading(true)
    const response = await apiVerifyOtp({ phone, code: otp })
    setLoading(false)
    if (response.success) {
      setShowOtp(false)
      if (setIsPermit) {
        setIsPermit(true)
        dispatch(modal({ isShowModal: false, modalContent: null }))
        toast.success("Xác minh thành công!")
      } else {
        const response = await apiRegister(payload)
        if (response.success) Swal.fire("Thành công", response.mes, "success").then(() => setVariant("LOGIN"))
        else Swal.fire("Oops!", response.mes, "error")
      }
    } else toast.error(response.msg)
  }

  return (
    <div onClick={(e) => e.stopPropagation()} className="bg-white min-w-[500px] p-8 rounded-md">
      <div className="bg-gray-100 border text-main-blue w-fit mx-auto p-4 rounded-full">
        <BsFillShieldLockFill size={30} />
      </div>
      <label htmlFor="otp" className="font-bold w-full text-xl flex justify-center">
        Enter your OTP
      </label>
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderSeparator={false}
        renderInput={(props) => <input {...props} />}
        inputStyle="py-4 w-24 opt-input inline-block border outline-none"
        containerStyle="w-full flex justify-center my-6"
      />
      <button
        onClick={onOTPVerify}
        className="bg-main-blue w-fit px-6 font-bold mx-auto flex gap-1 items-center justify-center py-2.5 text-white rounded"
      >
        {loading && <CgSpinner size={20} className="mt-1 animate-spin" />}
        <span>Verify OTP</span>
      </button>
    </div>
  )
}

export default withBaseTopping(OtpVerify)

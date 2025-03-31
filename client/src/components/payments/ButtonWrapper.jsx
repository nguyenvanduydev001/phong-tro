import { apiCreateRequestExpired } from "@/apis/post"
import withBaseTopping from "@/hocs/withBaseTopping"
import { modal, setPaymentStatus } from "@/redux/appSlice"
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { useEffect } from "react"
import { toast } from "react-toastify"
import Swal from "sweetalert2"

const style = { layout: "vertical" }

const ButtonWrapper = ({ currency, showSpinner, amount, payload, dispatch: reduxDispatch }) => {
  const [{ isPending, options }, dispatch] = usePayPalScriptReducer()
  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    })
  }, [currency, showSpinner])

  const handleSaveExpired = async () => {
    const response = await apiCreateRequestExpired({ ...payload, status: "Accepted" })
    if (response.success) {
      reduxDispatch(setPaymentStatus(true))
      reduxDispatch(modal({ isShowModal: false, modalContent: null }))
      toast.success("Thanh toán gia hạn thành công.")
    } else toast.error(response.mes)
  }

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[style, currency, amount]}
        fundingSource={undefined}
        createOrder={(data, actions) =>
          actions.order
            .create({
              purchase_units: [{ amount: { currency_code: currency, value: amount } }],
            })
            .then((orderId) => orderId)
        }
        onApprove={(data, actions) =>
          actions.order.capture().then(async (response) => {
            if (response.status === "COMPLETED") {
              handleSaveExpired()
            } else toast.info("Thanh toán không thành công, hãy thử lại sau.")
          })
        }
      />
    </>
  )
}

export default withBaseTopping(ButtonWrapper)

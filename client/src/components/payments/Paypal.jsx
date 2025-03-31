import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import React from "react"
import ButtonWrapper from "./ButtonWrapper"

const Paypal = ({ amount, payload }) => {
  return (
    <div className="w-full">
      <PayPalScriptProvider options={{ clientId: "test", components: "buttons", currency: "USD" }}>
        <ButtonWrapper payload={payload} currency={"USD"} amount={Math.round(amount / 23500)} showSpinner={false} />
      </PayPalScriptProvider>
    </div>
  )
}

export default Paypal

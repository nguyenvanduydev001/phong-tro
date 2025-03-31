import React from "react"
import { useDispatch } from "react-redux"
import { useNavigate, useLocation } from "react-router-dom"

const withBaseTopping = (Component) => (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  return <Component {...props} location={location} dispatch={dispatch} navigate={navigate} />
}
// Higher Order Component
export default withBaseTopping

import withBaseTopping from "@/hocs/withBaseTopping"
import { convertNumberTargetToPercentage, convertPercentageToNumberTarget } from "@/ultils/fn"
import React, { useEffect, useState } from "react"
import RangeSlider from "react-range-slider-input"
import "react-range-slider-input/dist/style.css"
import { Button } from ".."
import { modal } from "@/redux/appSlice"

const SearchRange = ({
  type,
  targetNumber,
  options = [],
  unit,
  getValue,
  valRange = [0, 100],
  exp = 0,
  typeCode,
  dispatch,
}) => {
  const [value, setValue] = useState(() => valRange)
  const [defaultRange, setDefaultRange] = useState()
  const [percentage, setPercentage] = useState([])
  useEffect(() => {}, [percentage])
  return (
    <div onClick={(e) => e.stopPropagation()} className="w-full max-w-[650px] bg-white rounded-md p-4">
      <h1 className="text-lg font-bold tracking-tight pb-4 border-b">{`Tìm kiếm theo ${
        type === "PRICE" ? "Giá thuê" : type === "AREA" ? "Diện tích" : ""
      }`}</h1>
      <div className="my-6 flex flex-col gap-4">
        <div className="pb-4 text-center text-lg font-bold text-main-blue">
          {value[0] >= 100 && value[1] >= 100
            ? `Trên ${convertPercentageToNumberTarget(value[0], targetNumber, typeCode)} ${unit}`
            : defaultRange
            ? `Từ ${defaultRange[0] / Math.pow(10, exp)} - ${Math.round(defaultRange[1] / Math.pow(10, exp))} ${unit}`
            : `Từ ${convertPercentageToNumberTarget(
                value[0],
                targetNumber,
                typeCode
              )} - ${convertPercentageToNumberTarget(value[1], targetNumber, typeCode)} ${unit}`}
        </div>
        <div className="grid grid-cols-10 gap-3">
          <span className="col-span-1 text-lg font-bold flex relative -top-3 items-center justify-end text-main-blue">
            0
          </span>
          <div className="col-span-8 -mb-3">
            <RangeSlider value={value} onInput={setValue} onThumbDragEnd={() => setDefaultRange(null)} />
          </div>
          <span className="col-span-1 text-lg flex relative -top-3 items-center font-bold text-main-blue">
            {targetNumber}
          </span>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold">Chọn nhanh:</h3>
        <div className="mt-3 grid grid-cols-4 gap-3">
          {options.map((el) => (
            <span
              className="col-span-1 cursor-pointer p-2 flex items-center justify-center rounded-md bg-gray-100 hover:border-main-blue"
              key={el.id}
              onClick={() => {
                setValue([
                  convertNumberTargetToPercentage(el.min, targetNumber * Math.pow(10, exp)),
                  convertNumberTargetToPercentage(el.max, targetNumber * Math.pow(10, exp)),
                ])
                setDefaultRange([el.min, el.max])
              }}
            >
              {el.value}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <Button
          onClick={() => {
            dispatch(modal({ isShowModal: false, modalContent: null }))
            getValue({
              value: defaultRange || [
                convertPercentageToNumberTarget(value[0], targetNumber * Math.pow(10, exp), typeCode),
                convertPercentageToNumberTarget(value[1], targetNumber * Math.pow(10, exp), typeCode),
              ],
              text:
                value[0] >= 100 && value[1] >= 100
                  ? `Trên ${convertPercentageToNumberTarget(value[0], targetNumber, typeCode, 0)} ${unit}`
                  : defaultRange
                  ? `Từ ${defaultRange[0] / Math.pow(10, exp)} - ${Math.round(
                      defaultRange[1] / Math.pow(10, exp)
                    )} ${unit}`
                  : `Từ ${convertPercentageToNumberTarget(
                      value[0],
                      targetNumber,
                      typeCode
                    )} - ${convertPercentageToNumberTarget(value[1], targetNumber, typeCode, 0)} ${unit}`,
            })
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  )
}

export default withBaseTopping(SearchRange)

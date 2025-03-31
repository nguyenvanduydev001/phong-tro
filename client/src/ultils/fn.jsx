import { AiFillStar, AiOutlineStar } from "react-icons/ai"

export const generateRange = (start, end) => {
  const length = end + 1 - start
  return Array.from({ length }, (_, index) => start + index)
}

export const formatMoney = (number) => {
  if (!Number(number)) return 0
  return Number(+number?.toFixed())?.toLocaleString()
}
export const customMoney = (number) => {
  if (typeof number !== "number") return
  const unit = number >= 1000000 ? "triệu/tháng" : "đồng/tháng"
  let output = number
  if (number >= 1000000) output = Math.round(number / 100000) / 10
  return formatMoney(output) + " " + unit
}
export const renderStarFromNumber = (number = 0, size = 16) => {
  if (!Number(number)) return
  const stars = []
  number = Math.round(number)
  for (let i = 0; i < +number; i++) stars.push(<AiFillStar color="orange" size={size} />)
  for (let i = 5; i > +number; i--) stars.push(<AiOutlineStar color="orange" size={size} />)
  return stars
}
export const convertPercentageToNumberTarget = (percentage, targetNumber) => {
  const num = Math.round((percentage * targetNumber) / 10)
  return (Math.ceil(num / 5) * 5) / 10
}
export const convertNumberTargetToPercentage = (number, targetNumber) => {
  if (number === null) return 100
  return Math.round((number * 100) / targetNumber)
}
export function getDaysInMonth(customTime, number) {
  const endDay = new Date(customTime)?.getDate() || new Date().getDate()
  const days = number || 15
  const endPreviousMonth = new Date(new Date(customTime)?.getFullYear(), new Date(customTime)?.getMonth(), 0).getDate()
  let day = 1
  let prevDayStart = 1
  const daysInMonths = []
  while (prevDayStart <= +endPreviousMonth) {
    const month = new Date().getMonth()
    const year = new Date().getFullYear() % 1000
    daysInMonths.push(
      `${prevDayStart < 10 ? "0" + prevDayStart : prevDayStart}-${month < 10 ? `0${month}` : month}-${year}`
    )
    prevDayStart += 1
  }
  while (day <= +endDay) {
    const month = new Date().getMonth() + 1
    const year = new Date().getFullYear() % 1000
    daysInMonths.push(`${day < 10 ? "0" + day : day}-${month < 10 ? `0${month}` : month}-${year}`)
    day += 1
  }
  return daysInMonths.filter((el, index, self) => index > self.length - days - 2)
}
export function getMonthInYear(customTime, number) {
  const endMonth = new Date(customTime?.to).getMonth() + 1 || new Date().getMonth() + 1
  let month = 1
  const months = number || 8
  let startLastYear = 1
  const daysInMonths = []
  while (startLastYear <= 12) {
    const year = new Date().getFullYear() % 1000
    daysInMonths.push(`${startLastYear < 10 ? `0${startLastYear}` : startLastYear}-${year - 1}`)
    startLastYear += 1
  }
  while (month <= +endMonth) {
    const year = new Date().getFullYear() % 1000
    daysInMonths.push(`${month < 10 ? `0${month}` : month}-${year}`)
    month += 1
  }
  return daysInMonths.filter((el, index, self) => index > self.length - months - 2)
}
export const getDaysInRange = (start, end) => {
  const startDateTime = new Date(start).getTime()
  const endDateTime = new Date(end).getTime()
  return (endDateTime - startDateTime) / (24 * 60 * 60 * 1000)
}
export const getMonthsInRange = (start, end) => {
  let months
  const d1 = new Date(start)
  const d2 = new Date(end)
  months = (d2.getFullYear() - d1.getFullYear()) * 12
  months -= d1.getMonth()
  months += d2.getMonth()
  return months <= 0 ? 0 : months
}

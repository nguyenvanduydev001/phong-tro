import { apiGetDashboard } from "@/apis/app"
import { Chart, Title } from "@/components"
import { formatMoney } from "@/ultils/fn"
import React, { useEffect, useState } from "react"
import { AiOutlineUserAdd } from "react-icons/ai"
import { GrView } from "react-icons/gr"
import { MdOutlinePostAdd } from "react-icons/md"
import { TfiMoney } from "react-icons/tfi"
import { TbCurrencyDong } from "react-icons/tb"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"
ChartJS.register(ArcElement, Tooltip, Legend)
const Dashboard = () => {
  const [data, setData] = useState(null)
  const [isMonth, setIsMonth] = useState(false)
  const [customTime, setCustomTime] = useState({
    from: "",
    to: "",
  })
  const fetchDashboard = async (params) => {
    const response = await apiGetDashboard(params)
    if (response.success) setData(response.data)
  }
  useEffect(() => {
    const type = isMonth ? "month" : "day"
    const params = { type }
    if (customTime.from) params.from = customTime.from
    if (customTime.to) params.to = customTime.to
    fetchDashboard(params)
  }, [isMonth, customTime])
  const handleCustomTime = () => {
    setCustomTime({ from: "", to: "" })
  }
  const pieData = {
    labels: ["Người chưa đăng ký", "Người đã đăng ký"],
    datasets: [
      {
        label: "Lượt truy cập",
        data: [data?.anonymous, data?.registed],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  }
  return (
    <section className="mb-[200px]">
      <Title title="Thống kê"></Title>
      <div className="bg-gray-100 py-4">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-1 bg-white p-4 border rounded-md flex items-center justify-between gap-4">
            <span className="text-3xl font-bold text-main-blue">{data?.createdUser}</span>
            <span className="flex flex-col gap-2 items-end">
              <span>
                <AiOutlineUserAdd size={20} />
              </span>
              <span>Thành viên mới</span>
            </span>
          </div>
          <div className="col-span-1 bg-white p-4 border rounded-md flex items-center justify-between gap-4">
            <span className="text-3xl font-bold text-main-blue">{formatMoney(+data?.expiredTotal)}</span>
            <span className="flex flex-col gap-2 items-end">
              <span>
                <TbCurrencyDong size={20} />
              </span>
              <span>Thu nhập</span>
            </span>
          </div>
          <div className="col-span-1 bg-white p-4 border rounded-md flex items-center justify-between gap-4">
            <span className="text-3xl font-bold text-main-blue">
              {data?.posts?.reduce((sum, el) => sum + el.createdPost, 0)}
            </span>
            <span className="flex flex-col gap-2 items-end">
              <span>
                <MdOutlinePostAdd size={24} />
              </span>
              <span>Bài đăng mới</span>
            </span>
          </div>
          <div className="col-span-1 bg-white p-4 border rounded-md flex items-center justify-between gap-4">
            <span className="text-3xl font-bold text-main-blue">{data?.anonymous + data?.registed}</span>
            <span className="flex flex-col gap-2 items-end">
              <span>
                <GrView size={20} />
              </span>
              <span>Lượt truy cập</span>
            </span>
          </div>
        </div>
      </div>
      <div className="mt-6 px-4 grid grid-cols-10 gap-4">
        <div className="col-span-7 min-h-[500px] border flex flex-col gap-4 relative rounded-md flex-auto p-4">
          <div className="flex items-center justify-between">
            <span className="font-bold flex items-center gap-8">
              <span>{`Số tin đăng mới thống kê theo ${isMonth ? "tháng" : "ngày"}`}</span>
              <div className="flex items-center font-thin gap-8">
                <span className="flex items-center gap-2">
                  <label htmlFor="from">Từ</label>
                  <input
                    type="date"
                    value={customTime.from}
                    onChange={(e) => setCustomTime((prev) => ({ ...prev, from: e.target.value }))}
                    id="from"
                  />
                </span>
                <span className="flex items-center gap-2">
                  <label htmlFor="from">Đến</label>
                  <input
                    type="date"
                    value={customTime.to}
                    onChange={(e) => setCustomTime((prev) => ({ ...prev, to: e.target.value }))}
                    id="to"
                  />
                </span>
                <button
                  type="button"
                  className={`px-4 py-2 rounded-md border-blue-500 text-blue-500 border`}
                  onClick={handleCustomTime}
                >
                  Default
                </button>
              </div>
            </span>
            <span className="flex items-center">
              <button
                type="button"
                className={`px-4 py-2 rounded-md border hover:border-main-blue ${
                  isMonth ? "" : "text-white font-semibold bg-main-blue"
                }`}
                onClick={() => setIsMonth(false)}
              >
                Ngày
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-md border hover:border-main-blue ${
                  isMonth ? "text-white font-semibold bg-main-blue" : ""
                }`}
                onClick={() => setIsMonth(true)}
              >
                Tháng
              </button>
            </span>
          </div>
          {data?.posts && <Chart customTime={customTime} isMonth={isMonth} data={data?.posts} />}
        </div>
        <div className="col-span-3 rounded-md border p-4">
          <span className="font-bold gap-8">Số người truy cập chưa đăng ký và đã đăng ký</span>
          <div>
            <Pie data={pieData} />;
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard

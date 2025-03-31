import { Button, InputFile, InputForm, Map, Select, TextField, Title } from "@/components"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import withBaseTopping from "@/hocs/withBaseTopping"
import { useSelector } from "react-redux"
import { targets } from "@/ultils/constant"
import clsx from "clsx"
import useDebounce from "@/hooks/useDebounce"
import { apiCreateNewPost } from "@/apis/post"
import { toast } from "react-toastify"
import { apiGetDistrictsFromProvinceId, apiGetWardsFromDistrictId } from "@/apis/app"

const CreatePost = () => {
  const {
    formState: { errors },
    setValue,
    watch,
    register,
    reset,
  } = useForm()
  const { datavn, categories } = useSelector((state) => state.app)
  const { current } = useSelector((state) => state.user)

  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const [center, setCenter] = useState(null)
  const [zoom, setZoom] = useState(10)
  const [isLoading, setIsLoading] = useState(false)

  const province = watch("province")
  const district = watch("district")
  const ward = watch("ward")
  const category = watch("category")
  const images = watch("images")
  const address = watch("address")
  const street = watch("street")
  const title = watch("title")
  const price = watch("price")
  const area = watch("area")
  const target = watch("target")
  const description = watch("description")
  const setCustomValue = (id, val) =>
    setValue(id, val, { shouldDirty: true, shouldTouch: true, shouldValidate: true })
  useEffect(() => {
    if (province) {
      setCustomValue("district", "")
      setCustomValue("ward", "")
      setCustomValue("street", "")
      const fetchDistricts = async () => {
        const response = await apiGetDistrictsFromProvinceId(province.idProvince)
        if (response.status === 200) setDistricts(response.data)
      }
      fetchDistricts()
    }
  }, [province])
  useEffect(() => {
    if (district) {
      const fetchWards = async () => {
        const response = await apiGetWardsFromDistrictId(district.idDistrict)
        if (response.status === 200) setWards(response.data)
      }
      fetchWards()
    }
  }, [district])
  const debounceValue = useDebounce(street, 800)
  useEffect(() => {
    const lengthAddress = Object.values({
      province: province?.name,
      street,
      ward: ward?.name,
      district: district?.name,
    }).filter((el) => !el === false).length
    if (lengthAddress > 2) setZoom(14)
    else setZoom(12)
    const text = clsx(
      debounceValue,
      debounceValue && ",",
      ward?.name,
      ward?.name && ",",
      district?.name,
      district?.name && ",",
      province?.name
    )
    const textModified = text
      ?.split(",")
      ?.map((el) => el.trim())
      ?.join(", ")
    setCustomValue("address", textModified)
  }, [province, district, ward, debounceValue])

  // Handle Submit Form
  const handleSubmit = async () => {
    const payload = {
      title,
      category: category?.id,
      price,
      area,
      images,
      target: target?.name,
      description,
      postedBy: current?.id,
      address,
    }
    setIsLoading(true)
    const response = await apiCreateNewPost(payload)
    setIsLoading(false)
    if (response.success) {
      reset()
      setCustomValue("price", 0)
      setCustomValue("area", 0)
      setCustomValue("description", "")
      toast.success(response.mes)
    } else toast.error(response.mes)
  }
  return (
    <section className="pb-[200px]">
      <Title title="Tạo mới tin đăng">
        <Button onClick={handleSubmit} disabled={isLoading}>
          Tạo mới
        </Button>
      </Title>
      <section className="p-4 grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <h1 className="text-lg font-semibold  text-main-blue">1. Địa chỉ cho thuê</h1>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <Select
              options={datavn?.map((el) => ({
                ...el,
                value: el.idProvince,
                label: el.name,
              }))}
              onChange={(val) => setCustomValue("province", val)}
              value={province}
              className="col-span-1"
              label="Tỉnh/Thành phố"
            />
            <Select
              options={districts?.map((el) => ({
                ...el,
                value: el.idDistrict,
                label: el.name,
                name: el.name,
              }))}
              onChange={(val) => setCustomValue("district", val)}
              value={district}
              className="col-span-1"
              label="Quận/Huyện"
            />
            <Select
              options={wards?.map((el) => ({
                ...el,
                value: el.idCommune,
                label: el.name,
                name: el.name,
              }))}
              onChange={(val) => setCustomValue("ward", val)}
              value={ward}
              className="col-span-1"
              label="Phường/Xã"
            />
          </div>
          <div className="mt-4">
            <InputForm
              label="Đường/Phố/Số nhà"
              register={register}
              errors={errors}
              id="street"
              fullWidth
              placeholder="Nhập số nhà, đường, phố cụ thể"
              inputClassName="border-gray-300"
            />
          </div>
          <div className="mt-4">
            <InputForm
              label="Địa chỉ chính xác"
              register={register}
              errors={errors}
              id="address"
              validate={{ required: "Trường này không được bỏ trống." }}
              fullWidth
              inputClassName="border-gray-300 bg-gray-200 focus:outline-none focus:ring-transparent focus:ring-offset-0 focus:border-transparent focus: ring-0 cursor-default"
              readOnly={true}
              value={address}
            />
          </div>
          <h1 className="text-lg font-semibold mt-6 text-main-blue">2. Thông tin mô tả</h1>
          <div className="mt-6 relative z-10">
            <Select
              options={categories?.map((el) => ({
                ...el,
                value: el.id,
                label: el.value,
                name: el.value,
              }))}
              onChange={(val) => setCustomValue("category", val)}
              value={category}
              className="col-span-1"
              label="Loại chuyên mục"
            />
          </div>
          <div className="mt-4">
            <InputForm
              label="Tựa đề"
              register={register}
              errors={errors}
              id="title"
              validate={{ required: "Trường này không được bỏ trống." }}
              fullWidth
              placeholder="Tựa đề tin đăng"
              inputClassName="border-gray-300"
            />
          </div>
          <div className="mt-4">
            <TextField
              label="Nội dung mô tả"
              id="description"
              onChange={(val) => setCustomValue("description", val)}
              validate={{ required: "Trường này không được bỏ trống." }}
              placeholder="Điền mô tả về thông tin chỗ cho thuê"
              value={description}
            />
          </div>
          <div className="mt-6 flex items-center gap-4">
            <InputForm
              label="Thông tin liên hệ"
              register={register}
              errors={errors}
              id="username"
              validate={{ required: "Trường này không được bỏ trống." }}
              fullWidth
              inputClassName="border-gray-300 bg-gray-200 focus:outline-none focus:ring-transparent focus:ring-offset-0 focus:border-transparent focus: ring-0 cursor-default"
              readOnly={true}
              value={current?.name}
            />
            <InputForm
              label="Số điện thoại liên hệ"
              register={register}
              errors={errors}
              id="phone"
              validate={{ required: "Trường này không được bỏ trống." }}
              fullWidth
              inputClassName="border-gray-300 bg-gray-200 focus:outline-none focus:ring-transparent focus:ring-offset-0 focus:border-transparent focus: ring-0 cursor-default"
              readOnly={true}
              value={current?.phone}
            />
          </div>
          <div className="mt-6 flex items-center gap-4">
            <InputForm
              label="Giá cho thuê (đồng/tháng)"
              register={register}
              errors={errors}
              id="price"
              validate={{ required: "Trường này không được bỏ trống." }}
              fullWidth
              placeholder="Giá cho thuê"
              inputClassName="border-gray-300"
              type="number"
            />
            <InputForm
              label="Diện tích (m2)"
              register={register}
              errors={errors}
              id="area"
              validate={{ required: "Trường này không được bỏ trống." }}
              fullWidth
              placeholder="Diện tích chỗ cho thuê"
              inputClassName="border-gray-300"
              type="number"
            />
            <Select
              options={targets}
              onChange={(val) => setCustomValue("target", val)}
              value={target}
              className="flex-1"
              label="Đối tượng cho thuê"
            />
          </div>
          <div className="mt-6">
            <InputFile
              getFile={(val) => setCustomValue("images", val)}
              label="Hình ảnh"
              image={images}
              id="images"
            />
          </div>
        </div>
        <div className="col-span-4 flex flex-col gap-4">
          <div className="w-full relative z-10 h-[300px]">
            <Map address={address} zoom={zoom} />
          </div>
          <div className="flex flex-col p-4 text-sm gap-2 rounded-md bg-orange-100 border border-orange-500 text-orange-600">
            <h3 className="font-medium">Lưu ý khi đăng tin</h3>
            <ul className="list-item pl-8">
              <li className="list-disc">Nội dung phải viết bằng tiếng Việt có dấu</li>
              <li className="list-disc">Tiêu đề tin không dài quá 100 kí tự</li>
              <li className="list-disc">
                Các bạn nên điền đầy đủ thông tin vào các mục để tin đăng có hiệu quả hơn.
              </li>
              <li className="list-disc">
                Để tăng độ tin cậy và tin rao được nhiều người quan tâm hơn, hãy sửa vị trí tin rao của bạn
                trên bản đồ bằng cách kéo icon tới đúng vị trí của tin rao.
              </li>
              <li className="list-disc">
                Tin đăng có hình ảnh rõ ràng sẽ được xem và gọi gấp nhiều lần so với tin rao không có ảnh. Hãy
                đăng ảnh để được giao dịch nhanh chóng!
              </li>
            </ul>
          </div>
        </div>
      </section>
    </section>
  )
}

export default withBaseTopping(CreatePost)

import { apiUploadImageCloudinary } from "@/apis/app"
import clsx from "clsx"
import React, { useState } from "react"
import { BsCamera } from "react-icons/bs"
import { ImBin } from "react-icons/im"
import { CgSpinner } from "react-icons/cg"

const InputMultiFile = ({ style, label, id, getFile, invalid, image = [] }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [hoverElm, setHoverElm] = useState(null)
  const handleUploadFile = async (e) => {
    const formData = new FormData()
    const imagePaths = []
    setIsLoading(true)
    for (let file of e.target.files) {
      formData.append("file", file)
      formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET_UPLOAD)
      const response = await apiUploadImageCloudinary(formData)
      if (response.status === 200) {
        imagePaths.push(response.data?.secure_url)
      }
    }
    setIsLoading(false)
    getFile(imagePaths)
  }
  const handleRemoveImage = (e, imagePath) => {
    e.preventDefault()
    const removedImages = image.filter((el) => el !== imagePath)
    getFile(removedImages)
  }
  return (
    <div className={clsx("flex flex-col gap-2 w-full min-h-[70px]", style)}>
      <span className="font-medium text-sm">{label}</span>
      <label
        className={clsx(
          "min-h-[350px] flex flex-col gap-2 items-center p-4 border-4 border-double border-blue-500",
          image.length === 0 && "justify-center"
        )}
        htmlFor={id}
      >
        {isLoading ? (
          <div className="animate-spin">
            <CgSpinner size={24} />
          </div>
        ) : (
          <>
            {image?.length > 0 ? (
              <div className="grid gap-4 grid-cols-5 w-full h-full">
                {image?.map((el, idx) => (
                  <div
                    onMouseLeave={() => setHoverElm(null)}
                    onMouseEnter={() => setHoverElm(el)}
                    className="w-full col-span-1 relative"
                    key={idx}
                  >
                    {hoverElm === el && (
                      <div
                        onClick={(e) => handleRemoveImage(e, el)}
                        className="absolute cursor-pointer inset-0 bg-overlay flex items-center justify-center"
                      >
                        <ImBin size={24} color="orange" />
                      </div>
                    )}
                    <img src={el} className="w-full border object-contain" />
                  </div>
                ))}
              </div>
            ) : (
              <>
                <BsCamera className="text-gray-300 text-8xl" />
                <span className="text-main-600 text-sm">Tải ảnh (Multiple available)</span>
                <span className="italic text-xs text-main-500">Chỉ hỗ trợ file ảnh có định dạng .PNG và .JPG</span>
              </>
            )}
          </>
        )}
      </label>
      {invalid && <small className="text-sm text-red-500">Trường này không đc bỏ trống</small>}
      <input onChange={handleUploadFile} type="file" id={id} multiple hidden />
    </div>
  )
}

export default InputMultiFile

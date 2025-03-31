import React, { memo } from "react"
import clsx from "clsx"
import { twMerge } from "tailwind-merge"
const InputForm = ({
  label,
  fullWidth,
  type = "text",
  register,
  errors,
  id,
  validate,
  placeholder,
  inputClassName,
  readOnly = false,
  value,
  wrapClassanme,
}) => {
  return (
    <div
      className={twMerge(
        clsx(
          "flex flex-col gap-2 flex-1 h-[70px]",
          fullWidth && "w-full",
          wrapClassanme
        )
      )}
    >
      <label className="font-medium" htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        id={id}
        {...register(id, validate)}
        className={clsx(
          "form-input rounded-md border-gray-200 placeholder:text-xs placeholder:italic",
          fullWidth && "w-full",
          inputClassName
        )}
        placeholder={placeholder}
        readOnly={readOnly}
        value={value}
      />
      {errors[id] && (
        <small className="text-xs text-red-500">{errors[id]?.message}</small>
      )}
    </div>
  )
}

export default memo(InputForm)

import clsx from 'clsx'
import React from 'react'

const CustomSelect = ({
    label,
    disabled,
    register,
    errors,
    id,
    validate,
    type = 'text',
    placeholder,
    fullWidth,
    defaultValue,
    containerClassname,
    readOnly,
    options = [],
    defaultChoose = 'Chọn',
    inputClassname
}) => {
    return (
        <div className={clsx('flex flex-col w-full h-[70px]', containerClassname)}>
            {label && <label className='font-medium text-base' htmlFor={id}>{label + ':'}</label>}
            <select
                type={type}
                id={id}
                {...register(id, validate)}
                disabled={disabled}
                placeholder={placeholder}
                className={clsx('form-select my-auto border rounded-md border-gray-200 placeholder:text-xs placeholder:italic', fullWidth && 'w-full', inputClassname)}
                defaultValue={defaultValue}
                readOnly={readOnly}
            >
                <option value=''>{`-- ${defaultChoose} --`}</option>
                {options?.map(el => (
                    <option key={el.value} value={el.value}>{el.text}</option>
                ))}
            </select>
            {errors[id] && <small className='text-xs text-red-500'>{errors[id]?.message}</small>}
        </div>
    )
}

export default CustomSelect
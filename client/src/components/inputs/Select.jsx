import clsx from 'clsx'
import React from 'react'
import Select from 'react-select'
import { twMerge } from 'tailwind-merge'
const CustomSelect = ({ placeholder, onChange, options = [], value = '', className, label, gap }) => {
    return (
        <div className={twMerge(clsx('flex flex-col gap-2 flex-1', gap))}>
            <h3 className='font-medium'>{label}</h3>
            <Select
                placeholder={placeholder}
                isClearable
                options={options}
                value={options.find(el => el.value === value)}
                isSearchable
                onChange={(val) => onChange(val)}
                formatOptionLabel={(option) => (
                    <div className="flex text-black items-center gap-2">
                        <div>{option.name}</div>
                    </div>
                )}
                classNames={{
                    control: () => clsx('border-2 py-[2px]', className),
                    input: () => 'text-sm',
                    option: () => 'text-sm'
                }}
            />
        </div>
    )
}

export default CustomSelect
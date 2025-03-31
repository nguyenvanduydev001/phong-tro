import { apiUpdateUser } from '@/apis/user'
import { Button, CustomSelect, InputForm } from '@/components'
import withBaseTopping from '@/hocs/withBaseTopping'
import { modal } from '@/redux/appSlice'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const UpdateUser = ({ editUser, dispatch, render }) => {
    const { roles } = useSelector(s => s.app)
    const [isLoading, setIsLoading] = useState(false)
    const { formState: { errors }, handleSubmit: validate, register, reset } = useForm()
    useEffect(() => {
        reset({
            name: editUser?.name,
            phone: editUser?.phone,
            role: editUser?.role,
            isBlocked: editUser?.isBlocked ? 1 : 0,
        })
    }, [editUser])
    const handleSubmit = async (data) => {
        const response = await apiUpdateUser(data, editUser?.id)
        if (response.success) {
            render()
            toast.success(response.mes)
            dispatch(modal({ isShowModal: false, modalContent: null }))
        } else toast.error(response.mes)
    }
    return (
        <div onClick={e => e.stopPropagation()} className='w-full max-w-[500px] rounded-md mx-auto max-h-screen overflow-y-auto relative bg-white p-4'>
            <div className='pb-4 flex items-center justify-between border-b'>
                <h1 className='text-2xl font-bold tracking-tight'>{`Cập nhật thông tin thành viên #${editUser?.name}`}</h1>
            </div>
            <form onSubmit={validate(handleSubmit)} className='mt-6 flex flex-col gap-3'>
                <InputForm
                    label='Tên thành viên'
                    register={register}
                    errors={errors}
                    id='name'
                    fullWidth
                    validate={{ required: 'Trường này không được bỏ trống.' }}
                />
                <InputForm
                    label='Số điện thoại'
                    register={register}
                    errors={errors}
                    id='phone'
                    fullWidth
                    validate={{
                        required: 'Trường này không được bỏ trống.',
                        minLength: {
                            value: 10,
                            message: 'SĐT không hợp lệ'
                        },
                        maxLength: {
                            value: 10,
                            message: 'SĐT không hợp lệ'
                        }
                    }}
                />
                <CustomSelect
                    label='Vai trò'
                    register={register}
                    errors={errors}
                    id='role'
                    fullWidth
                    validate={{ required: 'Trường này không được bỏ trống.' }}
                    options={roles?.map(el => ({ ...el, text: el.value, value: el.code }))}
                />
                <CustomSelect
                    label='Trạng thái'
                    register={register}
                    errors={errors}
                    id='isBlocked'
                    fullWidth
                    validate={{ required: 'Trường này không được bỏ trống.' }}
                    options={[{ value: 0, text: 'Đang hoạt động' }, { value: 1, text: 'Đang tạm khóa' }]}
                />
                <div className='flex justify-end mt-4 items-center gap-4'>
                    <Button type='submit' disabled={isLoading} >Cập nhật</Button>
                    <Button onClick={() => dispatch(modal({ isShowModal: false, modalContent: null }))} className='bg-main-yellow'>Cancel</Button>
                </div>
            </form>
        </div>
    )
}

export default withBaseTopping(UpdateUser)
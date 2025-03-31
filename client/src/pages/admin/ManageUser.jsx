import { apiDeleteUser, apiGetUsers } from '@/apis/user'
import { Pagination, Title } from '@/components'
import withBaseTopping from '@/hocs/withBaseTopping'
import { modal } from '@/redux/appSlice'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AiFillDelete, AiOutlineEdit } from 'react-icons/ai'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import UpdateUser from './UpdateUser'
import useDebounce from '@/hooks/useDebounce'
// import UpdatePost from './UpdatePost'

const ManageUser = ({ dispatch }) => {
    const { setValue, watch } = useForm()
    const keyword = watch('keyword')
    const [users, setUsers] = useState(null)
    const [searchParams] = useSearchParams()
    const [update, setUpdate] = useState(false)
    const fetchUsers = async (params) => {
        const response = await apiGetUsers(params)
        if (response.success) setUsers(response.users)
    }
    const debounceValue = useDebounce(keyword, 500)
    useEffect(() => {
        const params = Object.fromEntries([...searchParams])
        params.limit = import.meta.env.VITE_LIMIT
        if (debounceValue) params.keyword = debounceValue
        fetchUsers(params)
    }, [searchParams, update, debounceValue])
    const render = () => {
        setUpdate(!update)
    }
    const handleDeleteUser = uid => {
        Swal.fire({
            icon: 'warning',
            title: 'Xác nhận thao tác',
            text: 'Bạn có chắc muốn xóa thành viên này?',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Quay lại'
        }).then(async (rs) => {
            if (rs.isConfirmed) {
                const response = await apiDeleteUser(uid)
                if (response.success) {
                    toast.success(response.mes)
                    render()
                } else toast.error(response.mes)
            }
        })
    }


    return (
        <section className='mb-[200px]'>
            <Title title='Quản lý thành viên'></Title>
            <div className='p-4'>
                <div className='flex items-center justify-end'>
                    <input type="text"
                        value={keyword}
                        onChange={e => setValue('keyword', e.target.value)}
                        className='max-w-[500px] w-full outline-none border p-2 placeholder:text-sm'
                        placeholder='Tìm kiếm theo tên, SĐT...'
                    />
                </div>
                <div className='mt-6 w-full'>
                    <table className='table-auto w-full'>
                        <thead>
                            <tr className='border bg-main-blue text-white'>
                                <th className='p-2 font-medium text-center'>Tên thành viên</th>
                                <th className='p-2 font-medium text-center'>Số điện thoại</th>
                                <th className='p-2 font-medium text-center'>Vai trò</th>
                                <th className='p-2 font-medium text-center'>Trạng thái</th>
                                <th className='p-2 font-medium text-center'>Số tin đăng</th>
                                <th className='p-2 font-medium text-center'>Hành động</th>
                            </tr>
                        </thead>
                        <tbody className='text-sm'>
                            {users?.rows?.map(el => (
                                <tr className='border' key={el.id}>
                                    <td className='p-2 text-center'>
                                        <span className='flex items-center gap-2'>
                                            <img src={el.avatar || '/user.svg'} alt="avatar" className='w-8 h-8 object-cover rounded-md' />
                                            <span>{el.name}</span>
                                        </span>
                                    </td>
                                    <td className='p-2 text-center'>{el.phone}</td>
                                    <td className='p-2 text-center'>{el.roleData?.value}</td>
                                    <td className='p-2 text-center'>{el.isBlocked ? 'Đang tạm khóa' : 'Đang hoạt động'}</td>
                                    <td className='p-2 text-center'>{el.author?.length || 0}</td>
                                    <td className='flex items-center justify-center gap-2 p-2'>
                                        <span
                                            onClick={() => dispatch(modal({ isShowModal: true, modalContent: <UpdateUser render={render} editUser={el} /> }))}
                                            className='text-lg text-main-red cursor-pointer px-1'
                                        >
                                            <AiOutlineEdit />
                                        </span>
                                        <span
                                            onClick={() => handleDeleteUser(el.id)}
                                            className='text-lg text-main-red cursor-pointer px-1'><AiFillDelete /></span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='mt-6'>
                    <Pagination totalCount={users?.count} />
                </div>
            </div>
        </section>
    )
}

export default withBaseTopping(ManageUser)
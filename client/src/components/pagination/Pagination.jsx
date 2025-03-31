import React from 'react'
import PagiItem from './PagiItem'
import { useSearchParams } from 'react-router-dom'
import usePagination from '@/hooks/usePagination'

const Pagination = ({ totalCount }) => {
    const [params] = useSearchParams()
    const pagination = usePagination(totalCount, +params.get('page') || 1)

    const range = () => {
        const currentPage = +params.get('page')
        const pageSize = +import.meta.env.VITE_LIMIT || 10
        const start = Math.min(((currentPage - 1) * pageSize) + 1, totalCount)
        const end = Math.min(currentPage * pageSize, totalCount)

        return `${start} - ${end}`
    }
    return (
        <div className='flex items-center justify-between w-full italic'>
            {!+params.get('page') ? <span>{`Hiển thị kết quả ${Math.min(1, totalCount)} - ${Math.min(+import.meta.env.VITE_LIMIT, totalCount)} of ${totalCount}`}</span> : ''}
            {+params.get('page') ? <span>{`Hiển thị kết quả ${range()} of ${totalCount}`}</span> : ''}
            <div className='flex items-center gap-2'>
                {pagination?.map(el => (
                    <PagiItem key={el}>
                        {el}
                    </PagiItem>
                ))}
            </div>
        </div>
    )
}

export default Pagination
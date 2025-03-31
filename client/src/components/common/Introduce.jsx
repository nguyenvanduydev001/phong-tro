import React, { memo } from 'react'
import { Button } from '..'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { textintro } from '@/ultils/constant'
import { GrStar } from 'react-icons/gr'

const star = [1, 2, 3, 4, 5]

const Introduce = () => {
    const { categories } = useSelector(state => state.app)
    return (
        <div className=' bg-white rounded-md shadow-md p-4 gap-4 flex-col flex justify-center items-center'>
            <h3 className='font-bold text-lg'>{textintro.title}</h3>
            <p className='text-gray-800 text-center my-4'>
                {textintro.description}
                <span className='text-link'>
                    {categories?.length > 0 && categories.map(item => {
                        return (
                            <Link
                                to={item.slug}
                                key={item.id}
                                className='text-blue-600 font-medium hover:text-orange-600'
                            >
                                {`${item.value.toLowerCase()}, `}
                            </Link>
                        )
                    })}
                </span>
                {textintro.description2}
            </p>
            <div className='flex items-center justify-around w-full'>
                {textintro.statistic.map((item, index) => {
                    return (
                        <div className='flex flex-col justify-center items-center' key={index}>
                            <h4 className='font-bold text-lg'>{item.value}</h4>
                            <p className='text-gray-700'>{item.name}</p>
                        </div>
                    )
                })}
            </div>
            <h3 className='font-bold text-lg py-2'>{textintro.price}</h3>
            <div className='flex items-center justify-center gap-1'>
                {star.map(item => {
                    return (
                        <span key={item}>
                            <GrStar size={24} color='yellow' />
                        </span>
                    )
                })}
            </div>
            <p className='text-gray-600 italic text-center'>{textintro.comment}</p>
            <span className='text-gray-700'>{textintro.author}</span>
            <h3 className='font-bold text-lg py-2'>{textintro.question}</h3>
            <p>{textintro.answer}</p>
            <Button>Đăng tin ngay</Button>
            <div className='h-12'></div>
        </div>
    )
}

export default memo(Introduce)
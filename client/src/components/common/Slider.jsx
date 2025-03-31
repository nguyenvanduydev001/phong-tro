import React, { memo } from "react"
import Carousel from "nuka-carousel"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi"
import { twMerge } from "tailwind-merge"
import clsx from "clsx"
const Slider = ({ count = 4, children, className }) => {
  return (
    <div className={twMerge(clsx("w-full flex bg-black flex-col rounded-tl-md rounded-tr-md", className))}>
      <Carousel
        className="w-full"
        slidesToShow={count}
        slidesToScroll={1}
        cellSpacing={16}
        renderBottomCenterControls={false} // Remove dots
        renderCenterLeftControls={({ previousSlide, previousDisabled }) => (
          <button
            className={twMerge(
              clsx("p-2 bg-white border -ml-4 shadow-md rounded-full", previousDisabled && "cursor-default opacity-50")
            )}
            onClick={previousSlide}
          >
            <FiChevronLeft size={20} />
          </button>
        )}
        renderCenterRightControls={({ nextSlide, nextDisabled }) => (
          <button
            className={twMerge(
              clsx("p-2 bg-white shadow-md -mr-4  border rounded-full", nextDisabled && "cursor-default opacity-50")
            )}
            onClick={nextSlide}
          >
            <FiChevronRight size={20} />
          </button>
        )}
        wrapAround={false}
      >
        {children}
      </Carousel>
    </div>
  )
}

export default memo(Slider)

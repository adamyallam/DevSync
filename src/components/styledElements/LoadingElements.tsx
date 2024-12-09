'use client'
import React from "react"

interface Props {
  color: string
  size?: number
}

export const BouncingDots: React.FC<Props> = ({ color, size = 5 }) => {
  const gapSize = 0.8 * size

  return (
    <div style={{ gap: `${gapSize}px` }} className="flex items-center">
      <div style={{ backgroundColor: color, width: `${size}px`, height: `${size}px` }} className="bounce rounded-full" />
      <div style={{ backgroundColor: color, width: `${size}px`, height: `${size}px` }} className="bounce rounded-full" />
      <div style={{ backgroundColor: color, width: `${size}px`, height: `${size}px` }} className="bounce rounded-full" />
    </div>
  );
};

export const RotatingCircle = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-16 h-16 border-4 border-t-4 border-t-gray-500 border-gray-700 border-solid rounded-full animate-spin-custom"></div>
    </div>
  )
}

export const HeaderSkeletonLoader = () => {
  return (
    <div className="mt-16 w-full animate-pulse">
      {/* Top Section */}
      <div className="flex">
        <div className="flex gap-2 w-full">
          {/* Placeholder for icon */}
          <div className="bg-gray-300 w-8 h-8 rounded-xl ml-8"></div>

          {/* Placeholder for input */}
          <div className="bg-gray-300 h-8 rounded py-1 w-[275px]"></div>
        </div>

        <div className="flex gap-2 items-center justify-end mr-8">
          {/* Placeholder for profile icon */}
          <div className="flex">
            <div className="bg-gray-300 w-6 h-6 translate-x-[6px] rounded-full"></div>
            <div className="bg-gray-300 w-6 h-6 rounded-full"></div>
          </div>

          {/* Placeholder for Share button */}
          <div className="bg-gray-300 w-14 h-7 rounded-md"></div>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="mt-2 pl-10">
        <div className="flex gap-4 text-sm">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="bg-gray-300 w-14 h-5 rounded"></div>
              <div className="bg-gray-300 w-14 h-[2.5px] mt-1 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};



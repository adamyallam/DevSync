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
      <div className="flex">
        <div className="flex items-center gap-1.5 w-full">
          <div className="flex items-center justify-center border-2 border-primary bg-gray-300 w-8 h-8 rounded-md ml-8" />
          <div className="h-6 bg-gray-300 rounded w-32" />
          <div className="h-5 bg-gray-300 rounded w-5 ml-1" />
          <div className="h-5 bg-gray-300 rounded w-5" />
          <div className="h-5 bg-gray-300 rounded w-16" />
        </div>
      </div>

      <div className="absolute flex gap-2 right-0 top-[76px] mr-8">
        <button className="flex">
          <div className="border rounded-full bg-gray-300 w-8 h-8 translate-x-[6px]" />
          <div className="flex items-center justify-center border border-undertone rounded-full bg-gray-300 w-8 h-8" />
        </button>

        <button className="w-[80px] h-[35px] bg-gray-300 rounded-sm" />
      </div>

      <div>
        <div className="flex gap-10 mt-4 pl-10 text-sm font-semibold border-b border-undertone">
          {Array(4)
            .fill(null)
            .map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="h-4 w-16 bg-gray-300 rounded mb-2" />
                <div className="h-[1.5px] bg-gray-300 w-full" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export const OverviewSkeletonLoader = () => {
  return (
    <div className="w-full">
      <div className="relative flex flex-col ml-20 mt-8 h-full gap-2 animate-pulse">
        {/* Skeleton for the auto-resizing input */}
        <div className="h-6 w-[200px] bg-gray-300 rounded"></div>

        {/* Skeleton for the textarea */}
        <div className="flex flex-col w-full relative">
          <div className="w-4/5 h-[150px] bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export const StatusLogSkeletonLoader = () => {
  return (
    <div className="border border-undertone bg-highlighted p-4 h-[700px] w-[319px] overflow-y-auto animate-pulse">
      <div className="ml-5">
        <div className="h-4 w-24 bg-gray-300 rounded mb-4" />
        <div className="flex gap-4 mt-3">
          <div className="h-6 w-20 bg-gray-300 rounded-md" />
          <div className="h-6 w-20 bg-gray-300 rounded-md" />
          <div className="h-6 w-20 bg-gray-300 rounded-md" />
          <div className="h-6 w-6 bg-gray-300 rounded-full" />
        </div>
      </div>
      <div className="ml-3 text-sm text-primary-text">
        <div className="flex items-center gap-2 mt-12">
          <div className="flex justify-center items-center border border-dashed rounded-full border-secondary-text w-7 h-7 bg-gray-300" />
          <div className="h-4 w-32 bg-gray-300 rounded" />
        </div>
        <div className="ml-[13px] mt-1 border border-undertone border-dashed w-0 h-12" />
        <div className="flex gap-2 ml-1 mt-1">
          <div className="flex flex-col">
            <div className="w-5 h-5 bg-gray-300 rounded-full" />
            <div className="ml-[9px] mt-1 border border-undertone w-0 h-24" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-4 w-36 bg-gray-300 rounded" />
            <div className="h-3 w-24 bg-gray-300 rounded" />
            <div className="border bg-gray-300 rounded-full w-7 h-7 mt-2" />
          </div>
        </div>
        <div className="flex gap-2 ml-1 mt-1">
          <div className="flex flex-col">
            <div className="w-5 h-5 bg-gray-300 rounded-full" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-4 w-40 bg-gray-300 rounded" />
            <div className="h-3 w-24 bg-gray-300 rounded" />
            <div className="border bg-gray-300 rounded-full w-7 h-7 mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProjectTasksManagerSkeleton = () => {
  return (
    <div className="animate-pulse w-full">
      <div className="h-7 w-20 bg-gray-300 rounded mb-2 mt-2 ml-8"></div>

      <div className="grid grid-cols-10 grid-rows-1 border-b-2 border-t-2 border-gray-300 gap-2 ml-8 h-10 w-[95%] pr-[1px]">
        <div className="flex justify-between items-center border-r-2 border-gray-300 ml-2 col-span-4">
          <div className="h-4 w-24 bg-gray-300 rounded"></div>
          <div className="h-4 w-4 bg-gray-300 rounded mr-2"></div>
        </div>

        <div className="flex justify-between items-center border-r-2 border-gray-300 col-span-2">
          <div className="h-4 w-16 bg-gray-300 rounded"></div>
          <div className="h-4 w-4 bg-gray-300 rounded mr-2"></div>
        </div>

        <div className="flex justify-between items-center border-r-2 border-gray-300 col-span-2">
          <div className="h-4 w-16 bg-gray-300 rounded"></div>
          <div className="h-4 w-4 bg-gray-300 rounded mr-2"></div>
        </div>

        <div className="flex justify-between items-center col-span-2">
          <div className="h-4 w-16 bg-gray-300 rounded"></div>
          <div className="h-4 w-4 bg-gray-300 rounded mr-2"></div>
        </div>
      </div>
    </div>
  );
};

export const TaskSectionSkeletonLoader = () => {
  return (
    <div className="animate-pulse">
      {[...Array(4)].map((_, index) => (
        <div key={index}>
          <div className="mt-6 pb-2 w-full">
            <div className="flex ml-8 mt-2 mb-2">
              <div className="h-4 w-4 bg-gray-300 rounded"></div>
              <div className="ml-2 h-6 w-[115px] bg-gray-300 rounded"></div>
              <div className="h-4 w-4 bg-gray-300 rounded ml-1"></div>
            </div>

            <div className="w-[96%] ml-8 h-2 bg-gray-300 rounded"></div>

            <div className="ml-8 mt-4 space-y-2">
              <div className="h-4 w-[80%] bg-gray-300 rounded"></div>
            </div>

            <div className="ml-12 mt-2 h-4 w-[100px] bg-gray-300 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export const BoardTaskSkeleton: React.FC = () => {
  return (
    <div className="pb-2">
      <div className="flex flex-col justify-evenly border border-undertone rounded-lg w-60 h-24 animate-pulse">
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
            <div className="h-4 w-[110px] bg-gray-300 rounded"></div>
          </div>
          <div className="h-5 w-5 bg-gray-300 rounded-full mr-2"></div>
        </div>
        <div className="h-4 w-[90%] bg-gray-300 rounded mx-auto"></div>
        <div className="h-4 w-[80%] bg-gray-300 rounded mx-auto"></div>
      </div>
    </div>
  );
};

export const BoardSectionSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col mt-5 ml-2 border rounded-lg border-undertone min-w-[270px] h-[calc(100%-40px)] animate-pulse">
      <div className="flex justify-between mb-3 border-b border-undertone p-3">
        <div className="h-5 w-[115px] bg-gray-300 rounded"></div>
        <div className="flex gap-2">
          <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
          <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
        </div>
      </div>
      <div className="flex flex-col items-center h-full overflow-auto">
        <div className="flex flex-col items-center w-[96%] gap-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <BoardTaskSkeleton key={index} />
          ))}
        </div>
        <div className="flex items-center pb-2">
          <div className="h-4 w-4 bg-gray-300 rounded-full"></div>
          <div className="h-4 w-16 bg-gray-300 rounded ml-2"></div>
        </div>
      </div>
    </div>
  );
};

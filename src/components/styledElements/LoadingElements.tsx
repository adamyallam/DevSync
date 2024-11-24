'use client'

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

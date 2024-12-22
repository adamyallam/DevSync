'use client'
import { X } from "lucide-react"

interface Props {
  text: string
  setDisplayError: (value: boolean) => void
}

const ErrorMessage: React.FC<Props> = ({ text, setDisplayError }) => {

  return (
    <div className="relative text-[9px] bg-[#A32020] text-primary-text font-semibold p-0.5 rounded-sm">
      <div className="flex">
        <span>{text}</span>
        <X onClick={() => setDisplayError(false)} size={7} strokeWidth={5} className="text-primary-text ml-1 hover:cursor-pointer hover:scale-125 transition-transform" />
      </div>
      <style jsx>{`
        div::before {
          content: '';
          position: absolute;
          left: -8px; /* Adjust to position the triangle correctly */
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 10px 10px 10px 0; /* Triangle pointing to the right */
          border-color: transparent #A32020 transparent transparent;
        }
      `}
      </style>
    </div>
  );
}

export default ErrorMessage;
'use client'
import { X } from "lucide-react"

interface Props {
  text: string
  displayError: boolean
  exitError: () => void
  arrowDirection: 'top' | 'bottom' | 'left' | 'right';
}

const ErrorMessage: React.FC<Props> = ({ text, displayError, exitError, arrowDirection }) => {

  const arrowStyles = (() => {
    switch (arrowDirection) {
      case 'top':
        return `
          top: -8px;
          left: 50%;
          transform: translateX(-50%);
          border-width: 0 10px 10px 10px;
          border-color: transparent transparent #A32020 transparent;
        `;
      case 'bottom':
        return `
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          border-width: 10px 10px 0 10px;
          border-color: #A32020 transparent transparent transparent;
        `;
      case 'left':
        return `
          left: -8px;
          top: 50%;
          transform: translateY(-50%);
          border-width: 10px 10px 10px 0;
          border-color: transparent #A32020 transparent transparent;
        `;
      case 'right':
        return `
          right: -8px;
          top: 50%;
          transform: translateY(-50%);
          border-width: 10px 0 10px 10px;
          border-color: transparent transparent transparent #A32020;
        `;
      default:
        return '';
    }
  })();

  return (
    <div className={`relative text-[9px] bg-[#A32020] text-primary-text font-semibold p-0.5 rounded-sm ${displayError ? 'block' : 'hidden'}`}>
      <div className="flex">
        <span>{text}</span>
        <X onClick={exitError} size={7} strokeWidth={5} className={`text-primary-text ml-1 hover:cursor-pointer hover:scale-125 transition-transform ${arrowDirection === 'right' ? 'order-first mr-1' : 'ml-1'}`} />
      </div>
      <style jsx>{`
        div::before {
          content: '';
          position: absolute;
          ${arrowStyles}
          border-style: solid;
        }
      `}
      </style>
    </div>
  );
}

export default ErrorMessage;
import React, { useEffect, useRef, useState } from 'react';

interface AutoResizingInputProps {
  initialWidth: number;
  placeholder?: string;
  initialState?: string;
  className?: string;
}

export const AutoResizingInput: React.FC<AutoResizingInputProps> = ({initialWidth, placeholder, className, initialState}) => {
  const [text, setText] = useState(`${initialState || ''}`)
  const inputRef = useRef<HTMLInputElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (inputRef.current && spanRef.current && spanRef.current.offsetWidth >= initialWidth) {
      inputRef.current.style.width = `${spanRef.current.offsetWidth + 2}px`;
    } else if (inputRef.current) {
      inputRef.current.style.width = `${initialWidth}px`;
    }
  }, [text]);

  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
        ref={inputRef}
        className={`${className ? `${className}` : 'px-1 py-1 text-md'}`}
        style={{ width: `${initialWidth}px` }}>
      </input>

      <span ref={spanRef} className={`${className ? `absolute top-0 left-0 invisible whitespace-pre pr-2 ${className}` : 'absolute top-0 left-0 invisible whitespace-pre pr-5 text-md'}`}>
        {text}
      </span>
    </div>
  );
};

export default AutoResizingInput;
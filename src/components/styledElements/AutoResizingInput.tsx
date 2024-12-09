import React, { useEffect, useRef, useState } from 'react';

interface AutoResizingInputProps {
  initialWidth?: number;
  placeholder?: string;
  initialText?: string;
  maxGrowthWidth?: number;
  parentClassName?: string;
  inputClassName?: string;
  spanClassName?: string;
}

//Input field that grows in size if characters do not fit within it's "Initial Width"

export const AutoResizingInput: React.FC<AutoResizingInputProps> = ({initialWidth = 125, maxGrowthWidth, placeholder, initialText, parentClassName, inputClassName, spanClassName}) => {
  const [text, setText] = useState(`${initialText || ''}`)
  const inputRef = useRef<HTMLInputElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (inputRef.current && spanRef.current && spanRef.current.offsetWidth >= initialWidth) {
      inputRef.current.style.width = `${spanRef.current.offsetWidth + 2}px`;

      if (maxGrowthWidth) {
        inputRef.current.style.maxWidth = `${maxGrowthWidth + 2}px`;
      }
    } 
  }, [text]);

  return (
    <div className={parentClassName ? parentClassName : ''}>
      <input
        type="text"
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
        ref={inputRef}
        className={`px-1 ${inputClassName ? inputClassName : 'py-1 text-md'}`}
        style={{ width: `${initialWidth}px` }}>
      </input>

      <span ref={spanRef} className={`absolute top-0 left-0 invisible whitespace-pre pr-2 ${spanClassName ? spanClassName : 'text-md'}`}>
        {text}
      </span>
    </div>
  );
};

export default AutoResizingInput;
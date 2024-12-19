import React, { useEffect, useRef, useState } from 'react';

interface AutoResizingInputProps {
  initialWidth?: number;
  placeholder?: string;
  initialText?: string;
  maxGrowthWidth?: number;
  textSize?: string;
  onConfirmChange?: (newName: string) => Promise<void>;
}

//Input field that grows in size if characters do not fit within it's "Initial Width"

export const AutoResizingInput: React.FC<AutoResizingInputProps> = ({initialWidth = 125, maxGrowthWidth, placeholder, initialText, textSize, onConfirmChange}) => {
  const [text, setText] = useState(`${initialText || ''}`)
  const [originalText, setOriginalText] = useState(`${initialText || ''}`);
  const inputRef = useRef<HTMLInputElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
    setText(`${initialText || ''}`);
    setOriginalText(`${initialText || ''}`);
  }, [initialText]);

  useEffect(() => {
    if (inputRef.current && spanRef.current) {
      const spanWidth = spanRef.current.offsetWidth;

      inputRef.current.style.width = `${Math.max(initialWidth, spanWidth + 2)}px`;

      if (maxGrowthWidth) {
        const limitedWidth = Math.min(parseFloat(inputRef.current.style.width), maxGrowthWidth);
        inputRef.current.style.width = `${limitedWidth}px`;
      }
    }
  }, [text, initialWidth, maxGrowthWidth]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onConfirmChange) {
      setOriginalText(text)
      onConfirmChange(text).then(() => {
        inputRef.current?.blur();
      })
    }

  };

  const handleBlur = () => {
    setText(originalText); 
  };

  return (
    <>
      <input
        type="text"
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
        ref={inputRef}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        className={`pl-1 px-1 ${textSize ? `${textSize}` : 'text-sm'} bg-secondary text-primary-text rounded-sm font-bold hover:outline hover:outline-2 hover:outline-primary focus:outline focus:outline-2 focus:outline-secondary-text`}
        style={{ width: `${initialWidth}px` }}>
      </input>

      <span ref={spanRef} className={`absolute top-0 left-0 invisible whitespace-pre pr-2 ${textSize ? `${textSize}` : 'text-sm'} font-bold`}>
        {text}
      </span>
    </>
  );
};

export default AutoResizingInput;
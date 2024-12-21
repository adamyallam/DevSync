import React, { useEffect, useRef, useState } from 'react';

interface AutoResizingInputProps {
  initialWidth?: number;
  placeholder?: string;
  initialText?: string;
  maxGrowthWidth?: number;
  textSize?: string;
  onConfirmChange?: (newName: string) => void;
}

//Input field that grows in size if characters do not fit within it's "Initial Width"

export const AutoResizingInput: React.FC<AutoResizingInputProps> = ({ initialWidth = 125, maxGrowthWidth, placeholder, initialText, textSize, onConfirmChange }) => {
  const [text, setText] = useState(`${initialText}`)
  const [originalText, setOriginalText] = useState(`${initialText}`);
  const inputRef = useRef<HTMLInputElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

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

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onConfirmChange) {
      const previousValue = originalText;

      if (text.trim() && text !== originalText) {
        try {
          await onConfirmChange(text);
          setOriginalText(text)
          inputRef.current?.blur()
        } catch {
          setText(previousValue);
          inputRef.current?.blur()
          console.log('Error updating name');
        }
      } else {
        setText(previousValue);
        inputRef.current?.blur()
      }
    }
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
import React, { useEffect, useRef, useState } from 'react';
import useProjectsDataContext from '@/utils/hooks/context/useProjectDataProvider';
import ErrorMessage from './ErrorMessage';

interface AutoResizingInputProps {
  initialWidth?: number;
  placeholder?: string;
  initialText?: string;
  maxGrowthWidth?: number;
  textStyles?: string;
  autoFocus?: boolean;
  onConfirmChange?: (newName: string) => void;
}

//Input field that grows in size if characters do not fit within it's "Initial Width"

export const AutoResizingInput: React.FC<AutoResizingInputProps> = ({ initialWidth = 125, maxGrowthWidth, placeholder, initialText, textStyles, onConfirmChange, autoFocus = false }) => {
  const {showError, exitError} = useProjectsDataContext()

  const [text, setText] = useState(initialText || '')
  const [originalText, setOriginalText] = useState(initialText || '');
  const [displayError, setDisplayError] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const errorTimeoutRef = useRef<number | null>(null);


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

  const updateInput = async () => {
    const previousValue = originalText;
  
    if (text.trim() && text !== originalText && onConfirmChange) {
      try {
        await onConfirmChange(text);
        setOriginalText(text);
      } catch {
        setText(previousValue);
        showError(setDisplayError, errorTimeoutRef);
      }
    } else {
      setText(previousValue);
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      await updateInput();
      inputRef.current?.blur();
    }
  };
  
  const handleBlur = async () => {
    await updateInput();
  };

  return (
    <div className='flex flex-col justify-center'>
      <div className=''>
        <input
          type="text"
          autoFocus={autoFocus}
          placeholder={placeholder}
          value={text}
          onChange={(e) => setText(e.target.value)}
          ref={inputRef}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className={`pl-1 px-1 ${textStyles ? `${textStyles}` : 'text-sm font-bold'} h-full bg-secondary text-primary-text rounded-sm hover:outline hover:outline-2 hover:outline-primary focus:outline focus:outline-2 focus:outline-secondary-text`}
          style={{ width: `${initialWidth}px` }}>
        </input>
        <span ref={spanRef} className={`absolute top-0 left-0 invisible whitespace-pre pr-2 ${textStyles ? `${textStyles}` : 'text-sm font-bold'} `}>
          {text}
        </span>
      </div>

      <div className='absolute mt-16'>
        <ErrorMessage displayError={displayError} exitError={() => exitError(setDisplayError, errorTimeoutRef)} arrowDirection='top' />
      </div>
    </div>
  );
};

export default AutoResizingInput;
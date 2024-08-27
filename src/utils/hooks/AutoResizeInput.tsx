import React, { useEffect, useState } from 'react';

interface InputProps {
  inputRef: React.RefObject<HTMLInputElement>;
  spanRef: React.RefObject<HTMLSpanElement>;
  minWidth: number;
  initialState?: string;
  inputClasses?: string;
  spanClasses?: string;
  placeholder?: string;
}

const AutoResizeInput: React.FC<InputProps> =  ({inputRef, spanRef, minWidth, initialState, inputClasses, spanClasses, placeholder}) => {

  const [text, setText] = useState(initialState || '')

  useEffect(() => {
    if (inputRef.current && spanRef.current && spanRef.current.offsetWidth >= minWidth) {
      inputRef.current.style.width = `${spanRef.current.offsetWidth + 2}px`;
    } else if (inputRef.current) {
      inputRef.current.style.width = `${minWidth}px`
    }
  }, [text]);

  return (
    <div>
      <div>
        <input 
        type='text'
        placeholder={placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
        ref={inputRef}
        className={inputClasses || `px-1 py-1 text-xl`}
        style={{ width: `${minWidth}px`}} />

        <span
          ref={spanRef}
          className={`absolute top-0 left-0 invisible whitespace-pre pr-5 ${spanClasses || 'text-xl'}`}>
          {text}
        </span>
      </div>
    </div>
  );
};

export default AutoResizeInput;


// interface AutoResizeInputProps {
//   inputRef: React.RefObject<HTMLInputElement>;
//   spanRef: React.RefObject<HTMLSpanElement>;
//   stateValue: string;
//   setStateValue: React.Dispatch<React.SetStateAction<string>>;
//   minWidth: number;
// }

// const AutoResizeInput: React.FC<AutoResizeInputProps> = ({ inputRef, spanRef, stateValue, minWidth }) => {
//   useEffect(() => {
//     if (inputRef.current && spanRef.current && spanRef.current.offsetWidth >= minWidth) {
//       inputRef.current.style.width = `${spanRef.current.offsetWidth + 2}px`;
//     } else if (inputRef.current) {
//       inputRef.current.style.width = `${minWidth}px`;
//     }
//   }, [stateValue, inputRef, spanRef, minWidth]);

//   return null;
// };

// export default AutoResizeInput;




// import { useState, useEffect } from 'react';

// const useIncreasingInput = (inputRef, spanRef, state1, state2) => {
//   // const [state1, state2] = useState<string>('');

//   useEffect(() => {
//     if (inputRef.current && spanRef.current && spanRef.current.offsetWidth >= 200) {
//       inputRef.current.style.width = `${spanRef.current.offsetWidth + 2}px`;
//     } else if (inputRef.current) {
//       inputRef.current.style.width = '200px'
//     }
//   }, []);

// };

// export default useIncreasingInput;
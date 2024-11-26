import React from 'react';
import { X, Calendar } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreateProjectForm: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-25 z-50 text-[#f3f4f6]">
      <div className="bg-[#1b1717] w-1/2 h-3/5 rounded-lg shadow-lg p-6 relative">
        <button className='fixed text-[#f3f4f6] hover:text-[#bdb6b6] hover:scale-110 transition-transform'><X onClick={onClose} /></button>
        <div className='flex justify-center'>
          <h1 className='fixed text-2xl font-semibold'>New Project</h1>
        </div>

        <form className='flex w-full h-full'>
          <div className='flex flex-col gap-10 justify-center items-center w-full h-full'>
            <input className='pl-1 p-4 h-7 w-4/5 border-b-4 border-[#262222] bg-[#1b1717] focus:border-b-4 focus:border-[#383333] outline-none' placeholder='Project name' />

            <button className='flex text-[#888] hover:text-[#bdb6b6] self-start ml-9 gap-3'><Calendar />Due Date</button>

            <input className='pl-1 p-4 h-7 w-4/5 border-b-4 border-[#262222] bg-[#1b1717] focus:border-b-4 focus:border-[#383333] outline-none' placeholder='Add members?' />
          </div>

          <div className='flex w-full h-full justify-center items-center'>
            <textarea className='w-3/4 h-3/4 p-1 pl-2 border-4 border-[#262222] focus:border-[#383333] bg-[#1b1717] resize-none outline-none text-sm  ' placeholder='Description...' />
          </div>
        </form>

      </div>
    </div>
  );
};

export default CreateProjectForm;
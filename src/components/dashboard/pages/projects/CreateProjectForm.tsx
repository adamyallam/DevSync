import React from 'react';
import { X, Calendar, Search } from 'lucide-react';

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

            <div className='flex flex-col self-start w-full ml-9'>
              <span className='text-xs ml-1 font-semibold'>Project Name:</span>
              <input className='pl-1 p-4 h-7 w-4/5 border-b-4 border-[#262222] bg-[#1b1717] focus:border-b-4 focus:border-[#bdb6b6] hover:border-[#bdb6b6] outline-none' placeholder='Name' />
            </div>

            <button className='flex text-[#888] hover:text-[#f3f4f6] self-start ml-9 gap-3'><Calendar />Due Date</button>

            <div className='flex flex-col self-start ml-9 gap-2 w-full'>
              <span className='text-xs ml-1 font-semibold'>Add members?</span>

              <div className='flex gap-2 w-4/5 text-[#403939] border-[#262222] border-b-4 hover:text-[#bdb6b6] hover:border-[#bdb6b6] pb-0.5'>
                <Search size={20}/>
                <input className='bg-[#1b1717] focus:border-[#bdb6b6] outline-none' placeholder='Search' />
              </div>
            </div>

            <button className='text-[#f3f4f6] border-2 border-gray-300 w-4/5 h-12 hover:font-semibold hover:text-[#bdb6b6] hover:border-[#bdb6b6] hover:scale-105 transition-transform'>Submit</button>
          </div>

          <div className='flex w-full h-full justify-center items-center'>
            <textarea className='w-3/4 h-3/4 p-1 pl-2 border-4 border-[#262222] focus:border-[#bdb6b6] hover:border-[#bdb6b6] bg-[#1b1717] resize-none outline-none text-sm  ' placeholder='Description...' />
          </div>
        </form>

      </div>
    </div>
  );
};

export default CreateProjectForm;
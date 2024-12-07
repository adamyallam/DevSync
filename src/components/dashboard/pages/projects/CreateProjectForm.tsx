import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { X, Calendar, Search } from 'lucide-react';
import DatePickerField from '@/components/styledElements/DatePickerField';
import { getEndOfNextMonth } from '@/utils/dateFunctions/getDateFunctions';
import useNavbarUIContext from '@/utils/hooks/context/useNavbarUIContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreateProjectForm: React.FC<Props> = ({ isOpen, onClose }) => {
  const { toggleCreateProjectForm, isCreateProjectFormOpen } = useNavbarUIContext();

  const [projectDueDate, setProjectDueDate] = useState<Date | null>(null);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [defaultView, setDefaultView] = useState('list')
  const [isNameValid, setIsNameValid] = useState(false);
  const [isDescriptionValid, setIsDescriptionValid] = useState(false);

  const changeDefaultView = (view: string) => {
    setDefaultView(view);
  };

  const createProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsNameValid(true);
    setIsDescriptionValid(true);

    if (!projectName || !projectDescription) {
      return null;
    }

    const projectData = {
      name: projectName,
      description: projectDescription,
      dueDate: projectDueDate || getEndOfNextMonth()
    };

    try {
      const res = await fetch("http://localhost:3000/api/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData)
      });

      const result = await res.json();

      if (res.status === 201) {
        console.log("Project Created:", result.project);
      } else {
        console.log('An error occured, please try again later')
      }
    } catch (error) {
      console.error("Error creating project:", error);
    }

    toggleCreateProjectForm(!isCreateProjectFormOpen)
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-25 z-50 text-[#f3f4f6]">
      <div className="bg-[#1b1717] w-3/6 h-[78%] rounded-lg shadow-lg pt-6 relative">
        <button className='fixed text-[#f3f4f6] hover:text-[#bdb6b6] hover:scale-110 transition-transform pl-7'><X onClick={onClose} /></button>
        <div className='flex justify-center'>
          <h1 className='fixed text-2xl font-semibold'>New Project</h1>
        </div>

        <form onSubmit={createProject} className='flex flex-col w-full h-full pt-6'>
          <div className='flex w-full h-[100%]'>
            <div className='flex flex-col justify-center items-center w-full h-full'>

              <div className='flex flex-col self-start w-[93%] ml-9 h-[20%]'>
                <span className='text-xs font-semibold'>* Project Name:</span>

                <input className={`pl-1 p-4 h-[10%] w-full border-b-4 bg-[#1b1717] outline-none ${isNameValid && !projectName ? "border-red-500" : projectName ? "border-[#bdb6b6]" : "border-[#262222]"} focus:border-[#bdb6b6] hover:border-[#bdb6b6]`}
                  placeholder='Name'
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>

              <div className='flex flex-col self-start ml-9 gap-2 w-[93%] h-[20%]'>
                <span className='text-xs font-semibold'>Due Date:</span>

                <div className={`group flex gap-2 w-full h-[40%] text-[#403939] border-b-4 hover:border-[#bdb6b6] hover:text-[#bdb6b6] focus-within:border-[#bdb6b6] pb-0.5 ${projectDueDate ? 'border-[#bdb6b6]' : 'border-[#262222]'}`}>
                  <Calendar className={`group-focus-within:text-[#bdb6b6] ${projectDueDate ? 'text-[#bdb6b6]' : ''}`} size={20} />
                  <DatePickerField datePickerStyles={`bg-[#1b1717] text-[#bdb6b6] outline-none focus:border-[#bdb6b6] ${projectDueDate ? 'border-[#bdb6b6]' : 'border-[#262222]'}`} selectedDate={projectDueDate} onDateChange={setProjectDueDate} />
                </div>
              </div>

              <div className='flex flex-col self-start ml-9 gap-2 w-[93%] h-[20%]'>
                <span className='text-xs font-semibold'>Add members?</span>

                <div className='group flex gap-2 w-full h-[40%] text-[#403939] border-[#262222] border-b-4 focus-within:border-[#bdb6b6] hover:text-[#bdb6b6] hover:border-[#bdb6b6] pb-0.5'>
                  <Search size={20} className='group-focus-within:text-[#bdb6b6]' />
                  <input className='bg-[#1b1717] focus:border-[#bdb6b6] outline-none' placeholder='Search' />
                </div>
              </div>

              <div className='flex flex-col self-start ml-9 gap-2 w-full h-[23%]'>
                <span className='text-xs ml-1 font-semibold'>Default View:</span>

                <div className='flex gap-3 w-full h-full'>
                  <button type='button' onClick={() => changeDefaultView('list')} className={`border-2 h-[100%] w-[21%] rounded-md text-xs ${defaultView === 'list' ? 'border-white font-bold scale-105' : 'bg-[#262222] border-[#403939] hover:border-white hover:scale-105 transition-transform'}`}>List</button>
                  <button type='button' onClick={() => changeDefaultView('overview')} className={`border-2 h-[100%] w-[21%] rounded-md text-xs ${defaultView === 'overview' ? 'border-white font-bold scale-105' : 'bg-[#262222] border-[#403939] hover:border-white hover:scale-105 transition-transform'}`}>Overview</button>
                  <button type='button' onClick={() => changeDefaultView('board')} className={`border-2 h-[100%] w-[21%] rounded-md text-xs ${defaultView === 'board' ? 'border-white font-bold scale-105' : 'bg-[#262222] border-[#403939] hover:border-white hover:scale-105 transition-transform'}`}>Board</button>
                  <button type='button' onClick={() => changeDefaultView('calendar')} className={`border-2 h-[100%] w-[21%] rounded-md text-xs ${defaultView === 'calendar' ? 'border-white font-bold scale-105' : 'bg-[#262222] border-[#403939] hover:border-white hover:scale-105 transition-transform'}`}>Calendar</button>
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-1 w-full h-full justify-center items-center'>
              <span className='text-xs ml-12 font-semibold self-start'>* Description:</span>

              <textarea className={`w-[75%] h-[80%] p-1 pl-2 border-4 resize-none outline-none text-sm bg-[#1b1717] ${isDescriptionValid && !projectDescription ? "border-red-500" : projectDescription ? "border-[#bdb6b6]" : "border-[#262222]"} focus:border-[#bdb6b6] hover:border-[#bdb6b6]`}
                placeholder='* Project Description...'
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
              />
            </div>
          </div>

          <div className='flex w-full h-[20%] justify-center'>
            <button type='submit' className='text-[#f3f4f6] border-2 border-gray-300 w-3/5 h-2/3 hover:font-semibold hover:text-[#bdb6b6] hover:border-[#bdb6b6] hover:scale-105 transition-transform'>Create Project</button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default CreateProjectForm;
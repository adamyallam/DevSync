import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { X, Calendar, Search } from 'lucide-react';
import DatePickerField from '@/components/styledElements/DatePickerField';
import { getEndOfNextMonth } from '@/utils/dateFunctions/getDateFunctions';
import useNavbarUIContext from '@/utils/hooks/context/useNavbarUIContext';
import useProjectsDataContext from '@/utils/hooks/context/useProjectDataProvider';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface Member {
  id: number
}

const CreateProjectForm: React.FC<Props> = ({ isOpen, onClose }) => {
  const { toggleCreateProjectForm, isCreateProjectFormOpen } = useNavbarUIContext();
  const { addProject } = useProjectsDataContext()

  const [projectDueDate, setProjectDueDate] = useState<Date | null>(null);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [members, setMembers] = useState<Member[]>([]);
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
      dueDate: projectDueDate || getEndOfNextMonth(),
      defaultView: defaultView,
      members: members
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
        addProject(result.project)
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
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50 text-primary-text">
      <div className="bg-primary w-3/6 h-[78%] rounded-lg shadow-lg pt-6 relative border-[3px] border-highlighted drop-shadow-2xl">
        <button className='fixed text-primary-text hover:text-secondary-text hover:scale-110 transition-transform pl-7'><X onClick={onClose} /></button>
        <div className='flex justify-center'>
          <h1 className='fixed text-2xl font-semibold'>New Project</h1>
        </div>

        <form onSubmit={createProject} className='flex flex-col w-full h-full pt-6'>
          <div className='flex w-full h-[100%]'>
            <div className='flex flex-col justify-center items-center w-full h-full'>

              <div className='flex flex-col self-start w-[93%] ml-9 h-[20%]'>
                <span className='text-xs font-semibold'>* Project Name:</span>

                <input className={`pl-1 p-4 h-[10%] w-full border-b-4 bg-primary outline-none ${isNameValid && !projectName ? "border-red-500" : projectName ? "border-primary-text" : "border-undertone"} focus:border-primary-text hover:border-primary-text`}
                  placeholder='Name'
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                />
              </div>

              <div className='flex flex-col self-start ml-9 gap-2 w-[93%] h-[20%]'>
                <span className='text-xs font-semibold'>Due Date:</span>

                <div className={`group flex gap-2 w-full h-[40%] text-undertone border-b-4 hover:border-primary-text hover:text-secondary-text focus-within:border-primary-text pb-0.5 ${projectDueDate ? 'border-primary-text' : 'border-undertone'}`}>
                  <Calendar className={`group-focus-within:text-primary-text group-hover:text-primary-text flex self-center mb-1 ${projectDueDate ? 'text-primary-text' : ''}`} size={20} />
                  <DatePickerField datePickerStyles={`w-full bg-primary text-primary-text outline-none focus:border-primary-text ${projectDueDate ? 'border-primary-text' : 'border-undertone'}`} selectedDate={projectDueDate} onDateChange={setProjectDueDate} />
                </div>
              </div>

              <div className='flex flex-col self-start ml-9 gap-2 w-[93%] h-[20%]'>
                <span className='text-xs font-semibold'>Add members:</span>

                <div className='group flex gap-2 w-full h-[40%] text-undertone border-undertone border-b-4 focus-within:border-primary-text hover:text-secondary-text hover:border-primary-text pb-0.5'>
                  <Search size={20} className='group-focus-within:text-secondary-text flex self-center' />
                  <input className='w-full bg-primary focus:border-primary-text outline-none' placeholder='Search' />
                </div>
              </div>

              <div className='flex flex-col self-start ml-9 gap-2 w-full h-[23%]'>
                <span className='text-xs ml-1 font-semibold'>Default View:</span>

                <div className='flex gap-3 w-full h-full'>
                  <button type='button' onClick={() => changeDefaultView('list')} className={`border-2 h-[100%] w-[21%] rounded-md text-xs ${defaultView === 'list' ? 'border-primary-text font-bold scale-105 bg-selected' : 'bg-highlighted border-undertone hover:border-primary-text hover:scale-105 transition-transform'}`}>List</button>
                  <button type='button' onClick={() => changeDefaultView('overview')} className={`border-2 h-[100%] w-[21%] rounded-md text-xs ${defaultView === 'overview' ? 'border-primary-text font-bold scale-105 bg-selected' : 'bg-highlighted border-undertone hover:border-primary-text hover:scale-105 transition-transform'}`}>Overview</button>
                  <button type='button' onClick={() => changeDefaultView('board')} className={`border-2 h-[100%] w-[21%] rounded-md text-xs ${defaultView === 'board' ? 'border-primary-text font-bold scale-105 bg-selected' : 'bg-highlighted border-undertone hover:border-primary-text hover:scale-105 transition-transform'}`}>Board</button>
                  <button type='button' onClick={() => changeDefaultView('calendar')} className={`border-2 h-[100%] w-[21%] rounded-md text-xs ${defaultView === 'calendar' ? 'border-primary-text font-bold scale-105 bg-selected' : 'bg-highlighted border-undertone hover:border-primary-text hover:scale-105 transition-transform'}`}>Calendar</button>
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-1 w-full h-full justify-center items-center'>
              <span className='text-xs ml-12 font-semibold self-start'>* Description:</span>

              <textarea className={`w-[75%] h-[80%] p-1 pl-2 border-4 resize-none outline-none text-sm bg-primary ${isDescriptionValid && !projectDescription ? "border-red-500" : projectDescription ? "border-primary-text" : "border-undertone"} focus:border-primary-text hover:border-primary-text`}
                placeholder='* Project Description...'
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
              />
            </div>
          </div>

          <div className='flex w-full h-[20%] justify-center'>
            <button type='submit' className='text-primary-text border-2 border-gray-300 w-3/5 h-2/3 hover:font-semibold hover:text-secondary-text hover:border-secondary-text hover:scale-105 transition-transform'>Create Project</button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default CreateProjectForm;
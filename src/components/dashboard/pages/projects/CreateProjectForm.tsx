import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { X, Calendar, Search } from 'lucide-react';
import DatePickerField from '@/components/styledElements/DatePickerField';
import { getEndOfNextMonth } from '@/utils/dateFunctions/getDateFunctions';
import useNavbarUIContext from '@/utils/hooks/context/useNavbarUIContext';
import useProjectsDataContext from '@/utils/hooks/context/useProjectDataProvider';
import { useRef } from 'react';

interface ProjectData { name: string; description: string; dueDate: Date | null; defaultView: string }

const CreateProjectForm = () => {
  const { toggleCreateProjectForm, isCreateProjectFormOpen } = useNavbarUIContext();
  const { addProject, showError, exitError } = useProjectsDataContext()

  const initialState: ProjectData = {
    name: '',
    description: '',
    dueDate: getEndOfNextMonth(),
    defaultView: 'list',
  }

  const [projectData, setProjectData] = useState<ProjectData>(initialState)
  const [isNameValid, setIsNameValid] = useState(false);
  const [isDescriptionValid, setIsDescriptionValid] = useState(false);
  
  const [displayError, setDisplayError] = useState(false);
  const errorTimeoutRef = useRef<number | null>(null);

  const updateProjectData = (property: keyof ProjectData, newValue: string | Date | null) => {
    setProjectData((prevData) => ({
      ...prevData,
      [property]: newValue,
    }));
  }

  const handleClose = () => {
    toggleCreateProjectForm(!isCreateProjectFormOpen)
    setProjectData(initialState)
    setDisplayError(false)
  }

  const createProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsNameValid(true);
    setIsDescriptionValid(true);

    if (!projectData.name || !projectData.description) {
      return null;
    }

    try {
      const res = await fetch("http://localhost:3000/api/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData)
      });

      if (!res.ok) { throw new Error('Failed to update project') }

      const result = await res.json();

      addProject(result.project)
      setIsNameValid(false);
      setIsDescriptionValid(false);
      toggleCreateProjectForm(!isCreateProjectFormOpen)
      setProjectData(initialState)
      console.log("Project Created:", result.project);
    } catch (error) {
      showError(setDisplayError, errorTimeoutRef)
      console.error("Error creating project:", error);
    }
  };

  if (!isCreateProjectFormOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50 text-primary-text">
      <div className="bg-primary w-3/6 h-[78%] rounded-lg shadow-lg pt-6 relative border-[3px] border-highlighted drop-shadow-2xl">
        <button className='fixed text-primary-text hover:text-secondary-text hover:scale-110 transition-transform pl-7'><X onClick={handleClose} /></button>
        <div className='flex justify-center'>
          <h1 className='fixed text-2xl font-semibold'>New Project</h1>
        </div>

        {displayError ? (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-red-500 text-lg font-semibold">Error occurred, please try again.</p>

            <button onClick={() => exitError(setDisplayError, errorTimeoutRef)} className="mt-4 text-primary-text border-2 border-gray-300 px-4 py-2 hover:font-semibold hover:text-secondary-text hover:border-secondary-text hover:scale-105 transition-transform">
              Try again...
            </button>
          </div>
        ) : (
          <form onSubmit={createProject} className='flex flex-col w-full h-full pt-6'>
            <div className='flex w-full h-[100%]'>
              <div className='flex flex-col justify-center items-center w-full h-full'>

                <div className='flex flex-col self-start w-[93%] ml-9 h-[20%]'>
                  <span className='text-xs font-semibold'>* Project Name:</span>

                  <input className={`pl-1 p-4 h-[10%] w-full border-b-4 bg-primary outline-none ${isNameValid && !projectData.name ? "border-red-500" : projectData.name ? "border-primary-text" : "border-undertone"} focus:border-primary-text hover:border-primary-text`}
                    placeholder='Name'
                    value={projectData.name}
                    onChange={(e) => updateProjectData('name', e.target.value)}
                  />
                </div>

                <div className='flex flex-col self-start ml-9 gap-2 w-[93%] h-[20%]'>
                  <span className='text-xs font-semibold'>Due Date:</span>

                  <div className={`group flex gap-2 w-full h-[40%] text-undertone border-b-4 hover:border-primary-text hover:text-secondary-text focus-within:border-primary-text pb-0.5 ${projectData.dueDate ? 'border-primary-text' : 'border-undertone'}`}>
                    <Calendar className={`group-focus-within:text-primary-text group-hover:text-primary-text flex self-center mb-1 ${projectData.dueDate ? 'text-primary-text' : ''}`} size={20} />
                    <DatePickerField datePickerStyles={`w-full bg-primary text-primary-text outline-none focus:border-primary-text ${projectData.dueDate ? 'border-primary-text' : 'border-undertone'}`} selectedDate={projectData.dueDate} onDateChange={(date) => updateProjectData('dueDate', date)} />
                  </div>
                </div>

                <div className='flex flex-col self-start ml-9 gap-2 w-full h-[23%]'>
                  <span className='text-xs ml-1 font-semibold'>Default View:</span>

                  <div className='flex gap-3 w-full h-full'>
                    <button type='button' onClick={() => updateProjectData('defaultView', 'list')} className={`border-2 h-[100%] w-[21%] rounded-md text-xs ${projectData.defaultView === 'list' ? 'border-primary-text font-bold scale-105 bg-selected' : 'bg-highlighted border-undertone hover:border-primary-text hover:scale-105 transition-transform'}`}>List</button>
                    <button type='button' onClick={() => updateProjectData('defaultView', 'overview')} className={`border-2 h-[100%] w-[21%] rounded-md text-xs ${projectData.defaultView === 'overview' ? 'border-primary-text font-bold scale-105 bg-selected' : 'bg-highlighted border-undertone hover:border-primary-text hover:scale-105 transition-transform'}`}>Overview</button>
                    <button type='button' onClick={() => updateProjectData('defaultView', 'board')} className={`border-2 h-[100%] w-[21%] rounded-md text-xs ${projectData.defaultView === 'board' ? 'border-primary-text font-bold scale-105 bg-selected' : 'bg-highlighted border-undertone hover:border-primary-text hover:scale-105 transition-transform'}`}>Board</button>
                    <button type='button' onClick={() => updateProjectData('defaultView', 'calendar')} className={`border-2 h-[100%] w-[21%] rounded-md text-xs ${projectData.defaultView === 'calendar' ? 'border-primary-text font-bold scale-105 bg-selected' : 'bg-highlighted border-undertone hover:border-primary-text hover:scale-105 transition-transform'}`}>Calendar</button>
                  </div>
                </div>
              </div>

              <div className='flex flex-col gap-1 w-full h-full justify-center items-center'>
                <span className='text-xs ml-12 font-semibold self-start'>* Description:</span>

                <textarea className={`w-[75%] h-[80%] p-1 pl-2 border-4 resize-none outline-none text-sm bg-primary ${isDescriptionValid && !projectData.description ? "border-red-500" : projectData.description ? "border-primary-text" : "border-undertone"} focus:border-primary-text hover:border-primary-text`}
                  placeholder='* Project Description...'
                  value={projectData.description}
                  onChange={(e) => updateProjectData('description', e.target.value)}
                />
              </div>
            </div>

            <div className='flex w-full h-[20%] justify-center'>
              <button type='submit' className='text-primary-text border-2 border-gray-300 w-3/5 h-2/3 hover:font-semibold hover:text-secondary-text hover:border-secondary-text hover:scale-105 transition-transform'>Create Project</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateProjectForm;
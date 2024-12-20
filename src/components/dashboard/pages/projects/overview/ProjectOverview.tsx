"use client"
import { Plus } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import useNavbarUIContext from "@/utils/hooks/context/useNavbarUIContext";
import useProjectsDataContext from "@/utils/hooks/context/useProjectDataProvider";

//Component imports
import AutoResizingInput from "@/components/styledElements/AutoResizingInput";


export const ProjectOverview = () => {
  const { id } = useParams();
  const { projects, updateProject } = useProjectsDataContext();
  const { isSidebarOpen } = useNavbarUIContext()

  const project = projects?.find((project) => project.id.toString() === id);

  const [value, setValue] = useState(project?.description || '');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSeeLess, setShowSeeLess] = useState(false);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setIsExpanded(false)
  }, [isSidebarOpen])

  useEffect(() => {
    setValue(`${project?.description || ''}`);
  }, [project?.description]);

  const updateProjectProperty = async (property: 'description' | 'descriptionTitle', newValue: string) => {
    if (!project || newValue === project[property]) return;

    try {
      const res = await fetch(`http://localhost:3000/api/project`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: project.id,
          [property]: newValue,
        }),
      });

      if (res.ok) {
        updateProject(project.id, { [property]: newValue });
        console.log(`Project ${property} updated, new ${property}:`, newValue);
      } else {
        console.error(`Failed to update project ${property}`);
      }
    } catch (err) {
      console.error(`Error updating project ${property}:`, err);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
    if (textAreaRef.current) {
      setShowSeeLess(textAreaRef.current.scrollHeight > 224);
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className="relative flex flex-col ml-20 mt-8 h-full gap-2">
      <AutoResizingInput
        textSize="text-lg"
        initialWidth={200}
        maxGrowthWidth={725}
        onConfirmChange={updateProjectProperty}
        placeholder="Project Description..."
        initialText={project?.descriptionTitle}
      />

      <div className="flex flex-col w-full relative">
        <textarea
          ref={textAreaRef}
          value={value}
          maxLength={3000}
          onFocus={() => setIsExpanded(true)}
          onChange={handleChange}
          onBlur={() => updateProjectProperty('description', value)}
          className={`resize-none text-sm w-4/5 h-auto max-h-[225px] ml-0.5 ${!isExpanded ? "max-h-[225px]" : "max-h-none"} overflow-hidden outline-none bg-secondary placeholder-secondary-text text-primary-text hover:outline hover:outline-2 hover:outline-undertone focus:outline-2 focus:outline-secondary-text rounded-sm p-1`}
          placeholder="Type your description, welcome message, or project info here!"
          style={{ minHeight: "150px" }}
        />
        {!isExpanded && showSeeLess &&
          <div className="absolute bottom-4 w-[80.5%] h-[45px] pointer-events-none bg-gradient-to-t from-secondary via-secondary/75 via-100% to-transparent" />
        }
        {showSeeLess &&
          <button onClick={() => setIsExpanded(isExpanded ? false : true)} className="self-start font-semibold text-sm text-[#02BDFF] opacity-70 hover:scale-110 hover:opacity-100 transition-transform ml-0.5">
            {isExpanded ? 'See Less' : 'See More'}
          </button>
        }
      </div>

      <div className="h-full pb-10">
        <h1 className="text-xl mt-10">Project Roles & Members</h1>

        <div className="flex gap-16 ml-5">
          <button className="flex items-center gap-3">
            <div className="flex justify-center items-center border-2 border-dashed rounded-full border-gray-300 w-9 h-9 mt-6">
              <Plus color="gray" size={18} strokeWidth={2} />
            </div>
            <span className="mt-6">Add Member</span>
          </button>

          <button className="flex items-center gap-2">
            <div className="border-2 rounded-full border-red-400 bg-red-500 w-10 h-10 mt-6" />

            <div className="flex flex-col items-start mt-6">
              <span className="text-sm">Name Placeholder</span>
              <span className="text-xs text-gray-400">Role Placeholder</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProjectOverview
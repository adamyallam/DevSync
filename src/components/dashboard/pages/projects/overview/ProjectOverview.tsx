"use client"
import { Plus } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import useNavbarUIContext from "@/utils/hooks/context/useNavbarUIContext";
import useProjectsDataContext from "@/utils/hooks/context/useProjectDataProvider";
import { OverviewSkeletonLoader } from "@/components/styledElements/LoadingElements";
import AutoResizingInput from "@/components/styledElements/AutoResizingInput";
import ErrorMessage from "@/components/styledElements/ErrorMessage";



export const ProjectOverview = () => {
  const { id } = useParams();
  const { projects, loading, updateProjectDatabase, showError, exitError } = useProjectsDataContext();
  const { isSidebarOpen } = useNavbarUIContext()

  const project = projects?.find((project) => project.id.toString() === id);

  const [value, setValue] = useState(project?.description || '');
  const [originalValue, setOriginalValue] = useState(project?.description || '');
  const [isExpanded, setIsExpanded] = useState(false);
  const [showSeeLess, setShowSeeLess] = useState(false);
  const [displayError, setDisplayError] = useState(false);

  const errorTimeoutRef = useRef<number | null>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setIsExpanded(false)
  }, [isSidebarOpen])

  useEffect(() => {
    setValue(`${project?.description || ''}`);
    setOriginalValue(`${project?.description || ''}`);
  }, [project?.description]);

  if (loading) {
    return (
      <div className=''>
        <OverviewSkeletonLoader />
      </div>
    )
  }

  if (!project) {
    return <div />;
  }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
    if (textAreaRef.current) {
      setShowSeeLess(textAreaRef.current.scrollHeight > 224);
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  const handleBlur = async () => {
    const previousValue = originalValue

    try {
      await updateProjectDatabase(project, 'description', value)
      setOriginalValue(value);
    } catch {
      setValue(previousValue);
      showError(setDisplayError, errorTimeoutRef)
    }
  }

  return (
    <div className="relative flex flex-col ml-20 mt-8 h-full gap-2">
      <AutoResizingInput
        textStyles="text-lg"
        initialWidth={200}
        maxGrowthWidth={725}
        onConfirmChange={(newName) => updateProjectDatabase(project, 'descriptionTitle', newName)}
        placeholder="Project Description..."
        initialText={project.descriptionTitle}
      />

      <div className="flex flex-col w-full relative">
        <textarea
          ref={textAreaRef}
          value={value}
          maxLength={3000}
          onFocus={() => setIsExpanded(true)}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`resize-none text-sm w-4/5 h-auto max-h-[225px] ml-0.5 ${!isExpanded ? "max-h-[225px]" : "max-h-none"} overflow-hidden outline outline-undertone bg-secondary placeholder-secondary-text text-primary-text hover:outline hover:outline-2 hover:outline-undertone focus:outline-2 focus:outline-secondary-text rounded-sm p-1`}
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

        <div className="absolute bottom-1 left-2">
          <ErrorMessage displayError={displayError} exitError={() => exitError(setDisplayError, errorTimeoutRef)} />
        </div>
      </div>
    </div>
  )
}

export default ProjectOverview
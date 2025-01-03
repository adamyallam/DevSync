'use client'
import { useParams } from "next/navigation";
import { useState, useRef} from "react";
import { Star } from "lucide-react";
import useProjectsDataContext from "@/utils/hooks/context/useProjectDataProvider";
import ErrorMessage from "./ErrorMessage";

interface Props {favorited: boolean;}

export const FavoritedButton: React.FC<Props> = ({ favorited }) => {
  const { id } = useParams()
  const { projects, updateProjectDatabase, exitError, showError } = useProjectsDataContext()

  const project = projects?.find((project) => project.id.toString() === id);

  const [displayError, setDisplayError] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false);

  const errorTimeoutRef = useRef<number | null>(null);

  const toggleFavorite = async () => {
    if (!project) return;
    setIsDisabled(true);

    try {
      await updateProjectDatabase(project, 'favorited', !favorited)
    } catch { 
      showError(setDisplayError, errorTimeoutRef)
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center z-20">
      <button disabled={isDisabled} onClick={toggleFavorite}>
        <Star className={`scale-95 hover:scale-105 transition-transform ${favorited ? 'fill-[#FFD737] text-[#FFD737]' : 'text-secondary-text'}`} strokeWidth={1.5} size={21} />
      </button>
      <div className="absolute mt-14">
        <ErrorMessage displayError={displayError} exitError={() => exitError(setDisplayError, errorTimeoutRef)} arrowDirection='top' />
      </div>
    </div>
  );
};

export default FavoritedButton
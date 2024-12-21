'use client'
import { useParams } from "next/navigation";
import { useState } from "react";
import { Star } from "lucide-react";
import useProjectsDataContext from "@/utils/hooks/context/useProjectDataProvider";

interface Props {favorited: boolean;}

export const FavoritedButton: React.FC<Props> = ({ favorited }) => {
  const { id } = useParams()
  const { projects, updateProjectProperty } = useProjectsDataContext()

  const project = projects?.find((project) => project.id.toString() === id);
  const [isDisabled, setIsDisabled] = useState(false);

  const toggleFavorite = async () => {
    if (!project) return;
    setIsDisabled(true);

    try {
      await updateProjectProperty(project, 'favorited', !favorited)
    } catch { 
      console.log('Failed to update project favorite status')
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <>
      <button disabled={isDisabled} onClick={toggleFavorite}>
        <Star className={`scale-95 hover:scale-105 transition-transform ${favorited ? 'fill-[#FFD737] text-[#FFD737]' : 'text-secondary-text'}`} strokeWidth={1.5} size={21} />
      </button>
    </>
  );
};

export default FavoritedButton
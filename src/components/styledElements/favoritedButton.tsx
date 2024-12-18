'use client'
import { useParams } from "next/navigation";
import { useState } from "react";
import { Star } from "lucide-react";
import useProjectsDataContext from "@/utils/hooks/context/useProjectDataProvider";

export const FavoritedButton = () => {
  const { id } = useParams()
  const { projects } = useProjectsDataContext()

  const project = projects?.find((project) => project.id.toString() === id);
  const [favorited, setFavorited] = useState(project?.favorited)
  const [isDisabled, setIsDisabled] = useState(false);

  const toggleFavorite = async () => {
    if (!project || isDisabled) return;

    setIsDisabled(true);

    try {
      const res = await fetch(`http://localhost:3000/api/project`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: project.id,
          favorited: !favorited,
        }),
      });

      if (res.ok) {
        setFavorited((prev) => !prev);
        setIsDisabled(false)
      } else {
        console.error('Failed to update favorite status');
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
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
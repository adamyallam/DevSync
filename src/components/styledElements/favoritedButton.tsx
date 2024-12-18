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
  const [hoverClasses, setHoverClasses] = useState(false)
  const [loading, setLoading] = useState(false)

  const toggleFavorite = async () => {
    if (!project || isDisabled) return;

    setLoading(true)
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
        setLoading(false)
        setHoverClasses(true)
      } else {
        console.error('Failed to update favorite status');
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
    } finally {
      setTimeout(() => { setIsDisabled(false), setHoverClasses(false) }, 3000);
    }
  };


  return (
    <>
      <button disabled={isDisabled} onClick={toggleFavorite} className={`group`}>
        {loading ?
          <Star className={`animate-spin-custom ${favorited ? 'fill-[#FFD737] text-[#FFD737] scale-110' : 'text-secondary-text scale-95'}`} strokeWidth={1.5} size={21} />
          :
          <Star
            strokeWidth={1.5}
            size={21}
            className={
              `${favorited ? `fill-[#FFD737] text-[#FFD737] scale-110 ${hoverClasses ? '' : 'group-hover:fill-none group-hover:text-secondary-text group-hover:scale-95'}`
              :
              `text-secondary-text scale-95 ${hoverClasses ? '' : 'group-hover:fill-[#FFD737] group-hover:scale-110 group-hover:text-[#FFD737]'}`} transition-transform`}
          />
        }

      </button>
    </>
  );
};

export default FavoritedButton
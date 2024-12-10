'use client'
import { useParams } from "next/navigation";
import { useState } from "react";
import { Star } from "lucide-react";
import useProjectsDataContext from "@/utils/hooks/context/useProjectDataProvider";

export const FavoritedButton = () => {
  const { id } = useParams()
  const { projects, loading } = useProjectsDataContext()

  const project = projects?.find((project) => project.id.toString() === id);
  const [favorited, setFavorited] = useState(project?.favorited)

  const toggleFavorite = () => {

    fetch(`http://localhost:3000/api/project`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ favorited: !favorited }),
    })
      .then((res) => {
        if (res.ok) {
          setFavorited((prev) => !prev);
        } else {
          console.error('Failed to update favorite status');
        }
      })
      .catch((err) => console.error(err))
  };


  return (
    <>
      <button onClick={toggleFavorite} className={`${favorited ? 'text-[#FFD737]' : 'hover:scale-110 hover:text-[#BD9F29] transition-transform'} `}>
        <Star className={`${favorited ? 'fill-[#FFD737] hover:scale-105 transition-all hover:text-[#BD9F29]' : ''}`} strokeWidth={1.5} size={21} />
      </button>
    </>
  );
};

export default FavoritedButton
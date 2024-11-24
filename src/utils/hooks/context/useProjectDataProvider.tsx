import { useContext } from "react";
import { ProjectsDataContext } from "@/components/dashboard/context/ProjectsDataProvider";

const useProjectsDataContext = () => {
  const context = useContext(ProjectsDataContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectsDataProvider');
  }
  return context;
};

export default useProjectsDataContext
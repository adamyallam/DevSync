import AutoResizingInput from '@/components/styledElements/AutoResizingInput';
import useProjectsDataContext from '@/utils/hooks/context/useProjectDataProvider';
import { useParams } from 'next/navigation';
import useNavbarUIContext from '@/utils/hooks/context/useNavbarUIContext';
import useCalendarUIContext from '@/utils/hooks/context/useCalendarUIContext';

interface Props {
  taskName: string,
  taskId: number,
  createTask?: () => void,
  focusTask?: boolean
}

export const CalendarTask: React.FC<Props> = ({ taskName, taskId, createTask, focusTask }) => {
  const { projects, updateTaskDatabase } = useProjectsDataContext()
  const { isSidebarOpen } = useNavbarUIContext()
  const {isWeekendShowing, weekOrMonth } = useCalendarUIContext()
  const { id } = useParams<{ id: string }>()

  const project = projects?.find((project) => project.id.toString() === id);
  const task = project?.tasks?.find((task) => task.id === taskId);

  if (!project || !task) return <div className='border-2 border-primary'>No task found</div>;

  return (
    <div className='pb-2'>
      <AutoResizingInput initialWidth={150} maxGrowthWidth={isSidebarOpen ? (isWeekendShowing ? 165 : 215) : (isWeekendShowing ? 190 : 255)} placeholder='Name...' centerText={true} initialText={taskName} textStyles={weekOrMonth === 'Week' ? 'text-sm' : 'text-xs'} onConfirmChange={(newName) => updateTaskDatabase(task, project, 'name', newName)} />
    </div>
  );
};

export default CalendarTask;
'use client'
import { Filter, ArrowUpDown, Plus } from "lucide-react";

interface Props {
  showFilterSort?: boolean
}

export const AddTaskHeaderButton: React.FC<Props> = ({showFilterSort = true}) => {

  return (
    <div className="mb-2 mt-2">
      <div className="flex justify-between">
        <div className="ml-8 ">
          <div>
            <button className="flex items-center gap-0.5 border-2 border-primary hover:bg-selected hover:scale-105 transition-transform font-semibold rounded-sm p-1.5 pr-2 text-xs text-white"><Plus strokeWidth={3} size={13}/>Add task</button>
          </div>
        </div>
        
        {showFilterSort && (
          <div className="flex justify-end gap-5 mr-10">
            <button className="flex items-center gap-1 text-primary-text"><Filter size={16}/>Filter</button>
            <button className="flex items-center gap-1 text-primary-text"><ArrowUpDown size={16}/>Sort</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddTaskHeaderButton
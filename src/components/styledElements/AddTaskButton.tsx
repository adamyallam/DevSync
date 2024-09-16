'use client'
import { Filter, ArrowUpDown, Plus } from "lucide-react";

export const AddTaskButton = () => {

  return (
    <div className="mb-4">
      <div className="grid grid-cols-2">
        <div className="ml-8 mt-4">
          <div>
            <button className="flex items-center gap-1 border-2 bg-blue-500 w-w-22 h-9 rounded-md p-1 text-sm text-white"><Plus size={16}/>Add task</button>
          </div>
        </div>

        <div className="flex justify-end gap-5 mt-4 mr-10">
          <button className="flex items-center gap-1"><Filter size={16}/>Filter</button>
          <button className="flex items-center gap-1"><ArrowUpDown size={16}/>Sort</button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskButton
'use client'
import { Plus } from "lucide-react";

interface Props {
  addSection: () => void
}

export const AddSectionButton = () => {

  return (
    <div className="mb-2 mt-2">
      <div className="flex justify-between">
        <div className="ml-8 ">
          <div>
            <button onClick={AddSectionButton} className="flex items-center gap-0.5 border-2 border-primary hover:bg-button-hover hover:scale-105 transition-transform font-semibold rounded-sm p-1.5 pr-2 text-xs text-white"><Plus strokeWidth={3} size={13} />Add Section</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSectionButton
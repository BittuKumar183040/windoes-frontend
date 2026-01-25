import { useEffect, useState } from "react";
import TextInput from "../../../components/ui/input/TextInput";


const Addons = ({ onNext }: { onNext: () => void }) => {

  return (
    <div className="relative flex flex-wrap h-full w-full">
      <div className="w-1/2 flex items-center justify-center opacity-80">
        <img src="/signup/terms.png" />
      </div>

      <div className="w-1/2 flex flex-col h-full gap-8 justify-center">
        <p className=' text-2xl font-bold text-black'>Let's customize your experience</p>
        <div className="overflow-auto flex-1">

          <p className="text-md text-black/50">
            Select all the ways you plan to use your device to get personalized tips, ads, and recommentations within Windoes experience. You can always change this in Settings.
          </p>
          <div className="overflow-auto flex-1 mt-4 flex font-semibold justify-end gap-4 flex-col text-gray-600">
            
          </div>
        </div>

        <div className=' flex gap-4 justify-end'>
          <button
            className={`p-4 px-16 text-xl rounded-lg shadow-xl text-white font-medium bg-linear-to-r from-blue-500 to-blue-600 `}
            onClick={onNext}
          >
            Finish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Addons;

import { useState } from "react";
import Window from "../../components/ui/common/Window";
import Canvas from "./Canvas";
import type { AppConfig } from "../../Windows/Desktop";

const Menubar = () => {
  return (
    <header className="flex justify-center px-2 min-h-[33px] text-black bg-linear-to-r from-[#d0dde6] to-[#e8e8e8] border-b border-gray-200">
      <div className="flex gap-3">
        <button className="px-5 h-full text-xl rounded-md hover:bg-gray-200/80 transition-all">
          File
        </button>
        <button className="px-5 h-full text-xl rounded-md hover:bg-gray-200/80 transition-all">
          Edit
        </button>
        <button className="px-5 h-full text-xl rounded-md hover:bg-gray-200/80 transition-all">
          View
        </button>
      </div>
      <div className="flex flex-1" />
    </header>
  );
};

interface paintProps {
  isActive: boolean;
  onClose: () => void;
  onActive: () => void;
  onMinimize: () => void;
  app: AppConfig;
}


const Paint: React.FC<paintProps> = ({ isActive, onClose, onActive, onMinimize, app }) => {

  const [showCloseDialog, setShowCloseDialog] = useState(false);

  const handleSave = () => {
    setShowCloseDialog(false);
  };


  const handleCancel = () => {
    setShowCloseDialog(false);
  };

  return (
    <Window
      isActive={isActive}
      onClose={()=>setShowCloseDialog(true)}
      onActive={onActive}
      onMinimize={onMinimize}
      minHeight={190}
      minWidth={250}
      windowTitle={app.name}
      titleHeight={28}
      Title={<div className="flex items-center gap-3 h-full">
          <img src="icons/paint.png" className="no-drag size-7" />
          <div className="text-lg whitespace-nowrap text-black">Untitled - Paint</div>
        </div>
      }
    >
      <Menubar />
      <Canvas />

      {/* <Footer text={textNormal} cursor={cursor} /> */}

      {showCloseDialog && (
        <div className="absolute flex items-center justify-center h-full w-full bg-black/20 text-black">
          <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
            <div className="flex flex-col gap-4 p-[25px]">
              <p className="text-2xl font-semibold">Do you want to save your work?</p>
              <p className="text-lg">
                There are unsaved changes in "Untitled".
              </p>
            </div>
            <div className="flex gap-2 bg-[#f3f3f3] border-t border-gray-300 p-6">
              <button
                onClick={handleSave}
                className="flex items-center justify-center text-lg font-medium w-[128px] h-[30px] rounded-md bg-[#5d6e79] text-white hover:bg-[#5d6e79]/90 active:bg-[#5d6e79]/70 transition"
              >
                Save
              </button>
              <button
                onClick={onClose}
                className="flex items-center justify-center text-lg font-medium w-[128px] h-[30px] rounded-md bg-[#f6f6f6] text-black border border-b-2 border-gray-300 hover:bg-[#e7e7e7] active:bg-[#dcdcdc] transition"
              >
                Don't save
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center justify-center text-lg font-medium w-[128px] h-[30px] rounded-md bg-[#f6f6f6] text-black border border-b-2 border-gray-300 hover:bg-[#e7e7e7] active:bg-[#dcdcdc] transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Window>
  );
};

export default Paint;

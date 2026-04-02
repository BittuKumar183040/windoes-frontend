import { Minus, Square, X } from 'lucide-react'
import { useSelector } from 'react-redux';
import type { RootState } from '../../../../store';

const Titlebar = ({ Title = <p></p>, height, onClose, onMaximize, onMinimize}: { 
    Title: React.ReactNode; 
    height: number
    onClose: () => void;
    onMaximize: () => void;
    onMinimize: () => void;
  }) => {
  const titleColor = useSelector((state: RootState) => state.globalSettings.titleColor);
  return (
    <div
      style={{height: height + "px", minHeight: height + "px", ...titleColor.style}}
      className={` relative window-titlebar ${titleColor.value} px-2 pr-44 select-none cursor-move`}
      onDoubleClick={onMaximize}
    >
      {Title}
      <div className=' absolute right-0 top-0 flex items-center'>
        <button 
          onClick={onMinimize}
          className={` h-10 w-15 flex items-center justify-center hover:bg-gray-300/80 ${titleColor.theme === "dark" ? "hover:bg-gray-700/80" : ""}`}>
          <Minus size={11} />
        </button>
        <button
          onClick={onMaximize} 
          className={` h-10 w-15 flex items-center justify-center hover:bg-gray-300/80 ${titleColor.theme === "dark" ? "hover:bg-gray-700/80" : ""}`}>
          <Square size={12} />
        </button>
        <button 
          onClick={onClose} 
          className={`h-10 w-16 flex items-center justify-center bg-transparent hover:bg-[#c42b1c] hover:text-white transition-colors duration-150 ${titleColor.theme === "dark" ? "dark:hover:bg-[#c42b1c]" : ""}`}>
          <X size={18} strokeWidth={1} /></button>
      </div>
    </div>
  )
}

export default Titlebar
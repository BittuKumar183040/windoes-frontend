import { Minus, Square, X } from 'lucide-react'

const Titlebar = ({ Title = <p></p>, height, onClose, onMaximize, onMinimize}: { 
    Title: React.ReactNode; 
    height: number
    onClose: () => void;
    onMaximize: () => void;
    onMinimize: () => void;
  }) => {
  return (
    <div
      style={{height: height + "px", minHeight: height + "px"}}
      className={` relative window-titlebar bg-linear-to-r from-[#d0dde6] to-[#e8e8e8] 
        px-2 pr-44 select-none cursor-move`}
      onDoubleClick={onMaximize}
    >
      {Title}
      <div className=' absolute right-0 top-0 flex items-center text-black'>
        <button 
          onClick={onMinimize}
          className=" h-10 w-15 flex items-center justify-center hover:bg-gray-300/80">
          <Minus size={11} />
        </button>
        <button
          onClick={onMaximize} 
          className=" h-10 w-15 flex items-center justify-center hover:bg-gray-300/80">
          <Square size={12} />
        </button>
        <button 
          onClick={onClose} 
          className="h-10 w-16 flex items-center justify-center bg-transparent hover:bg-[#c42b1c] hover:text-white transition-colors duration-150">
          <X size={18} strokeWidth={1} /></button>
      </div>
    </div>
  )
}

export default Titlebar
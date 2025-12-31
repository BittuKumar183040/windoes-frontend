import { ChevronRight } from 'lucide-react';
import { useState, type ReactNode } from 'react'

interface WindowProps {
  children: ReactNode;
}

const DetailDropdown = ( {children}: WindowProps ) => {
  const [isShown, setIsShown] = useState<boolean>(true);

  return (
    <section className=' w-full m-1.5 mt-3 mr-0'>
      <button onDoubleClick={()=>setIsShown(!isShown)} className=' flex gap-2 p-2 items-center bg-white hover:bg-sky-100 w-full'>
        <ChevronRight size={18} className={` opacity-50 hover:opacity-100 -mr-2 ${isShown && ' rotate-90' }`} />
        <p className=' text-xl text-[#1f238e]'>Devices and drives</p>
      </button>
      {children}
    </section>
  )
}

export default DetailDropdown
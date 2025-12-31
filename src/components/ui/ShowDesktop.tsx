import React, { useRef, useState } from 'react'
import ToolTipNavbar from './ToolTipNavbar';

type ShowDesktopProps = {
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const ShowDesktop: React.FC<ShowDesktopProps> = ({ onClick }) => {
  const showDeskRef = useRef<HTMLDivElement>(null);
  const [showTip, setShowTip] = useState<boolean>(false)
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(e);
  };

  return (<>
    <ToolTipNavbar
      anchorRef={showDeskRef}
      visible={showTip}
      placement="top"
    >
      <p>Show desktop</p>
    </ToolTipNavbar>
    <div
      ref={showDeskRef}
      onMouseEnter={()=> setShowTip(true)}
      onMouseLeave={()=> setShowTip(false)}
      onClick={handleClick}
      className=' flex items-center h-full p-1.5 pl-2 group'>
      <div className=' w-px h-6 group-hover:bg-black/40 '></div>
    </div>
  </>
  )
}

export default ShowDesktop
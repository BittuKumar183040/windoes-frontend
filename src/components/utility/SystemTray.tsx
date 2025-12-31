import React from 'react'
import { TASKBAR_ICON_SIZE_BOUND, TASKBAR_SYSTEM_TRAY_ICON_SIZE } from '../../config/setting';
import { ChevronUp } from 'lucide-react';

type SystemTrayProps = {
  active?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const SystemTray: React.FC<SystemTrayProps> = ({ active, onClick }) => {

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(e);
  };

  return (
    <div
      onClick={handleClick}
      style={{
        height: TASKBAR_ICON_SIZE_BOUND,
        width: 30
      }}
      className={`text-black flex gap-3 justify-center items-center
        rounded tracking-wider
        ${active ? "bg-white/30" : "bg-white/0"}
        hover:bg-white/50 transition-colors duration-200 ease-in-out
    `}>
      <ChevronUp size={TASKBAR_SYSTEM_TRAY_ICON_SIZE} />
    </div>
  );
}

export default SystemTray;
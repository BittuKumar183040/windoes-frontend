import React from "react";
import { TASKBAR_ICON_SIZE, TASKBAR_ICON_SIZE_BOUND } from "../../config/setting";

type ApplicationIconProps = {
  icon: string;
  name: string;
  active: boolean;
  isClosed: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const ApplicationButton: React.FC<ApplicationIconProps> = ({
  icon,
  name,
  active,
  isClosed,
  isMinimized,
  isMaximized,
  onClick,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(e);
  };
  // console.log(name, " = ", "active :", active ,"isClosed :", isClosed, "isMini :", isMinimized, "isMax :", isMaximized)

  let indicatorWidthClass = "w-1.5";
  if (active) indicatorWidthClass = "w-4";
  else if (isMinimized) indicatorWidthClass = "w-1.5";
  else if (isMaximized) indicatorWidthClass = "w-2"
  else indicatorWidthClass = "w-1.5";

  return (
    <div
      onClick={handleClick}
      style={{
        width: TASKBAR_ICON_SIZE_BOUND,
        height: TASKBAR_ICON_SIZE_BOUND,
      }}
      className={`
        relative flex items-center justify-center
        rounded overflow-hidden bg-transparent 
        ${isClosed ? "bg-white/0" : "bg-white/30"}
        hover:bg-white/50 transition-colors duration-200 ease-in-out
      `}
    >
      <div
        style={{
          width: TASKBAR_ICON_SIZE,
          height: TASKBAR_ICON_SIZE,
        }}
        className="flex items-center justify-center"
      >
        <img src={icon} className="h-full w-full object-contain" />
      </div>

      {!isClosed && (
        <div className="absolute bottom-px left-1/2 -translate-x-1/2">
          <div
            className={`
              h-[3px] rounded-full bg-[#858585] transition-all
              ${indicatorWidthClass}
            `}
          />
        </div>
      )}
    </div>
  );
};

export default ApplicationButton;

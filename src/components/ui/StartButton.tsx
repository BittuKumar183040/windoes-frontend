import React, { forwardRef, useRef, useImperativeHandle, useState } from "react";
import { TASKBAR_ICON_RADIUS, TASKBAR_ICON_SIZE_BOUND, TASKBAR_START_LEAF_SIZE } from "../../config/setting";
import ToolTipNavbar from "./ToolTipNavbar";
import StartIcon from "./Start/StartIcon";

type StartButtonProps = {
  active?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};
  
const StartButton = forwardRef<HTMLDivElement, StartButtonProps>(({ active, onClick }, ref) => {
  const showDeskRef = useRef<HTMLDivElement>(null);
  const [showTip, setShowTip] = useState<boolean>(false);

  useImperativeHandle(ref, () => showDeskRef.current as HTMLDivElement);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(e);
  };
;

  return (<>
    <ToolTipNavbar
      anchorRef={showDeskRef}
      visible={!active && showTip}
      placement="top"
    >
      <p>Start</p>
    </ToolTipNavbar>

    <div
      ref={showDeskRef}
      onMouseEnter={()=> setShowTip(true)}
      onMouseLeave={()=> setShowTip(false)}
      onClick={handleClick}
      style={{
        width: TASKBAR_ICON_SIZE_BOUND,
        height: TASKBAR_ICON_SIZE_BOUND,
      }}
      className={` flex items-center justify-center
        p-2 rounded overflow-hidden w-fit bg-transparent 
        ${active ? "bg-white/30" : "bg-white/0"}
        hover:bg-white/50 transition-colors duration-200 ease-in-out
      `}
    >
      <StartIcon cardSize={TASKBAR_START_LEAF_SIZE} radius={TASKBAR_ICON_RADIUS} />
    </div>
  </>
  );
}
);

StartButton.displayName = "StartButton";
export default StartButton;
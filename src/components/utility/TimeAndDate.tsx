import { useEffect, useRef, useState } from "react";
import { HOUR12, TASKBAR_ICON_SIZE_BOUND } from "../../config/setting";
import ToolTipNavbar from "../ui/ToolTipNavbar";

type TimeAndDateProps = {
  active?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const TimeAndDate: React.FC<TimeAndDateProps> = ({ active, onClick }) => {
  const [now, setNow] = useState(new Date());
  const timeAndDate = useRef<HTMLDivElement | null>(null);
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const time = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: HOUR12,
  });

  const date = now.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  const fullDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const shortTime = now.toLocaleTimeString("en-US", {
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: HOUR12,
  });

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    onClick?.(e);
  };

  return (<>
    <ToolTipNavbar
      anchorRef={timeAndDate}
      visible={showTip}
      placement="top"
    >
      <div className=" space-y-3 flex flex-col wrap-normal justify-between">
        <p className=" whitespace-nowrap">{fullDate}</p>
        <p className=" whitespace-nowrap">{shortTime} (Local Time)</p>
      </div>
    </ToolTipNavbar>
  
    <div
      onClick={handleClick}
      onMouseEnter={()=>setShowTip(true)}
      onMouseLeave={()=>setShowTip(false)}
      ref={timeAndDate}
      style={{
        height: TASKBAR_ICON_SIZE_BOUND,
      }}
      className={`text-black flex flex-col justify-center items-end
        rounded p-2 px-2.5 tracking-wider
        ${active ? "bg-white/30" : "bg-white/0"}
        hover:bg-white/50 transition-colors duration-200 ease-in-out
    `}>
      <p>{time}</p>
      <p>{date}</p>
    </div>
  </>
  );
};

export default TimeAndDate;

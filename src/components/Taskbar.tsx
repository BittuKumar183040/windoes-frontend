import { useEffect, useRef, useState } from "react";
import { TASKBAR_HEIGHT } from "../config/setting";
import ApplicationButton from "./ui/ApplicationButtonUrl";
import ShowDesktop from "./ui/ShowDesktop";
import StartContainer from "./ui/Start/StartMenu";
import StartButton from "./ui/StartButton";
import SystemTray from "./utility/SystemTray";
import TimeAndDate from "./utility/TimeAndDate";
import VolumeLevel from "./utility/VolumeLevel";
import type { AppConfig } from "../Windows/Desktop";

interface TaskbarProps {
  apps: AppConfig[];
  onToggle: (id: string) => void;
}

const Taskbar: React.FC<TaskbarProps> = ({ apps, onToggle }) => {
  const [openStart, setOpenStart] = useState(false);
  const startButtonRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleStartClick = () => {
    setOpenStart(prev => !prev);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        !startButtonRef.current?.contains(e.target as Node) &&
        !containerRef.current?.contains(e.target as Node)
      ) {
        setOpenStart(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      {openStart && (
        <StartContainer
          open={openStart}
          ref={containerRef}
          buttonRef={startButtonRef}
        />
      )}

      <div
        style={{ height: `${TASKBAR_HEIGHT}px` }}
        className="relative w-full flex bg-[#dddbe3]/90 backdrop-blur-sm z-[101]"
      >
        <div className="flex-1 h-full flex gap-[5px] items-center justify-center">
          <StartButton
            active={openStart}
            onClick={handleStartClick}
            ref={startButtonRef}
          />

          {apps.map(app => (
            <ApplicationButton
              key={app.id}
              name={app.name}
              icon={app.icon}
              active={app.isActive}
              isClosed={app.isClosed}
              isMinimized={app.isMinimized}
              isMaximized={app.isMaximized}
              onClick={() => onToggle(app.id)}
            />
          ))}
        </div>

        <div className="absolute right-0 h-full flex items-center">
          <SystemTray />
          <VolumeLevel />
          <TimeAndDate />
          <ShowDesktop />
        </div>
      </div>
    </>
  );
};

export default Taskbar;

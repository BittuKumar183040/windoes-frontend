import React, { useState } from "react";
import background from "../assets/desktop_backgroud.jpg";
import Notepad from "../Applications/Notepad/main";
import FileManager from "../Applications/FileManager/main";
import Taskbar from "../components/Taskbar";
import Paint from "../Applications/Paint/main";
import DesktopEvent from "../components/RightClickContext/DesktopEvent";

export type AppType = "fileManager" | "notepad" | "paint";

export interface AppConfig {
  id: string;
  type: AppType;
  name: string;
  icon: string;
  isActive: boolean;
  isClosed: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
}

export interface WindowProps {
  isActive: boolean;
  windowTitle: string;
  app: AppConfig;
  onClose: () => void;
  onActive: () => void;
  onMaximize: () => void;
  onMinimize: () => void;
}

const initialApps: AppConfig[] = [
  {
    id: "fileManager-1",
    type: "fileManager",
    name: "File Manager",
    icon: "./icons/explorer.png",
    isActive: false,
    isClosed: true,
    isMinimized: false,
    isMaximized: false,
  },
  {
    id: "notepad-1",
    type: "notepad",
    name: "Notepad",
    icon: "./icons/notebook.png",
    isActive: false,
    isClosed: true,
    isMinimized: false,
    isMaximized: false,
  },
  {
    id: "paint-1",
    type: "paint",
    name: "Paint",
    icon: "./icons/paint.png",
    isActive: false,
    isClosed: true,
    isMinimized: false,
    isMaximized: false,
  },
];

const AppComponent: Record<AppType, React.FC<WindowProps>> = {
  fileManager: FileManager,
  notepad: Notepad,
  paint: Paint,
};

const Desktop = () => {
  const [apps, setApps] = useState<AppConfig[]>(initialApps);

  const onClose = (id: string) => {
    setApps(prev =>
      prev.map(app =>
        app.id === id ? { ...app, isClosed: true, isActive: false } : app
      )
    );
  };

  const onActive = (id: string) => {
    setApps(prev =>
      prev.map(app =>
        app.id === id
          ? { ...app, isActive: true, isMinimized: false, isClosed: false }
          : { ...app, isActive: false }
      )
    );
  };

  const toggleMinimize = (id: string) => {
    setApps(prev =>
      prev.map(app =>
        app.id === id
          ? {
            ...app,
            isActive: !app.isMinimized,
            isClosed: false,
            isMinimized: !app.isMinimized,
          }
          : { ...app, isActive: false }
      )
    );
  };

  const onMaximize = (id: string) => {
    setApps(prev =>
      prev.map(app =>
        app.id === id ? { ...app, isMaximized: !app.isMaximized } : app
      )
    );
  };

  const onMinimize = (id: string) => {
    setApps(prev =>
      prev.map(app =>
        app.id === id ? { ...app, isMinimized: true, isActive: false } : app
      )
    );
  };

  return (
    <div className="h-dvh w-full flex flex-col relative overflow-hidden">
      <DesktopEvent />
      <img
        src={background}
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

      <div className="flex-1">
        {apps.map(app => {
          if (app.isClosed) return null;

          const Component = AppComponent[app.type];
          if (!Component) return null;

          return (
            <Component
              key={app.id}
              isActive={app.isActive}
              windowTitle={app.name}
              app={app}
              onClose={() => onClose(app.id)}
              onActive={() => onActive(app.id)}
              onMaximize={() => onMaximize(app.id)}
              onMinimize={() => onMinimize(app.id)}
            />
          );
        })}
      </div>
      <Taskbar apps={apps} onToggle={toggleMinimize} />
    </div>
  );
}

export default Desktop;

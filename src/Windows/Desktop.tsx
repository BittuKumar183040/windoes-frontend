import React from "react";
import { useDispatch, useSelector } from "react-redux";
import background from "../assets/desktop_backgroud.jpg";
import Notepad from "../Applications/Notepad/main";
import FileManager from "../Applications/FileManager/main";
import Taskbar from "../components/Taskbar";
import Paint from "../Applications/Paint/main";
import type { RootState } from "../../store";
import DesktopEvent from "../components/RightClickContext/DesktopEvent";

import {
  closeApp,
  activateApp,
  toggleMinimize,
  toggleMaximize,
  minimizeApp,
  type AppConfig,
} from "../features/AppLaunch";

export type AppType = "fileManager" | "notepad" | "paint";

export interface WindowProps {
  isActive: boolean;
  windowTitle: string;
  app: AppConfig;
  onClose: () => void;
  onActive: () => void;
  onMaximize: () => void;
  onMinimize: () => void;
}

const AppComponent: Record<AppType, React.FC<WindowProps>> = {
  fileManager: FileManager,
  notepad: Notepad,
  paint: Paint,
};

const Desktop = () => {
  const apps = useSelector((state: RootState) => state.appLaunch);
  const dispatch = useDispatch();

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
              onClose={() => dispatch(closeApp(app.id))}
              onActive={() => dispatch(activateApp(app.id))}
              onMaximize={() => dispatch(toggleMaximize(app.id))}
              onMinimize={() => dispatch(minimizeApp(app.id))}
            />
          );
        })}
      </div>

      <Taskbar
        apps={apps}
        onToggle={(id: string) => dispatch(toggleMinimize(id))}
      />
    </div>
  );
};

export default Desktop;
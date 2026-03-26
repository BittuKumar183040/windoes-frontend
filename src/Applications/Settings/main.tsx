import Window from "../../components/ui/common/Window";
import type { AppComponentsProps } from "../../types/applicationTypes";

const Paint: React.FC<AppComponentsProps> = ({ isActive, onClose, onActive, onMinimize, app }) => {

  return (
    <Window
      isActive={isActive}
      onClose={onClose}
      onActive={onActive}
      onMinimize={onMinimize}
      minHeight={190}
      minWidth={250}
      windowTitle={app.name}
      titleHeight={28}
      Title={<div className="flex items-center gap-3 h-full">
          <img src="icons/settings.png" className="no-drag size-7" />
          <div className="text-lg whitespace-nowrap text-black">Settings</div>
        </div>
      }
    >
      <p>Hello</p>

    </Window>
  );
};

export default Paint;

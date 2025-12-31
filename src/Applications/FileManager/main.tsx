import React from "react";
import ExplorerModel from "./ExplorerModel";
import Window from "../../components/ui/common/Window";

interface FileManagerProps {
  isActive: boolean;
  onClose: () => void;
  onActive: () => void;
  onMinimize: () => void;
  windowTitle: string;
}


const FileManager: React.FC<FileManagerProps> = ({
  isActive,
  onClose,
  onActive,
  onMinimize,
  windowTitle,
}) => {
  return (
    <Window
      isActive={isActive}
      onClose={onClose}
      onActive={onActive}
      onMinimize={onMinimize}
      windowTitle={windowTitle}
      titleHeight={38}
      Title={<></>}
    >
      <ExplorerModel />
    </Window>

  );
};

export default FileManager;

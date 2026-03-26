import React from "react";
import Window from "../../components/ui/common/Window";
import ExplorerItems from "./ExplorerItems";
import Navigation from "./Navigation";
import Actions from "./Actions";
import { FileManagerProvider } from "./FileManagerContext";
import FolderStatusBar from "./FolderStatusBar";
import type { AppComponentsProps } from "../../types/applicationTypes";

const FileManager: React.FC<AppComponentsProps> = ({
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
      <FileManagerProvider>
        <Navigation />
        <Actions />
        <ExplorerItems />
        <FolderStatusBar />
      </FileManagerProvider>
    </Window>

  );
};

export default FileManager;

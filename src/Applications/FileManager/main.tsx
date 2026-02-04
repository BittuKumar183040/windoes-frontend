import React, { useState } from "react";
import Window from "../../components/ui/common/Window";
import ExplorerItems from "./ExplorerItems";
import Navigation from "./Navigation";
import type { Path } from "./types/node";
import Actions from "./Actions";

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
  const [path, setPath] = useState<Path[]>([{ id: null, label: "This PC" }]);

  const onNodeClick = (node: Path) => {
    console.log(node)
    setPath([{ id: null, label: "This PC" }])
    return null;
  }

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
      <Navigation path={path} onNodeClick={onNodeClick} />
      <Actions />
      <ExplorerItems />
    </Window>

  );
};

export default FileManager;

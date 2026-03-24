import { useEffect, useState } from "react";
import SideExplorer from "./SideExplorer";
import type { Node } from "./types/node";
import { deleteFolder, folder } from "../../api/filesystem.api";
import ProgressBar from "../../components/ui/common/ProgressBar";
import { formatBytes } from "../../components/utility/helper/unitConverter";
// import { extensionFinder } from "../../components/utility/helper/extensionFinder";
import { Drive } from "../../components/ui/Icons/app-icons";
import { useFileManagerContext } from "./FileManagerContextState";
import FileFolder from "../../components/ui/FileManager/FileFolder";
import useWhenFile from "./core/whenFile";
import useWhenFolder from "./core/whenFolder";

const ExplorerItems = () => {
  const whenFile = useWhenFile();
  const whenFolder = useWhenFolder();
  const { location, setLocation } = useFileManagerContext();
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const fetchFolder = async () => {
    const data = await folder(selectedNode ? selectedNode?.id : null);
    setLocation(data)
  }

  useEffect(() => {
    (async () => {
      localStorage.removeItem("selectedNode");
      localStorage.removeItem("currentFolder");
      await fetchFolder();
    })();
  }, [])

  const handleSelect = (item: Node) => {
    localStorage.setItem("selectedNode", item.id)
    setSelectedNode(item);
  }
  const handleOpen = async () => {
    if (!selectedNode) return;
    if (selectedNode.type === "FILE") {
      whenFile(selectedNode)
    }
    if (selectedNode.type === "FOLDER") {
      const folder = await whenFolder(selectedNode)
      setLocation(folder)
    }
  }

  const handleBlankSpace = () => {
    localStorage.removeItem("selectedNode");
  }

  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      if (!selectedNode?.parentId) { return; }

      if ((e.target as HTMLElement)?.tagName === "INPUT") { return; }

      if (e.key === "Delete") {
        await deleteFolder(selectedNode?.id);
        setLocation((prev) => prev && prev.filter((item) => item.id !== selectedNode?.id));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedNode]);

  return (<>
    <div className="flex-1 flex flex-col text-black overflow-hidden">
      <div onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedNode(null)
      }} className="flex-1 flex overflow-hidden">
        <SideExplorer />
        <div
          onClick={handleBlankSpace}
          className="flex-1 flex flex-wrap items-start justify-start content-start gap-2 p-4 bg-white overflow-auto"
        >
          {location?.length === 0 ? (
            <div className=" flex justify-center w-full">
              <p className="text-gray-800 text-lg select-none">
                This folder is empty.
              </p>
            </div>
          ) : (
            location?.map((item) => {
              // Drive (root folders)
              if (item.type === "FOLDER" && item.parentId === null) {
                return (
                  <button
                    key={item.id}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleSelect(item);
                    }}
                    onDoubleClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleOpen();
                    }}
                    draggable
                    className={`flex cursor-pointer border border-black/0 shrink-0 px-2 py-1 h-20 w-82 rounded-sm hover:bg-blue-100 justify-center items-start
                      ${selectedNode?.id === item.id && "bg-blue-100 border-black"}`}
                  >
                    <Drive className="shrink-0 w-17 h-17 p-1 pointer-events-none" />
                    <div className="w-full ml-2 text-left">
                      <p className="text-lg">{item.name}</p>
                      <ProgressBar
                        className="flex-1"
                        value={item.size}
                        minPercentage={0}
                        maxValue={5e11}
                      />
                      <p className="text-md text-gray-700">
                        {formatBytes(item.size)} free of {formatBytes(4e11)}
                      </p>
                    </div>
                  </button>
                );
              } else {
                return (
                  <FileFolder
                    key={item.id}
                    item={item}
                    selected={selectedNode?.id === item.id}
                    onClick={handleSelect}
                    onDoubleClick={handleOpen}
                  />
                );
              }
            })
          )}
        </div>
      </div>
    </div>
  </>
  );
};

export default ExplorerItems;

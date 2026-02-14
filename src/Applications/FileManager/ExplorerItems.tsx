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

const ExplorerItems = () => {
  const { location, setLocation } = useFileManagerContext();
  const [selectedFolder, setSelectedFolder] = useState<Node | null>(null);

  const fetchFolder = async () => {
    const data = await folder(selectedFolder ? selectedFolder?.id : null);
    setLocation(data)
  }

  useEffect(() => {
    (async () => {
      localStorage.removeItem("selectedFolder");
      localStorage.removeItem("currentFolder");
      await fetchFolder();
    })();
  }, [])

  const handleSelect = (item: Node) => {
    localStorage.setItem("selectedFolder", item.id)
    setSelectedFolder(item);
  }
  const handleOpen = async () => {
    if (!selectedFolder) return;
    localStorage.setItem("currentFolder", selectedFolder.id);
    if(selectedFolder.type === "FILE") return;
    if(selectedFolder.type === "FOLDER"){
      await fetchFolder();
    }
  }

  const handleBlankSpace = () => {
    localStorage.removeItem("selectedFolder");
  }

  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      if (!selectedFolder?.parentId) { return; }

      if ((e.target as HTMLElement)?.tagName === "INPUT") { return; }

      if (e.key === "Delete") {
        await deleteFolder(selectedFolder?.id);
        setLocation((prev) => prev && prev.filter((item) => item.id !== selectedFolder?.id));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedFolder]);

  return (<>
    <div className="flex-1 flex flex-col text-black overflow-hidden">
      <div onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedFolder(null)
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
                      ${selectedFolder?.id === item.id && "bg-blue-100 border-black/100"}`}
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
                    selected={selectedFolder?.id === item.id}
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

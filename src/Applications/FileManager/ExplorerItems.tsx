import { useEffect, useState } from "react";
import SideExplorer from "./SideExplorer";
import type { Node } from "./types/node";
import { folder } from "../../api/filesystem.api";
import ProgressBar from "../../components/ui/common/ProgressBar";
import { formatBytes } from "../../components/utility/helper/unitConverter";
// import { extensionFinder } from "../../components/utility/helper/extensionFinder";
import { Drive, Folder } from "../../components/ui/Icons/app-icons";

const ExplorerItems = () => {
  const [location, setLocation] = useState<Node[] | null>(null);
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
    localStorage.setItem("currentFolder", selectedFolder.id)
    await fetchFolder();
  }

  return (<>
    <div className="flex-1 flex flex-col text-black overflow-hidden">
      <div onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedFolder(null)
      }} className="flex-1 flex overflow-hidden">
        <SideExplorer />
        <div className="flex-1 flex flex-wrap items-start justify-start content-start gap-2 p-4 bg-white overflow-auto">
          {location?.map((item) => {
            return (<>
              { // for drive
                item.type === "FOLDER" && item.parentId === null ? (
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleSelect(item) }}
                    onDoubleClick={(e) => { e.preventDefault(); e.stopPropagation(); handleOpen() }}
                    className={`flex cursor-pointer border border-black/0 shrink-0 px-2 py-1 h-20 w-82 rounded-sm hover:bg-blue-100 justify-center items-start
                    ${selectedFolder?.id === item.id && "bg-blue-100 border-black/100 "}`}>
                    <Drive className=" shrink-0 w-17 h-17 p-1" />
                    <div className=" w-full ml-2 text-left">
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
                ) :
                  // for File and Folder
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleSelect(item) }}
                    onDoubleClick={(e) => { e.preventDefault(); e.stopPropagation(); handleOpen() }}
                    className={`flex cursor-pointer border border-black/0 shrink-0 px-2 py-1 h-20 w-82 rounded-sm hover:bg-blue-100 justify-center items-start
                    ${selectedFolder?.id === item.id && "bg-blue-100 border-black/100 "}`}>
                    <Folder className=" shrink-0 w-17 h-17 p-1" />
                    <div className=" w-full ml-2 text-left">
                      <p className="text-lg">{item.name}</p>
                    </div>
                  </button>
              }
            </>
            )
          })}
        </div>
      </div>
    </div>
  </>
  );
};

export default ExplorerItems;

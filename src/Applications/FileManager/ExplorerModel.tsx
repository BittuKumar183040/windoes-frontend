import { useEffect, useState } from "react";
// import DetailDropdown from "../../components/ui/common/DetailDropdown.tsx";
import type { Path, Node } from "./types/node";
import ProgressBar from "../../components/ui/common/ProgressBar";
import { formatBytes } from '../../components/utility/helper/unitConverter'
import { DocsFile, Drive, Folder, TextFile, UnknownFile } from "../../components/ui/Icons/app-icons";
import { extensionFinder } from "../../components/utility/helper/extensionFinder";
import Navigation from "./Navigation";
import SideExplorer from "./SideExplorer";
import { overview } from "../../api/filesystem.api";
import { fileSystemSocket } from "../../components/utility/socket/filesystemSocket";

const ExplorerModel = () => {
  const [hirarchy, setHirarchy] = useState<Node[]>([]);
  const [path, setPath] = useState<Path[]>([{ id: null, label: "This PC" }]);
  const getNodes = (item: Node) => {
    if (item.type === "FILE") return;
    setPath(prev => [...prev, { id: item.id, label: item.name }]);
    fileSystemSocket.send(item.id);
  };

  const getNodesById = (item: Path) => {
    setPath(prev => {
      const index = prev.findIndex(p => p.id === item.id);
      if (index === -1) return prev;

      const next = prev.slice(0, index + 1);

      fileSystemSocket.send(item.id ?? "");
      return next;
    });
  };

  useEffect(() => {
    fileSystemSocket.init({
      onOpen() {
        console.log("New File System Socket Created")
      },
      onMessage(data) {
        try {
          setHirarchy(JSON.parse(String(data)));
        } catch (err) {
          console.error("Invalid hierarchy", err);
        }
      },
    });

    return () => {
      fileSystemSocket.close();
    };
  }, []);

  const fetchOverview = () => {
    const data = overview();
    console.log(data)
  }

  useEffect(() => {
    fetchOverview()
  }, [])

  return (
    <>
      <Navigation path={path} onNodeClick={getNodesById}/>
      <div className="flex-1 flex flex-col text-black overflow-hidden">
        <div className="flex-1 flex overflow-hidden">
          <SideExplorer />
          {hirarchy.length > 0 && (
            <div className="flex-1 bg-white overflow-auto">
              <div className="flex flex-wrap gap-2 pl-4 pt-2 pb-2">
                {hirarchy.map((item: Node) => (
                  <button
                    key={item.id}
                    className="w-[248px] shrink-0 h-fit overflow-hidden p-2 py-0 flex gap-2 hover:bg-sky-100"
                    onDoubleClick={() => getNodes(item)}
                  >
                    <div className="min-h-15 min-w-15 flex items-center justify-center">
                      {item.type === "FOLDER" && <Drive size={60} />}
                      {item.type === "FOLDER" && <Folder size={60} />}
                      {item.type === "FILE" &&
                        (item.name
                          ? (
                            {
                              txt: <TextFile className="opacity-70" size={60} />,
                              md: <DocsFile className="opacity-70" size={60} />,
                            }[item.name] || <UnknownFile size={60} />
                          )
                          : <UnknownFile />)}
                    </div>

                    <div className="flex flex-col w-full h-18 justify-center items-start">
                      {item.type === "FOLDER" && item.parentId === null && (
                        <>
                          <p className="text-lg">({item.name}:)</p>
                          <ProgressBar
                            className="flex-1"
                            value={item.size}
                            minPercentage={0}
                            maxValue={item.size ? item.size : 5e11}
                          />
                          <p className="text-md text-gray-700">
                            {formatBytes((item.size ? item.size : 5e11) - item.size)} free of{" "}
                            {formatBytes(item.size)}
                          </p>
                        </>
                      )}

                      {item.type === "FOLDER" && (
                        <p className="text-lg">{item.name}</p>
                      )}

                      {item.type === "FILE" && (
                        <div className="flex flex-col items-start leading w-full">
                          <p className="text-lg">{item.name}</p>
                          <p className="text-lg text-gray-700">
                            {extensionFinder(item.name?.split(".").pop() ? item.name : "")}
                          </p>
                          <p className="text-md text-gray-700">
                            {formatBytes(item.size)}
                          </p>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ExplorerModel;

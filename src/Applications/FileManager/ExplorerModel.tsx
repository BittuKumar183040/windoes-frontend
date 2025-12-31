import { useEffect, useState } from "react";
// import DetailDropdown from "../../components/ui/common/DetailDropdown.tsx";
import type { Path, Node } from "./types/node";
import ProgressBar from "../../components/ui/common/ProgressBar";
import { formatBytes } from '../../components/utility/helper/unitConverter'
import { DocsFile, Drive, Folder, TextFile, UnknownFile } from "../../components/ui/Icons/app-icons";
import { extensionFinder } from "../../components/utility/helper/extensionFinder";
import Navigation from "./Navigation";
import SideExplorer from "./SideExplorer";
import { fileSystemSocket } from "../../components/utility/socket/filesystemSocket";

const ExplorerModel = () => {
  const [hirarchy, setHirarchy] = useState<Node[]>([]);
  const [path, setPath] = useState<Path[]>([{ id: null, label: "This PC" }]);
  const getNodes = (item: Node) => {
    if (item.type === "file") return;
    setPath(prev => [...prev, { id: item.id, label: item.label }]);
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
                      {item.type === "drive" && <Drive size={60} />}
                      {item.type === "folder" && <Folder size={60} />}
                      {item.type === "file" &&
                        (item.extension
                          ? (
                            {
                              txt: <TextFile className="opacity-70" size={60} />,
                              md: <DocsFile className="opacity-70" size={60} />,
                            }[item.extension] || <UnknownFile size={60} />
                          )
                          : <UnknownFile />)}
                    </div>

                    <div className="flex flex-col w-full h-18 justify-center items-start">
                      {item.type === "drive" && (
                        <>
                          <p className="text-lg">({item.label}:)</p>
                          <ProgressBar
                            className="flex-1"
                            value={item.size}
                            minPercentage={0}
                            maxValue={item.capacity ? item.capacity : 5e11}
                          />
                          <p className="text-md text-gray-700">
                            {formatBytes((item.capacity ? item.capacity : 5e11) - item.size)} free of{" "}
                            {formatBytes(item.size)}
                          </p>
                        </>
                      )}

                      {item.type === "folder" && (
                        <p className="text-lg">{item.label}</p>
                      )}

                      {item.type === "file" && (
                        <div className="flex flex-col items-start leading w-full">
                          <p className="text-lg">{item.label}</p>
                          <p className="text-lg text-gray-700">
                            {extensionFinder(item.extension ? item.extension : "")}
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

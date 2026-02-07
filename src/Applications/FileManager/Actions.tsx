import { PlusCircle } from "lucide-react"
import { createFolder } from "../../api/filesystem.api"
import { useFileManagerContext } from "./FileManagerContextState";

const Actions = () => {
  const { location, setLocation } = useFileManagerContext();

  const handleNew = async () => {
    const folder = localStorage.getItem("currentFolder");
    const data = await createFolder(folder, "New Folder")
    setLocation((prev) => [...(prev ?? []), data]);
  }

  const isRoot = location?.some(item => item.parentId === null) ?? false;

  return (
    <div className=" bg-white text-black flex items-center gap-2 h-[48px] shrink-0 border-b px-4 border-gray-300">
      <button disabled={isRoot} onClick={handleNew} className={`flex text-lg items-center justify-between rounded-md gap-2 hover:bg-gray-100 p-3 px-6
        ${isRoot && " pointer-events-none opacity-50"}
      `}>
        <PlusCircle size={15} /> 
        <p>New Folder</p>
      </button>
      <div className="w-px h-8/12 bg-gray-200" />
    </div>
  )
}

export default Actions
import { File, PlusCircle } from "lucide-react"
import { createFile, createFolder } from "../../api/filesystem.api"
import { useFileManagerContext } from "./FileManagerContextState";
import { ActionButtons } from "../../components/ui/FileManager/ActionButtons";
import { SeperatorVertical } from "../../components/ui/FileManager/Seperator";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";

const Actions = () => {
  const { location, setLocation } = useFileManagerContext();

  const handleNewFolder = async () => {
    const folder = localStorage.getItem("currentFolder");
    const data = await createFolder(folder, "New Folder")
    setLocation((prev) => [...(prev ?? []), data]);
  }
  
  const handleNewFile = async (filename: string) => {
    const folder = localStorage.getItem("currentFolder");
    const data = await createFile(folder, filename, 0)
    setLocation((prev) => [...(prev ?? []), data]);
  }

  const isRoot = location?.some(item => item.parentId === null) ?? false;
  const themeColor = useSelector((state: RootState) => state.globalSettings.titleColor)

  return (
    <div className={`flex items-center gap-2 h-[48px] shrink-0 border-b px-4 border-gray-400/50
      ${themeColor.theme === "light" ? "bg-white text-black" : "bg-black text-white"}`}>
      <ActionButtons label="New Folder" onClick={handleNewFolder} isDisabled={isRoot} Icon={PlusCircle} iconProps={{size:15}} />
      <SeperatorVertical />
      <ActionButtons label="New Document" onClick={() => handleNewFile("New Document.txt")} isDisabled={isRoot} Icon={File} iconProps={{size:15}} />
    </div>
  )
}

export default Actions
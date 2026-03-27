import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { useFileManagerContext } from "./FileManagerContextState";

const FolderStatusBar = () => {
  const { location } = useFileManagerContext();

  const themeColor = useSelector((state: RootState) => state.globalSettings.titleColor)
  
  return (
    <div 
      className={` h-10 px-4 flex gap-4 text-lg items-center justify-between 
      ${themeColor.theme === "light" ? " text-black bg-white" : " text-white bg-black"}
      `}>
      <div className=" flex gap-4">
        <p>{location?.length} items</p>
      </div>
    </div>
  )
}

export default FolderStatusBar
import { useFileManagerContext } from "./FileManagerContextState";

const FolderStatusBar = () => {
  const { location } = useFileManagerContext();
  return (
    <div className=" h-10 px-4 flex gap-4 text-lg items-center justify-between bg-white text-black">
      <div className=" flex gap-4">
        <p>{location?.length} items</p>
      </div>
    </div>
  )
}

export default FolderStatusBar
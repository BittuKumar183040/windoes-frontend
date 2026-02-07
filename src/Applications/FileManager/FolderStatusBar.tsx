import { useFileManagerContext } from "./FileManagerContextState";

const FolderStatusBar = () => {
  const { location } = useFileManagerContext();
  return (
    <div className=" h-10 px-4 flex text-lg items-center justify-between bg-white text-black">
      <p>{location?.length} items</p>
    </div>
  )
}

export default FolderStatusBar
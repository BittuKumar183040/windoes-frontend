import { PlusCircle } from "lucide-react"
import { createFolder } from "../../api/filesystem.api"

const Actions = () => {
  const handleNew = async () => {
    const folder = localStorage.getItem("selectedFolder");
    const data = await createFolder(folder, "New Folder")
    console.log(data)
  }
  return (
    <div className=" bg-white text-black flex items-center gap-2 h-[48px] shrink-0 border-b px-4 border-gray-300">
      <button onClick={handleNew} className=" flex text-lg items-center justify-between rounded-md gap-2 hover:bg-gray-100 p-3 px-6">
        <PlusCircle size={15} /> 
        <p>New</p>
      </button>
      <div className="w-px h-8/12 bg-gray-200" />
    </div>
  )
}

export default Actions
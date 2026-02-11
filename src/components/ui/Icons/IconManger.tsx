import { FolderIcon } from "lucide-react"
import { Folder } from "./app-icons"

interface IconManagerProps {
  extension: string
}

export const IconManger = ({extension}: IconManagerProps) => {
  return (<>
    { extension === "" && <Folder className=" shrink-0 w-17 h-17 p-1" /> }
    { extension === ".txt" && <FolderIcon className=" shrink-0 w-17 h-17 p-1" /> }
  </>
  )
}

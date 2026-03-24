import { useDispatch } from "react-redux"
import { AppFinderForTaskbar } from "../../../components/utility/helper/AppFinderForTaskbar"
import type { Node } from "../types/node"
import { addNewApp } from "../../../features/AppLaunch";
import { downloadFile } from "../../../api/filesystem.api";

const useWhenFile = () => {

  const dispatch = useDispatch();

  const whenFile = async (selectedNode: Node) => {
    
    const appDetails = AppFinderForTaskbar(selectedNode.name)  // with using file extension idenfity and give application info.
    if (appDetails) {
      const data = await downloadFile(selectedNode.id)
      console.log(data)
      appDetails.data = data
      dispatch(addNewApp(appDetails))
    } else {
      console.log("Unable to Open default program", selectedNode)
    }
    console.log("File : ", localStorage.getItem("selectedNode"))
  }

  return whenFile
}

export default useWhenFile
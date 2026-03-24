import { folder } from "../../../api/filesystem.api";
import type { Node } from "../types/node";

const useWhenFolder = () => {

  const fetchFolder = async (selectedNode: Node) => {
    const data = await folder(selectedNode ? selectedNode?.id : null);
    return data
  }

  const whenFolder = async (selectedNode: Node) => {
    const data = await fetchFolder(selectedNode);
    localStorage.setItem("currentFolder", selectedNode.id);
    return data;
  }
  return whenFolder
}

export default useWhenFolder
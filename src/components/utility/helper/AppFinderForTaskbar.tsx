import type { AppConfig } from "../../../features/AppLaunch"
import { getExtension } from "./extensionFinder"

export const AppFinderForTaskbar = (fileName: string): AppConfig | null => {
  console.log(fileName)
  console.log("Getting file extension for", fileName, "found: ", getExtension(fileName))
  switch (getExtension(fileName)) {
    case "txt":

      return {
        id: "notepad-" + crypto.randomUUID(),
        type: "notepad",
        name: "Notepad",
        icon: "./icons/notebook.png",
        isPinned: false,
        data: "",
        isActive: true,
        isClosed: false,
        isMinimized: false,
        isMaximized: false,
        zIndex: 1,
      };

    case "png" : case "jpg":
      return {
        id: "paint-" + crypto.randomUUID(),
        type: "paint",
        name: "Paint",
        icon: "./icons/paint.png",
        isPinned: false,
        isActive: true,
        isClosed: false,
        isMinimized: false,
        isMaximized: false,
        zIndex: 1,
      };
    default:
      return null
  }
}


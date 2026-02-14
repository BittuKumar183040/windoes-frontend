import React, { createContext, useContext } from "react";
import type { Node } from "./types/node";

export interface FileManagerContextValue {
  location: Node[] | null;
  overview: unknown;
  setLocation: React.Dispatch<React.SetStateAction<Node[] | null>>;
}

export const FileManagerContext = createContext<
  FileManagerContextValue | undefined
>(undefined);

export const useFileManagerContext = () => {
  const context = useContext(FileManagerContext);
  if (!context) {
    throw new Error(
      "useFileManagerContext must be used within FileManagerProvider"
    );
  }
  return context;
};

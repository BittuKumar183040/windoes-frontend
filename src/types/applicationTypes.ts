import type { ReactNode } from "react";
import type { Node } from "../Applications/FileManager/types/node";

export type AppType = "fileManager" | "notepad" | "paint" | "settings";

export interface AppConfig {
  id: string;
  type: AppType;
  name: string;
  icon: string;
  isPinned: boolean,
  isActive: boolean;
  isClosed: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex?: number;
  data?: string;
  node?: Node,
}

export interface AppComponentsProps {
  isActive: boolean;
  app: AppConfig;
  windowTitle?: string;
  onClose: () => void;
  onActive: () => void;
  onMinimize: () => void;
  onMaximize?: () => void;
}


export interface WindowProps {
  children: ReactNode;
  onClose: () => void;
  onActive: () => void;
  onMinimize: () => void;
  windowTitle?: string;
  titleHeight: number;
  isActive: boolean;
  Title: React.ReactNode;
  minHeight?: number;
  minWidth?: number;
}

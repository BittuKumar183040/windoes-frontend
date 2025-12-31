import { Rnd, type RndDragCallback, type RndResizeCallback } from "react-rnd";
import { useState, type ReactNode } from "react";
import Titlebar from "./Titlebar";

const edgeVertical = "flex items-center justify-center h-4 w-full";
const edgeHorizontal = "flex items-center justify-center w-4 h-full";
const cornerClass = "flex items-center justify-center w-7 h-7";

interface WindowProps {
  children: ReactNode;
  onClose: () => void;
  onActive: () => void;
  onMinimize: () => void;
  windowTitle: string;
  titleHeight: number;
  isActive: boolean;
  Title: React.ReactNode;
  minHeight?: number;
  minWidth?: number;
}

interface WindowState { x: number; y: number; width: number; height: number }

const STORAGE_KEY_PREFIX = "window-state";
const DEFAULT_STATE: WindowState = { x: 100, y: 100, width: 400, height: 450 };

const Window = ({ children, onClose, onActive, onMinimize, windowTitle, titleHeight, isActive, Title, minHeight = 120, minWidth = 150 }: WindowProps) => {

  const storageKey = `${STORAGE_KEY_PREFIX}:${windowTitle}`;
  const [isFullScreen, setFullScreen] = useState(false);

  const [state, setState] = useState<WindowState>(() => {
    if (typeof window === "undefined") return DEFAULT_STATE;

    try {
      const saved = window.localStorage.getItem(storageKey);
      if (!saved) return DEFAULT_STATE;

      const parsed = JSON.parse(saved) as Partial<WindowState>;

      if (
        typeof parsed.x === "number" &&
        typeof parsed.y === "number" &&
        typeof parsed.width === "number" &&
        typeof parsed.height === "number"
      ) {
        return parsed as WindowState;
      }
      return DEFAULT_STATE;
    } catch {
      console.warn("Invalid window state in localStorage for", storageKey);
      return DEFAULT_STATE;
    }
  });

  const updateState = (next: WindowState) => {
    if (next.width === window.innerWidth && next.height === window.innerHeight) {
      return;
    }
    setState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(storageKey, JSON.stringify(next));
    }
  };

  const handleDragStop: RndDragCallback = (_e, d) => {
    updateState({ ...state, x: d.x, y: d.y });
  };

  const handleResizeStop: RndResizeCallback = (_e, _dir, ref, _delta, pos) => {
    updateState({ width: ref.offsetWidth, height: ref.offsetHeight, x: pos.x, y: pos.y });
  };

  const toggleMaximizeWindow = () => {
    const fullScreenState: WindowState = { x: 0, y: 0, width: window.innerWidth, height: window.innerHeight };
    const lastSavedRaw = window.localStorage.getItem(storageKey);
    const lastSaved = lastSavedRaw ? JSON.parse(lastSavedRaw) as Partial<WindowState> : null;

    const isSavedValid = lastSaved && typeof lastSaved.x === "number" && typeof lastSaved.y === "number" && typeof lastSaved.width === "number" && typeof lastSaved.height === "number";
    const isCurrentlyMaximized = state.x === 0 && state.y === 0 && state.width === window.innerWidth && state.height === window.innerHeight;


    if (isCurrentlyMaximized && isSavedValid) {
      setState(lastSaved as WindowState);
      setFullScreen(false)
    } else {
      if (!isCurrentlyMaximized) {
        window.localStorage.setItem(storageKey, JSON.stringify(state));
      }
      setState(fullScreenState);
      setFullScreen(true)
    }
  };

  return (
    <Rnd
      dragHandleClassName="window-titlebar"
      cancel=".no-drag, .no-resize"
      size={{ width: state.width, height: state.height }}
      position={{ x: state.x, y: state.y }}
      onMouseDown={onActive}
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      minHeight={minHeight}
      minWidth={minWidth}
      bounds="window"
      style={{ zIndex: isActive ? 100 : 1 }}
      resizeHandleComponent={{
        top: (<div className={edgeVertical} style={{ cursor: "url('/cursors/vertical-resize_white.cur'), n-resize" }} />),
        bottom: (<div className={edgeVertical} style={{ cursor: "url('/cursors/vertical-resize_white.cur'), s-resize" }} />),
        right: (<div className={edgeHorizontal} style={{ cursor: "url('/cursors/horizontal-resize_white.cur'), e-resize" }} />),
        left: (<div className={edgeHorizontal} style={{ cursor: "url('/cursors/horizontal-resize_white.cur'), w-resize" }} />),
        topLeft: (<div className={cornerClass} style={{ cursor: "url('/cursors/diagonal-resize-1_white.cur'), nw-resize" }} />),
        topRight: (<div className={cornerClass} style={{ cursor: "url('/cursors/diagonal-resize-2_white.cur'), ne-resize" }} />),
        bottomLeft: (<div className={cornerClass} style={{ cursor: "url('/cursors/diagonal-resize-2_white.cur'), sw-resize" }} />),
        bottomRight: (<div className={cornerClass} style={{ cursor: "url('/cursors/diagonal-resize-1_white.cur'), se-resize" }} />),
      }}
    >
      <div className={`flex flex-col bg-[#f4f4f4] ${isFullScreen  ? "rounded-none" : "rounded-xl"} overflow-hidden border shadow-xl border-black/40 h-full`}>
        <Titlebar onClose={onClose} onMaximize={toggleMaximizeWindow} onMinimize={onMinimize} Title={Title} height={titleHeight} />
        {children}
      </div>
    </Rnd>
  );
};

export default Window;

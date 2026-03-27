import { ChevronRight, ComputerIcon, FileIcon, Folder, HardDrive } from "lucide-react";
import { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import { folder, overview } from "../../api/filesystem.api";
import { useFileManagerContext } from "./FileManagerContextState";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";

interface SideMenuItem {
  id: string;
  userId: string;
  parentId: string | null;
  name: string;
  type: "FILE" | "FOLDER" | string;
  size: string | number | null;
  icon: string;
  createdAt: number;
  updatedAt: number;
  children: SideMenuItem[];
}

const THIS_PC_ID = "this_pc";

const toSideMenuItems = (data: unknown): SideMenuItem[] => {
  if (Array.isArray(data)) {
    return data as SideMenuItem[];
  }

  if (data && typeof data === "object") {
    const payload = data as { data?: unknown; items?: unknown };
    if (Array.isArray(payload.data)) {
      return payload.data as SideMenuItem[];
    }
    if (Array.isArray(payload.items)) {
      return payload.items as SideMenuItem[];
    }
  }

  return [];
};

const SideExplorer = ({ className }: { className?: string }) => {
  const { setLocation } = useFileManagerContext();
  const [sidebarWidth, setSidebarWidth] = useState(220);
  const [sideMenuPanelItems, setMenuPanelItem] = useState<SideMenuItem[]>([]);
  const [openIds, setOpenIds] = useState<Set<string>>(
    () => new Set([THIS_PC_ID])
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const themeColor = useSelector((state: RootState) => state.globalSettings.titleColor)

  const toggleOpen = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleItemClick = async (item: SideMenuItem) => {
    const hasChildren = item.children.length > 0;
    setSelectedId(item.id);

    if (hasChildren && !openIds.has(item.id)) {
      setOpenIds((prev) => new Set(prev).add(item.id));
    }

    if (item.id === THIS_PC_ID) {
      localStorage.removeItem("selectedNode");
      localStorage.removeItem("currentFolder");
      const data = await folder(null);
      setLocation(data);
      return;
    }

    localStorage.setItem("selectedNode", item.id);

    if (item.type === "FOLDER") {
      const data = await folder(item.id);
      setLocation(data);
      localStorage.setItem("currentFolder", item.id);
    }
  };

  const renderItemIcon = (item: SideMenuItem) => {
    if (item.id === THIS_PC_ID) {
      return <ComputerIcon size={17} />;
    }
    if (item.icon === "drive-harddisk") {
      return <HardDrive size={17} />;
    }
    if (item.type === "FOLDER") {
      return <Folder size={17} />;
    }
    return <FileIcon size={17} />;
  };

  
  useEffect(() => {
    const getFolderOverview = async () => {
      const data = await overview();
      setMenuPanelItem(toSideMenuItems(data));
    };

    void getFolderOverview();
  }, []);

  const menuItemsWithRoot: SideMenuItem[] = [
    {
      id: THIS_PC_ID,
      userId: "global",
      parentId: null,
      name: "This PC",
      type: "FOLDER",
      size: null,
      icon: "computer",
      createdAt: 0,
      updatedAt: 0,
      children: sideMenuPanelItems.filter((item) => item.parentId === null),
    },
  ];

  const renderMenuItems = (items: SideMenuItem[], level = 0) => {
    return items.map((item, idx) => {
      const hasChildren = item.children.length > 0;
      const isOpen = hasChildren && openIds.has(item.id);

      return (
        <div className={className} key={`${item.id}-${level}-${idx}`}>
          <button
            type="button"
            onClick={() => {
              void handleItemClick(item);
            }}
            className={`w-full text-left flex min-w-56 items-center gap-2 py-2 transition-all active:outline active:outline-black
              ${selectedId === item.id ? 
                themeColor.theme === "light" ? "outline outline-gray-500 bg-gray-200 hover:bg-sky-100" : "outline outline-gray-700 bg-gray-800 hover:bg-gray-800"
                : 
                themeColor.theme === "light" ? "outline-none border-white hover:bg-sky-100" :  "outline-none border-white hover:bg-gray-900"
              }
            `}
            style={{ paddingLeft: 16 + level * 12 }}
          >
            {hasChildren ? (
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleOpen(item.id);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleOpen(item.id);
                  }
                }}
                className="flex min-w-[15px] items-center justify-center"
              >
                <ChevronRight
                  strokeWidth={3}
                  className={`size-5 opacity-50 hover:opacity-80 transition-transform ${isOpen ? "rotate-90" : ""}`}
                />
              </span>
            ) : (
              <span className="min-w-[15px]" />
            )}

            <div>{renderItemIcon(item)}</div>
            <span className="text-lg whitespace-nowrap">{item.name}</span>
          </button>

          {hasChildren && isOpen && <div>{renderMenuItems(item.children, level + 1)}</div>}
        </div>
      );
    });
  };


  return (
    <Rnd
      size={{ width: sidebarWidth, height: "100%" }}
      onResizeStop={(_e, _dir, ref) => { setSidebarWidth(ref.offsetWidth) }}
      minWidth={80}
      enableResizing={{
        right: true,
        left: false,
        top: false,
        bottom: false,
        topRight: false,
        bottomRight: false,
        topLeft: false,
        bottomLeft: false,
      }}
      disableDragging
      bounds="parent"
      resizeHandleStyles={{ right: { width: "2px", right: "0px" } }}
      resizeHandleComponent={{
        right: (
          <div className="flex items-center justify-center w-2 h-full"
            style={{ cursor: "url('/cursors/horizontal-resize_white.cur'), e-resize" }}
          />
        ),
      }}
      className="shrink-0 border-r border-gray-200/50"
      style={{ position: "relative" }}
    >
      <div className="h-full w-full overflow-y-auto overflow-x-hidden px-1 pt-2">
        {renderMenuItems(menuItemsWithRoot)}
      </div>
    </Rnd>
  );
};

export default SideExplorer;

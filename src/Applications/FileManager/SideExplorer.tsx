import { ChevronRight, FileIcon, GalleryThumbnails, HardDrive, HomeIcon } from 'lucide-react';
import React, { useState } from 'react'
import { Rnd } from 'react-rnd';

type MenuIconType = React.ComponentType<{ size?: number }>;

interface SideMenuItem {
  icon?: MenuIconType;
  label: string;
  location?: string;
  subMenu?: SideMenuItem[];
}

const sideMenuPanel: SideMenuItem[] = [
  {
    icon: HomeIcon,
    label: "Home",
    location: "Home",
  },
  {
    icon: GalleryThumbnails,
    label: "Gallery",
    location: "Gallery",
  },
  {
    icon: HardDrive,
    label: "Bittu - Shared",
    location: "Drive",
  },
  {
    label: "separator",
  },
  {
    icon: FileIcon,
    label: "This PC",
    location: "This PC",
    subMenu: [
      {
        icon: HardDrive,
        label: "Apps",
        location: "Apps",
        subMenu: [
          {
            icon: HardDrive,
            label: "Games",
            location: "Games",
          },
          {
            icon: HardDrive,
            label: "Tools",
            location: "Tools",
          },
        ],
      },
      {
        icon: HardDrive,
        label: "Attachments",
        location: "Attachments",
      },
    ],
  },
];

const SideExplorer = ({className}:{className?: string}) => {

  const [sidebarWidth, setSidebarWidth] = useState(220);

  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set());
  const [selectedLevel, setSelectedLevel] = useState("Home")

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

  const handleItemClick = (item: SideMenuItem) => {
    const hasSubMenu = item.subMenu && item.subMenu.length > 0;
    const id = item.location ?? item.label;
    setSelectedLevel(item.label)

    if (hasSubMenu) {
      toggleOpen(id);
    } else {
      console.log("navigate to:", item.location);
    }
  };

  const renderMenuItems = (items: SideMenuItem[], level: number = 0) => {
    return items.map((item, idx) => {
      if (item.label === "separator") {
        return (
          <div key={`sep-${level}-${idx}`} className="w-11/12 m-auto my-4">
            <div className="w-full h-px bg-gray-300" />
          </div>
        );
      }

      const Icon = item.icon;
      const hasSubMenu = !!(item.subMenu && item.subMenu.length);
      const id = item.location ?? item.label;
      const isOpen = hasSubMenu && openIds.has(id);

      return (
        <div className={className} key={`${id}-${level}-${idx}`}>
          <button
            type="button"
            onClick={() => handleItemClick(item)}
            className={` w-full text-left flex min-w-56 items-center gap-2 py-2 hover:bg-sky-100 transition-all active:outline active:outline-black
              ${selectedLevel === item.label ? "outline outline-gray-500 bg-gray-200" : "outline-none border-white"}
            `}
            style={{ paddingLeft: 16 + level * 12 }}
          >
            {hasSubMenu ? (
              <ChevronRight
                strokeWidth={3}
                className={` size-5 opacity-50 hover:opacity-80 transition-transform ${isOpen ? "rotate-90" : ""
                  }`}
              />
            ) : (
              <span className="min-w-[15px]" />
            )}

            {Icon && <div className="link"><Icon size={17} /></div>}
            <span className=" link text-lg whitespace-nowrap">{item.label}</span>
          </button>

          {hasSubMenu && isOpen && (
            <div>
              {renderMenuItems(item.subMenu!, level + 1)}
            </div>
          )}
        </div>
      );
    });
  };


  return (
    <Rnd
      size={{ width: sidebarWidth, height: "100%" }}
      onResizeStop={(_e, _dir, ref) => {
        setSidebarWidth(ref.offsetWidth);
      }}
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
      disableDragging={true}
      bounds="parent"
      resizeHandleStyles={{ right: { width: "2px", right: "0px" } }}
      resizeHandleComponent={{
        right: (<div className="flex items-center justify-center w-2 h-full" style={{ cursor: "url('/cursors/horizontal-resize_white.cur'), e-resize" }} />),
      }}
      className="shrink-0 border-r border-gray-200 bg-white"
      style={{ position: "relative" }}
    >
      <div className="h-full w-full overflow-y-auto overflow-x-hidden px-1 pt-2 ">
        {renderMenuItems(sideMenuPanel)}
      </div>
    </Rnd>
  )
}

export default SideExplorer
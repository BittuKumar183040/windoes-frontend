import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { MENU_ITEMS, type MenuItem, type MenuOption } from "./config";
import type { RootState } from "../../../../store";

interface DropdownProps {
  options: MenuOption[];
  isLight: boolean;
  onClose: () => void;
}

const Dropdown = ({ options, isLight, onClose }: DropdownProps) => {
  const visible = options.filter((o) => !o.makeHidden);

  return (
    <ul
      className={`absolute top-full left-0 z-50 mt-[1px] min-w-[220px] py-1 shadow-lg border text-md
        ${isLight
          ? "bg-[#f8f8f8] border-gray-200 text-black"
          : "bg-[#1e1e1e] border-gray-700 text-[#cccccc]"
        }`}
    >
      {visible.map((opt) => {
        if (opt.separator) {
          return (
            <li
              key={opt.name}
              className={`my-1 border-t ${isLight ? "border-gray-200" : "border-gray-700"}`}
            />
          );
        }

        return (
          <li key={opt.name}>
            <button
              disabled={opt.isDisabled}
              onClick={onClose}
              className={`flex w-full items-center justify-between px-4 py-[3px] gap-6 text-left transition-colors
                ${opt.isDisabled
                  ? "opacity-40 cursor-not-allowed"
                  : isLight
                    ? "hover:bg-blue-500 hover:text-white"
                    : "hover:bg-[#094771] hover:text-white"
                }`}
            >
              <span>{opt.label}</span>
              {opt.shortcutKey && (
                <span className="text-xs opacity-60 whitespace-nowrap">
                  {opt.shortcutKey}
                </span>
              )}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

const Menubar = () => {
    
  const themeColor = useSelector((state: RootState) => state.globalSettings.titleColor);
  const isLight = themeColor.theme === "light";

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleTabClick = (name: string) =>
    setOpenMenu((prev) => (prev === name ? null : name));

  const handleTabHover = (name: string) => {
    if (openMenu !== null) setOpenMenu(name);
  };

  const visibleItems = MENU_ITEMS.filter((item: MenuItem) => !item.makeHidden);

  return (
    <header
      className={`flex px-2 h-[33px] border-b select-none transition-colors
        ${isLight
          ? "text-black bg-[#f8f8f8] border-gray-200/80"
          : "text-white bg-black   border-gray-200/10"
        }`}
    >
      <div ref={barRef} className="flex">
        {visibleItems.map((item: MenuItem) => {
          const isOpen = openMenu === item.name;

          return (
            <div key={item.name} className="relative h-full flex items-center">
              <button
                disabled={item.isDisabled}
                onClick={() => handleTabClick(item.name)}
                onMouseEnter={() => handleTabHover(item.name)}
                className={`px-3 h-full text-lg rounded-sm transition-colors
                  ${item.isDisabled
                    ? "opacity-40 cursor-not-allowed"
                    : isOpen
                      ? isLight ? "bg-gray-200/90"  : "bg-gray-200/20"
                      : isLight ? "hover:bg-gray-200/80" : "hover:bg-gray-200/10"
                  }`}
              >
                {item.label}
              </button>

              {isOpen && !item.isDisabled && (
                <Dropdown
                  options={item.options}
                  isLight={isLight}
                  onClose={() => setOpenMenu(null)}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-1" />
    </header>
  );
};

export default Menubar;
import React, { useRef, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUp, ChevronRight, RefreshCwIcon } from "lucide-react";
import { System } from "../../components/ui/Icons/app-icons";
import type { Path } from "./types/node";
import { useFileManagerContext } from "./FileManagerContextState";
import { folder } from "../../api/filesystem.api";
import NavigationButton from "../../components/ui/FileManager/Navigation";

const Navigation = () => {
  const { location, setLocation } = useFileManagerContext();
  const [addressBarActive, setAddressBarActive] = useState<boolean>(false);

  const [searchValue, setSearchValue] = useState<string>("");
  const [addressBarValue, setaddressBarValue] = useState<string>("");
  const [path] = useState<Path[]>([
    { id: null, label: "This PC" }
  ]);
  const addressBarRef = useRef<HTMLDivElement | null>(null);

  const isRoot = () => {
    return location?.some(item => item.parentId === null) ?? false;
  }

  const onNodeClick = async (node: Path) => {
    console.log(node)
    if (!isRoot()) {
      const data = await folder(node.id);
      console.log("This PC:", node)
      setLocation(data)
    } else {
      console.log("Root : False")
    }
  }

  const handleSearchChange = (value: string) => {
    setSearchValue(value)
  }

  const handleAddressFocus = () => {
    setAddressBarActive(true);
  };
  const handleAddressChange = (value: string) => {
    setaddressBarValue(value)
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (addressBarRef.current && !addressBarRef.current.contains(e.target as Node)) {
        setAddressBarActive(false);
      }
      setaddressBarValue("")
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-[48px] flex justify-between items-center bg-[#f1f5f7] border-b border-black/20">
      <div className="flex gap-4 px-4 items-center">
        <NavigationButton Icon={ArrowLeft} />
        <NavigationButton Icon={ArrowRight} />
        <NavigationButton Icon={ArrowUp} />
        <NavigationButton Icon={RefreshCwIcon} iconStyle="p-0.5" />
      </div>
      
      <div
        ref={addressBarRef}
        className="relative h-[32px] flex flex-1 items-center text-xl text-black bg-linear-to-b from-white to-transparent rounded-md transition-all"
      >
        <div className={` absolute left-0 z-10 flex items-center gap-3 ${addressBarActive ? "opacity-0" : "opacity-100"}`}>
          <NavigationButton Icon={System} className="ml-2 pointer-events-none transition-opacity duration-150" />
          {path.map((item) => <React.Fragment key={item.id} >
            <button
              onClick={() => onNodeClick(item)}
              className=" flex items-center justify-center text-md px-3 py-px pt-1 hover:bg-gray-200/80 rounded-sm">
              {item.label}
            </button>
            <ChevronRight size={16} strokeWidth={1} />
          </React.Fragment>
          )}
        </div>

        <input
          type="text"
          onFocus={handleAddressFocus}
          value={addressBarValue}
          onChange={(e) => handleAddressChange(e.target.value)}
          className="absolute left-0 top-0 h-full w-full p-4 outline-none"
        />
      </div>

      <div className="relative h-[32px] text-xl text-black flex w-56 items-center bg-linear-to-b from-white to-transparent rounded-md transition-all">
        <input
          type="text"
          value={searchValue}
          placeholder=" Search This PC"
          onChange={(e) => handleSearchChange(e.target.value)}
          className="absolute left-0 top-0 h-full w-full p-4 outline-none"
        />
      </div>
    </div>
  );
};

export default Navigation;

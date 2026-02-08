import { useState } from 'react';
import type { Node } from '../../../Applications/FileManager/types/node';
import { Folder as FolderIcon } from '../Icons/app-icons';
import { useEffect, useRef } from 'react';
import { renameFolder } from '../../../api/filesystem.api';

interface FolderProps {
  item: Node,
  selected: boolean,
  onClick: (item: Node) => void,
  onDoubleClick: (item: Node) => void
}

const Folder = ({ item, selected, onClick, onDoubleClick }: FolderProps) => {
  const [renameActive, setRenameActive] = useState(false);
  const [inputValue, setInputValue] = useState(item.name);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleTextClick = () => {
    if (selected) {
      setRenameActive(true);
    } else {
      setRenameActive(false);
    }
  }

  const renameAPI = async () => {

    setRenameActive(false);
    const value = inputRef.current?.value;
    if(value && item.name !== value) {
      await renameFolder(item.id, value)
    }
  }

  useEffect(() => {
    if (!renameActive) return;

    const currentInput = inputRef.current;

    const handleClickOutside = (event: MouseEvent) => {
      if ( currentInput && event.target instanceof Node && 
        !currentInput.contains(event.target)
      ) {
        setRenameActive(false);
        renameAPI();
      }
    };

    const handleKeyDown = async (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        renameAPI();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    currentInput?.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      currentInput?.removeEventListener("keydown", handleKeyDown);
    };
  }, [renameActive]);

  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClick(item) }}
      onDoubleClick={(e) => { e.preventDefault(); e.stopPropagation(); onDoubleClick(item) }}
      className={`flex cursor-pointer border border-black/0 shrink-0 px-2 py-1 h-20 w-82 rounded-sm hover:bg-blue-100 justify-center items-start
        ${selected && "bg-blue-100 border-black/100 "}
      `}
    >
      <FolderIcon className=" shrink-0 w-17 h-17 p-1" />
      <div className=" w-full ml-2 mt-2 text-left">
        {renameActive ? <input ref={inputRef} autoFocus type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="text-lg" />
          : <p onClick={handleTextClick} className="text-lg">{inputValue}</p>
        }
      </div>
    </button>
  )
}

export default Folder
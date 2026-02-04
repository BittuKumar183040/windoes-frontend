import { useState } from 'react';
import type { Node } from '../../../Applications/FileManager/types/node';
import { Folder as FolderIcon } from '../Icons/app-icons';
import { useEffect, useRef } from 'react';

interface FolderProps {
  item: Node,
  selected: boolean,
  onClick: (item: Node) => void,
  onDoubleClick: (item: Node) => void
}

const Folder = ({ item, selected, onClick, onDoubleClick }: FolderProps) => {
  const [renameActive, setRenameActive] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleTextClick = () => {
    if (selected) {
      setRenameActive(true);
    } else {
      setRenameActive(false);
    }
  }

  const handleFolderRename = (value: string) => {
    console.log(value)
  }

  useEffect(() => {
    if (!renameActive) return;

    const handleClickOutside = (event: MouseEvent) => {
      if ( inputRef.current && event.target instanceof Node && 
        !inputRef.current.contains(event.target)
      ) {
        setRenameActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
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
      <div className=" w-full ml-2 text-left">
        {renameActive ? <input ref={inputRef} autoFocus type="text" onChange={(e) => handleFolderRename(e.target.value)} value={item.name} className="text-lg" />
          : <p onClick={handleTextClick} className="text-lg">{item.name}</p>
        }
      </div>
    </button>
  )
}

export default Folder
import { useState } from 'react';
import type { Node } from '../../../Applications/FileManager/types/node';
import { useEffect, useRef } from 'react';
import { renameFolder } from '../../../api/filesystem.api';
import { IconManger } from '../Icons/IconManger';
import { getExtension, removeExtension } from '../../utility/helper/extensionFinder';

interface FolderProps {
  item: Node,
  initActive?: boolean,
  selected: boolean,
  onClick: (item: Node) => void,
  onDoubleClick: (item: Node) => void
}

const FileFolder = ({item, initActive = false, selected, onClick, onDoubleClick }: FolderProps) => {
  const [renameActive, setRenameActive] = useState(initActive);
  const [inputValue, setInputValue] = useState(item.name);
  const extension = getExtension(item.name)
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
      try {
        await renameFolder(item.id, value)
      } catch (e) {
        console.log(e)
        setInputValue(item.name)
      }

    }
  }

  useEffect(() => {
    if (!renameActive) return;

    const currentInput = inputRef.current;
    currentInput?.focus();
    const handleClickOutside = (event: MouseEvent) => {
      if ( currentInput && event.target instanceof Node && 
        !currentInput.contains(event.target)
      ) {
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

  const handleFocus = () => {
    const input = inputRef.current;
    if (input) {
      input.setSelectionRange(0, removeExtension(input?.value).length);
    }
  };

  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClick(item) }}
      onDoubleClick={(e) => { e.preventDefault(); e.stopPropagation(); onDoubleClick(item) }}
      className={`flex cursor-pointer border border-black/0 shrink-0 px-2 py-1 h-20 w-82 rounded-sm hover:bg-blue-100 justify-center items-start
        ${selected && "bg-blue-100 border-black/100 "}
      `}
    >
      { item.type === "FOLDER" && <IconManger extension='' /> }
      { item.type === "FILE" && <IconManger extension={extension} /> }
      <div className=" w-full ml-1 mt-2 text-left">
        <input 
          ref={inputRef}
          type="text"
          value={inputValue}
          onFocus={handleFocus}
          onChange={(e) => setInputValue(e.target.value)}
          className={` ${renameActive ? "block" : "hidden"} text-lg pl-1`}
        />
        <p onClick={handleTextClick} className={` ${renameActive ? "hidden" : "block"} text-lg pl-1`}>{inputValue}</p>
      </div>
    </button>
  )
}

export default FileFolder;
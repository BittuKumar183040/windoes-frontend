import { useEffect, useRef, useState } from "react";
import { DotIcon, X } from "lucide-react";
import Footer from "./Footer";
import Window from "../../components/ui/common/Window";
import type { AppComponentsProps } from "../../types/applicationTypes";

// Derives plain text from an HTML string without relying on component state.
const getPlainText = (html: string): string => {
  const el = document.createElement("div");
  el.innerHTML = html;
  return el.innerText;
};

const Menubar = () => {
  return (
    <header className="flex justify-center px-2 h-[33px] text-black bg-[#f8f8f8] border-b border-gray-200">
      <div className="flex gap-3">
        <button className="px-5 h-full text-xl rounded-md hover:bg-gray-200/80 transition-all">
          File
        </button>
        <button className="px-5 h-full text-xl rounded-md hover:bg-gray-200/80 transition-all">
          Edit
        </button>
        <button className="px-5 h-full text-xl rounded-md hover:bg-gray-200/80 transition-all">
          View
        </button>
      </div>
      <div className="flex flex-1" />
    </header>
  );
};

const STORAGE_KEY_PREFIX = "notepad-state";

const Notepad: React.FC<AppComponentsProps> = ({ isActive, app, onClose, onActive, onMinimize, windowTitle }) => {
  const storageKey = `${STORAGE_KEY_PREFIX}:${windowTitle}${app.id ? ":" + app.id : ""}`;
  const editorRef = useRef<HTMLDivElement | null>(null);
  console.log(app)
  // Single source of truth — raw HTML from the contentEditable editor.
  const [textHtml, setTextHtml] = useState<string>("");
  const [cursor, setCursor] = useState<number>(0);

  const [style] = useState({
    fontSize: "14px",
    letterSpacing: "0px",
  });

  const placeCaretAtEnd = (el: HTMLElement) => {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(el);
    range.collapse(false);
    selection?.removeAllRanges();
    selection?.addRange(range);
    el.scrollTop = el.scrollHeight;
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const data = app.data;
    if (data) {
      console.log(data);
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTextHtml(data);
        if (editorRef.current) {
          editorRef.current.innerHTML = data;
          editorRef.current.focus();
          placeCaretAtEnd(editorRef.current);
        }
      } catch {
        console.warn("File data is not parseable");
      }
    } else {
      try {
        const saved = localStorage.getItem(storageKey);
        if (!saved) return;

        const parsed = JSON.parse(saved) as { textHtml?: string };
        const initialHtml = typeof parsed.textHtml === "string" ? parsed.textHtml : "";
        console.log(initialHtml);
        setTextHtml(initialHtml);
        if (editorRef.current) {
          editorRef.current.innerHTML = initialHtml;
          editorRef.current.focus();
          placeCaretAtEnd(editorRef.current);
        }
      } catch (err) {
        console.warn("Invalid notepad state in localStorage", err);
      }
    }
  }, [storageKey]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Store only the HTML — plain text is always derivable from it.
    localStorage.setItem(storageKey, JSON.stringify({ textHtml }));
  }, [textHtml, storageKey]);

  const handleChange = (e: React.FormEvent<HTMLDivElement>) => {
    setTextHtml(e.currentTarget.innerHTML);
    handleCursorEvent();
  };

  const getCaretIndex = (element: HTMLElement): number => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return 0;

    const range = selection.getRangeAt(0);
    const preRange = range.cloneRange();
    preRange.selectNodeContents(element);
    preRange.setEnd(range.endContainer, range.endOffset);
    return preRange.toString().length;
  };

  const handleCursorEvent = () => {
    if (!editorRef.current) return;
    const caret = getCaretIndex(editorRef.current);
    setCursor(caret);
  };

  const [tabShowCloseBtn, setTabShowCloseBtn] = useState(false);
  const [showCloseDialog, setShowCloseDialog] = useState(false);

  const handleEnter = () => setTabShowCloseBtn(true);
  const handleLeave = () => setTabShowCloseBtn(false);

  // Derive plain text on demand — no extra state needed.
  const plainText = getPlainText(textHtml);

  const handleTabCloseClick = () => {
    if (plainText.trimEnd().length < 1) {
      handleCloseWithoutSaving();
    } else {
      setShowCloseDialog(true);
    }
  };

  const handleSave = () => {
    setShowCloseDialog(false);
  };

  const handleCloseWithoutSaving = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(storageKey);
    }
    onClose();
  };

  const handleCancel = () => {
    setShowCloseDialog(false);
  };

  return (
    <Window
      isActive={isActive}
      onClose={onClose}
      onActive={onActive}
      onMinimize={onMinimize}
      minHeight={190}
      minWidth={250}
      windowTitle="notepad"
      titleHeight={38}
      Title={
        <div className="flex items-end h-full">
          <img src="icons/notebook.png" className="no-drag h-9 pl-4 pr-3 pb-3" />
          <div
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            className="inner-rounded no-drag relative flex items-center text-md h-[30px] w-80 min-w-3 pl-6 pr-18 whitespace-nowrap rounded-t-lg text-black bg-[#f8f8f8]"
          >
            <p className="font-semibold text-[12px]">
              {app?.node?.name ? app.node.name : plainText.trimEnd().length > 1 ? plainText.slice(0, 35) : "Untitled"}
            </p>
            <div className="no-drag absolute right-0">
              {tabShowCloseBtn || plainText.trimEnd().length < 1 ? (
                <button
                  onClick={handleTabCloseClick}
                  className="flex items-center text-gray-800 justify-center h-9 w-12 group mr-4 bg-[#f8f8f8] hover:bg-gray-200 outline-6 -outline-offset-1 outline-[#f8f8f8] rounded-md"
                >
                  <X size={15} strokeWidth={1} />
                </button>
              ) : (
                <button
                  onClick={() => setShowCloseDialog(true)}
                  className="flex items-center text-gray-800 justify-center h-9 w-12 group mr-4 bg-[#f8f8f8] hover:bg-gray-200 outline-6 -outline-offset-1 outline-[#f8f8f8] rounded-md"
                >
                  <DotIcon className="scale-150" />
                </button>
              )}
            </div>
          </div>
        </div>
      }
    >
      <Menubar />

      <div
        ref={editorRef}
        style={style}
        contentEditable={true}
        suppressContentEditableWarning={true}
        onInput={handleChange}
        onClick={handleCursorEvent}
        onKeyUp={handleCursorEvent}
        className="flex-1 input bg-[#f9f9f9] outline-none border-none overflow-auto text-black pl-6 pt-5"
      />

      <Footer text={plainText} cursor={cursor} />

      {showCloseDialog && (
        <div className="absolute flex items-center justify-center h-full w-full bg-black/20 text-black">
          <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
            <div className="flex flex-col gap-4 p-[25px]">
              <p className="text-2xl font-semibold">Notepad</p>
              <p className="text-lg">
                Do you want to save changes to {(plainText || "Untitled").slice(0, 35)}.txt?
              </p>
            </div>
            <div className="flex gap-2 bg-[#f3f3f3] border-t border-gray-300 p-6">
              <button
                onClick={handleSave}
                className="flex items-center justify-center text-lg font-medium w-[128px] h-[30px] rounded-md bg-[#5d6e79] text-white hover:bg-[#5d6e79]/90 active:bg-[#5d6e79]/70 transition"
              >
                Save
              </button>
              <button
                onClick={handleCloseWithoutSaving}
                className="flex items-center justify-center text-lg font-medium w-[128px] h-[30px] rounded-md bg-[#f6f6f6] text-black border border-b-2 border-gray-300 hover:bg-[#e7e7e7] active:bg-[#dcdcdc] transition"
              >
                Don't save
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center justify-center text-lg font-medium w-[128px] h-[30px] rounded-md bg-[#f6f6f6] text-black border border-b-2 border-gray-300 hover:bg-[#e7e7e7] active:bg-[#dcdcdc] transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </Window>
  );
};

export default Notepad;
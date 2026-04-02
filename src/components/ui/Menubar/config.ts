export const MENUBAR_HEIGHT = 40;
export const STATUSBAR_HEIGHT = 22;

export interface MenuOption {
  label: string;
  name: string;
  isDisabled: boolean;
  makeHidden: boolean;
  shortcutKey?: string;
  separator?: boolean;
}

export interface MenuItem {
  label: string;
  name: string;
  isDisabled: boolean;
  makeHidden: boolean;
  options: MenuOption[];
}

export const MENU_ITEMS: MenuItem[] = [
  {
    label: "File",
    name: "file",
    isDisabled: false,
    makeHidden: false,
    options: [
      { label: "New File",        name: "new-file",       isDisabled: false, makeHidden: false, shortcutKey: "Ctrl+N" },
      { label: "New Window",      name: "new-window",     isDisabled: false, makeHidden: false, shortcutKey: "Ctrl+Shift+N" },
      { label: "",                name: "sep-1",          isDisabled: false, makeHidden: false, separator: true },
      { label: "Open File…",      name: "open-file",      isDisabled: false, makeHidden: false, shortcutKey: "Ctrl+O" },
      { label: "Open Folder…",    name: "open-folder",    isDisabled: false, makeHidden: false, shortcutKey: "Ctrl+K Ctrl+O" },
      { label: "",                name: "sep-2",          isDisabled: false, makeHidden: false, separator: true },
      { label: "Save",            name: "save",           isDisabled: false, makeHidden: false, shortcutKey: "Ctrl+S" },
      { label: "Save As…",        name: "save-as",        isDisabled: false, makeHidden: false, shortcutKey: "Ctrl+Shift+S" },
      { label: "Save All",        name: "save-all",       isDisabled: false, makeHidden: false, shortcutKey: "Ctrl+K S" },
      { label: "",                name: "sep-3",          isDisabled: false, makeHidden: false, separator: true },
      { label: "Close Editor",    name: "close-editor",   isDisabled: false, makeHidden: false, shortcutKey: "Ctrl+W" },
      { label: "Close Folder",    name: "close-folder",   isDisabled: true,  makeHidden: false, shortcutKey: "Ctrl+K F" },
      { label: "",                name: "sep-4",          isDisabled: false, makeHidden: false, separator: true },
      { label: "Exit",            name: "exit",           isDisabled: false, makeHidden: false },
    ],
  },
  {
    label: "Edit",
    name: "edit",
    isDisabled: false,
    makeHidden: false,
    options: [
      { label: "Undo",            name: "undo",           isDisabled: false, makeHidden: false, shortcutKey: "Ctrl+Z" },
      { label: "Redo",            name: "redo",           isDisabled: false, makeHidden: false, shortcutKey: "Ctrl+Y" },
      { label: "",                name: "sep-1",          isDisabled: false, makeHidden: false, separator: true },
      { label: "Cut",             name: "cut",            isDisabled: false, makeHidden: false, shortcutKey: "Ctrl+X" },
      { label: "Copy",            name: "copy",           isDisabled: false, makeHidden: false, shortcutKey: "Ctrl+C" },
      { label: "Paste",           name: "paste",          isDisabled: false, makeHidden: false, shortcutKey: "Ctrl+V" },
      { label: "",                name: "sep-2",          isDisabled: false, makeHidden: false, separator: true },
      { label: "Find",            name: "find",           isDisabled: false, makeHidden: false, shortcutKey: "Ctrl+F" },
      { label: "Replace",         name: "replace",        isDisabled: false, makeHidden: false, shortcutKey: "Ctrl+H" },
      { label: "",                name: "sep-3",          isDisabled: false, makeHidden: false, separator: true },
      { label: "Toggle Comment",  name: "toggle-comment", isDisabled: false, makeHidden: false, shortcutKey: "Ctrl+/" },
    ],
  },
  {
    label: "View",
    name: "view",
    isDisabled: false,
    makeHidden: false,
    options: [
      { label: "Command Palette", name: "command-palette", isDisabled: false, makeHidden: false, shortcutKey: "Ctrl+Shift+P" },
      { label: "",                name: "sep-1",           isDisabled: false, makeHidden: false, separator: true },
      { label: "Explorer",        name: "explorer",        isDisabled: false, makeHidden: false, shortcutKey: "Ctrl+Shift+E" },
      { label: "Search",          name: "search",          isDisabled: false, makeHidden: false, shortcutKey: "Ctrl+Shift+F" },
      { label: "Extensions",      name: "extensions",      isDisabled: false, makeHidden: false, shortcutKey: "Ctrl+Shift+X" },
      { label: "",                name: "sep-2",           isDisabled: false, makeHidden: false, separator: true },
      { label: "Terminal",        name: "terminal",        isDisabled: false, makeHidden: false, shortcutKey: "Ctrl+`" },
      { label: "Problems",        name: "problems",        isDisabled: false, makeHidden: false, shortcutKey: "Ctrl+Shift+M" },
      { label: "",                name: "sep-3",           isDisabled: false, makeHidden: false, separator: true },
      { label: "Zoom In",         name: "zoom-in",         isDisabled: false, makeHidden: false, shortcutKey: "Ctrl+=" },
      { label: "Zoom Out",        name: "zoom-out",        isDisabled: false, makeHidden: false, shortcutKey: "Ctrl+-" },
      { label: "Reset Zoom",      name: "reset-zoom",      isDisabled: false, makeHidden: false, shortcutKey: "Ctrl+0" },
    ],
  },
];
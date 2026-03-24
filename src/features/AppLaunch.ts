import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type AppType = "fileManager" | "notepad" | "paint";

export interface AppConfig {
  id: string;
  type: AppType;
  name: string;
  icon: string;
  isPinned: boolean,
  data?: string;
  isActive: boolean;
  isClosed: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex?: number;
}

const initialState: AppConfig[] = [
  {
    id: "fileManager-1",
    type: "fileManager",
    name: "File Manager",
    icon: "./icons/explorer.png",
    isPinned: true,
    isActive: false,
    isClosed: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
  },
  {
    id: "notepad-1",
    type: "notepad",
    name: "Notepad",
    icon: "./icons/notebook.png",
    isPinned: true,
    isActive: false,
    isClosed: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
  },
  {
    id: "paint-1",
    type: "paint",
    name: "Paint",
    icon: "./icons/paint.png",
    isPinned: true,
    isActive: false,
    isClosed: true,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
  }
];

const appLaunchSlice = createSlice({
  name: 'appLaunch',
  initialState,
  reducers: {
    closeApp(state, action: PayloadAction<string>) {
      const id = action.payload
      const index = state.findIndex(a => a.id === id);
      if (index === -1) return;
      const app = state[index];

      if (app.isPinned === false) {
        state.splice(index, 1);
      } else {
        app.isClosed = true;
        app.isActive = false;
      }
    },

    activateApp(state, action: PayloadAction<string>) {
      const maxZ = Math.max(...state.map(a => a.zIndex || 0), 0);

      state.forEach(app => {
        if (app.id === action.payload) {
          app.isActive = true;
          app.isMinimized = false;
          app.isClosed = false;
          app.zIndex = maxZ + 1;
        } else {
          app.isActive = false;
        }
      });
    },

    toggleMinimize(state, action: PayloadAction<string>) {
      state.forEach(app => {
        if (app.id === action.payload) {
          app.isMinimized = !app.isMinimized;
          app.isActive = !app.isMinimized;
          app.isClosed = false;
        } else {
          app.isActive = false;
        }
      });
    },

    toggleMaximize(state, action: PayloadAction<string>) {
      const app = state.find(a => a.id === action.payload);
      if (app) {
        app.isMaximized = !app.isMaximized;
      }
    },

    minimizeApp(state, action: PayloadAction<string>) {
      const app = state.find(a => a.id === action.payload);
      if (app) {
        app.isMinimized = true;
        app.isActive = false;
      }
    },

    addNewApp(state, action: PayloadAction<AppConfig>) {
      state.push(action.payload);
    }
  },
});

export const {
  closeApp,
  activateApp,
  toggleMinimize,
  toggleMaximize,
  minimizeApp,
  addNewApp
} = appLaunchSlice.actions;

export default appLaunchSlice.reducer;
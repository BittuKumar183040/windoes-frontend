import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { TITLE_COLOR_PRESETS, type TypeTheme } from "./Themes";

type GlobalSettingsState = {
  titleColor: TypeTheme;
};

const initialState: GlobalSettingsState = {
  titleColor: TITLE_COLOR_PRESETS[0],
};

const globalSettingsSlice = createSlice({
  name: "globalSettings",
  initialState,
  reducers: {
    updateSettings(state, action: PayloadAction<Partial<GlobalSettingsState>>) {
      return {
        ...state,
        ...action.payload,
      };
    },

    setTitleColor(state, action: PayloadAction<TypeTheme>) {
      state.titleColor = action.payload;
    },
  },
});

export const { updateSettings, setTitleColor } = globalSettingsSlice.actions;

export default globalSettingsSlice.reducer;
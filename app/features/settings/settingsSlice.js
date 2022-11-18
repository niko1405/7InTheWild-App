import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
  chatSettings: {
    theme: "Standard",
    fontStyle: "Cracked",
  },
  notifications: {
    enable: true,
    direct: true,
    comments: true,
    blog: true,
    dailySurvey: true,
  },
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    changeTheme: (state, action) => {
      state.darkMode = action.payload;
    },
    changeLiveChatSettings: (state, action) => {
      state.chatSettings = action.payload?.liveChat || {
        theme: "Standard",
        fontStyle: "Cracked",
      };
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload.notifications;
    },
  },
});

export const { changeTheme, changeLiveChatSettings, setNotifications } =
  settingsSlice.actions;

export default settingsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  currentSection: 0,
  total: 0,
  pageToken: "",
  defaultData: [],
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    getData: (state, action) => {
      let payload = action.payload.data;
      const setNew = action.payload.section === 0;

      state.data = setNew ? payload.data : [...state.data, ...payload.data];
      state.currentSection = Number(action.payload.section + 1);
      state.total = payload.total;
      state.pageToken = payload.pageToken;

      if (setNew) state.defaultData = payload.data;
    },
    clear: (state) => {
      state.data = [];
      state.pageToken = "";
      state.currentSection = 0;
      state.total = 0;
    },
  },
});

export const { getData, clear } = newsSlice.actions;

export default newsSlice.reducer;

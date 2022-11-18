import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userProfile: null,
  favorits: {},
  profiles: [],
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    getProfile: (state, action) => {
      state.userProfile = action.payload.profile;
    },
    setFavorits: (state, action) => {
      state.favorits = action.payload.favorits;
    },
    clearProfile: (state) => {
      state.userProfile = null;
      state.profiles = [];
    },
    setProfiles: (state, action) => {
      state.profiles = action.payload.profiles;
    },
  },
});

export const { getProfile, setFavorits, clearProfile, setProfiles } =
  profileSlice.actions;

export default profileSlice.reducer;

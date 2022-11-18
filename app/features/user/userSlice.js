import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  loading: false,
  user: null,
  existUser: null,
  sessionId: "",
  pushToken: "",
  currentLocation: {
    name: "",
    params: {},
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loading: (state, action) => {
      state.loading = action.payload;
    },
    auth: (state, action) => {
      AsyncStorage.setItem("userId", action.payload.result._id);

      state.user = action.payload.result;
    },
    setUser: (state, action) => {
      state.user = action.payload.result;
    },
    logout: (state) => {
      AsyncStorage.removeItem("userId");

      state.sessionId = uuidv4();
      state.user = null;
    },
    deleteAcc: (state) => {
      AsyncStorage.removeItem("userId");

      (state.sessionId = ""), (state.user = null);
    },
    getUserID: (state, action) => {
      state.existUser = action.payload.result;
    },
    changePassword: (state) => {
      state.existUser = null;
    },
    changeSessionID: (state) => {
      state.sessionId = uuidv4();
    },
    setPushToken: (state, action) => {
      state.pushToken = action.payload.token;
    },
    changeLocation: (state, action) => {
      state.currentLocation = action.payload.location;
    },
  },
});

export const {
  loading,
  auth,
  setUser,
  logout,
  deleteAcc,
  getUserID,
  changePassword,
  changeSessionID,
  setPushToken,
  changeLocation,
} = userSlice.actions;

export default userSlice.reducer;

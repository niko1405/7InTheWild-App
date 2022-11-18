import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  post: null,
  archive: [],
  currentSection: 0,
  totalPosts: 0,
  newestPosts: [],
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getPosts: (state, action) => {
      let payload = action.payload;
      const setNew = payload.section === 0;

      state.posts = setNew ? payload.posts : [...state.posts, ...payload.posts];
      state.currentSection = Number(payload.section + 1);
      state.totalPosts = payload.totalPosts;

      if (setNew) state.newestPosts = payload.posts;
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    getPost: (state, action) => {
      state.post = action.payload.post;
    },
    getArchive: (state, action) => {
      state.archive = action.payload.archive;
    },
    clear: (state) => {
      state.post = null;
      state.posts = [];
      state.currentSection = 0;
      state.totalPosts = 0;
    },
  },
});

export const { getPosts, getPost, clear, getArchive, setPosts } =
  postSlice.actions;

export default postSlice.reducer;

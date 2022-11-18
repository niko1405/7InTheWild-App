import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./app/features/user/userSlice";
import chatReducer from "./app/features/chat/chatSlice";
import settingsReducer from "./app/features/settings/settingsSlice";
import surveyReducer from "./app/features/survey/surveySlice";
import profileReducer from "./app/features/profile/profileSlice";
import postReducer from "./app/features/post/postSlice";
import newsReducer from "./app/features/news/newsSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer,
    settings: settingsReducer,
    survey: surveyReducer,
    profile: profileReducer,
    post: postReducer,
    news: newsReducer,
  },
});

import axios from "axios";
import * as serverInfo from "../constants/serverInfo";

const uri = serverInfo.host;

const API = axios.create({
  baseURL: uri,
  proxy: undefined,
  timeout: 15 * 1000,
  timeoutErrorMessage:
    "Ein Fehler ist aufgetreten. Bitte versuche es später erneut.",
});

export const signup = (formData) => API.post(`/user/signup`, formData);
export const login = (formData) => API.post(`/user/login`, formData);
export const googleSignIn = (googleData) =>
  API.post("/user/googleSignIn", googleData);
export const getUser = (userId) => API.get(`/user/user/${userId}`);
export const existUser = (query) => API.patch(`/user/user`, query);
export const changePassword = (userId, password) =>
  API.post(`/user/changePassword`, { userId, password });
export const updateUser = (userId, formData) =>
  API.patch(`/user/updateUser/${userId}`, formData);
export const deleteAccount = (userId) => API.get(`/user/deleteAcc/${userId}`);
export const changeUsername = (userId, userName) =>
  API.post(`/user/changeUsername/${userId}`, { userName });
export const setPushToken = (userId, token) =>
  API.patch(`/user/token/${userId}`, { token });
export const getPushToken = (userId) => API.get(`/user/token/${userId}`);
export const getPremium = (userId) => API.get(`/user/premium/${userId}`);

export const changeLocation = (userId, location) =>
  API.patch(`/user/location/${userId}`, { location });
export const changeNotifications = (userId, notifications) =>
  API.patch(`/user/notifications/${userId}`, { notifications });

export const updateProfile = async (userId, formData, callback) => {
  fetch(uri + `/profile/upload/${userId}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
    method: "POST",
    body: formData,
  })
    .then(async (response) => {
      const res = await response.json();
      callback(null, res);
    })
    .catch((err) => callback(err, null));
};
export const getProfile = (userId, userName) =>
  API.get(`/profile?userId=${userId}&userName=${userName}`);
export const setFavorit = (userId, name) =>
  API.patch(`/profile/favorit/${userId}`, { name });
export const getFavorits = () => API.get("/profile/favorits");
export const searchProfiles = (searchQuery) =>
  API.patch("/profile/search", { searchQuery });

export const comment = (comment, chatId) =>
  API.post(`/chat/comment/${chatId}`, comment);
export const searchChat = (participants) =>
  API.post(`/chat/search`, participants);
export const createChat = (comment, globalChat, participants) =>
  API.post(`/chat/create`, { comment, globalChat, participants });
export const getChat = (chatId) => API.get(`/chat/${chatId}`);
export const getChats = (userId) => API.get(`/chat/user/${userId}`);
export const chatAction = (chatId, userId, subject) =>
  API.patch(`/chat/action?chatId=${chatId}&userId=${userId}`, { subject });
export const removeLatestMessages = (userId, chatId) =>
  API.get(`/chat/latest-messages?userId=${userId}&chatId=${chatId}`);

export const changeLiveChatSettings = async (userId, formData, callback) => {
  fetch(uri + `/settings/chat/${userId}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
    method: "PATCH",
    body: formData,
  })
    .then(async (response) => {
      const res = await response.json();
      callback(null, res);
    })
    .catch((err) => {
      callback(err, null);
    });
};
export const getLiveChatSettings = (userId) =>
  API.get(`/settings/chat/${userId}`);
export const getNotifications = (userId) =>
  API.get(`/settings/notifications/${userId}`);
export const setNotifications = (userId, form) =>
  API.patch(`/settings/notifications/${userId}`, form);
export const changeTheme = (userId, darkMode) =>
  API.patch(`/settings/theme/${userId}`, { darkMode });

export const createSurvey = (userId, survey) =>
  API.post(`/survey/create/${userId}`, survey);
export const getSurvey = (surveyId) => API.get(`/survey/${surveyId}`);
export const getSurveys = (userId, section, filter) =>
  API.get(`/survey/user?userId=${userId}&section=${section}&filter=${filter}`);
export const updateSurvey = (surveyId, newSurvey) =>
  API.patch(`/survey/update/${surveyId}`, newSurvey);
export const likeSurvey = (userId, surveyId) =>
  API.patch(`/survey/like/${surveyId}`, { userId });
export const voteSurvey = (userId, surveyId, option) =>
  API.patch(`/survey/vote/${surveyId}`, { userId, option });
export const getComments = (surveyId) =>
  API.get(`/survey/comments/${surveyId}`);
export const commentSurvey = (surveyId, comment, newComment, answerComment) =>
  API.patch(`/survey/comment/${surveyId}`, {
    comment,
    newComment,
    answerComment,
  });
export const likeCommentSurvey = (
  surveyId,
  messageId,
  answerId,
  userId,
  likedUserId
) =>
  API.patch(`/survey/comment/like/${surveyId}`, {
    messageId,
    answerId,
    userId,
    likedUserId,
  });
export const deleteCommentSurvey = (surveyId, messageId, answerId) =>
  API.patch(`/survey/comment/delete/${surveyId}`, { messageId, answerId });
export const deleteSurvey = (surveyId) => API.get(`/survey/delete/${surveyId}`);

export const voteDailySurvey = (userId, surveyId, option) =>
  API.patch(`/daily-survey/vote/${surveyId}`, { userId, option });
export const getDailySurveys = () => API.get(`/daily-survey/surveys`);

export const getPosts = (section, limit) =>
  API.get(`/post/posts?pageNo=${section}&limit=${limit}`);
export const getPostsByFilter = (filter, searchTags) =>
  API.get(`/post/filter?filter=${filter}&searchTags=${searchTags}`);
export const getPost = (slug) => API.get(`/post/${slug}`);
export const getArchive = () => API.get(`/post/archive`);
export const searchPosts = (searchQuery) =>
  API.patch(`/post/search`, { searchQuery });

export const getNewsData = (section, pageToken) =>
  API.get(`/news/data?section=${section}&pageToken=${pageToken}`);

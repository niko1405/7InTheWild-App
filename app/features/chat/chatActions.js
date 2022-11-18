import Toast from "react-native-tiny-toast";

import * as api from "../../api";
import * as toast from "../../constants/toastOptions";
import { loading, setUser } from "../user/userSlice";
import { chatStateAction, comment, getChat, getChats } from "./chatSlice";

export const commentAction =
  (commentObj, chatId, globalChat, participants) => async (dispatch) => {
    dispatch(loading(true));

    if (!chatId) {
      await api
        .createChat(commentObj, globalChat, participants)
        .then(({ data }) => {
          dispatch(comment(data.chat));
        })
        .catch((err) => {
          Toast.show(
            err?.response?.data?.message || err?.message,
            toast.errorOptions
          );
        });
    } else {
      await api
        .comment(commentObj, chatId)
        .then(({ data }) => {
          dispatch(comment(data.chat));
        })
        .catch((err) => {
          Toast.show(
            err?.response?.data?.message || err?.message,
            toast.errorOptions
          );
        });
    }

    dispatch(loading(false));
  };

export const getChatAction =
  (chatId, callback = (_) => {}) =>
  async (dispatch) => {
    dispatch(loading(true));

    await api
      .getChat(chatId)
      .then(({ data }) => {
        callback(data, null);

        dispatch(getChat(data.chat));
      })
      .catch((err) => {
        callback(null, err);

        Toast.show(
          err?.response?.data?.message || err?.message,
          toast.errorOptions
        );
      });

    dispatch(loading(false));
  };

export const searchChatAction =
  (participants, callback = (_) => {}) =>
  async (dispatch) => {
    dispatch(loading(true));

    await api
      .searchChat(participants)
      .then(({ data }) => {
        callback(data, null);
        dispatch(getChat(data.chat));
      })
      .catch((err) => {
        callback(null, err);

        Toast.show(
          err?.response?.data?.message || err?.message,
          toast.errorOptions
        );
      });

    dispatch(loading(false));
  };

export const getChatsAction =
  (userId, callback = (_) => {}) =>
  async (dispatch) => {
    dispatch(loading(true));

    await api
      .getChats(userId)
      .then(({ data }) => {
        callback(data, null);

        dispatch(getChats(data.chats));
      })
      .catch((err) => {
        callback(null, err);

        Toast.show(
          err?.response?.data?.message || err?.message,
          toast.errorOptions
        );
      });

    dispatch(loading(false));
  };

export const chatAction =
  (chatId, userId, subject, callback = (_) => {}) =>
  async (dispatch) => {
    dispatch(loading(true));

    await api
      .chatAction(chatId, userId, subject)
      .then(({ data }) => {
        callback(data, null);

        dispatch(
          chatStateAction({
            chatId,
            newChat: data.newChat,
            delete: subject === "delete",
          })
        );
      })
      .catch((err) => {
        callback(null, err);

        Toast.show(
          err?.response?.data?.message || err?.message,
          toast.errorOptions
        );
      });

    dispatch(loading(false));
  };

export const removeLatestMessagesAction =
  (userId, chatId) => async (dispatch) => {
    await api
      .removeLatestMessages(userId, chatId)
      .then(({ data }) => {
        dispatch(setUser(data));
      })
      .catch((err) => {
        console.log(err?.response?.data?.message || err?.message);
      });
  };

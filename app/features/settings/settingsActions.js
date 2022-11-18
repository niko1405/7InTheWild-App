import * as api from "../../api";
import * as toast from "../../constants/toastOptions";
import {
  changeLiveChatSettings,
  changeTheme,
  setNotifications,
} from "./settingsSlice";
import { loading } from "../user/userSlice";
import Toast from "react-native-tiny-toast";

export const changeThemeAction = (userId, darkMode) => async (dispatch) => {
  dispatch(changeTheme(darkMode));

  await api.changeTheme(userId, darkMode).catch((err) => {
    console.log(err?.response?.data?.message || err?.message);
  });
};

export const changeLiveChatSettingsAction = (userId, formData, callback) =>
  api.changeLiveChatSettings(userId, formData, (err, data) =>
    callback(err, data)
  );

export const getLiveChatSettingsAction = (userId) => async (dispatch) => {
  dispatch(loading(true));

  await api
    .getLiveChatSettings(userId)
    .then(({ data }) => {
      dispatch(changeLiveChatSettings(data));
    })
    .catch((err) => {
      console.log(err?.response?.data?.message || err?.message);
    });

  dispatch(loading(false));
};

export const setNotificationsAction = (userId, form) => async (dispatch) => {
  dispatch(loading(true));
  Toast.showLoading("Lade..", toast.loadingOptions);

  await api
    .setNotifications(userId, form)
    .then(({ data }) => {
      Toast.hide();

      dispatch(setNotifications(data));

      Toast.showSuccess(
        "Änderungen erfolgreich gespeichert!",
        toast.successOptions
      );
    })
    .catch((err) => {
      Toast.hide();

      Toast.show(
        err?.response?.data?.message || err?.message,
        toast.errorOptions
      );
    });

  dispatch(loading(false));
};

export const getNotificationsAction = (userId) => async (dispatch) => {
  dispatch(loading(true));

  await api
    .getNotifications(userId)
    .then(({ data }) => {
      dispatch(setNotifications(data));
    })
    .catch((err) => {
      Toast.show(
        err?.response?.data?.message || err?.message,
        toast.errorOptions
      );
    });

  dispatch(loading(false));
};

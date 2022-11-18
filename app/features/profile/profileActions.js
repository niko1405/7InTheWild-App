import Toast from "react-native-tiny-toast";

import * as api from "../../api";
import * as toast from "../../constants/toastOptions";
import { loading, setUser } from "../user/userSlice";
import { getProfile, setFavorits, setProfiles } from "./profileSlice";

export const updateProfileAction =
  (userId, formData, setEditProfile) => (dispatch) => {
    Toast.showLoading("Lade..", toast.loadingOptions);

    api.updateProfile(userId, formData, (err, res) => {
      Toast.hide();

      if (err)
        return Toast.show(
          err?.message || err?.response?.data?.message,
          toast.errorOptions
        );

      setEditProfile(false);

      dispatch(setUser(res));

      if (res.message.length)
        Toast.showSuccess(res.message, toast.successOptions);
    });
  };

export const getProfileAction =
  (userId = null, userName = null, isLoading = true) =>
  async (dispatch) => {
    isLoading && dispatch(loading(true));

    await api
      .getProfile(userId, userName)
      .then(({ data }) => {
        dispatch(getProfile(data));
      })
      .catch((err) => {
        Toast.show(
          err?.response?.data?.message || err?.message,
          toast.errorOptions
        );
      });

    isLoading && dispatch(loading(false));
  };

export const setFavoritAction = (userId, name) => async (dispatch) => {
  dispatch(loading(true));

  await api
    .setFavorit(userId, name)
    .then(({ data }) => {
      dispatch(setFavorits(data));
    })
    .catch((err) => {
      Toast.show(
        err?.response?.data?.message || err?.message,
        toast.errorOptions
      );
    });

  dispatch(loading(false));
};

export const getFavoritsAction =
  (callback = (_) => {}) =>
  async (dispatch) => {
    dispatch(loading(true));

    await api
      .getFavorits()
      .then(({ data }) => {
        callback(data, null);

        dispatch(setFavorits(data));
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

export const searchProfilesAction =
  (searchQuery, callback) => async (dispatch) => {
    dispatch(loading(true));

    await api
      .searchProfiles(searchQuery)
      .then(({ data }) => {
        dispatch(setProfiles(data));

        callback(null, data);
      })
      .catch((err) => {
        Toast.show(
          err?.response?.data?.message || err?.message,
          toast.errorOptions
        );

        callback(err, null);
      });

    dispatch(loading(false));
  };

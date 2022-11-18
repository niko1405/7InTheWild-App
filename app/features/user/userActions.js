import Toast from "react-native-tiny-toast";

import {
  auth,
  changeLocation,
  changePassword,
  changeSessionID,
  deleteAcc,
  getUserID,
  loading,
  logout,
  setPushToken,
  setUser,
} from "./userSlice";
import * as api from "../../api";
import * as toast from "../../constants/toastOptions";
import { getProfileSurveysAction } from "../survey/surveyActions";
import { getLiveChatSettingsAction } from "../settings/settingsActions";

export const signupAction = (formData, navigate) => async (dispatch) => {
  dispatch(loading(true));
  Toast.showLoading("Lade..", toast.loadingOptions);

  await api
    .signup(formData)
    .then(({ data }) => {
      dispatch(auth(data));
      dispatch(changeSessionID());

      //load user data
      const userId = data.user?._id;

      if (userId) {
        Promise.all([
          dispatch(getLiveChatSettingsAction(userId)),
          dispatch(getProfileSurveysAction(userId, true)),
        ])
          .then(() => {
            Toast.hide();

            Toast.showSuccess(data.message, toast.successOptions);
            navigate("HomeStack");
          })
          .catch(() => {});
      } else {
        Toast.hide();

        Toast.showSuccess(data.message, toast.successOptions);
        navigate("HomeStack");
      }
    })
    .catch((err) => {
      Toast.hide();

      const error = err?.response?.data;

      Toast.show(error?.message || err?.message, toast.errorOptions);
    });

  dispatch(loading(false));
};

export const loginAction =
  (formData, setForgotPassword, navigate) => async (dispatch) => {
    dispatch(loading(true));
    Toast.showLoading("Lade..", toast.loadingOptions);

    await api
      .login(formData)
      .then(({ data }) => {
        Toast.hide();

        dispatch(auth(data));
        dispatch(changeSessionID());

        //load user data
        const userId = data.user?._id;

        if (userId) {
          Promise.all([
            dispatch(getLiveChatSettingsAction(userId)),
            dispatch(getProfileSurveysAction(userId, true)),
          ])
            .then(() => {
              Toast.hide();

              Toast.showSuccess(data.message, toast.successOptions);
              navigate("HomeStack");
            })
            .catch(() => {});
        } else {
          Toast.hide();

          Toast.showSuccess(data.message, toast.successOptions);
          navigate("HomeStack");
        }
      })
      .catch((err) => {
        Toast.hide();

        const error = err?.response?.data;

        Toast.show(error?.message || err?.message, toast.errorOptions);
        setForgotPassword(true);
      });

    dispatch(loading(false));
  };

export const googleSignInAction =
  (accessToken, navigate) => async (dispatch) => {
    dispatch(loading(true));
    Toast.showLoading("Lade..", toast.loadingOptions);

    const response = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const googleData = await response.json();

    await api
      .googleSignIn(googleData)
      .then(({ data }) => {
        Toast.hide();

        dispatch(auth(data));
        dispatch(changeSessionID());

        navigate("HomeStack");

        Toast.showSuccess(data.message, toast.successOptions);
      })
      .catch((err) => {
        Toast.hide();

        const error = err?.response?.data;

        Toast.show(error?.message || err?.message, toast.errorOptions);
      });

    dispatch(loading(false));
  };

export const getUserAction = (userId) => async (dispatch) => {
  await api
    .getUser(userId)
    .then(({ data }) => {
      dispatch(setUser(data));
      dispatch(changeSessionID());
    })
    .catch((_) => {});
};

export const existUserAction =
  (query, onSuccess = (_) => {}) =>
  async (dispatch) => {
    dispatch(loading(true));
    Toast.showLoading("Lade..", toast.loadingOptions);

    await api
      .existUser(query)
      .then(({ data }) => {
        Toast.hide();

        dispatch(getUserID(data));

        onSuccess();
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

export const logoutAction = (navigate) => (dispatch) => {
  dispatch(logout());

  navigate("HomeTabs", { screen: "LoginStack" });

  Toast.showSuccess("Erfolgreich ausgeloggt", toast.successOptions);
};

export const changePasswordAction =
  (userId, password, navigate) => async (dispatch) => {
    dispatch(loading(true));
    Toast.showLoading("Lade..", toast.loadingOptions);

    await api
      .changePassword(userId, password)
      .then(({ data }) => {
        Toast.hide();

        dispatch(changePassword());

        navigate("Login");

        Toast.showSuccess(data.message, toast.successOptions);
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

export const updateUserAction = (userId, formData) =>
  api.updateUser(userId, formData);

export const deleteAccountAction = (userId, navigate) => async (dispatch) => {
  dispatch(loading(true));
  Toast.showLoading("Lade..", toast.loadingOptions);

  await api
    .deleteAccount(userId)
    .then(({ data }) => {
      Toast.hide(toast);

      dispatch(deleteAcc());

      navigate("HomeTabs", { screen: "LoginStack" });

      Toast.show(data.message, toast.deleteOptions);
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

export const setPushTokenAction = (userId, token) => async (dispatch) => {
  dispatch(loading(true));

  await api
    .setPushToken(userId, token)
    .then(({ data }) => {
      dispatch(setPushToken(data));
    })
    .catch((err) => {
      console.log(err?.response?.data?.message || err?.message);
    });

  dispatch(loading(false));
};

export const getPushToken = (userId) => async (dispatch) => {
  dispatch(loading(true));

  await api
    .getPushToken(userId)
    .then(({ data }) => {
      dispatch(setPushToken(data));
    })
    .catch((err) => {
      console.log(err?.response?.data?.message || err?.message);
    });

  dispatch(loading(false));
};

export const changeLocationAction = (userId, location) => async (dispatch) => {
  api
    .changeLocation(userId, location)
    .then(({ data }) => {
      dispatch(changeLocation(data));
    })
    .catch((err) => {
      console.log(err?.response?.data?.message || err?.message);
    });
};

export const changeNotificationsAction =
  (userId, notifications) => async (dispatch) => {
    api
      .changeNotifications(userId, notifications)
      .then(({ data }) => {
        dispatch(setUser(data));
      })
      .catch((err) => {
        console.log(err.response);
        console.log(err?.response?.data?.message || err?.message);
      });
  };

export const getPremium = (userId, navigate) => async (dispatch) => {
  dispatch(loading(true));
  Toast.showLoading("Lade..", toast.loadingOptions);

  await api
    .getPremium(userId)
    .then(({ data }) => {
      Toast.hide();

      navigate("HomeTabs", { screen: "HomeStack" });

      dispatch(setUser(data));
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

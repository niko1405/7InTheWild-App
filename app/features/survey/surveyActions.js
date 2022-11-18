import Toast from "react-native-tiny-toast";

import * as toast from "../../constants/toastOptions";
import * as api from "../../api";
import { loading } from "../user/userSlice";
import {
  deleteSurvey,
  getComments,
  getSurveys,
  like,
  setDailySurveys,
  setProfileSurveys,
  setSurvey,
  updateDailySurveys,
} from "./surveySlice";

export const createSurveyAction =
  (userId, survey, clear) => async (dispatch) => {
    dispatch(loading(true));
    Toast.showLoading("Lade..", toast.loadingOptions);

    await api
      .createSurvey(userId, survey)
      .then(({ data }) => {
        Toast.hide();

        clear();

        dispatch(setSurvey(data));

        Toast.showSuccess(data.message, toast.successOptions);

        dispatch(getProfileSurveysAction(userId, true));
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

export const getSurveyAction =
  (surveyId, isLoading = true) =>
  async (dispatch) => {
    isLoading && dispatch(loading(true));
    isLoading && Toast.showLoading("Lade..", toast.loadingOptions);

    await api
      .getSurvey(surveyId)
      .then(({ data }) => {
        dispatch(setSurvey(data));
      })
      .catch((err) => {
        Toast.show(
          err?.response?.data?.message || err?.message,
          toast.errorOptions
        );
      });

    isLoading && Toast.hide();
    isLoading && dispatch(loading(false));
  };

export const getSurveysAction =
  (section = null, filter = null, callback = (_) => {}, loadMore = false) =>
  async (dispatch) => {
    dispatch(loading(true));

    await api
      .getSurveys(null, section, filter)
      .then(({ data }) => {
        dispatch(getSurveys({ section, data, loadMore }));

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

export const getProfileSurveysAction =
  (userId, ownProfile = false) =>
  async (dispatch) => {
    await api
      .getSurveys(userId, null, null)
      .then(({ data }) => {
        dispatch(setProfileSurveys({ data, ownProfile }));
      })
      .catch(() => {});
  };

export const updateSurveyAction =
  (surveyId, newSurvey, clear, setParams) => async (dispatch) => {
    dispatch(loading(true));
    Toast.showLoading("Lade..", toast.loadingOptions);

    await api
      .updateSurvey(surveyId, newSurvey)
      .then(({ data }) => {
        Toast.hide();

        setParams({ surveyId: undefined, title: "Umfrage erstellen" });

        clear();

        dispatch(setSurvey(data));

        Toast.showSuccess(data.message, toast.successOptions);
      })
      .catch((err) => {
        Toast.hide();
        console.log(err.message);
        Toast.show(
          err?.response?.data?.message || err?.message,
          toast.errorOptions
        );
      });

    dispatch(loading(false));
  };

export const deleteSurveyAction = (surveyId) => async (dispatch) => {
  dispatch(loading(true));
  Toast.showLoading("Lade..", toast.loadingOptions);

  await api
    .deleteSurvey(surveyId)
    .then(({ data }) => {
      Toast.hide();

      dispatch(deleteSurvey(surveyId));

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

export const likeSurveyAction = (userId, surveyId) => async (dispatch) => {
  dispatch(loading(true));

  await api
    .likeSurvey(userId, surveyId)
    .then(({ data }) => {
      dispatch(like(data));
    })
    .catch((err) => {
      Toast.show(
        err?.response?.data?.message || err?.message,
        toast.errorOptions
      );
    });

  dispatch(loading(false));
};

export const voteSurveyAction =
  (userId, surveyId, option) => async (dispatch) => {
    dispatch(loading(true));

    await api
      .voteSurvey(userId, surveyId, option)
      .then(({ data }) => {
        dispatch(setSurvey(data));
      })
      .catch((err) => {
        Toast.show(
          err?.response?.data?.message || err?.message,
          toast.errorOptions
        );
      });

    dispatch(loading(false));
  };

export const getCommentsAction = (surveyId) => async (dispatch) => {
  dispatch(loading(true));

  await api
    .getComments(surveyId)
    .then(({ data }) => {
      dispatch(getComments(data));
    })
    .catch((err) => {
      Toast.show(
        err?.response?.data?.message || err?.message,
        toast.errorOptions
      );
    });

  dispatch(loading(false));
};

export const commentSurveyAction =
  (surveyId, comment, newComment, answerComment) => async (dispatch) => {
    dispatch(loading(true));

    await api
      .commentSurvey(surveyId, comment, newComment, answerComment)
      .then(({ data }) => {
        dispatch(setSurvey(data));
      })
      .catch((err) => {
        Toast.show(
          err?.response?.data?.message || err?.message,
          toast.errorOptions
        );
      });

    dispatch(loading(false));
  };

export const likeCommentSurveyAction =
  (surveyId, messageId, userId, likedUserId, answerId = "") =>
  async (dispatch) => {
    dispatch(loading(true));

    await api
      .likeCommentSurvey(surveyId, messageId, answerId, userId, likedUserId)
      .then(({ data }) => {
        dispatch(setSurvey(data));
      })
      .catch((err) => {
        Toast.show(
          err?.response?.data?.message || err?.message,
          toast.errorOptions
        );
      });

    dispatch(loading(false));
  };

export const deleteCommentSurveyAction =
  (surveyId, messageId, answerId = "") =>
  async (dispatch) => {
    dispatch(loading(true));

    await api
      .deleteCommentSurvey(surveyId, messageId, answerId)
      .then(({ data }) => {
        dispatch(setSurvey(data));
      })
      .catch((err) => {
        Toast.show(
          err?.response?.data?.message || err?.message,
          toast.errorOptions
        );
      });

    dispatch(loading(false));
  };

export const getDailySurveysAction =
  (callback = () => {}) =>
  async (dispatch) => {
    dispatch(loading(true));

    await api
      .getDailySurveys()
      .then(({ data }) => {
        dispatch(setDailySurveys(data));

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

export const voteDailySurveyAction =
  (userId, surveyId, option) => async (dispatch) => {
    dispatch(loading(true));

    await api
      .voteDailySurvey(userId, surveyId, option)
      .then(({ data }) => {
        dispatch(setSurvey(data));
        dispatch(updateDailySurveys(data));
      })
      .catch((err) => {
        Toast.show(
          err?.response?.data?.message || err?.message,
          toast.errorOptions
        );
      });

    dispatch(loading(false));
  };

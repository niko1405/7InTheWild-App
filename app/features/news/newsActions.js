import Toast from "react-native-tiny-toast";

import * as api from "../../api";
import * as toast from "../../constants/toastOptions";

import { loading } from "../user/userSlice";
import { getData } from "./newsSlice";

export const getNewsDataAction =
  (section, pageToken = null, callback = (_) => {}) =>
  async (dispatch) => {
    dispatch(loading(true));

    await api
      .getNewsData(section, pageToken)
      .then(({ data }) => {
        dispatch(getData({ data, section }));

        callback(null, data);
      })
      .catch((err) => {
        const error = err?.response?.data;
        Toast.show(error?.message || err?.message, toast.errorOptions);

        callback(err, null);
      });

    dispatch(loading(false));
  };

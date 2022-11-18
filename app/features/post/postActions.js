import Toast from "react-native-tiny-toast";

import * as api from "../../api";
import * as toast from "../../constants/toastOptions";
import { loading } from "../user/userSlice";
import { getArchive, getPost, getPosts, setPosts } from "./postSlice";

export const getPostsAction =
  (section, callback = (_) => {}) =>
  async (dispatch) => {
    dispatch(loading(true));

    await api
      .getPosts(section, 10)
      .then(({ data }) => {
        dispatch(getPosts({ posts: data.posts, total: data.total, section }));

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

export const getPostsByFilterAction =
  (filter, callback, searchTags = false) =>
  async (dispatch) => {
    dispatch(loading(true));

    await api
      .getPostsByFilter(filter, searchTags)
      .then(({ data }) => {
        dispatch(setPosts(data));

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

export const getPostAction = (slug, callback) => async (dispatch) => {
  dispatch(loading(true));

  await api
    .getPost(slug)
    .then(({ data }) => {
      dispatch(getPost(data));

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

export const getArchiveAction = () => async (dispatch) => {
  await api
    .getArchive()
    .then(({ data }) => {
      dispatch(getArchive(data));
    })
    .catch((err) => {
      Toast.show(
        err?.response?.data?.message || err?.message,
        toast.errorOptions
      );
    });
};

export const searchPostsAction =
  (searchQuery, callback) => async (dispatch) => {
    dispatch(loading(true));

    await api
      .searchPosts(searchQuery)
      .then(({ data }) => {
        dispatch(setPosts(data));

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

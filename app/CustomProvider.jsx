import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { AppState, Platform } from "react-native";
import { DarkTheme, DefaultTheme, Provider } from "react-native-paper";

import { changeSessionID } from "./features/user/userSlice";
import {
  changeLocationAction,
  getUserAction,
  setPushTokenAction,
} from "./features/user/userActions";
import { getLiveChatSettingsAction } from "./features/settings/settingsActions";
import {
  getDailySurveysAction,
  getProfileSurveysAction,
  getSurveysAction,
} from "./features/survey/surveyActions";

import { navigationRef } from "./navigation/AppStack";
import { getPostsAction } from "./features/post/postActions";
import { getNewsDataAction } from "./features/news/newsActions";
import { useState } from "react";
import Loading from "./components/Loading";
import NetworkError from "./components/NetworkError";
import images from "./constants/images";
import { getFavoritsAction } from "./features/profile/profileActions";
import { changeTheme } from "./features/settings/settingsSlice";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const CustomProvider = ({ children }) => {
  const dispatch = useDispatch();
  const notificationListener = useRef();
  const responseListener = useRef();
  const appState = useRef(AppState.currentState);
  const appStateListener = useRef();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { darkMode } = useSelector((state) => state.settings);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    //load user data
    async function getUserData() {
      const userId = await AsyncStorage.getItem("userId");

      dispatch(changeSessionID());

      setLoading(true);

      Promise.all([
        userId ? dispatch(getUserAction(userId)) : null,
        userId ? dispatch(getLiveChatSettingsAction(userId)) : null,
        userId ? dispatch(getProfileSurveysAction(userId, true)) : null,
        dispatch(getDailySurveysAction()),
        dispatch(getPostsAction(0)),
        dispatch(getNewsDataAction(0)),
        dispatch(getSurveysAction(1, "Neueste")),
        dispatch(getFavoritsAction()),
      ])
        .then(() => {
          if (user) dispatch(changeTheme(user.darkMode));

          setLoading(false);
        })
        .catch(() => {
          setError(true);
          setLoading(false);
        });
    }

    getUserData();
  }, []);

  useEffect(() => {
    if (user)
      appStateListener.current = AppState.addEventListener(
        "change",
        _handleAppStateChange
      );

    return () => {
      if (user && appStateListener.current) appStateListener.current.remove();
    };
  }, [user]);

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState !== "active"
    )
      dispatch(changeLocationAction(user?._id, { name: "", params: {} }));

    //set location to default to handle notifications
    appState.current = nextAppState;
  };

  //handle Notifications
  useEffect(() => {
    if (user) {
      registerForPushNotifications().then((token) =>
        dispatch(setPushTokenAction(user._id, token))
      );

      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          dispatch(getUserAction(user._id)); //reloading user properties
          dispatch(getDailySurveysAction(() => {}));
        });

      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          const data = response.notification.request.content.data;
          navigationRef.current?.navigate(data.location, data.extraLocation);
        });
    }

    return () => {
      if (user) {
        if (notificationListener.current)
          Notifications.removeNotificationSubscription(
            notificationListener.current
          );
        if (responseListener.current)
          Notifications.removeNotificationSubscription(
            responseListener.current
          );
      }
    };
  }, [user]);

  if (loading) return <Loading fullScreen />;

  if (error)
    return (
      <NetworkError
        title="Ein Fehler ist aufgetreten. Versuche es später erneut"
        image={images.error}
      />
    );

  return (
    <Provider theme={darkMode ? DarkTheme : DefaultTheme}>{children}</Provider>
  );
};

async function registerForPushNotifications() {
  if (!Device.isDevice) return;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.log("Failed to get push token for push notification!");
    return;
  }

  const token = (
    await Notifications.getDevicePushTokenAsync().catch((err) =>
      console.log(err)
    )
  )?.data;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}

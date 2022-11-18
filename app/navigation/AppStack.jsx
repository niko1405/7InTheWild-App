import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";

import {
  AdEventType,
  InterstitialAd,
  TestIds,
} from "react-native-google-mobile-ads";

import DrawerNavigator from "./DrawerNavigator";
import MessageStackNavigator from "./StackNavigators/MessageStackNavigator";
import { changeLocationAction } from "../features/user/userActions";
import BlogPostDetails from "../components/BlogPostDetails";
import Navbar from "../components/Navbar";
import CommentsStack from "./StackNavigators/CommentsStack";
import { useStateContext } from "../contexts/ContextProvider";
import PremiumScreen from "../screens/SettingsScreen/Stacks/PremiumScreen";
import { useState } from "react";

export const navigationRef = React.createRef();

let lastNavState = null;

const defaultLocation = {
  name: "",
  params: {},
};

const getCurrentLocation = (state) => {
  if (state.index === undefined || state.index < 0) {
    return undefined;
  }
  const nestedState = state.routes[state.index].state;
  if (nestedState !== undefined) {
    return getCurrentLocation(nestedState);
  }

  return {
    name: state.routes[state.index].name,
    params: state.routes[state.index].params,
  };
};

const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
  requestNonPersonalizedAdsOnly: true,
});

const Stack = createStackNavigator();

const AppStackNavigator = () => {
  const dispatch = useDispatch();

  const { setScrollTop } = useStateContext();
  const { user, currentLocation } = useSelector((state) => state.user);
  const { darkMode } = useSelector((state) => state.settings);

  const [interstitialIndex, setInterstitialIndex] = useState(0);
  const [interstitialLoaded, setInterstitialLoaded] = useState(false);

  const loadInterstitial = () => {
    const unsubscribeLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setInterstitialLoaded(true);
      }
    );

    const unsubscribeClosed = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        //reset counter
        setInterstitialIndex(0);

        setInterstitialLoaded(false);
        interstitial.load();
      }
    );

    interstitial.load();

    return () => {
      unsubscribeClosed();
      unsubscribeLoaded();
    };
  };

  useEffect(() => {
    let unsubscribeInterstitialEvents = (_) => {};

    if (!user?.premium) {
      unsubscribeInterstitialEvents = loadInterstitial();
    }

    return () => {
      //remove listeners on unmount
      unsubscribeInterstitialEvents();
    };
  }, []);

  const showInterstitialAd = () => {
    if (interstitialLoaded) interstitial.show();
    else interstitial.load(); //load interstitial for next time if not loaded
  };

  //handle Navbar background on navigating
  const handleStateListening = () => ({
    state: ({ data }) => {
      if (!lastNavState) {
        setScrollTop(true);
        return (lastNavState = data.state);
      }

      const oldDrawerState = lastNavState.routes[0]?.state;
      const newDrawerState = data.state.routes[0]?.state;

      if (!oldDrawerState || !newDrawerState) {
        setScrollTop(true);
        return (lastNavState = data.state);
      }

      //only change background when navigating (not when open drawer f.e)
      if (
        oldDrawerState.index !== newDrawerState.index ||
        oldDrawerState.routes !== newDrawerState.routes
      )
        setScrollTop(true); //show Navbar background

      //show interstitial when navigating with drawer
      if (oldDrawerState.index !== newDrawerState.index) {
        //show Interstitial Ad on every 6th navigation action
        if (interstitialIndex >= 6) showInterstitialAd();

        //increase interstitial index
        setInterstitialIndex((prev) => prev + 1);
      }

      lastNavState = data.state;
    },
  });

  const handleStateChange = (state) => {
    if (!user) return;
    if (state === undefined) return;

    const currLocation = getCurrentLocation(state);

    //check if user is on message screen for notification handling
    if (currLocation.name === "Message") {
      if (currentLocation !== currLocation)
        //prevent too many server state changes
        dispatch(changeLocationAction(user._id, currLocation));
    } else {
      if (currentLocation !== defaultLocation)
        dispatch(changeLocationAction(user._id, defaultLocation));
    }
  };

  return (
    <NavigationContainer ref={navigationRef} onStateChange={handleStateChange}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            position: "absolute",
            backgroundColor: darkMode ? "black" : "white",
          },
          headerTransparent: true,
        }}
        screenListeners={handleStateListening}
      >
        <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
        <Stack.Screen
          name="MessageAppStack"
          component={MessageStackNavigator}
        />
        <Stack.Screen
          name="BlogPostAppDetails"
          component={BlogPostDetails}
          options={{
            headerShown: true,
            header: (props) => (
              <Navbar
                {...props}
                backBtnStyle={styles.backBtn}
                backIconSize={28}
                showNotification={false}
                showProfile={false}
              />
            ),
          }}
        />
        <Stack.Screen
          name="CommentsNotStack"
          component={CommentsStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PremiumSideBar"
          options={{
            headerTitle: "Premium",
            headerShown: true,
            header: (props) => <Navbar {...props} />,
          }}
          component={PremiumScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStackNavigator;

const styles = StyleSheet.create({
  backBtn: {
    backgroundColor: "#3f3f3f",
    borderRadius: 100,
    opacity: 0.7,
    padding: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

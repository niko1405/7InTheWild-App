import {
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { TabView, TabBar } from "react-native-tab-view";

import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

import images from "../../constants/images";
import { useState } from "react";
import FavoriteRoute from "./FavoriteRoute";
import CommunityRoute from "./CommunityRoute";
import DailySurveyRoute from "./DailySurveyRoute";
import AdComponent from "../../components/AdComponent";

const VotingScreen = ({ route }) => {
  const layout = useWindowDimensions();

  const tabIndex = route.params?.tabIndex || 0;

  const [adError, setAdError] = useState(false);
  const [index, setIndex] = useState(tabIndex);
  const [routes] = useState([
    { key: "first", title: "Favorit" },
    { key: "second", title: "Täglich" },
    { key: "third", title: "Community" },
  ]);

  const renderScene = ({ route }) => {
    if (route.key === "first" && index === 0) return <FavoriteRoute />;
    if (route.key === "second" && index === 1) return <DailySurveyRoute />;
    if (route.key === "third" && index === 2) return <CommunityRoute />;
  };

  const { darkMode } = useSelector((state) => state.settings);
  const { user } = useSelector((state) => state.user);

  return (
    <View
      style={{
        display: "flex",
        padding: 0,
        backgroundColor: darkMode ? "black" : "white",
        position: "relative",
        flex: 1,
      }}
    >
      <ImageBackground
        source={images.banner2}
        resizeMode="cover"
        style={styles.imageBg}
      />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={styles.tabBarStyle}
            labelStyle={styles.tabBarLabelStyle}
            activeColor="#4b9685"
            inactiveColor="white"
            indicatorStyle={styles.tabBarIndicatorStyle}
            scrollEnabled
          />
        )}
        swipeEnabled
      />

      {!adError && !user?.premium && (
        <AdComponent
          containerStyle={{ position: "absolute", bottom: 0 }}
          showText={false}
          AdElement={
            <BannerAd
              size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
              }}
              unitId={TestIds.BANNER}
              onAdFailedToLoad={() => setAdError(true)}
            />
          }
        />
      )}
    </View>
  );
};

export default VotingScreen;

const styles = StyleSheet.create({
  imageBg: {
    height: 70,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  tabBarStyle: {
    backgroundColor: "#4a6961",
  },
  tabBarLabelStyle: {
    fontFamily: "header",
    fontSize: 20,
  },
  tabBarIndicatorStyle: {
    backgroundColor: "#4b9685",
    height: 1.5,
  },
});

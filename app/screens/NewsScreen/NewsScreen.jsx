import { useState } from "react";
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
import NewsRoute from "./NewsRoute";
import SocialMediaRoute from "./SocialMediaRoute";
import AdComponent from "../../components/AdComponent";

const NewsScreen = ({ route }) => {
  const layout = useWindowDimensions();

  const tabIndex = route.params?.tabIndex || 0;

  const [adError, setAdError] = useState(false);
  const [index, setIndex] = useState(tabIndex);
  const [routes] = useState([
    { key: "first", title: "Neues" },
    { key: "second", title: "Videos" },
  ]);

  const renderScene = ({ route }) => {
    if (route.key === "first" && index === 0) return <NewsRoute />;
    if (route.key === "second" && index === 1) return <SocialMediaRoute />;
  };

  const { darkMode } = useSelector((state) => state.settings);
  const { user } = useSelector((state) => state.user);

  return (
    <View style={darkModeStyles(darkMode).scrollView}>
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
        sceneContainerStyle={{ paddingBottom: 60 }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={{
              backgroundColor: "#4a6961",
            }}
            labelStyle={{
              fontFamily: "header",
              fontSize: 20,
            }}
            activeColor="#4b9685"
            inactiveColor="white"
            indicatorStyle={{
              backgroundColor: "#4b9685",
              height: 1.5,
            }}
          />
        )}
        swipeEnabled
        style={{
          padding: 0,
        }}
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

export default NewsScreen;

const darkModeStyles = (darkMode) =>
  StyleSheet.create({
    scrollView: {
      display: "flex",
      padding: 0,
      backgroundColor: darkMode ? "black" : "white",
      position: "relative",
      flex: 1,
    },
  });

const styles = StyleSheet.create({
  imageBg: {
    height: 70,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

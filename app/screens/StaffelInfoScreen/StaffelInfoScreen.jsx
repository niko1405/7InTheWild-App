import React, { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  useWindowDimensions,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

import CustomText from "../../components/CustomText";
import StaffelInfoRoute from "./Routes/StaffelInfoRoute";
import GeneralRoute from "./Routes/GeneralRoute";
import images from "../../constants/images";
import AdComponent from "../../components/AdComponent";

const Staffel1Route = () => {
  return <StaffelInfoRoute staffelIndex={0} />;
};

const Staffel2Route = () => {
  return <StaffelInfoRoute staffelIndex={1} />;
};

const renderScene = SceneMap({
  first: Staffel1Route,
  second: Staffel2Route,
  third: GeneralRoute,
});

const StaffelInfoScreen = () => {
  const layout = useWindowDimensions();

  const [adError, setAdError] = useState(false);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Staffel 1" },
    { key: "second", title: "Staffel 2" },
    { key: "third", title: "Allgemein" },
  ]);

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
        overflowY: "scroll",
      }}
    >
      <ImageBackground
        source={images.banner2}
        resizeMode="cover"
        style={{
          height: 130,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CustomText
          title="Informationen"
          darkmode={false}
          style={{
            marginTop: 30,
            marginBottom: 15,
            color: "white",
          }}
          fontSize={35}
        />
      </ImageBackground>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
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
            scrollEnabled
          />
        )}
        swipeEnabled
        style={{
          padding: 0,
          height: 8000,
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

export default StaffelInfoScreen;

const styles = StyleSheet.create({
  font: {
    fontFamily: "header",
  },
});

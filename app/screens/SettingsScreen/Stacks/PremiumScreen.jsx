import { Button, Divider } from "@react-native-material/core";
import { useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import CommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import IonIcon from "react-native-vector-icons/Ionicons";
import Toast from "react-native-tiny-toast";
import * as toast from "../../../constants/toastOptions";

import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

import CustomText from "../../../components/CustomText";
import images from "../../../constants/images";
import { useStateContext } from "../../../contexts/ContextProvider";
import AdComponent from "../../../components/AdComponent";

const PremiumScreen = () => {
  const { darkMode } = useSelector((state) => state.settings);
  const { user } = useSelector((state) => state.user);

  const { handleScroll } = useStateContext();

  const [adError, setAdError] = useState(false);

  const handleSubmit = () => {
    if (!user)
      return Toast.show("Du bist nicht angemeldet!", toast.warningOptions);

    if (user.premium) return;

    Toast.show("Das Premium-Angebot ist bald verfügbar!", toast.warningOptions);
  };

  const handleRestorePurchase = () => {
    if (!user)
      return Toast.show("Du bist nicht angemeldet!", toast.warningOptions);

    Toast.show("Das Premium-Angebot ist bald verfügbar!", toast.warningOptions);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        onScroll={handleScroll}
        style={darkModeStyles(darkMode).scrollContainer}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <ImageBackground
          source={images.banner2}
          resizeMode="cover"
          style={styles.imageBg}
        />
        <View style={styles.container}>
          <View style={darkModeStyles(darkMode).box}>
            <CustomText
              title="Premium Angebot"
              style={{
                alignSelf: "center",
                marginBottom: 10,
              }}
              color="#4b9685"
            />
            <Divider color="#4b9685" style={{ marginBottom: 15 }} />
            <View style={styles.content}>
              <CustomText
                title="Das Premium Angebot ermöglicht dir folgende Vorteile:"
                fontFamily="eroded2"
                fontSize={20}
              />
              <View style={styles.advantages}>
                <View style={styles.details}>
                  <CommunityIcon
                    name="advertisements-off"
                    size={25}
                    color="#b75d4e"
                  />
                  <CustomText
                    title="Keine Werbeanzeigen"
                    fontFamily="eroded2"
                    fontSize={20}
                    style={{ marginLeft: 10 }}
                  />
                </View>
                <View style={styles.details}>
                  <CommunityIcon
                    name="format-color-fill"
                    size={25}
                    color="#388c89"
                  />
                  <CustomText
                    title="Dunkles App-Design"
                    fontFamily="eroded2"
                    fontSize={20}
                    style={{ marginLeft: 10 }}
                  />
                </View>
                <View style={styles.check}>
                  <IonIcon name="checkmark-circle" color="#dfaf60" size={25} />
                  <CustomText
                    title="Einmaliger Kauf (kein Abo)"
                    fontFamily="eroded2"
                    fontSize={20}
                    style={{ marginLeft: 10 }}
                  />
                </View>
              </View>

              <View style={styles.buttons}>
                <TouchableOpacity onPress={handleSubmit}>
                  <View style={styles.submitBtn}>
                    <CustomText
                      title={
                        !user?.premium
                          ? "Jetzt kaufen 4,0€"
                          : "Bereits gekauft!"
                      }
                      fontSize={20}
                      color="black"
                    />
                  </View>
                </TouchableOpacity>
                <Divider
                  color={darkMode ? "white" : "black"}
                  style={{ width: "100%", marginTop: 20 }}
                />
                <Button
                  onPress={handleRestorePurchase}
                  title="Kauf wiederherstellen"
                  variant="text"
                  titleStyle={styles.restore}
                  style={{ marginTop: 5 }}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

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

export default PremiumScreen;

const darkModeStyles = (darkMode) =>
  StyleSheet.create({
    scrollContainer: {
      display: "flex",
      padding: 0,
      position: "relative",
      flex: 1,
      overflowY: "scroll",
      backgroundColor: darkMode ? "black" : "white",
    },
    box: {
      marginTop: 20,
      padding: 20,
      dispolay: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      shadowOpacity: 0.9,
      elevation: 6,
      borderWidth: 2,
      shadowColor: darkMode ? "white" : "black",
      borderColor: "transparent",
      height: 400,
    },
  });

const styles = StyleSheet.create({
  imageBg: {
    height: 100,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    padding: 10,
  },
  content: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
  advantages: {
    marginTop: 15,
    display: "flex",
    alignItems: "flex-start",
    width: "100%",
    paddingLeft: 10,
  },
  submitBtn: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#4b9685",
    borderRadius: 5,
    padding: 5,
    alignItems: "center",
    width: 185,
    marginTop: 8,
    justifyContent: "center",
    alignSelf: "center",
  },
  check: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  details: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
  },
  restore: {
    color: "#4b9685",
    fontFamily: "eroded2",
    fontSize: 17,
  },
  buttons: {
    position: "absolute",
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
});

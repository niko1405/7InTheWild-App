import { Divider } from "@react-native-material/core";
import { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Switch } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import IonIcon from "react-native-vector-icons/Ionicons";
import Toast from "react-native-tiny-toast";

import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

import * as toast from "../../../constants/toastOptions";
import CustomText from "../../../components/CustomText";
import images from "../../../constants/images";
import { useStateContext } from "../../../contexts/ContextProvider";
import Note from "../../../components/Note";
import {
  getNotificationsAction,
  setNotificationsAction,
} from "../../../features/settings/settingsActions";
import AdComponent from "../../../components/AdComponent";

const SwitchComponent = ({ title, disabled, value, onValueChange }) => {
  return (
    <View style={styles.switchContainer}>
      <CustomText title={title} fontFamily="eroded2" fontSize={23} />
      <Switch
        value={value}
        disabled={disabled}
        onValueChange={onValueChange}
        color="#4b9685"
      />
    </View>
  );
};

const defaultForm = {
  enable: true,
  direct: true,
  comments: true,
  blog: true,
  dailySurvey: true,
};

const NotificationScreen = () => {
  const dispatch = useDispatch();

  const { handleScroll } = useStateContext();

  const { user } = useSelector((state) => state.user);
  const { darkMode, notifications } = useSelector((state) => state.settings);

  const [form, setForm] = useState(defaultForm);
  const [adError, setAdError] = useState(false);

  useEffect(() => {
    if (user) {
      if (notifications) setForm(notifications);
      else dispatch(getNotificationsAction(user._id));
    }
  }, []);

  useEffect(() => {
    if (user && notifications) setForm(notifications);
  }, [notifications]);

  const handleChange = (name) => {
    setForm({ ...form, [name]: !form[name] });
  };

  const handleSubmit = () => {
    if (!user)
      return Toast.show("Du bist nicht angemeldet!", toast.warningOptions);

    dispatch(setNotificationsAction(user._id, form));
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        onScroll={handleScroll}
        style={[
          styles.scrollContainer,
          {
            backgroundColor: darkMode ? "black" : "white",
          },
        ]}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        <ImageBackground
          source={images.banner2}
          resizeMode="cover"
          style={styles.imageBg}
        >
          {!user && (
            <Note
              title="Du erhältst keine Nachrichten, wenn du nicht angemeldet bist!"
              containerStyle={{ marginTop: 40 }}
              titleColor="white"
              iconColor="white"
              titleFontSize={14}
            />
          )}
        </ImageBackground>
        <View style={{ padding: 10 }}>
          <View
            style={[
              styles.notContainer,
              {
                shadowColor: darkMode ? "white" : "black",
              },
            ]}
          >
            <CustomText
              title="Benachrichtigungen"
              color="#4b9685"
              style={{ textAlign: "center" }}
              fontSize={30}
            />
            <Divider color="#4b9685" style={{ marginTop: 5 }} />
            <SwitchComponent
              title="Erlauben"
              value={form.enable}
              onValueChange={() => handleChange("enable")}
            />
            <Divider color={darkMode ? "white" : "black"} />
            <SwitchComponent
              title="Direkt-Nachrichten"
              value={form.direct}
              onValueChange={() => handleChange("direct")}
              disabled={!form.enable}
            />
            <SwitchComponent
              title="Kommentare"
              value={form.comments}
              onValueChange={() => handleChange("comments")}
              disabled={!form.enable}
            />
            <SwitchComponent
              title="Neue Blog Posts"
              value={form.blog}
              onValueChange={() => handleChange("blog")}
              disabled={!form.enable}
            />
            <SwitchComponent
              title="Tägliche Umfrage"
              value={form.dailySurvey}
              onValueChange={() => handleChange("dailySurvey")}
              disabled={!form.enable}
            />
          </View>
        </View>

        <View style={{ marginTop: 60 }}>
          <TouchableOpacity onPress={handleSubmit}>
            <View style={styles.submitBtn}>
              <IonIcon
                name="ios-checkmark-circle-outline"
                size={25}
                style={{ marginRight: 5, color: "#165d31" }}
              />
              <CustomText title="Speichern" fontSize={20} color="black" />
            </View>
          </TouchableOpacity>
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

export default NotificationScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    display: "flex",
    padding: 0,
    position: "relative",
    flex: 1,
    overflowY: "scroll",
  },
  notContainer: {
    padding: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    shadowOpacity: 0.9,
    elevation: 6,
    borderWidth: 2,
    borderColor: "transparent",
  },
  imageBg: {
    height: 150,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  switchContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  submitBtn: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#4b9685",
    borderRadius: 5,
    padding: 5,
    alignItems: "center",
    width: 180,
    marginTop: 8,
    justifyContent: "center",
    alignSelf: "center",
  },
});

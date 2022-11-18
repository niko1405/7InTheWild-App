import { useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CustomText from "../../components/CustomText";
import CustomTextInput from "../../components/CustomTextInput";
import { useStateContext } from "../../contexts/ContextProvider";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SimpleIcon from "react-native-vector-icons/SimpleLineIcons";
import { Button } from "@react-native-material/core";
import { useNetInfo } from "@react-native-community/netinfo";
import Toast from "react-native-tiny-toast";

import {
  BannerAd,
  BannerAdSize,
  TestIds,
} from "react-native-google-mobile-ads";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

import {
  EXPO_CLIENT_ID,
  ANDROID_CLIENT_ID,
  IOS_CLIENT_ID,
  WEB_CLIENT_ID,
} from "@env";

import { isEqual, isValid, isValidEmail } from "./formChecker";
import * as toast from "../../constants/toastOptions";
import images from "../../constants/images";
import {
  googleSignInAction,
  loginAction,
  signupAction,
} from "../../features/user/userActions";
import AdComponent from "../../components/AdComponent";

const authConfig = {
  expoClientId: EXPO_CLIENT_ID,
  iosClientId: IOS_CLIENT_ID,
  androidClientId: ANDROID_CLIENT_ID,
  webClientId: WEB_CLIENT_ID,
};

const defaultForm = {
  email: "",
  password: "",
  userName: "",
  repeatPassword: "",
};

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const netinfo = useNetInfo();

  const [form, setForm] = useState(defaultForm);
  const [login, setLogin] = useState(true);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [adError, setAdError] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);

  const { handleScroll } = useStateContext();

  const { darkMode } = useSelector((state) => state.settings);
  const { user } = useSelector((state) => state.user);

  const [_, googleResponse, googlePromptAsync] = Google.useIdTokenAuthRequest({
    ...authConfig,
    selectAccount: true,
  });

  useEffect(() => {
    if (googleResponse && authSuccess) {
      const {
        authentication: { accessToken },
      } = googleResponse;

      if (accessToken)
        dispatch(googleSignInAction(accessToken, navigation.navigate));

      setAuthSuccess(false);
    }
  }, [googleResponse]);

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    checkInternetConnection(netinfo);

    if (login) {
      if (!form.email.length || !form.password.length) {
        return Toast.show("Bitte fülle alle Felder aus.", toast.warningOptions);
      }

      //check if userName or email
      if (form.email.indexOf("@") === -1) {
        form.userName = form.email;
      } else {
        if (!isValidEmail(form.email)) {
          return Toast.show("Ungültige Email-Addresse.", toast.errorOptions);
        }
      }

      dispatch(loginAction(form, setForgotPassword, navigation.navigate));
    } else {
      if (
        !form.email.length ||
        !form.password.length ||
        !form.userName.length ||
        !form.repeatPassword.length
      )
        return Toast.show("Bitte fülle alle Felder aus.", toast.warningOptions);

      if (!isValidEmail(form.email))
        return Toast.show("Ungültige Email-Addresse.", toast.errorOptions);

      if (!isValid(form.password, 5, 30, 1, 1, 1, 0))
        return Toast.show(
          "Passwort muss mindestens 5 Zeichen mit mind. 1 Groß- und 1 Nummerziffer beinhalten. (max Länge 30)",
          toast.errorOptions
        );

      if (!isEqual(form.password, form.repeatPassword)) {
        return Toast.show(
          "Die Passwörter stimmen nicht überein.",
          toast.errorOptions
        );
      }

      dispatch(signupAction(form, navigation.navigate));
    }
  };

  const handleGoogleSubmit = async () => {
    checkInternetConnection(netinfo);

    const res = await googlePromptAsync();

    if (res.type === "dismiss") return;

    if (res.type === "success") {
      setAuthSuccess(true);
    } else {
      if (res.error.toString().includes("denied"))
        return Toast.show(
          "Die App benötigt Zugriff auf dein Google-Konto.",
          toast.warningOptions
        );
      else
        return Toast.show(
          "Fehler, bitte versuche es später erneut.",
          toast.errorOptions
        );
    }
  };

  return (
    <ScrollView
      onScroll={handleScroll}
      style={darkModeStyles(darkMode).scrollContainer}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      <ImageBackground
        source={images.banner2}
        resizeMode="cover"
        style={styles.imageBg}
      />

      {!adError && !user?.premium && (
        <AdComponent
          containerStyle={{ marginBottom: 30 }}
          AdElement={
            <BannerAd
              size={BannerAdSize.BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: true,
              }}
              unitId={TestIds.BANNER}
              onAdFailedToLoad={() => setAdError(true)}
            />
          }
        />
      )}

      <View style={darkModeStyles(darkMode).box}>
        <Icon
          name="lock-outline"
          size={30}
          style={{
            backgroundColor: login ? "#4b9685" : "#b7a155",
            padding: 8,
            borderRadius: 100,
          }}
        />
        <CustomText
          title={login ? "Anmelden" : "Registrieren"}
          style={{ marginBottom: 20, marginTop: 10 }}
        />
        <CustomTextInput
          placeHolder={`Email${login ? "/Benutzername" : ""}`}
          keyboardType="email-address"
          onChange={(value) => handleChange("email", value)}
          value={form.email}
          textContentType="emailAddress"
        />
        {!login && (
          <CustomTextInput
            placeHolder="Benutzername"
            onChange={(value) => handleChange("userName", value)}
            value={form.userName}
            textContentType="nickname"
          />
        )}
        <CustomTextInput
          placeHolder="Passwort"
          onChange={(value) => handleChange("password", value)}
          value={form.password}
          textContentType="password"
          password
          onSubmit={() => {
            login && handleSubmit();
          }}
        />
        {!login && (
          <CustomTextInput
            placeHolder="Passwort wiederholen"
            onChange={(value) => handleChange("repeatPassword", value)}
            value={form.repeatPassword}
            textContentType="password"
            password
          />
        )}
        <Button
          title={login ? "Anmelden" : "Registrieren"}
          color="#4b9685"
          titleStyle={{ fontFamily: "header", fontSize: 18 }}
          style={{ marginTop: 25, width: 265 }}
          onPress={handleSubmit}
        />
        <TouchableOpacity onPress={handleGoogleSubmit} style={styles.googleBtn}>
          <SimpleIcon name="social-google" size={20} color="white" />
          <CustomText
            title="Google Anmeldung"
            color="black"
            fontSize={18}
            style={{
              padding: 9,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setLogin(!login)}
          style={{ marginTop: 30 }}
        >
          <CustomText
            fontSize={20}
            style={{ marginBottom: 10 }}
            title={
              login
                ? "Kein Konto? Registrieren!"
                : "Bereits Registriert? Anmelden!"
            }
          />
        </TouchableOpacity>
        {forgotPassword && (
          <Button
            variant="text"
            title="Passwort vergessen"
            titleStyle={styles.forgotPassword}
            onPress={() => navigation.navigate("ForgotPassword")}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default LoginScreen;

const darkModeStyles = (darkMode) =>
  StyleSheet.create({
    scrollContainer: {
      display: "flex",
      padding: 0,
      backgroundColor: darkMode ? "black" : "white",
      position: "relative",
      flex: 1,
    },
    box: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      shadowRadius: 4,
      shadowColor: darkMode ? "white" : "black",
      shadowOpacity: 0.9,
      elevation: 6,
      paddingTop: 25,
      paddingBottom: 10,
      marginLeft: 15,
      marginRight: 15,
      borderWidth: 2,
      borderColor: "transparent",
      marginBottom: 20,
    },
  });

const styles = StyleSheet.create({
  forgotPassword: {
    fontFamily: "header",
    fontSize: 16,
    color: "#4b90ad",
    marginTop: 5,
  },
  googleBtn: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    backgroundColor: "#4b9685",
    borderRadius: 5,
    width: 265,
    justifyContent: "center",
  },
  imageBg: {
    height: 100,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});

function checkInternetConnection(netinfo) {
  if (!netinfo.isConnected) {
    return Toast.show(
      "Bitte prüfe deine Internetverbindung.",
      toast.warningOptions
    );
  }
}

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomText from "../../components/CustomText";
import { useStateContext } from "../../contexts/ContextProvider";
import { ScrollView, ImageBackground, View } from "react-native";
import CustomTextInput from "../../components/CustomTextInput";
import { Button } from "@react-native-material/core";
import Toast from "react-native-tiny-toast";

import { isEqual, isValid, isValidEmail } from "./formChecker";
import * as toast from "../../constants/toastOptions";
import images from "../../constants/images";
import {
  changePasswordAction,
  existUserAction,
} from "../../features/user/userActions";

const defaultForm = {
  email: "",
  userName: "",
  password: "",
  confirmPassword: "",
};

const ForgotPasswordScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState(defaultForm);
  const [tab, setTab] = useState(0);

  const { handleScroll } = useStateContext();
  const { darkMode } = useSelector((state) => state.settings);
  const { existUser } = useSelector((state) => state.user);

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleNext = () => {
    if (!form.email.length)
      return Toast.show("Bitte fülle alle Felder aus.", toast.warningOptions);

    //check if userName or email
    if (form.email.indexOf("@") === -1) {
      form.userName = form.email;
    } else {
      if (!isValidEmail(form.email))
        return Toast.show("Ungültige Email-Addresse.", toast.errorOptions);
    }

    dispatch(existUserAction({ email: form.email }, () => setTab(1)));
  };

  const handleSubmit = () => {
    if (!form.password.length || !form.confirmPassword.length)
      return Toast.show("Bitte fülle alle Felder aus.", toast.warningOptions);

    if (!isValid(form.password, 5, 30, 1, 1, 1, 0))
      return Toast.show(
        "Passwort muss mindestens 5 Zeichen mit mind. 1 Groß- und 1 Nummerziffer beinhalten. (max Länge 30)",
        toast.errorOptions
      );

    if (!isEqual(form.password, form.confirmPassword))
      return Toast.show(
        "Die Passwörter stimmen nicht überein.",
        toast.errorOptions
      );

    dispatch(
      changePasswordAction(existUser._id, form.password, navigation.navigate)
    );
  };

  return (
    <ScrollView
      onScroll={handleScroll}
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
          height: 150,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      />
      <View style={{ padding: 10 }}>
        <View
          style={{
            padding: 20,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            shadowColor: darkMode ? "white" : "black",
            shadowOpacity: 0.9,
            elevation: 6,
            borderWidth: 2,
            borderColor: "transparent",
          }}
        >
          <CustomText
            title="Du hast dein Passwort vergessen?"
            fontSize={25}
            color={darkMode ? "#c9c984" : "#a7a76e"}
          />
          <CustomText
            style={{ marginTop: 20 }}
            title={
              tab === 0
                ? "Gebe hier deine Email-Addresse oder Benutzername ein, um dein Passwort zu ändern."
                : "Gebe hier dein neues Passwort ein"
            }
            fontSize={20}
            fontFamily="eroded2"
          />
          {tab === 0 ? (
            <CustomTextInput
              placeHolder="Email/Benutzername"
              keyboardType="email-address"
              onChange={(value) => handleChange("email", value)}
              value={form.email}
              textContentType="emailAddress"
              style={{ color: "gray", marginTop: 30 }}
              placeholderTextColor="gray"
              borderColor="gray"
            />
          ) : (
            <>
              <CustomTextInput
                placeHolder="Passwort"
                onChange={(value) => handleChange("password", value)}
                style={{ color: "gray" }}
                contentContainerStyle={{ marginTop: 30 }}
                value={form.password}
                textContentType="password"
                placeholderTextColor="gray"
                borderColor="gray"
                password
              />
              <CustomTextInput
                placeHolder="Passwort wiederholen"
                onChange={(value) => handleChange("confirmPassword", value)}
                value={form.repeatPassword}
                style={{ color: "gray" }}
                textContentType="password"
                placeholderTextColor="gray"
                borderColor="gray"
                password
              />
            </>
          )}
          <View
            style={{
              marginTop: 20,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            {tab === 0 ? (
              <Button
                title="Weiter"
                variant="contained"
                color="#4b9685"
                onPress={handleNext}
              />
            ) : (
              <>
                <Button
                  title="Zurück"
                  variant="text"
                  color="gray"
                  onPress={() => setTab(0)}
                  style={{ marginRight: 5 }}
                />
                <Button
                  title="Senden"
                  variant="contained"
                  color="#4b9685"
                  onPress={handleSubmit}
                />
              </>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ForgotPasswordScreen;

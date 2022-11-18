import { Divider } from "@react-native-material/core";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Dialog, Portal, TextInput, Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import IonIcon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import * as toast from "../../../constants/toastOptions";

import CustomText from "../../../components/CustomText";
import { useStateContext } from "../../../contexts/ContextProvider";
import { useEffect, useState } from "react";
import { isValid, isValidEmail } from "../../LoginScreen/formChecker";
import Note from "../../../components/Note";
import Toast from "react-native-tiny-toast";
import images from "../../../constants/images";
import CustomSelectDropDown from "../../../components/CustomSelectDropDown";
import { auth, loading } from "../../../features/user/userSlice";
import { updateUserAction } from "../../../features/user/userActions";
import { changeLiveChatSettings } from "../../../features/settings/settingsSlice";
import {
  changeLiveChatSettingsAction,
  getLiveChatSettingsAction,
} from "../../../features/settings/settingsActions";

const updateAccontSettings =
  (userId, form, setForm, defaultForm, liveChatForm) => async (dispatch) => {
    dispatch(loading(true));
    Toast.showLoading("Lade..", toast.loadingOptions);

    let error = "";

    await changeLiveChatSettingsAction(userId, liveChatForm, (err, data) => {
      if (err) error = err?.response?.data?.message || err?.message;

      dispatch(changeLiveChatSettings(data));
    });

    await updateUserAction(userId, form)
      .then(({ data }) => {
        dispatch(auth(data));

        setForm(defaultForm);
      })
      .catch((err) => (error = err?.response?.data?.message || err?.message));

    Toast.hide();
    dispatch(loading(false));

    if (error.length) return Toast.show(error, toast.errorOptions);

    Toast.showSuccess(
      "Änderungen erfolgreich gespeichert",
      toast.successOptions
    );
  };

const defaultForm = {
  email: "",
  activePassword: "",
  newPassword: "",
  userName: "",
};

const defaultShowPassword = {
  active: false,
  new: false,
};

const AccountScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { handleScroll } = useStateContext();

  const { user } = useSelector((state) => state.user);
  const { darkMode, chatSettings } = useSelector((state) => state.settings);

  const [form, setForm] = useState(defaultForm);
  const [editEmail, setEditEmail] = useState(false);
  const [editUserName, setEditUserName] = useState(false);
  const [showPassword, setShowPassword] = useState(defaultShowPassword);
  const [warning, setWarning] = useState("");
  const [chatTheme, setChatTheme] = useState("Standard");
  const [chatFontStyle, setChatFontStyle] = useState("Cracked");

  const chatThemes = ["Standard", "Custom"];
  const chatFontStyles = ["Standard", "Cracked", "Cracked2"];

  useEffect(() => {
    if (user) dispatch(getLiveChatSettingsAction(user._id));
  }, []);

  useEffect(() => {
    setChatTheme(chatSettings.theme);
    setChatFontStyle(chatSettings.fontStyle);
  }, [chatSettings]);

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    if (!user)
      return Toast.show("Du bist nicht angemeldet.", toast.warningOptions);

    if (form.newPassword.length) {
      if (!form.activePassword.length)
        return Toast.show(
          "Aktuelles Passwort ist ungültig.",
          toast.errorOptions
        );

      if (!isValid(form.newPassword, 5, 30, 1, 1, 1, 0))
        return Toast.show(
          "Passwort muss mindestens 5 Zeichen mit mind. 1 Groß- und 1 Nummerziffer beinhalten. (max Länge 30)",
          toast.errorOptions
        );
    }

    if (form.email.length) {
      if (!isValidEmail(form.email))
        return Toast.show("Ungültige E-Mail Addresse.", toast.errorOptions);
    }

    setEditEmail(false);
    setEditUserName(false);

    const formData = new FormData();
    formData.append("theme", chatTheme);
    formData.append("fontStyle", chatFontStyle);

    dispatch(
      updateAccontSettings(user._id, form, setForm, defaultForm, formData)
    );
  };

  const cancel = () => {
    if (!user) return navigation.navigate("Settings");

    if (
      form.newPassword.length ||
      form.email.length ||
      form.userName.length ||
      chatFontStyle !== chatSettings.fontStyle ||
      chatTheme !== chatSettings.theme
    )
      return setWarning("Möchtest du die Änderungen verwerfen?");

    navigation.navigate("Settings");
  };

  const handleCancel = () => {
    setWarning("");
    navigation.navigate("Settings");
  };

  return (
    <ScrollView
      onScroll={handleScroll}
      style={[
        styles.scrollContainer,
        {
          backgroundColor: darkMode ? "black" : "white",
        },
      ]}
    >
      <ImageBackground
        source={images.banner2}
        resizeMode="cover"
        style={styles.imageBg}
      >
        {!user && (
          <Note
            title="Du bist nicht angemeldet!"
            containerStyle={{ marginTop: 40 }}
            titleColor="white"
            iconColor="white"
            titleFontSize={14}
          />
        )}
      </ImageBackground>
      <View style={{ padding: 20, display: "flex", flexDirection: "column" }}>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <TouchableOpacity
            style={{ zIndex: 5 }}
            onPress={() => setEditEmail(!editEmail)}
          >
            <MaterialIcon
              name={editEmail ? "edit-off" : "edit"}
              size={22}
              style={{
                color: darkMode ? "#aba865" : "#8e8c55",
                position: "absolute",
                right: -20,
                top: -15,
                padding: 20,
              }}
            />
          </TouchableOpacity>
          <CustomText title="E-Mail Addresse" color="#4b9685" />
          <Divider color="#4b9685" style={{ marginTop: 5 }} />
          <TextInput
            style={styles.input}
            activeUnderlineColor={darkMode ? "white" : "black"}
            underlineColor={darkMode ? "white" : "black"}
            theme={{ fonts: { regular: { fontFamily: "eroded2" } } }}
            placeholderTextColor="gray"
            placeholder="E-Mail Addresse"
            mode="flat"
            label="E-Mail Addresse"
            onChangeText={(text) => {
              editEmail && handleChange("email", text);
            }}
            value={!editEmail && !form.email.length ? user?.email : form.email}
            disabled={!editEmail}
            maxLength={150}
          />
        </View>
        <View style={styles.userNameContainer}>
          <TouchableOpacity
            style={{ zIndex: 5 }}
            onPress={() => setEditUserName(!editUserName)}
          >
            <MaterialIcon
              name={editUserName ? "edit-off" : "edit"}
              size={22}
              style={{
                color: darkMode ? "#aba865" : "#8e8c55",
                position: "absolute",
                right: -20,
                top: -15,
                padding: 20,
              }}
            />
          </TouchableOpacity>
          <CustomText title="Benutzername" color="#4b9685" />
          <Divider color="#4b9685" style={{ marginTop: 5 }} />
          <TextInput
            style={styles.input}
            activeUnderlineColor={darkMode ? "white" : "black"}
            underlineColor={darkMode ? "white" : "black"}
            theme={{ fonts: { regular: { fontFamily: "eroded2" } } }}
            placeholder="Benutzername"
            mode="flat"
            label="Benutzername"
            onChangeText={(text) => {
              editUserName && handleChange("userName", text);
            }}
            value={
              !editUserName && !form.userName.length
                ? user?.userName
                : form.userName
            }
            disabled={!editUserName}
            maxLength={40}
          />
        </View>
        <View
          style={{ display: "flex", flexDirection: "column", marginTop: 40 }}
        >
          <CustomText title="Passwort" color="#4b9685" />
          <Divider color="#4b9685" style={{ marginTop: 5 }} />
          <View>
            <TextInput
              style={styles.passwordInput}
              activeUnderlineColor={darkMode ? "white" : "black"}
              underlineColor={darkMode ? "white" : "black"}
              theme={{ fonts: { regular: { fontFamily: "eroded2" } } }}
              mode="flat"
              label="Aktuelles Passwort"
              secureTextEntry={!showPassword.active}
              onChangeText={(text) => handleChange("activePassword", text)}
              value={form.activePassword}
              maxLength={40}
            />
            <TouchableOpacity
              style={styles.passwordEye}
              onPress={() => {
                setShowPassword({
                  ...showPassword,
                  active: !showPassword.active,
                });
              }}
            >
              <IonIcon
                name={showPassword.active ? "eye-off" : "eye"}
                size={22}
                color={darkMode ? "white" : "black"}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TextInput
              style={styles.input}
              activeUnderlineColor={darkMode ? "white" : "black"}
              underlineColor={darkMode ? "white" : "black"}
              theme={{ fonts: { regular: { fontFamily: "eroded2" } } }}
              mode="flat"
              label="Neues Passwort"
              secureTextEntry={!showPassword.new}
              onChangeText={(text) => handleChange("newPassword", text)}
              value={form.newPassword}
              maxLength={40}
            />
            <TouchableOpacity
              style={styles.passwordEye}
              onPress={() => {
                setShowPassword({
                  ...showPassword,
                  new: !showPassword.new,
                });
              }}
            >
              <IonIcon
                name={showPassword.new ? "eye-off" : "eye"}
                size={22}
                color={darkMode ? "white" : "black"}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{ display: "flex", flexDirection: "column", marginTop: 40 }}
        >
          <CustomText title="Chat" color="#4b9685" />
          <Divider color="#4b9685" style={{ marginTop: 5 }} />
          <CustomSelectDropDown
            defaultButtonText="Design"
            defaultValue={chatTheme}
            setOnSelect={setChatTheme}
            title="Hintergrund"
            data={chatThemes}
          />
          <CustomSelectDropDown
            defaultButtonText="Schrift"
            defaultValue={chatFontStyle}
            setOnSelect={setChatFontStyle}
            title="Schriftart"
            data={chatFontStyles}
          />
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity onPress={cancel}>
            <View
              style={[
                styles.cancelBtn,
                { borderColor: darkMode ? "#a5a5a5" : "black" },
              ]}
            >
              <MaterialIcon
                name="cancel"
                size={25}
                style={{ marginRight: 5, color: "#994c40" }}
              />
              <CustomText
                title="Abbrechen"
                fontSize={20}
                color={darkMode ? "#a5a5a5" : "black"}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmit}>
            <View style={styles.submitBtn}>
              <IonIcon
                name="ios-checkmark-circle-outline"
                size={25}
                style={{ marginRight: 5, color: "#165d31" }}
              />
              <CustomText
                title="Änderungen speichern"
                fontSize={20}
                color="black"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Portal>
        <Dialog visible={warning.length > 0} onDismiss={() => setWarning("")}>
          <Dialog.Title style={styles.dialogTitle}>
            <CustomText title="Warnung" color="#aba865" fontSize={26} />
          </Dialog.Title>
          <Dialog.Content>
            <CustomText
              title="Möchtest du die Änderungen verwerfen?"
              fontSize={23}
              fontFamily="eroded2"
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setWarning("")}>
              <CustomText title="Abrechen" color="gray" fontSize={21} />
            </Button>
            <Button onPress={handleCancel}>
              <CustomText title="Ja" color="#4b9685" fontSize={21} />
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  divider: { width: 12 },
  imageBg: {
    height: 90,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  submitBtn: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#4b9685",
    borderRadius: 5,
    padding: 5,
    alignItems: "center",
    width: 250,
    marginTop: 8,
  },
  cancelBtn: {
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    alignItems: "center",
    width: 250,
  },
  buttons: {
    marginTop: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  passwordEye: {
    zIndex: 2,
    position: "absolute",
    right: 0,
    top: 10,
    padding: 20,
  },
  passwordInput: {
    backgroundColor: "transparent",
    fontSize: 21,
    height: 60,
    width: "100%",
  },
  input: {
    backgroundColor: "transparent",
    fontSize: 21,
    height: 60,
  },
  userNameContainer: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    marginTop: 40,
  },
  scrollContainer: {
    display: "flex",
    padding: 0,
    position: "relative",
    flex: 1,
    overflowY: "scroll",
  },
});

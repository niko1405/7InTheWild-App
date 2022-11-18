import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Switch } from "@react-native-material/core";
import AntIcon from "react-native-vector-icons/AntDesign";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import CustomText from "./CustomText";
import images from "../constants/images";
import { changeThemeAction } from "../features/settings/settingsActions";
import { logoutAction } from "../features/user/userActions";

const SideBar = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { darkMode } = useSelector((state) => state.settings);
  const { user } = useSelector((state) => state.user);

  const [darkModeChecked, setDarkModeChecked] = useState(darkMode || false);

  const handleChangeDarkMode = (e) => {
    if (!user) return;

    dispatch(changeThemeAction(user._id, e));
    setDarkModeChecked(e);
  };

  const logout = () => {
    dispatch(logoutAction(navigation.navigate));
  };

  const handlePremium = () => {
    navigation.navigate("PremiumSideBar");
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: darkModeChecked ? "black" : "white",
      }}
    >
      <DrawerContentScrollView {...props}>
        <ImageBackground
          source={images.banner}
          resizeMode="cover"
          style={styles.imageBg}
        >
          <Image
            source={images.logoStaffel2}
            style={{ height: 200, width: 500 }}
          />
        </ImageBackground>
        <View style={darkModeStyles(darkMode).logOutContainer}>
          <DrawerItemList {...props} />
          {user && (
            <DrawerItem
              label="Ausloggen"
              onPress={logout}
              icon={() => (
                <MaterialIcon
                  name="logout"
                  size={25}
                  color={darkMode ? "white" : "black"}
                />
              )}
              labelStyle={darkModeStyles(darkMode).logOutLabel}
            />
          )}
        </View>
      </DrawerContentScrollView>
      <View style={styles.darkMode}>
        <CustomText title="Darkmode" />
        {user?.premium ? (
          <Switch
            value={darkModeChecked}
            onValueChange={handleChangeDarkMode}
            thumbColor="gray"
          />
        ) : (
          <TouchableOpacity onPress={handlePremium} style={styles.premiumBtn}>
            <AntIcon name="star" size={15} style={styles.premiumIcon} />
            <CustomText title="Aktivieren" fontSize={15} color="#4b9685" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SideBar;

const darkModeStyles = (darkMode) =>
  StyleSheet.create({
    logOutLabel: {
      fontFamily: "header",
      fontSize: 18,
      marginLeft: -10,
      color: darkMode ? "white" : "black",
    },
    logOutContainer: {
      flex: 1,
      paddingTop: 8,
      borderTopWidth: 2,
      borderTopColor: darkMode ? "white" : "black",
    },
  });

const styles = StyleSheet.create({
  premiumIcon: { marginRight: 5, color: "#ffd700" },
  premiumBtn: { display: "flex", flexDirection: "row" },
  darkMode: {
    borderTopWidth: 1,
    padding: 15,
    borderTopColor: "#ccc",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageBg: {
    height: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -5,
    width: "100%",
  },
});

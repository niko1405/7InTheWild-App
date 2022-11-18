import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import IconEntypo from "react-native-vector-icons/Entypo";
import CommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import { useStateContext } from "../contexts/ContextProvider";
import CustomText from "./CustomText";
import { TouchableOpacity } from "react-native-gesture-handler";
import CustomAvatar from "./CustomAvatar";
import Notifications from "./Notifications";

const Navbar = ({
  navigation,
  route,
  options,
  back,
  showLogin = true,
  showProfile = true,
  customHeader = "", //show Customheader which is available through params on navigate
  showNotification = true,
  fontSize = 30,
  backBtnStyle = {},
  backIconSize = 30,
  onBack = (_) => {},
  defaultBgC = undefined,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const { user } = useSelector((state) => state.user);

  const { scrollTop } = useStateContext();

  const login = !user ? false : true;

  const handleBack = () => {
    onBack();
    navigation.goBack();
  };

  const handleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  if (!options.headerShown) return null;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: defaultBgC
            ? defaultBgC
            : !scrollTop
            ? "#4a6961"
            : "transparent",
        },
      ]}
    >
      {back ? (
        <TouchableOpacity onPress={handleBack} style={backBtnStyle}>
          <Icon
            name="ios-chevron-back-sharp"
            size={backIconSize}
            color="white"
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={navigation.openDrawer}>
          <IconEntypo name="menu" size={30} color="white" />
        </TouchableOpacity>
      )}
      <CustomText
        title={
          customHeader.length > 0 && route?.params[customHeader]
            ? route?.params[customHeader]
            : options.headerTitle
        }
        fontSize={fontSize}
        color="white"
      />
      <View style={styles.rightContainer}>
        {login ? (
          showNotification && (
            <TouchableOpacity
              onPress={handleNotifications}
              style={styles.notificationsContainer}
            >
              <Icon
                name="notifications-outline"
                size={28}
                color="white"
                style={{ marginRight: 5 }}
              />
              {user.notifications?.length > 0 && (
                <View style={styles.notification} />
              )}
            </TouchableOpacity>
          )
        ) : (
          <View>
            {showLogin && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("HomeTabs", { screen: "LoginStack" })
                }
              >
                <CommunityIcon
                  name="login-variant"
                  size={28}
                  color="white"
                  style={{
                    marginRight: route.name !== "SettingsStack" ? 5 : 0,
                  }}
                />
              </TouchableOpacity>
            )}
          </View>
        )}
        {showProfile && login && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("HomeTabs", { screen: "ProfileStack" })
            }
          >
            <CustomAvatar
              uri={user?.profileImg?.uri}
              size={28}
              borderColor="white"
            />
          </TouchableOpacity>
        )}
      </View>

      <Notifications
        isOpened={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </View>
  );
};

export default Navbar;

const styles = StyleSheet.create({
  font: {
    fontFamily: "header",
  },
  container: {
    position: "relative",
    top: 0,
    width: "100%",
    alignItems: "center",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 5,
  },
  rightContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  notificationsContainer: {
    position: "relative",
  },
  notification: {
    position: "absolute",
    right: 2,
    bottom: 1,
    backgroundColor: "red",
    height: 10,
    width: 10,
    borderRadius: 10 / 2,
  },
});

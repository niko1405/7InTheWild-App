import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import IconAnt from "react-native-vector-icons/AntDesign";
import IconEntypo from "react-native-vector-icons/Entypo";
import IonIcon from "react-native-vector-icons/Ionicons";
import CommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FeatherIcon from "react-native-vector-icons/Feather";
import { useSelector } from "react-redux";
import React from "react";

import SideBar from "../components/SideBar";
import colors from "../config/colors";
import Navbar from "../components/Navbar";
import SettingsStackNavigator from "./StackNavigators/SettingsStackNavigator";
import StaffelInfoStackNavigator from "./StackNavigators/StaffelInfoStackNavigator";
import BottomTabNavigator from "./TabNavigator";
import ChatStackNavigator from "./StackNavigators/ChatStackNavigator";
import VotingStackNavigator from "./StackNavigators/VotingStackNavigator";
import FeedStackNavigator from "./StackNavigators/FeedStackNavigator";
import NewsStackNavigator from "./StackNavigators/NewsStackNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const { darkMode } = useSelector((state) => state.settings);

  return (
    <Drawer.Navigator
      initialRouteName="HomeTabs"
      useLegacyImplementation
      screenOptions={{
        drawerActiveBackgroundColor: darkMode
          ? colors.drawerSelectedBackgroundDarkMode
          : colors.drawerSelectedBackground,
        drawerActiveTintColor: darkMode
          ? colors.drawerSelectedDarkMode
          : colors.drawerSelected,
        drawerInactiveTintColor: darkMode ? "white" : "black",
        headerShown: true,
        header: (props) => <Navbar {...props} />,
        drawerLabelStyle: {
          marginLeft: -15,
          fontSize: 16,
        },
        headerTransparent: true,
        unmountOnBlur: true,
      }}
      drawerContent={(props) => <SideBar {...props} />}
    >
      <Drawer.Screen
        name="HomeTabs"
        component={BottomTabNavigator}
        options={{
          title: "Home",
          headerTitle: "Home",
          headerShown: false,
          drawerLabelStyle: {
            fontFamily: "header",
            fontSize: 18,
            marginLeft: -10,
          },
          drawerIcon: ({ tintColor }) => (
            <IconAnt
              name="home"
              size={25}
              color={darkMode ? "white" : "black"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="FeedStack"
        component={FeedStackNavigator}
        options={{
          title: "Nachrichten",
          drawerLabelStyle: {
            fontFamily: "header",
            fontSize: 18,
            marginLeft: -10,
          },
          headerShown: false,
          drawerIcon: ({ tintColor }) => (
            <FeatherIcon
              name="navigation"
              size={25}
              color={darkMode ? "white" : "black"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="NewsStack"
        component={NewsStackNavigator}
        options={{
          title: "Entdecken",
          drawerLabelStyle: {
            fontFamily: "header",
            fontSize: 18,
            marginLeft: -10,
          },
          headerShown: false,
          drawerIcon: ({ tintColor }) => (
            <IconEntypo
              name="compass"
              size={25}
              color={darkMode ? "white" : "black"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="ChatStack"
        component={ChatStackNavigator}
        options={{
          title: "Live Chat",
          drawerLabelStyle: {
            fontFamily: "header",
            fontSize: 18,
            marginLeft: -10,
          },
          headerTitle: "Live Chat",
          headerShown: false,
          drawerIcon: ({ tintColor }) => (
            <IonIcon
              name="chatbox-ellipses-outline"
              size={25}
              color={darkMode ? "white" : "black"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="VotingStack"
        component={VotingStackNavigator}
        options={{
          title: "Abstimmungen",
          drawerLabelStyle: {
            fontFamily: "header",
            fontSize: 18,
            marginLeft: -10,
          },
          headerTitle: "Abstimmungen",
          headerShown: false,
          drawerIcon: ({ tintColor }) => (
            <CommunityIcon
              name="vote-outline"
              size={25}
              color={darkMode ? "white" : "black"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="StaffelInfoStack"
        component={StaffelInfoStackNavigator}
        options={{
          title: "7vsWild Info",
          headerTitle: "7 vs Wild",
          drawerLabelStyle: {
            fontFamily: "header",
            fontSize: 18,
            marginLeft: -10,
          },
          headerShown: false,
          drawerIcon: ({ tintColor }) => (
            <CommunityIcon
              name="thought-bubble-outline"
              size={25}
              color={darkMode ? "white" : "black"}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="SettingsStack"
        component={SettingsStackNavigator}
        options={{
          headerShown: false,
          title: "Einstellungen",
          headerTitle: "Einstellungen",
          drawerLabelStyle: {
            fontFamily: "header",
            fontSize: 18,
            marginLeft: -10,
          },
          drawerIcon: ({ tintColor }) => (
            <IconAnt
              name="setting"
              size={25}
              color={darkMode ? "white" : "black"}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

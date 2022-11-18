import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import CommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import OctiIcon from "react-native-vector-icons/Octicons";
import CustomText from "../components/CustomText";

import HomeStackNavigator from "./StackNavigators/HomeStackNavigator";
import ProfileStackNavigator from "./StackNavigators/ProfileStackNavigator";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import LoginStackNavigator from "./StackNavigators/LoginStackNavigator";
import { Avatar } from "@react-native-material/core";
import CreateScreen from "../screens/CreateScreen/CreateScreen";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { user } = useSelector((state) => state.user);
  const { darkMode } = useSelector((state) => state.settings);

  const login = !user ? false : true;

  return (
    <Tab.Navigator
      screenOptions={{
        unmountOnBlur: true,
        headerShown: true,
        header: (props) => <Navbar {...props} showProfile={false} />,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: darkMode ? "black" : "white",
          height: 55,
        },
        headerTransparent: true,
      }}
      backBehavior="initialRoute"
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{
          title: "Home",
          headerTitle: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <CommunityIcon
              name={focused ? "home" : "home-outline"}
              size={focused ? 30 : 25}
              color={darkMode ? "white" : "black"}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <CustomText
              darkmode={!focused}
              fontSize={focused ? 14 : 11}
              title="Home"
              style={focused ? { color: "#4b9685" } : {}}
            />
          ),
        }}
      />
      {login && (
        <Tab.Screen
          name="Create"
          component={CreateScreen}
          initialParams={{
            title: "Umfrage erstellen",
          }}
          options={{
            title: "Erstellen",
            headerTitle: "Umfrage Erstellen",
            header: (props) => (
              <Navbar
                {...props}
                showProfile={false}
                fontSize={27}
                customHeader="title"
              />
            ),
            tabBarIcon: ({ focused }) => (
              <>
                {focused ? (
                  <MaterialIcon
                    name="add-box"
                    size={30}
                    color={darkMode ? "white" : "black"}
                  />
                ) : (
                  <OctiIcon
                    name="diff-added"
                    size={25}
                    color={darkMode ? "white" : "black"}
                  />
                )}
              </>
            ),
            tabBarLabel: ({ focused }) => (
              <CustomText
                darkmode={!focused}
                fontSize={focused ? 14 : 11}
                title="Erstellen"
                style={focused ? { color: "#4b9685" } : {}}
              />
            ),
          }}
        />
      )}
      {login ? (
        <Tab.Screen
          name="ProfileStack"
          component={ProfileStackNavigator}
          options={({ route }) => ({
            title: "Profil",
            headerTitle: "Profil",
            headerShown: false,
            tabBarStyle: {
              display: getTabBarStyle(route),
              backgroundColor: darkMode ? "black" : "white",
              height: 55,
            },
            tabBarIcon: ({ focused }) => (
              <>
                {user.profileImg ? (
                  <Avatar
                    image={{ uri: user.profileImg?.uri }}
                    size={focused ? 29 : 25}
                    style={{
                      borderWidth: 1.5,
                      borderColor: darkMode ? "white" : "black",
                      overflow: "hidden",
                    }}
                    imageContainerStyle={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  />
                ) : (
                  <MaterialIcon
                    name="person"
                    size={focused ? 30 : 25}
                    color={darkMode ? "white" : "black"}
                  />
                )}
              </>
            ),
            tabBarLabel: ({ focused }) => (
              <CustomText
                darkmode={!focused}
                fontSize={focused ? 14 : 11}
                title="Profil"
                style={focused ? { color: "#4b9685" } : {}}
              />
            ),
          })}
        />
      ) : (
        <Tab.Screen
          name="LoginStack"
          component={LoginStackNavigator}
          options={{
            headerShown: false,
            title: "Login",
            headerTitle: "Login",
            tabBarIcon: ({ focused }) => (
              <CommunityIcon
                name="login-variant"
                size={focused ? 30 : 25}
                color={darkMode ? "white" : "black"}
              />
            ),
            tabBarLabel: ({ focused }) => (
              <CustomText
                darkmode={!focused}
                fontSize={focused ? 14 : 11}
                title="Login"
                style={focused ? { color: "#4b9685" } : {}}
              />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const getTabBarStyle = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? "HomeStack";
  let display = routeName === "SurveyDetailsStack" ? "none" : "flex";
  return display;
};

import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";

import Navbar from "../../components/Navbar";
import ProfileScreen from "../../screens/ProfileScreen/ProfileScreen";
import SurveyDetailsStack from "./SurveyDetailsStack";
import CommentsStack from "./CommentsStack";
import MessageScreen from "../../screens/MessageScreen/MessageScreen";

const Stack = createStackNavigator();

const ProfileStackNavigator = () => {
  const { darkMode } = useSelector((state) => state.settings);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        header: (props) => <Navbar {...props} showProfile={false} />,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: darkMode ? "black" : "white",
        },
        headerTransparent: true,
      }}
    >
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitle: "Profil",
        }}
      />
      <Stack.Screen
        name="SurveyDetailsStack"
        component={SurveyDetailsStack}
        options={{
          headerTitle: "Umfrage",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CommentsStack"
        component={CommentsStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Message"
        component={MessageScreen}
        options={{
          headerShown: true,
          header: (props) => <Navbar {...props} customHeader="userName" />,
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;

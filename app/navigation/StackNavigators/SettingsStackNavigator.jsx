import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import { useSelector } from "react-redux";

import Navbar from "../../components/Navbar";
import SettingsScreen from "../../screens/SettingsScreen/SettingsScreen";
import NotificationScreen from "../../screens/SettingsScreen/Stacks/NotificationScreen";
import AccountScreen from "../../screens/SettingsScreen/Stacks/AccountScreen";
import PremiumScreen from "../../screens/SettingsScreen/Stacks/PremiumScreen";
import FAQScreen from "../../screens/SettingsScreen/Stacks/FAQScreen";
import PrivacyScreen from "../../screens/SettingsScreen/Stacks/PrivacyScreen";
import ImprintScreen from "../../screens/SettingsScreen/Stacks/ImprintScreen";

const Stack = createStackNavigator();

const SettingsStackNavigator = () => {
  const { darkMode } = useSelector((state) => state.settings);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        header: (props) => <Navbar {...props} showSettings={false} />,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: darkMode ? "black" : "white",
        },
        headerTransparent: true,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen
        name="Settings"
        options={{
          headerTitle: "Einstellungen",
        }}
        component={SettingsScreen}
      />
      <Stack.Screen
        name="Notification"
        options={{
          headerTitle: "Benachrichtigungen",
          header: (props) => (
            <Navbar
              {...props}
              showProfile={false}
              showLogin={false}
              fontSize={27}
            />
          ),
        }}
        component={NotificationScreen}
      />
      <Stack.Screen
        name="Account"
        options={{
          headerTitle: "Account",
        }}
        component={AccountScreen}
      />
      <Stack.Screen
        name="Premium"
        options={{
          headerTitle: "Premium",
        }}
        component={PremiumScreen}
      />
      <Stack.Screen
        name="FAQ"
        options={{
          headerTitle: "FAQ",
        }}
        component={FAQScreen}
      />
      <Stack.Screen
        name="Privacy"
        options={{
          headerTitle: "Datenschutz",
        }}
        component={PrivacyScreen}
      />
      <Stack.Screen
        name="Imprint"
        options={{
          headerTitle: "Impressum",
        }}
        component={ImprintScreen}
      />
    </Stack.Navigator>
  );
};

export default SettingsStackNavigator;

import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import BlogPostDetails from "../../components/BlogPostDetails";
import Navbar from "../../components/Navbar";
import HomeScreen from "../../screens/HomeScreen/HomeScreen";
import FAQScreen from "../../screens/SettingsScreen/Stacks/FAQScreen";
import CommentsStack from "./CommentsStack";

const Stack = createStackNavigator();

const HomeStackNavigator = () => {
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
        name="Home"
        component={HomeScreen}
        options={{ headerTitle: "Home" }}
      />
      <Stack.Screen
        name="BlogPostHomeDetails"
        component={BlogPostDetails}
        options={{
          headerShown: true,
          header: (props) => (
            <Navbar
              {...props}
              backBtnStyle={styles.backBtn}
              backIconSize={28}
              showNotification={false}
              showProfile={false}
            />
          ),
        }}
      />
      <Stack.Screen
        name="FAQHome"
        options={{
          headerTitle: "FAQ",
        }}
        component={FAQScreen}
      />
      <Stack.Screen
        name="CommentsNotStack"
        component={CommentsStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;

const styles = StyleSheet.create({
  backBtn: {
    backgroundColor: "#3f3f3f",
    borderRadius: 100,
    opacity: 0.7,
    padding: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import BlogPostDetails from "../../components/BlogPostDetails";
import Navbar from "../../components/Navbar";
import NewsScreen from "../../screens/NewsScreen/NewsScreen";

const Stack = createStackNavigator();

const NewsStackNavigator = () => {
  const { darkMode } = useSelector((state) => state.settings);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        header: (props) => <Navbar {...props} />,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: darkMode ? "black" : "white",
        },
        headerTransparent: true,
      }}
    >
      <Stack.Screen
        name="News"
        component={NewsScreen}
        options={{
          headerTitle: "Entdecken",
        }}
      />
      <Stack.Screen
        name="BlogPostDetails"
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
    </Stack.Navigator>
  );
};

export default NewsStackNavigator;

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

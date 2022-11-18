import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import FeedScreen from "../../screens/FeedScreen/FeedScreen";
import MessageStackNavigator from "./MessageStackNavigator";
import ProfileStackNavigator from "./ProfileStackNavigator";

const Stack = createStackNavigator();

const FeedStackNavigator = () => {
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
        name="Feed"
        component={FeedScreen}
        options={{
          headerTitle: "Nachrichten",
        }}
      />
      <Stack.Screen
        name="MessageStack"
        component={MessageStackNavigator}
        options={{
          headerShown: true,
          header: (props) => <Navbar {...props} customHeader="userName" />,
        }}
      />
      <Stack.Screen
        name="FeedProfileStack"
        component={ProfileStackNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default FeedStackNavigator;

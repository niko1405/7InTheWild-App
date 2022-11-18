import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import MessageScreen from "../../screens/MessageScreen/MessageScreen";
import ProfileStackNavigator from "./ProfileStackNavigator";

const Stack = createStackNavigator();

const MessageStackNavigator = () => {
  const { darkMode } = useSelector((state) => state.settings);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        header: (props) => <Navbar {...props} customHeader="userName" />,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: darkMode ? "black" : "white",
        },
        headerTransparent: true,
      }}
    >
      <Stack.Screen
        name="Message"
        component={MessageScreen}
        options={{
          headerTitle: "Nachrichten",
        }}
      />
      <Stack.Screen
        name="MessageProfileStack"
        component={ProfileStackNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default MessageStackNavigator;

import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import ChatScreen from "../../screens/ChatScreen/ChatScreen";
import ProfileStackNavigator from "./ProfileStackNavigator";

const Stack = createStackNavigator();

const ChatStackNavigator = () => {
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
        name="LiveChat"
        component={ChatScreen}
        options={{
          headerTitle: "Live Chat",
        }}
      />
      <Stack.Screen
        name="ChatProfileStack"
        component={ProfileStackNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ChatStackNavigator;

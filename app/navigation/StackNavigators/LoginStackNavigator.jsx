import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import ForgotPasswordScreen from "../../screens/LoginScreen/ForgotPasswordScreen";
import LoginScreen from "../../screens/LoginScreen/LoginScreen";

const Stack = createStackNavigator();

const LoginStackNavigator = () => {
  const { darkMode } = useSelector((state) => state.settings);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        header: (props) => <Navbar {...props} showLogin={false} />,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: darkMode ? "black" : "white",
        },
        headerTransparent: true,
      }}
    >
      <Stack.Screen
        name="Login"
        options={{
          headerTitle: "Login",
        }}
        component={LoginScreen}
      />
      <Stack.Screen
        name="ForgotPassword"
        options={{
          headerTitle: "Passwort vergessen",
          header: (props) => (
            <Navbar {...props} showLogin={false} fontSize={27} />
          ),
        }}
        component={ForgotPasswordScreen}
      />
    </Stack.Navigator>
  );
};

export default LoginStackNavigator;

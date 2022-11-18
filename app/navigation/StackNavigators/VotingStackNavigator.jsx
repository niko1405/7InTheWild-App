import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar";
import SurveyDetailsStack from "./SurveyDetailsStack";
import CommentsStack from "./CommentsStack";
import VotingScreen from "../../screens/VotingScreen/VotingScreen";
import ProfileScreen from "../../screens/ProfileScreen/ProfileScreen";

const Stack = createStackNavigator();

const VotingStackNavigator = () => {
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
        name="Voting"
        component={VotingScreen}
        options={{
          headerTitle: "Abstimmungen",
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
        name="VotingProfile"
        component={ProfileScreen}
        options={{
          headerTitle: "Profil",
        }}
      />
    </Stack.Navigator>
  );
};

export default VotingStackNavigator;

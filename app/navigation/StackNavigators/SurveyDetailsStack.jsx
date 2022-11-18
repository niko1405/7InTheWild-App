import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import Navbar from "../../components/Navbar";
import ProfileScreen from "../../screens/ProfileScreen/ProfileScreen";
import SurveyDetailsScreen from "../../screens/SurveyDetailsScreen/SurveyDetailsScreen";
import CommentsStack from "./CommentsStack";

const Stack = createStackNavigator();

const SurveyDetailsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="SurveyDetails"
      screenOptions={{
        headerShown: true,
        header: (props) => <Navbar {...props} showProfile={false} />,
        headerTransparent: true,
        cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid,
      }}
    >
      <Stack.Screen
        name="SurveyDetails"
        component={SurveyDetailsScreen}
        options={{
          headerTitle: "Umfrage",
        }}
      />
      <Stack.Screen
        name="CommentsStack"
        component={CommentsStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SurveyProfile"
        component={ProfileScreen}
        options={{
          headerTitle: "Profil",
        }}
      />
    </Stack.Navigator>
  );
};

export default SurveyDetailsStack;

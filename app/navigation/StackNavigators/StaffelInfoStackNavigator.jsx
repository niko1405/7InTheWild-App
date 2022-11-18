import { createStackNavigator } from "@react-navigation/stack";
import Navbar from "../../components/Navbar";
import StaffelVideosScreen from "../../screens/StaffelInfoScreen/StaffelVideosScreen";
import StaffelInfoScreen from "../../screens/StaffelInfoScreen/StaffelInfoScreen";

const Stack = createStackNavigator();

const StaffelInfoStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="StaffelInfo"
      screenOptions={{
        headerShown: true,
        header: (props) => <Navbar {...props} />,
        headerTransparent: true,
      }}
    >
      <Stack.Screen
        name="StaffelInfo"
        component={StaffelInfoScreen}
        options={{ headerTitle: "7 vs Wild" }}
      />
      <Stack.Screen
        name="StaffelVideos"
        component={StaffelVideosScreen}
        options={{
          headerTitle: "Videos",
          header: (props) => <Navbar {...props} defaultBgC="#4a6961" />,
        }}
      />
    </Stack.Navigator>
  );
};

export default StaffelInfoStackNavigator;

import { createStackNavigator } from "@react-navigation/stack";
import Navbar from "../../components/Navbar";
import CommentsScreen from "../../screens/CommentsScreen/CommentsScreen";

const Stack = createStackNavigator();

const CommentsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Comments"
      screenOptions={{
        headerShown: true,
        header: (props) => <Navbar {...props} showProfile={false} />,
        headerTransparent: true,
      }}
    >
      <Stack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          headerTitle: "Kommentare",
        }}
      />
    </Stack.Navigator>
  );
};

export default CommentsStack;

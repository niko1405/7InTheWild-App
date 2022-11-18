import { createStackNavigator } from "@react-navigation/stack";
import InfoScreen from "../../screens/InfoScreen/InfoScreen";

const Stack = createStackNavigator();

const InfoStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Info" component={InfoScreen} />
    </Stack.Navigator>
  );
};

export default InfoStackNavigator;

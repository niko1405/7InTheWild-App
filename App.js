import "react-native-gesture-handler";
import "react-native-get-random-values";
import { Provider } from "react-redux";
import { Provider as MaterialProvider } from "@react-native-material/core";
import { LogBox, StatusBar, StyleSheet, View } from "react-native";
import "moment/min/moment-with-locales";

import { ContextProvider } from "./app/contexts/ContextProvider";
import { CustomProvider } from "./app/CustomProvider";
import store from "./store";
import AppStackNavigator from "./app/navigation/AppStack";
import NetworkProvider from "./app/NetworkProvider";

LogBox.ignoreLogs([
  "EventEmitter.removeListener('url', ...): Method has been deprecated. Please instead use `remove()` on the subscription returned by `EventEmitter.addListener`.",
]);

const App = () => {
  return (
    <View style={styles.container}>
      <ContextProvider>
        <Provider store={store}>
          <MaterialProvider>
            <NetworkProvider>
              <CustomProvider>
                <AppStackNavigator />
              </CustomProvider>
            </NetworkProvider>
            <StatusBar hidden={false} />
          </MaterialProvider>
        </Provider>
      </ContextProvider>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: { position: "relative", padding: 0, flex: 1 },
});

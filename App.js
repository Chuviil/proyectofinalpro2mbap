import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./components/StackNavigator";
import { StatusBar } from "expo-status-bar";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./reduxStoreConfig";
import 'react-native-gesture-handler';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <StatusBar style="auto" />
          <StackNavigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

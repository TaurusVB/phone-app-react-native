import "react-native-gesture-handler";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/redux/store";
import LoginScreen from "./src/screens/LoginScreen";
import RegistrationScreen from "./src/screens/RegistrationScreen";
import Home from "./src/screens/Home";

const MainStack = createStackNavigator();

export default function App() {
  return (
    // <Provider store={store}>
    //   <PersistGate loading={null} persistor={persistor}>
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Home">
        <MainStack.Screen
          name={"Login"}
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={"Registration"}
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <MainStack.Screen
          name={"Home"}
          component={Home}
          options={{
            headerShown: false,
          }}
        />
      </MainStack.Navigator>
    </NavigationContainer>
    //   </PersistGate>
    // </Provider>
  );
}

import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./Screens/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Screens/Home";

const MainStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Login">
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
        <MainStack.Screen name={"Home"} component={Home} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}

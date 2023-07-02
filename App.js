import "react-native-gesture-handler";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import LoginScreen from "./Screens/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";
import Home from "./Screens/Home";

const MainStack = createStackNavigator();

export default function App() {
  return (
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
  );
}

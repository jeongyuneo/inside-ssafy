import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "./src/pages/Main/index";
import Driving from "./src/pages/Driving/index";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer initialRouteName="Main">
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Driving"
          component={Driving}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

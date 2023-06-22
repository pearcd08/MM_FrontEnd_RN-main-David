import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppLoading from "expo-app-loading";
import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { useFonts } from "expo-font";

// Import your screen components
import LoginScreen from "./src/screens/Login";
import UserSignup from "./src/screens/UserSignup";
import BottomNavBar from "./src/components/BottomNavBar";

const Stack = createNativeStackNavigator();

const App = () => {
  // GET THE GOOGLE FONTS ON APP LOAD
  const [fontsLoaded] = useFonts({
    IndieFlower: require("./assets/fonts/IndieFlower.ttf"),
    Pacifico: require("./assets/fonts/Pacifico.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterThin: require("./assets/fonts/Inter-Thin.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="UserSignup"
            component={UserSignup}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Home"
            component={BottomNavBar}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;

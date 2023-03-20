import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./app/screens/LoginScreen";
import HomeScreen from "./app/screens/HomeScreen";
import Settings from "./app/screens/Settings";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import GraphScreen from "./app/screens/GraphScreen";
import DataInput from "./app/screens/DataInput";

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen  options={{ headerShown: false }} name="Home" component={RouteName} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function RouteName() {
  return (
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen options={{ headerShown: false }}  name="Home" component={HomeScreen} />
        <Drawer.Screen name="GraphScreen" component={GraphScreen} />
        <Drawer.Screen name="DataInput" component={DataInput} />
        <Drawer.Screen name="Settings" component={Settings} />
      </Drawer.Navigator>
  );



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})};
export default App;



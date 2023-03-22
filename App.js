import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./app/screens/LoginScreen";
import HomeScreen from "./app/screens/HomeScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import GraphScreen from "./app/screens/GraphScreen";
import DataInput from "./app/screens/DataInput";
import { FontAwesome } from "@expo/vector-icons";
import SettingScreen from "./app/screens/SettingScreen";
import SignupScreen from "./app/screens/SignupScreen";
import colors from "./app/config/colors";




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
        <Stack.Screen  options={{ headerShown: false }} name="Signup" component={SignupScreen} />
        <Stack.Screen  options={{ headerShown: false }} name="Home" component={RouteName} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function RouteName() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerType: "front",
        drawerPosition: "left",
        swipeEdgeWidth: 500,
        drawerHideStatusBarOnOpen: true,
        headerShown: true,  
        drawerActiveTintColor: colors.greenTextColor,
        drawerInactiveTintColor: colors.blackTextColor,
    
        headerStyle: {
          backgroundColor: colors.secondaryGreen ,
        },

        drawerStyle: {
          backgroundColor: colors.whiteBackgroundColor,
          width: 240,
        },

        
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: () => (
            <FontAwesome name="home" size={24} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        name="GraphScreen"
        component={GraphScreen}
        options={{
          drawerIcon: () => (
            <FontAwesome name="info-circle" size={24} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        name="DataInput"
        component={DataInput}
        options={{
          drawerIcon: () => (
            <FontAwesome name="user" size={24} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          drawerIcon: () => (
            <FontAwesome name="gear" size={24} color = "black"/>
          ),
        }}
      />
      
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



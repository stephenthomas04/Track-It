import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./app/screens/LoginScreen";
import HomeScreen from "./app/screens/HomeScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import GraphScreen from "./app/screens/GraphScreen";
import { FontAwesome } from "@expo/vector-icons";
import SettingScreen from "./app/screens/SettingScreen";
import DataScreen from "./app/screens/Data";
import SignupScreen from "./app/screens/SignupScreen";
import CameraScreen from "./app/screens/CameraScreen";
import colors from "./app/config/colors";
import { Entypo } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Stack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Signup"
          component={SignupScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={RouteName}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function RouteName() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: "black",
        inactiveTintColor: "dimgray",
        labelStyle: { paddingBottom: 0, fontSize: 15, fontWeight: "bold" },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          drawerIcon: () => (
            <FontAwesome name="home-outline" size={24} color="black" />
          ),
        }}
      />
      {/* <Tab.Screen
        name="GraphScreen"
        component={GraphScreen}
        options={{
          drawerIcon: () => <Entypo name="bar-graph" size={24} color="black" />,
        }}
      /> */}
      <Tab.Screen
        name="Reciept Scanner"
        component={CameraScreen}
        options={{
          headerShown: false,
          drawerIcon: () => (
            <FontAwesome name="camera" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="Data"
        component={DataScreen}
        options={{
          headerShown: false,
          drawerIcon: () => <FontAwesome name="list" size={24} color="black" />,
        }}
      />
    </Tab.Navigator>
  );
}
export default App;

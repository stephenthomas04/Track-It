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

import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CustomTabBarButton from "./components/CustomTabBarButton";
import CustomTabBar from "./components/CustomTabBar";
import globalStyle from "./app/config/globalStyle";

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
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "black",
        fontWeight: "bold",
        tabBarStyle: styles.tabBarStyle,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;
          if (rn == HomeScreen) {
            iconName = focused ? "home" : "home-outline";
          } else if (rn == CameraScreen) {
            iconName = focused ? "list" : "list-outline";
          } else if (rn == DataScreen) {
            iconName = focused ? "settings" : "settings-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        labelStyle: { fontSize: 15, fontWeight: "bold" },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarButton: (props) => (
            <CustomTabBarButton route="HomeTab" {...props} />
          ),
        }}
      />

      <Tab.Screen
        name="Reciept Scanner"
        component={CameraScreen}
        options={{
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Data"
        component={DataScreen}
        options={{
          tabBarButton: (props) => (
            <CustomTabBarButton route="Data" {...props} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default App;

const styles = StyleSheet.create({
  tabBarStyle: {
    position: "absolute",
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderRadius: 100,
    bottom: 30,
    right: 10,
    left: 10,
  },
});

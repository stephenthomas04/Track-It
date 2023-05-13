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
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerType: "front",
        drawerPosition: "left",
        swipeEdgeWidth: 500,
        drawerHideStatusBarOnOpen: false,
        headerShown: true,
        drawerActiveTintColor: colors.darkGreenTextColor,
        drawerInactiveTintColor: colors.blackTextColor,
        headerStyle: {
          backgroundColor: colors.primaryDarkGreen,
        },
        drawerStyle: {
          backgroundColor: colors.whiteBackgroundColor,
          width: 250,
        },
      }}
    >
      <Drawer.Screen
        name="Home Tab"
        component={HomeScreen}
        options={{
          drawerIcon: () => <FontAwesome name="home" size={24} color="black" />,
        }}
      />
      <Drawer.Screen
        name="GraphScreen"
        component={GraphScreen}
        options={{
          drawerIcon: () => <Entypo name="bar-graph" size={24} color="black" />,
        }}
      />
      <Drawer.Screen
        name="Reciept Scanner"
        component={CameraScreen}
        options={{
          drawerIcon: () => (
            <FontAwesome name="camera" size={24} color="black" />
          ),
        }}
      />
      <Drawer.Screen
        name="Data"
        component={DataScreen}
        options={{
          drawerIcon: () => <FontAwesome name="list" size={24} color="black" />,
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          drawerIcon: () => <FontAwesome name="gear" size={24} color="black" />,
        }}
      />
    </Drawer.Navigator>
  );
}
export default App;

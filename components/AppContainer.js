import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../app/screens/LoginScreen";
import HomeScreen from "../app/screens/HomeScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import GraphScreen from "../app/screens/GraphScreen";
import { FontAwesome } from "@expo/vector-icons";
import AboutUs from "../app/screens/AboutUs";
import DataScreen from "../app/screens/Data";
import SignupScreen from "../app/screens/SignupScreen";
import CameraScreen from "../app/screens/CameraScreen";
import { Entypo } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import CustomDrawer from "../components/CustomDrawer";
import { useTheme } from "../app/config/ThemeProvider";
import { AntDesign } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function AppContainer() {
  const { colors, isDarkTheme } = useTheme();
  console.log(colors);
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: isDarkTheme ? "#454545" : "white",
    },
  };
  return (
    /*<PaperProvider theme={PaperDarkTheme}>
      <NavigationContainer theme={DarkTheme}>
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
    </PaperProvider>*/
    <NavigationContainer theme={MyTheme}>
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
  const { colors } = useTheme();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      initialRouteName="Home"
      screenOptions={{
        drawerType: "front",
        drawerPosition: "left",
        swipeEdgeWidth: 500,
        drawerHideStatusBarOnOpen: true,
        headerShown: false,
        drawerActiveTintColor: colors.darkGreenTextColor,
        drawerInactiveTintColor: colors.blackTextColor,
        headerStyle: {
          backgroundColor: colors.primaryDarkGreen,
        },
        drawerStyle: {
          backgroundColor: colors.whiteBackgroundColor,
          width: 300,
        },
      }}
    >
      <Drawer.Screen
        name="Home Tab"
        component={HomeScreen}
        options={{
          drawerIcon: () => (
            <FontAwesome name="home" size={24} color={colors.blackTextColor} />
          ),
        }}
      />
      <Drawer.Screen
        name="Graph Screen"
        component={GraphScreen}
        options={{
          drawerIcon: () => (
            <Entypo name="bar-graph" size={24} color={colors.blackTextColor} />
          ),
        }}
      />
      <Drawer.Screen
        name="Receipt Scanner"
        component={CameraScreen}
        options={{
          drawerIcon: () => (
            <FontAwesome
              name="camera"
              size={24}
              color={colors.blackTextColor}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Data"
        component={DataScreen}
        options={{
          drawerIcon: () => (
            <FontAwesome name="list" size={24} color={colors.blackTextColor} />
          ),
        }}
      />
      <Drawer.Screen
        name="About Us"
        component={AboutUs}
        options={{
          drawerIcon: () => (
            <AntDesign
              name="infocirlce"
              size={24}
              color={colors.blackTextColor}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
export default AppContainer;

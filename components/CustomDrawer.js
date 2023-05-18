import { StyleSheet, Text, View, TouchableOpacity, Switch } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { ImageBackground } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { useNavigation } from "@react-navigation/core";
import { Drawer, TouchableRipple } from "react-native-paper";
import { TouchableHighlight } from "react-native-gesture-handler";
import { useTheme } from "../app/config/ThemeProvider";
import { Colors } from "react-native/Libraries/NewAppScreen";

const CustomDrawer = (props) => {
  const navigation = useNavigation();
  const { colors, isDarkTheme, setIsDarkTheme } = useTheme();
  const auth = getAuth();
  const user = auth.currentUser;

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          backgroundColor: "#14AE5C",
        }}
      >
        <ImageBackground
          source={require("../app/assets/dazzle.png")}
          style={{
            height: 160,
            width: 300,
            marginBottom: 20,
            marginTop: 10,
          }}
        ></ImageBackground>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.whiteBackgroundColor,
            paddingTop: 10,
          }}
        >
          <View>
            <DrawerItemList {...props} />
          </View>
          <View
            style={{
              marginTop: 19,
              padding: 3,
              borderTopWidth: 1,
              borderTopColor: colors.blackTextColor,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                toggleTheme();
              }}
            >
              <View style={styles.preference}>
                <Text style={{ fontSize: 15 }}>Dark Mode</Text>
                <View pointerEvents="none">
                  <Switch value={isDarkTheme} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </DrawerContentScrollView>

      <View
        style={{
          padding: 30,
          borderTopWidth: 1,
          borderTopColor: colors.blackTextColor,
        }}
      >
        <TouchableOpacity onPress={handleSignOut}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialIcons
              name="logout"
              size={22}
              color={colors.blackTextColor}
            />
            <Text
              style={{
                color: colors.blackTextColor,
                fontSize: 15,
                marginLeft: 5,
              }}
            >
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
const styles = StyleSheet.create({
  switch: {
    marginLeft: 130,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    marginTop: 10,
    paddingHorizontal: 16,
    backgroundColor: "#ffffffff",
  },
});

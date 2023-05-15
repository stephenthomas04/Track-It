import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { ImageBackground } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/core";

const CustomDrawer = (props) => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: "#14AE5C" }}
      >
        <ImageBackground
          source={require("../app/assets/dazzle.png")}
          style={{
            marginLeft: 29,
            height: 150,
            width: 235,
            marginBottom: 20,
            marginTop: 10,
          }}
        ></ImageBackground>
        <View style={{ flex: 1, backgroundColor: "#ffffffff", paddingTop: 10 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{ padding: 30, borderTopWidth: 1, borderTopColor: "#000000" }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <MaterialIcons name="logout" size={22} color="black" />
            <Text style={{ fontSize: 15, marginLeft: 5 }}>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CustomDrawer;


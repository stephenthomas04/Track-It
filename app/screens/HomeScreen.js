import { useNavigation } from "@react-navigation/core";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getAuth } from "firebase/auth";
import { auth, firebase } from "../firebase";

import globalStyle from "../config/globalStyle";

const HomeScreen = () => {
  const navigation = useNavigation();
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

  return (
    <View style={[globalStyle.container,
      {
        flexDirection: "column",
        height:"30%",

      },
    ]}>
      <View style={globalStyle.subContainer}>
        <Text style={globalStyle.title}>Welcome back, "Name"</Text>
      </View>
      {/* <Text>Email: {user.email}</Text> */}
      

      <TouchableOpacity onPress={handleSignOut} style={[globalStyle.button,
      {
          marginTop: "5%",
      },
    ]}>
        <Text style={globalStyle.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
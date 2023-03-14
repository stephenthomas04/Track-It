import { useNavigation } from "@react-navigation/core";
import React from "react";
import { StyleSheet,Alert, Text, TouchableOpacity, View } from "react-native";
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
    <View style={styles.container}>
      <Text>Email: {user.email}</Text>
      <Text>Welcome to Track-It!</Text>
      <TouchableOpacity onPress={handleSignOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
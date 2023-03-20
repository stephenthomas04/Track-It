import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Button } from "react-native";
import { getAuth } from "firebase/auth";
import { auth, firebase } from "../firebase";
import globalStyle from "../config/globalStyle";


import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";

function HomeScreen(){
  
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
      <Button title="Open Drawer" onPress={() => navigation.openDrawer()} />
      <Text>Email: {user.email}</Text>
      <Text>Welcome to Track-It!</Text>
      <TouchableOpacity onPress={handleSignOut} style={globalStyle.button}>
        <Text style={globalStyle.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
});
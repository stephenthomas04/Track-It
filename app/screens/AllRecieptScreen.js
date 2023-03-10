import { useNavigation } from "@react-navigation/core";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../firebase";
import globalStyle from "../config/globalStyle";

const AllRecieptScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={globalStyle.container}>
      <Text>Email: {auth.currentUser?.email}</Text>
      
      <TouchableOpacity
        onPress={handleSignOut}
        style={globalStyle.button}
      >
        <Text style={globalStyle.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AllRecieptScreen;


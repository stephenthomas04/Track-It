import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Button } from "react-native";
import { getAuth } from "firebase/auth";
import { auth, firebase } from "../firebase";
import globalStyle from "../config/globalStyle";

import { Card } from "react-native-paper";

import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import { CardAnimationContext } from "react-navigation-stack";

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
    <View style={globalStyle.container}>
      <Text style={globalStyle.title}>Your Finance Outlook:</Text>

      <Card style={[globalStyle.container,
      {
        flex:0,
        padding: "5%", 
        marginBottom: "20%", 
      },
      
      ]} >
          <Card.Content>
              <Text style={globalStyle.subHeading}> Graph</Text>
              
          </Card.Content>
          <Card.Actions>
          
            
          </Card.Actions>
      </Card>
      <TouchableOpacity onPress={handleSignOut} style={globalStyle.button}>
        <Text style={globalStyle.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};
export default HomeScreen;

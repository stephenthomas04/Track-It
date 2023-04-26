import { useNavigation } from "@react-navigation/core";
import colors from "../config/colors";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Button,
  InputField,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import globalStyle from "../config/globalStyle";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const nav = useNavigation();
  const { navigation } = props;

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        nav.replace("Home");
      }
    });

    return unsubscribe;
  }, []);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={globalStyle.container} behavior="padding">
        <Image
          style={globalStyle.imageStyles}
          source={require("../assets/trackIt.png")}
        />
        <Text style={globalStyle.subHeading}>Login to Track-It</Text>
        <View style={globalStyle.inputContainer}>
      
    
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={globalStyle.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={globalStyle.input}
            secureTextEntry
          />
        </View>

        <View style={globalStyle.buttonContainer}>
          <TouchableOpacity
            onPress={handleLogin}
            style={[globalStyle.button, globalStyle.buttonOutlineGreen]}>
            <Text style={globalStyle.buttonLoginText}>Login</Text>
          </TouchableOpacity>
          <Text style={{fontSize: "15", marginUp: 5}}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={{color: '#0E733D', fontWeight: '600', fontSize: '15'}}> Sign Up</Text>
          </TouchableOpacity>
        </View>

        
        
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({

  image: {
    width: "30%",
    height: "30%",
    justifyContent: "center",
    paddingTop: "5%",
  },
  footerText: {
    color: colors.darkGreenTextColor,
    paddingTop: 20,
  },
  

});
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
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import globalStyle from "../config/globalStyle";

const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const nav = useNavigation();
  const {navigation} = props;

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
        <TouchableOpacity onPress={handleLogin} style={globalStyle.button}>
          <Text style={globalStyle.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
     

    <View style={styles.footer}>
      <Text style={styles.footerText}> Don't have an account? </Text>
        <TouchableOpacity>
        <Button title = "Press me" onPress={() => navigation.navigate('Signup')} />
          </TouchableOpacity>
      </View>
       </KeyboardAvoidingView>
       </TouchableWithoutFeedback>
        
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 10,
    textAlign: 'center',
    flexDirection: 'row',
  },
  footerText: {
    color: colors.darkGreenTextColor,

  },
  signupBtn: {
    color: colors.primaryButtonGreen,
    fontWeight: 'bold',
  },
});

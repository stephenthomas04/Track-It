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
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const navigation = useNavigation();

  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home");
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered with:", user.email);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={globalStyle.container} behavior="padding">
      <View style ={styles.header}>
        <Image
          style={globalStyle.imageStyles}
          source={require("../assets/trackIt.png")}
        />
          </View>
        <View style ={styles.footer}>
        <Text style={globalStyle.subHeading}>Sign Up</Text>
        <View style={globalStyle.inputContainer}>

        <AntDesign name="user" size={20} color="green" />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={{flexDirection:'row',borderBottomColor:"black", borderBottomWidth:2, paddingBottom:8, marginBottom:25, paddingLeft:30}}
          />

<AntDesign name="lock" size={20} color="green" />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={{flexDirection:'row',borderBottomColor:"black", borderBottomWidth:2, paddingBottom:8, paddingLeft:30}}
            secureTextEntry
          />
        </View>

       <View style={globalStyle.buttonContainer}>
          <TouchableOpacity
            onPress={handleSignUp}
            style={[globalStyle.button, globalStyle.buttonOutlineGreen]}>
            <Text style={globalStyle.buttonLoginText}>Sign Up</Text>
          </TouchableOpacity>
          <View style={{flexDirection:'row', justifyContent: 'center', marginBottom: "100%", }}>
          <Text style={{fontSize: "15", marginTop:"5%"}}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{color: '#0E733D', fontWeight: '600', fontSize: '16', marginTop:"20%"}}> Login</Text>
          </TouchableOpacity>
          </View>
        </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({

  icon:{
    width: "13%",
    padding:4,
    borderRadius: 12,
    borderColor: colors.primaryDarkGreen,
    borderWidth: 1,
  },
 
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50
},
footer: {
    flex: 2.5,
    backgroundColor: colors.whiteBackgroundColor,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },

});
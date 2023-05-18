import { useNavigation } from "@react-navigation/core";
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

import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "../config/ThemeProvider";

const LoginScreen = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const { colors, globalStyle } = useTheme();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const styles = StyleSheet.create({
    icon: {
      padding: 4,
      borderRadius: 12,
      paddingBottom: "3.5%",
      borderColor: colors.primaryDarkGreen,
      marginLeft: -15,
      marginBottom: "-10%",
    },

    header: {
      flex: 1,
      justifyContent: "flex-end",
      paddingHorizontal: 20,
      paddingBottom: 50,
    },

    footer: {
      flex: 2.5,
      backgroundColor: colors.whiteBackgroundColor,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30,
    },
    shadow: {
      shadowColor: colors.blackTextColor,
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 3,
    },
  });

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
        <View style={styles.header}>
          <Animatable.Image
            animation="fadeInDownBig"
            style={globalStyle.imageStyles}
            source={require("../assets/dazzle.png")}
          />
        </View>

        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <Text style={globalStyle.subHeading}>Login</Text>
          <View style={globalStyle.inputContainer}>
            <AntDesign
              name="user"
              size={20}
              color="green"
              style={styles.icon}
            />
            <TextInput
              placeholder="Email"
              placeholderTextColor={colors.blackTextColor}
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                flexDirection: "row",
                borderBottomColor: colors.blackTextColor,
                color: colors.blackTextColor,
                borderBottomWidth: 1,
                width: "120%",
                paddingBottom: 5,
                marginBottom: 35,
                paddingLeft: 30,
                marginLeft: -15,
              }}
            />

            <AntDesign
              name="lock"
              size={20}
              color="green"
              style={styles.icon}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor={colors.blackTextColor}
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={{
                color: colors.blackTextColor,
                flexDirection: "row",
                borderBottomColor: colors.blackTextColor,
                borderBottomWidth: 1,
                width: "120%",
                paddingBottom: 5,
                paddingLeft: 30,
                marginLeft: -15,
              }}
              secureTextEntry
            />
          </View>

          <View style={globalStyle.buttonContainer}>
            <TouchableOpacity
              onPress={handleLogin}
              style={[globalStyle.button, globalStyle.buttonOutlineGreen]}
            >
              <Text style={globalStyle.buttonLoginText}>Login</Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: "100%",
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  marginTop: "5%",
                  color: colors.blackTextColor,
                }}
              >
                Don't have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                <Text
                  style={{
                    color: "#0E733D",
                    fontWeight: "600",
                    fontSize: 16,
                    marginTop: "16%",
                  }}
                >
                  {" "}
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animatable.View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

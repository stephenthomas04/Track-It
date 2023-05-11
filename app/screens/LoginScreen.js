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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

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

  const handleGoogleLogin = () => {
    // Handle Google login
  };

  const handleFacebookLogin = () => {
    // Handle Facebook login
  };

  const handleTwitterLogin = () => {
    // Handle Twitter login
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={globalStyle.container} behavior="padding">
        <View style={styles.header}>
          <Image
            style={globalStyle.imageStyles}
            source={require("../assets/trackIt.png")}
          />
        </View>

        <View style={styles.footer}>
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
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                flexDirection: "row",
                borderBottomColor: "black",
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
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={{
                flexDirection: "row",
                borderBottomColor: "black",
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
              <Text style={{ fontSize: "15", marginTop: "5%" }}>
                Don't have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                <Text
                  style={{
                    color: "#0E733D",
                    fontWeight: "600",
                    fontSize: "16",
                    marginTop: "16%",
                  }}
                >
                  {" "}
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
  },
});

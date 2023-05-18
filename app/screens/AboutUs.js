import React, { useRef } from "react";
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
  Animated,
  PanResponder,
  Dimensions,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";
import { useTheme } from "../config/ThemeProvider";
import { getAuth } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";

const data = [
  {
    id: 1,
    title: "Stephen Thomas",
    image: require("../assets/stephen.jpg"),
    description:
      "Did all the UI visible in the app including firebase auth, drawer nav, and dark mode.",
  },
  {
    id: 2,
    title: "Aashman Sharma",
    image: require("../assets/aashman.jpg"),
    description:
      "Implemented the receipt scanner, displaying the data and the scanned images.",
  },
  {
    id: 3,
    title: "Enguerran Preteseille",
    image: require("../assets/enguerran.jpg"),
    description: "Created bar graphs and line graphs.",
  },
];

export default function SettingScreen() {
  const auth = getAuth();
  const user = auth.currentUser.email;
  const navigation = useNavigation();
  const { colors, globalStyle } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.whiteBackgroundColor,
      alignItems: "center",
      justifyContent: "center",
    },
    cardContainer: {
      width: 300,
      height: 450,
      marginHorizontal: 10,
      marginTop: 170,
      borderRadius: 20,
      overflow: "hidden",
      backgroundColor: colors.cardBackground,
      elevation: 5,
    },
    cardImage: {
      width: "100%",
      height: "70%",
      backgroundColor: colors.cardBackground,
      resizeMode: "cover",
    },
    cardTitle: {
      fontSize: 24,
      fontWeight: "bold",
      backgroundColor: colors.cardBackground,
      color: colors.whiteBackgroundColor,
      marginTop: 10,
      marginLeft: 15,
    },
    cardDescription: {
      fontSize: 18,
      marginTop: 5,
      backgroundColor: colors.cardBackground,
      color: colors.whiteBackgroundColor,
      marginLeft: 15,
    },
  });

  const Card = ({ item }) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <FontAwesome
            name="bars"
            size={22}
            color={colors.blackTextColor}
            style={{ marginTop: -10, marginLeft: 350 }}
          />
        </TouchableOpacity>
        <Text
          style={{
            width: 300,
            height: 200,
            fontSize: 15,
            padding: 6,
            marginBottom: -120,
            borderWidth: 2,
            borderRadius: 10,
            borderColor: colors.whiteBackgroundColor,
            backgroundColor: colors.cardBackground,
            color: colors.whiteBackgroundColor,
          }}
        >
          Track-It is a user-friendly app designed for tracking expenses and
          receipts. Its receipt scanner simplifies day-to-day expense tracking.
          The app aims to assist young adults in managing their finances
          effectively, addressing their lack of financial education.
          Additionally, Track-It offers dynamic data visualization through
          graphs and other features.
        </Text>
        <View style={styles.cardContainer}>
          <Image source={item.image} style={styles.cardImage} />
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDescription}>{item.description}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {data.map((item) => {
          return <Card key={item.id} item={item} />;
        })}
      </ScrollView>
    </View>
  );
}

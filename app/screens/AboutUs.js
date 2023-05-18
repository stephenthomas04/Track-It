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

const data = [
  {
    id: 1,
    title: "Aashman Sharma",
    image: require("../assets/aashman.jpg"),
    description: "This is card 1",
  },
  {
    id: 2,
    title: "Stephen Thomas",
    image: require("../assets/stephen.jpg"),
    description: "This is card 2",
  },
  {
    id: 3,
    title: "Enguerran Preteseille",
    image: require("../assets/splash.png"),
    description: "This is card 3",
  },
];

export default function SettingScreen() {
  const { colors } = useTheme();

  const Card = ({ item }) => {
    return (
      <View style={styles.cardContainer}>
        <Image source={item.image} style={styles.cardImage} />
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  cardContainer: {
    width: 250,
    height: 300,
    marginHorizontal: 10,
    borderRadius: 20,
    overflow: "hidden",
    elevation: 5,
    backgroundColor: "#fff",
  },
  cardImage: {
    width: "100%",
    height: "70%",
    resizeMode: "cover",
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 10,
  },
  cardDescription: {
    fontSize: 18,
    marginTop: 5,
    marginLeft: 10,
  },
});

import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  FlatList,
  Switch,
  Image,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase";
import { getAuth } from "firebase/auth";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Overlay } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../config/ThemeProvider";

export default function DataScreen() {
  const { colors } = useTheme();
  const auth = getAuth();
  const user = auth.currentUser.email;
  const navigation = useNavigation();
  const [showImages, setShowImages] = useState(false);
  const [imageSource, setImageSource] = useState(null);
  const Item = ({ item, onPress }) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.itemContent}>
        <Text style={{ ...styles.itemText, color: colors.blackTextColor }}>
          {item.date}
        </Text>
        <Text style={{ ...styles.itemText, color: colors.blackTextColor }}>
          {item.store}
        </Text>
        <Text style={{ ...styles.itemText, color: colors.blackTextColor }}>
          ${item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
  const testReceipts = [
    {
      category: "Cloths",
      day: "01",
      month: "11",
      year: "23",
      id: "yCTOISkTSfSQJnZoAbSt",
      price: "12.99",
      store: "Kohls",
    },
    {
      category: "Food",
      day: "01",
      month: "13",
      year: "23",
      id: "8LXGx7hr974P3T8o4pY",
      price: "15.99",
      store: "Chipotle",
    },
    {
      category: "Entertainment",
      day: "03",
      month: "04",
      year: "23",
      id: "Q2JMOLBF8S7Ku08Cafc",
      price: "6.99",
      store: "AMC",
    },
    {
      category: "Personal",
      day: "09",
      month: "13",
      year: "23",
      id: "WB8IjKQm3uwmd0OR2as",
      price: "0.99",
      store: "walmart",
    },
    {
      category: "Food",
      day: "09",
      month: "13",
      year: "23",
      id: "YelkygyNsJj3wxB0aMz",
      price: "11.50",
      store: "Chipotle",
    },
    {
      category: "Food",
      day: "09",
      month: "14",
      year: "23",
      id: "jKe0kJWUDCiZt2aZYau",
      price: "9.99",
      store: "Chipotle",
    },
    {
      category: "Travel",
      day: "09",
      month: "15",
      year: "23",
      id: "m4tAdv3UofY0kJhXmI9",
      price: "125.99",
      store: "Delta",
    },
    {
      category: "Entertainment",
      day: "12",
      month: "13",
      year: "23",
      id: "nFNITrmLoEE7domhGN1",
      price: "50.00",
      store: "Arcade",
    },
  ];

  const [receipts, setReceipts] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const items = [];
      if (receipts.length <= 1) {
        const querySnapshot = await getDocs(collection(db, user));
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          if (doc.id != "user_information") {
            const data = doc.data();
            const id = doc.id;
            console.log(doc.id, " => ", doc.data());
            items.push({ id, ...data });
          }
        });
      }
      setReceipts(items);
    })();
  }, []);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const downloadFile = async (url) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = (event) => {
      const blob = xhr.response;
    };
    xhr.open("GET", url);
    xhr.send();
  };

  const renderItem = ({ item }) => {
    const storage = getStorage();
    const onPress = async () => {
      try {
        console.log("test", item.imageUrl);
        await downloadFile(item.imageUrl);
        setVisible(!visible);
        setImageSource(item.imageUrl);
      } catch (error) {
        console.error(error);
      }
    };
    return <Item item={item} onPress={onPress} />;
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 30,
      marginTop: 100,
    },

    listContainer: {
      justifyContent: "center",
      alignItems: "center",
    },

    itemContent: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      width: "100%",
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.blackTextColor,
    },
    title: {
      fontSize: 50,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 10,
    },

    itemText: {
      fontSize: 15,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={{ ...styles.title, color: colors.blackTextColor }}>
        Receipts
      </Text>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <FontAwesome
          name="bars"
          size={22}
          color="black"
          style={{ marginTop: -130, marginRight: 310 }}
        />
      </TouchableOpacity>
      <FlatList
        data={receipts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Image
          style={{ height: 600, width: 300 }}
          source={{ uri: imageSource }}
        />
      </Overlay>
    </View>
  );
}

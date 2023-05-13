//This file will be used to get data from fire base, parse it into readable data for our graphs then reutrn it

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

const Item = ({ item, onPress }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <View style={styles.itemContent}>
      <Text style={styles.itemText}>{item.store}</Text>
      <Text style={styles.itemText}>{item.price}</Text>
      <Text style={styles.itemText}>{item.date}</Text>
    </View>
  </TouchableOpacity>
);

export default function DataScreen() {
  const auth = getAuth();
  const user = auth.currentUser.email;

  const [showImages, setShowImages] = useState(false);
  const [imageSource, setImageSource] = useState(null);

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
      // The commented code above works. To test the code a sample array is passed in instead.
      // This will short the amount of calls made to firebase
      //setReceipts(testReceipts);
    })();
  }, []);

  const renderItem = ({ item }) => {
    const storage = getStorage();
    const onPress = async () => {
      try {
        console.log(item.imageUrl);
        setImageSource(item.imageUrl);
      } catch (error) {
        console.error(error);
      }
    };
    return <Item item={item} onPress={onPress} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={receipts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Image
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/track-it-31a75.appspot.com/o/users%2Fjohndoe%40gmail.com%2F275207E4-1AF5-4DF6-BD2B-C4E2A09B89D0.jpg?alt=media&token=655e7840-2658-4542-9a3a-4952fec12bc1",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 50,
    marginVertical: 10,
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
    borderBottomColor: "black",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    padding: 100,
    marginTop: 20,
    marginBottom: 10,
  },

  itemText: {
    fontSize: 15,
  },
});

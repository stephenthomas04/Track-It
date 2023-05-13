//This file will be used to get data from fire base, parse it into readable data for our graphs then reutrn it

import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  FlatList,
  Switch,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase";
import { getAuth } from "firebase/auth";

export default function DataScreen() {
  const auth = getAuth();
  const user = auth.currentUser.email;

  const [receipts, setReceipts] = useState([]);
  const [showImages, setShowImages] = useState(false);
  const [images, setImages] = useState([]);

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

  useEffect(() => {
    (async () => {
      const items = [];
      if (receipts.length <= 1) {
        const querySnapshot = await getDocs(collection(db, user));
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          const data = doc.data();
          const id = doc.id;
          console.log(doc.id, " => ", doc.data());
          items.push({ id, ...data });
        });
      }
      setReceipts(items);
      // The commented code above works. To test the code a sample array is passed in instead.
      // This will short the amount of calls made to firebase
      //setReceipts(testReceipts);
    })();
  }, []);

  const handleSwitchChange = async (value) => {
    setShowImages(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Receipts</Text>
      <FlatList
        data={receipts}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text>{item.store}</Text>
            <Text>{item.price}</Text>
            <Text>{item.date}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <Switch value={showImages} onValueChange={handleSwitchChange} />
      {showImages && (
        <ScrollView horizontal>
          {images.map((imageUrl, index) => (
            <Image
              key={index}
              source={{ uri: imageUrl }}
              style={{ width: 200, height: 200, marginRight: 10 }}
            />
          ))}
        </ScrollView>
      )}
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

  row: {
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
});

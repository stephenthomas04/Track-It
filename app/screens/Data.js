//This file will be used to get data from fire base, parse it into readable data for our graphs then reutrn it

import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, FlatList } from "react-native";
import Constants from "expo-constants";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase";
import { getAuth } from "firebase/auth";

export default function DataScreen() {
  const auth = getAuth();
  const user = auth.currentUser.email;

  const [receipts, setReceipts] = useState([]);

  const testReceipts = [
    { id: "1", store: " Store", date: "1/9/23", price: "$100" },
    { id: "2", store: "Store", date: "1/9/23", price: "$100" },
    { id: "3", store: " Store", date: "1/9/23", price: "$100" },
    { id: "4", store: " Store", date: "1/9/23", price: "$100" },
    { id: "5", store: " Store", date: "1/9/23", price: "$100" },
    { id: "6", store: " Store", date: "1/9/23", price: "$100" },
    { id: "7", store: " Store", date: "1/9/23", price: "$100" },
    { id: "8", store: " Store", date: "1/9/23", price: "$100" },
    { id: "9", store: " Store", date: "1/9/23", price: "$100" },
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
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
  },
});

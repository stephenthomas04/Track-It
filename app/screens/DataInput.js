import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Image,
  KeyboardAvoidingView,
} from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import db from "../firebase";

import globalStyle from "../config/globalStyle";

const DataInput = () => {
  const [storeName, setStoreName] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");

  const [result, setResult] = useState(null);

  const auth = getAuth();
  const user = auth.currentUser.email;

  const handleInput1Change = (text) => {
    setStoreName(text);
  };

  const handleInput2Change = (text) => {
    setTotalPrice(text);
  };

  const handleInput3Change = (text) => {
    setAddress(text);
  };

  const handleInput4Change = (text) => {
    setDate(text);
  };

  const handleInput5Change = (text) => {
    setImage(text);
  };

  const handlePress = async () => {
    console.log("Document written with ID: ", user);
    try {
      const docRef = await addDoc(collection(db, user), {
        store: storeName,
        price: totalPrice,
        address: address,
        date: date,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    console.log(setStoreName, setTotalPrice, setAddress, setDate);
  };

  return (
    <KeyboardAvoidingView style={globalStyle.container} behavior="padding">
      <TextInput
        style={styles.input}
        onChangeText={handleInput1Change}
        value={setStoreName}
        placeholder="Store"
      />
      <TextInput
        style={styles.input}
        onChangeText={handleInput2Change}
        value={setTotalPrice}
        placeholder="Price"
      />
      <TextInput
        style={styles.input}
        onChangeText={handleInput3Change}
        value={setAddress}
        placeholder="Address"
      />
      <TextInput
        style={styles.input}
        onChangeText={handleInput4Change}
        value={setDate}
        placeholder="Date"
      />
      <Button title="Submit" onPress={handlePress} />
    </KeyboardAvoidingView>
  );
};

export default DataInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import colors from "../config/colors"
import styles from '../config/styles';

export default function App() {
  return (
    <View style={styles.container}>
    <Text style = {styles.title}>Sign Up Screen</Text>
      <Text>Email:</Text>
      <TouchableOpacity
        onPress={console.log}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}


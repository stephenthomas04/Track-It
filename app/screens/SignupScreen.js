import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import colors from "../config/colors"
import globalStyle from '../config/globalStyle';

export default function App() {
  return (
    <View style={globalStyle.container}>
    <Text style = {globalStyle.title}>Sign Up Screen</Text>
      <Text>Email:</Text>
      <TouchableOpacity
        onPress={console.log}
        style={globalStyle.button}
      >
        <Text style={globalStyle.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}


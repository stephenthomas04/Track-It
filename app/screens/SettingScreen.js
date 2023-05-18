import * as React from "react";
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
} from "react-native";
import Constants from "expo-constants";
import { useTheme } from "../config/ThemeProvider";

export default function SettingScreen() {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <Text style={{ color: colors.blackTextColor }}>Settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

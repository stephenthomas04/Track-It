import { useNavigation } from "@react-navigation/core";
import React, {useState} from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../firebase";
import colors from "../config/colors";

const SettingScreen = () => {
    const navigation = useNavigation();
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  //This is just a basic skeleton this is just so that I remember about swithces, and more
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Text style={styles.title}>Settings</Text>
          <View style={styles.container2}>
            <Switch style= {styles.switchStyle}
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            />
         </View>

        </View>
      </View>
    );
    
  };
  
  export default SettingScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    container2: {
      flex: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      padding: 30,
      flex: 10, 
      color: colors.darkGreenTextColor,
      fontWeight: "700",
      fontSize: 22,
      
    },
    switchStyle :{ 
      flex:0.1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      backgroundColor: colors.secondaryGreen,
      width: "60%",
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
      marginTop: 40,
    },
    buttonText: {
      color: colors.greyTextColor,
      fontWeight: "700",
      fontSize: 16,
    },
  });
  
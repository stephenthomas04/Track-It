import { useNavigation } from "@react-navigation/core";
import React, {useState} from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../firebase";
import colors from "../config/colors";
import globalStyle from "../config/globalStyle";

const SettingScreen = () => {
    const navigation = useNavigation();
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  //This is just a basic skeleton this is just so that I remember about swithces, and more
    return (
      <View style={globalStyle.container}>
        <View style={globalStyle.container}>
          <Text style={globalStyle.title}>Settings</Text>
          <View style={globalStyle.container2}>
            <Switch style= {globalStyle.switchStyle}
            trackColor={{false: colors.primarySwitchOff, true: colors.primaryGreen}}
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
  
 
  
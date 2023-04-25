import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Button, ScrollView } from "react-native";
import { getAuth } from "firebase/auth";
import { auth, firebase } from "../firebase";
import globalStyle from "../config/globalStyle";

import { Card } from "react-native-paper";

import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import { CardAnimationContext } from "react-navigation-stack";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { Value } from "react-native-reanimated";
import colors from "../config/colors";



function HomeScreen(){
  
  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };
  const testReceipts = [
    { id: "1", store: " Store", date: "1/9/23 ", price: 23, },
    { id: "2", store: "Store", date: "3/9/23 ", price: 234, },
    { id: "3", store: " Store", date: "2/9/23 ", price: 324, },
    { id: "4", store: " Store", date: "5/9/23 ", price: 23, },
    { id: "5", store: " Store", date: "4/9/23 ", price: 100, },
    { id: "6", store: " Store", date: "7/10/23 ", price: 100, },
    { id: "7", store: " Store", date: "6/9/23 ", price: 620, },
    { id: "8", store: " Store", date: "9/9/23 ", price: 100, },
    { id: "9", store: " Store", date: "8/9/23 ", price: 150, },
  ];

  return (
    <ScrollView style={[globalStyle.defaultScreen,
    {
      
    },
      ]}>
      <Text style={globalStyle.title}>Welcome Back</Text>

      <Card style={[globalStyle.container,
      {
        flex:0,
        padding: "5%", 
        marginBottom: "20%", 
        borderRadius: "50%"
        
      },
      
      ]} >
          <Card.Content>
          <BarChart
        data={{
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100
              ]
            }
          ]
        }}
        width={350} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix=""
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "white",
          backgroundGradientFrom: "white",
          backgroundGradientTo: "white",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(131, 180, 148, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, 
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: colors.darkGreenTextColor,
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          marginBottom: 10,
          borderRadius: 22,
        }}
      />
              
          </Card.Content>
        
      </Card>

      <Card style={[globalStyle.container,
        {
          flex:0,
          padding: "5%", 
          marginBottom: "20%", 
          borderRadius: "20%"
          
        },
        
        ]}>
        <Card.Content>
          <Text style={globalStyle.title}>Headliners</Text>
            <Text style={globalStyle.subHeading}>News</Text>
            
        </Card.Content>
      </Card>



      <TouchableOpacity onPress={handleSignOut} style={globalStyle.button}>
        <Text style={globalStyle.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
export default HomeScreen;

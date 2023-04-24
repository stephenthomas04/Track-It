import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";

import globalStyle from "../config/globalStyle";
import colors from "../config/colors";

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import { Value } from "react-native-reanimated";

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


  const sortedData = testReceipts.sort((a, b) => {
    const dateA = new Date(a.date.split('/').reverse().join('-')).getTime();
      console.log(dateA);
    const dateB = new Date(b.date.split('/').reverse().join('-')).getTime();
    
     const date = dateA - dateB;
    
     if(date == 0){
      a.price = a.price + b.price;

     }

  });












const pieChartData = [
  {
    
    name: "Grocery",
    spent: 234,
    color: "rgba(131, 167, 234, 1)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Clothing",
    spent: 530,
    color: "#F00",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Entertainment",
    spent: 35,
    color: "red",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "Utilities",
    spent: 200,
    color: "#ffffff",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
];

const GraphScreen = () => {
  return (
    <ScrollView style={globalStyle.graphScreen}>
      <Text style={globalStyle.subHeading}>
        Your Finance Outlook
      </Text>
      <StatusBar style="auto" />

      <BarChart
        data={{
          labels: sortedData.map(receipt => receipt.date),
          datasets: [
            {
              data: testReceipts.map(receipt => receipt.price),
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix=""
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: colors.whiteBackgroundColor,
          backgroundGradientFrom: colors.whiteBackgroundColor,
          backgroundGradientTo: colors.whiteBackgroundColor,
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

      <LineChart
        data={{
          labels: ["January", "February", "March", "April", "May", "June"],
          datasets: [
            {
            
              data: testReceipts.map(receipt => receipt.price),
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: colors.whiteBackgroundColor,
          backgroundGradientFrom: colors.whiteBackgroundColor,
          backgroundGradientTo: colors.whiteBackgroundColor,
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
          borderRadius: 16,
        }}
      />

      <LineChart
        data={{
          labels: testReceipts.map(receipt => receipt.date),
          datasets: [
            {
              data: [
                Math.random() * 10, //REPLACE THIS WITH ACTUAL USER DATA
                Math.random() * 10,
                Math.random() * 10,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: colors.whiteBackgroundColor,
          backgroundGradientFrom: colors.whiteBackgroundColor,
          backgroundGradientTo: colors.whiteBackgroundColor,
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
          borderRadius: 16,
        }}
      />

      <PieChart
        data={pieChartData}
        width={Dimensions.get("window").width}
        height={300}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        accessor={"spent"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        center={[10, 50]}
        absolute
      />
    </ScrollView>
  );
};

export default GraphScreen;

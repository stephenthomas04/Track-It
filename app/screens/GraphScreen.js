import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View , Dimensions} from "react-native";


import globalStyle from "../config/globalStyle";
import colors from "../config/colors";
import {LineChart,
    BarChart, 
    PieChart, 
    ProgressChart,
    ContributionGraph,
    StackedBarChart} from "react-native-chart-kit";


  const GraphScreen = () => {
    return(
        <View style={globalStyle.container}>
            <Text style={globalStyle.subHeading}>Spending over the last 6 months</Text>
            <StatusBar style="auto"/>
            <LineChart
    data={{
      labels: ["January", "February", "March", "April", "May", "June"],
      datasets: [
        {
          data: [
            Math.random() * 10,   //REPLACE THIS WITH ACTUAL USER DATA
            Math.random() * 10,
            Math.random() * 10,
            Math.random() * 100,
            Math.random() * 100,
            Math.random() * 100
          ]
        }
      ]
    }}
    width={Dimensions.get("window").width} // from react-native
    height={220}
    yAxisLabel="$"
    yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: colors.primaryGreen,
      backgroundGradientFrom: colors.secondaryDarkGreen,
      backgroundGradientTo: colors.secondaryGreen,
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: colors.darkGreenTextColor
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
        </View>
        
    );
}
  
export default GraphScreen;
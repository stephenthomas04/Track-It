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
  {
    category: "Cloths",
    day: "12",
    month: "11",
    year: "23",
    id: "yCTOISkTSfSQJnZoAbSt",
    price: "12.99",
    store: "Kohls",
  },
  {
    category: "Food",
    day: "11",
    month: "13",
    year: "23",
    id: "8LXGx7hr974P3T8o4pY",
    price: "15.99",
    store: "Chipotle",
  },
  {
    category: "Entertainment",
    day: "1",
    month: "04",
    year: "23",
    id: "Q2JMOLBF8S7Ku08Cafc",
    price: "6.99",
    store: "AMC",
  },
  {
    category: "Personal",
    day: "8",
    month: "13",
    year: "23",
    id: "WB8IjKQm3uwmd0OR2as",
    price: "0.99",
    store: "walmart",
  },
  {
    category: "Food",
    day: "1",
    month: "13",
    year: "23",
    id: "YelkygyNsJj3wxB0aMz",
    price: "11.50",
    store: "Chipotle",
  },
  {
    category: "Food",
    day: "10",
    month: "14",
    year: "23",
    id: "jKe0kJWUDCiZt2aZYau",
    price: "9.99",
    store: "Chipotle",
  },
  {
    category: "Travel",
    day: "11",
    month: "15",
    year: "23",
    id: "m4tAdv3UofY0kJhXmI9",
    price: "125.99",
    store: "Delta",
  },
  {
    category: "Entertainment",
    day: "6",
    month: "13",
    year: "23",
    id: "nFNITrmLoEE7domhGN1",
    price: "50.00",
    store: "Arcade",
  },
];

function stringToDouble(str) {
  let num = parseFloat(str);
  if (isNaN(num)) {
    return null;
  }
  return num;
}

function convertPriceToDouble(receipts) {
  const convertedReceipts = receipts.map((receipt) => {
    const price = receipt.price;
    const convertedPrice = stringToDouble(price);

    const day = receipt.day;
    const convertedDay = stringToDouble(day);

    const month = receipt.month;
    const convertedMonth = stringToDouble(month);

    const year = receipt.year;
    const convertedYear = stringToDouble(year);

    return {
      day: convertedDay,
      month: convertedMonth,
      year: convertedYear,
      price: convertedPrice,
    };
  });
  return convertedReceipts;
}


function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if ((arr[j].day) < (arr[minIndex].day)) {
        minIndex = j;
      }
    }

    const temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
  console.log("Reciepts Array in Selection sort: \n" + arr[0].day + "\n"+arr[1].day +"\n"+ arr[2].day  +"\n"+ arr[3].day + "\n"+arr[4].day +"\n"+ arr[5].day  + "\n"+arr[6].day+ "\n"+arr[7].day );
  return arr;
  
}

function combineData(arr){
  let n = arr.length;
  let run = true;
 // while(run){
    for (let i = 0; i < n-1; i++) {
      console.log("i "+ i);
      for (let j = i + 1; j < n; j++) {
        console.log("j "+ j);
        if ((arr[i].day) == (arr[j].day))  {
          console.log(" arr[i] = arr[j] " + (arr[i].day) == (arr[j].day));
          console.log("arr[i] + arr[j] = price " + ((arr[i].price) + (arr[j].price)));
          arr[i].price = ((arr[i].price) + (arr[j].price));
          arr.splice(j,1);
          n = n-1;
        } 
    }
    }
    //if(filterData(arr)){

    //}
    
  //}
    return arr;

}

/*function filterData(arr){
  


  if(){
    return true;
  }else{
    return false;
  }
}*/





const convertedReceipts = convertPriceToDouble(testReceipts);



const selectionSortArr = selectionSort(convertedReceipts);
console.log(selectionSortArr);

const sortedArr = combineData(selectionSortArr);
console.log(sortedArr);


//console.log("filter data log: " + filterData(convertedReceipts));
//Comment this out for run

/*
for (let i = 0; i < convertedReceipts.length; i++) {
  if (convertedReceipts[i].day != null) {
    console.log("Index " + i + " date  is : " + convertedReceipts[i].day);
  }
}
*/
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
      <Text style={globalStyle.subHeading}>Your Finance Outlook</Text>
      <StatusBar style="auto" />

      <BarChart
        data={{
          labels: testReceipts.map((receipt) => receipt.date),
          datasets: [
            {
              data: testReceipts.map((receipt) => receipt.price),
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
              data: testReceipts.map((receipt) => receipt.price),
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
          labels: testReceipts.map((receipt) => receipt.date),
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

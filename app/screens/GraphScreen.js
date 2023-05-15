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
    day: "2",
    month: "11",
    year: "23",
    date: "11/2/23",
    id: "yCTOISkTSfSQJnZoAbSt",
    price: "12.99",
    store: "Kohls",
  },
  {
    category: "Cloths",
    day: "2",
    month: "11",
    year: "23",
    date: "11/2/23",
    id: "yCTOISkTSfSQJnZoAbSt",
    price: "12.99",
    store: "Kohls",
  },
  {
    category: "Food",
    day: "8",
    month: "12",
    year: "23",
    date: "12/8/23",
    id: "8LXGx7hr974P3T8o4pY",
    price: "15.99",
    store: "Chipotle",
  },
  {
    category: "Entertainment",
    day: "11",
    month: "04",
    year: "23",
    date: "04/11/23",
    id: "Q2JMOLBF8S7Ku08Cafc",
    price: "6.99",
    store: "AMC",
  },
  {
    category: "Personal",
    day: "11",
    month: "12",
    year: "23",
    date: "12/11/23",
    id: "WB8IjKQm3uwmd0OR2as",
    price: "0.99",
    store: "walmart",
  },
  {
    category: "Food",
    day: "9",
    month: "11",
    year: "23",
    date: "11/9/23",
    id: "YelkygyNsJj3wxB0aMz",
    price: "11.50",
    store: "Chipotle",
  },
  {
    category: "Food",
    day: "11",
    month: "1",
    year: "23",
    date: "1/11/23",
    id: "jKe0kJWUDCiZt2aZYau",
    price: "9.99",
    store: "Chipotle",
  },
  {
    category: "Travel",
    day: "3",
    month: "10",
    year: "23",
    date: "10/3/23",
    id: "m4tAdv3UofY0kJhXmI9",
    price: "125.99",
    store: "Delta",
  },
  {
    category: "Entertainment",
    day: "9",
    month: "9",
    year: "23",
    date: "9/9/23",
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

    const date = receipt.date;

    return {
      day: convertedDay,
      month: convertedMonth,
      year: convertedYear,
      price: convertedPrice,
      date: date,
    };
  });
  return convertedReceipts;
}

function sortPastMonth(arr){
  const date = new Date().getMonth() + 1;
  const filteredReceipts = arr.filter(receipt => receipt.month === date);
  return filteredReceipts;
}

  const selectionSortDate = (receipts) => {
    const n = receipts.length;
    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < n; j++) {
        const date1 = new Date(receipts[minIndex].year, receipts[minIndex].month - 1, receipts[minIndex].day);
        const date2 = new Date(receipts[j].year, receipts[j].month - 1, receipts[j].day);
        if (date2 < date1) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        const temp = receipts[i];
        receipts[i] = receipts[minIndex];
        receipts[minIndex] = temp;
      }
    }
    return receipts;
  };


function combineData(arr) {
  let n = arr.length;
  let i = 0;
  while (i < n - 1) {
    let j = i + 1;
    while (j < n) {
      if (arr[i].day === arr[j].day && arr[i].month === arr[j].month && arr[i].year === arr[j].year) {
        arr[i].price += arr[j].price;
        arr.splice(j, 1);
        n = arr.length;
      } else {
        j++;
      }
    }
    i++;
  }
  return arr;
}

const convertedReceipts = convertPriceToDouble(testReceipts);//First Pass In

const selectionSortArr = selectionSortDate(convertedReceipts);
console.log(selectionSortArr);

const sortedArr = combineData(selectionSortArr);
console.log(sortedArr);

const monthArr = sortPastMonth(sortedArr);
console.log(monthArr);




const GraphScreen = () => {
  return (
    <ScrollView style={globalStyle.graphScreen}>
      <Text style={globalStyle.subHeading}>Your Finance Outlook</Text>
      <StatusBar style="auto" />

      <BarChart
        data={{
          labels: monthArr.map((receipt) => receipt.date),
          datasets: [
            {
              data: monthArr.map((receipt) => receipt.price),
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
          decimalPlaces: 0, // optional, defaults to 2dp
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
        style={{
          marginVertical: 8,
          marginBottom: 10,
          borderRadius: 22,
        }}
      />

      <LineChart
        data={{
          labels: sortedArr.map((receipt) => receipt.date),
          datasets: [
            {
              data: sortedArr.map((receipt) => receipt.price),
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
    </ScrollView>
  );
};

export default GraphScreen;

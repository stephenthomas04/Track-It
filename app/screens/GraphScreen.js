import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions, ScrollView } from "react-native";
import React, { useState, useEffect, useRef } from "react";
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
import { getAuth } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase";

const testReceipts = [
  {
    category: "Cloths",
    date: "1/29/2023",
    day: "9",
    id: "eqUWzFQNilLxftPAM1oV",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/track-it-31a75.appspot.com/o/users%2Fvibby%40gmail.com%2F8C3C3422-C3FA-4D2A-92EE-8964ECA49748.jpg?alt=media&token=4c39d1ed-ba13-4d28-bbbf-18490d3622bb",
    month: "1",
    price: "26.88",
    store: "Nike",
    year: "23",
  },
  {
    category: "Food",
    date: "03/03/2023",
    day: "3",
    id: "n47C4dbLMOrf0un12dDs",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/track-it-31a75.appspot.com/o/users%2Fvibby%40gmail.com%2FA41EE687-20CD-4838-9DAE-1C3CC9972F79.jpg?alt=media&token=15b65af1-1553-44aa-93cd-6545f6a3d351",
    month: "3",
    price: "9.82",
    store: "Chipotle ",
    year: "23",
  },
  {
    category: "Groceries ",
    date: "03/04/23",
    day: "4",
    id: "smCkppCAiXJClN87xGDP",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/track-it-31a75.appspot.com/o/users%2Fvibby%40gmail.com%2F73666491-0322-4339-8C26-537C1DD5267F.jpg?alt=media&token=78b54f53-95d9-480a-9f09-157e46bee94e",
    month: "3",
    price: "8.75",
    store: "Mariano’s ",
    year: "23",
  },
];

let receiptArr = [];

function monthCalculator() {
  let date = new Date().getMonth() + 1;

  if (date == 1) {
    return "January";
  } else if (date == 2) {
    return "February";
  } else if (date == 3) {
    return "March";
  } else if (date == 4) {
    return "April";
  } else if (date == 5) {
    return "May";
  } else if (date == 6) {
    return "June";
  } else if (date == 7) {
    return "July";
  } else if (date == 8) {
    return "August";
  }
  if (date == 9) {
    return "September";
  } else if (date == 10) {
    return "October";
  } else if (date == 11) {
    return "November";
  } else if (date == 12) {
    return "December";
  } else {
    return date.toString;
  }
}

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

function sortPastMonth(arr) {
  //const date = new Date().getMonth() + 1;
  const date = 11;
  let isMonth = false;

  let x = 0; //x needs to be a minimum of three receitps. This makes sure that at there is three reciepts in order to display the montly data

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].month == date) {
      x += 1;
    }
  }
  console.log("x" + x);
  if (x >= 3) {
    isMonth = true;
  }

  const filteredReceipts = arr.filter((receipt) => receipt.month == date);

  if (isMonth) {
    return filteredReceipts;
  } else {
    return null;
  }
}

const selectionSortDate = (receipts) => {
  const n = receipts.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      const date1 = new Date(
        receipts[minIndex].year,
        receipts[minIndex].month - 1,
        receipts[minIndex].day
      );
      const date2 = new Date(
        receipts[j].year,
        receipts[j].month - 1,
        receipts[j].day
      );
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
      if (
        arr[i].day === arr[j].day &&
        arr[i].month === arr[j].month &&
        arr[i].year === arr[j].year
      ) {
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
function checkNull(arr) {
  if (arr == null) {
    return false;
  } else {
    return true;
  }
}

function annualSpending(arr) {
  const fullYear = new Date().getFullYear();
  const year = fullYear.toString().slice(-2);

  let isYear = false;

  let x = 0; //x needs to be a minimum of three receitps. This makes sure that at there is three reciepts in order to display the montly data

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].year == year) {
      x += 1;
    }
  }
  console.log("x in year " + x);
  if (x >= 2) {
    isYear = true;
  }

  const filteredReceipts = arr.filter((receipt) => receipt.year == year);

  console.log("isYear " + isYear);
  console.log("filtered reciepts" + filteredReceipts);

  if (isYear) {
    return filteredReceipts;
  } else {
    return null;
  }
}

const convertedReceipts = convertPriceToDouble(receiptArr); //First Pass In

const selectionSortArr = selectionSortDate(convertedReceipts);
console.log(selectionSortArr);

const sortedArr = combineData(selectionSortArr);
console.log(sortedArr);

const monthArr = sortPastMonth(sortedArr);
console.log(monthArr);

const annualArr = annualSpending(sortedArr);
console.log("Annual Arr " + annualArr);

const monthCheckLogic = checkNull(monthArr);
const yearCheckLogic = checkNull(annualArr);

const fullYear = new Date().getFullYear();

const GraphScreen = () => {
  const [receipts, setReceipts] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;
  const email = auth.currentUser.email;
  useEffect(() => {
    (async () => {
      const items = [];
      if (receipts.length <= 1) {
        const querySnapshot = await getDocs(collection(db, email));
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          if (doc.id != "user_information") {
            const data = doc.data();
            const id = doc.id;
            items.push({ id, ...data });
          }
        });
      }
      setReceipts(items);
      receiptArr = items;
      console.log(receiptArr);
    })();
  }, []);

  if (monthCheckLogic && yearCheckLogic) {
    return (
      <ScrollView style={globalStyle.graphScreen}>
        <Text style={globalStyle.title}>Your Finance Outlook</Text>
        <Text style={globalStyle.subHeading}>
          {" "}
          Your outlook for the month of {monthCalculator()}
        </Text>
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
        <Text style={globalStyle.subHeading}>
          The Year of {fullYear} so far
        </Text>
        <LineChart
          data={{
            labels: annualArr.map((receipt) => receipt.date),
            datasets: [
              {
                data: annualArr.map((receipt) => receipt.price),
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
      </ScrollView>
    );
  } else if (yearCheckLogic) {
    return (
      <ScrollView style={globalStyle.graphScreen}>
        <Text style={globalStyle.subHeading}>Your Finance Outlook</Text>
        <Text style={globalStyle.subHeading}>
          {" "}
          Your outlook for the year of {fullYear}
        </Text>
        <StatusBar style="auto" />

        <LineChart
          data={{
            labels: annualArr.map((receipt) => receipt.date),
            datasets: [
              {
                data: annualArr.map((receipt) => receipt.price),
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
      </ScrollView>
    );
  } else if (monthCheckLogic) {
    <ScrollView style={globalStyle.graphScreen}>
      <Text style={globalStyle.subHeading}>Your Finance Outlook</Text>
      <Text style={globalStyle.subHeading}>
        {" "}
        Your outlook for the month of + {monthCalculator}
      </Text>
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
    </ScrollView>;
  } else {
    <ScrollView style={globalStyle.graphScreen}>
      <Text style={globalStyle.subHeading}>
        Your Finance Outlook {monthCalculator()}
      </Text>
      <Text style={globalStyle.subHeading}> Total Data</Text>
      <StatusBar style="auto" />

      <BarChart
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
    </ScrollView>;
  }
};

export default GraphScreen;

import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  ScrollView,
  Animated,
} from "react-native";
import { getAuth } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase";
import globalStyle from "../config/globalStyle";
import { useNavigation } from "@react-navigation/native";
import colors from "../config/colors";

import { FontAwesome } from "@expo/vector-icons";
function HomeScreen() {
  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;
  const email = auth.currentUser.email;

  const [receipts, setReceipts] = useState([]);
  const [totalSpent, setTotalSpent] = useState();
  const [budget, setBuget] = useState(1000);

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
      month: "11",
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
      month: "11",
      year: "23",
      date: "9/9/23",
      id: "nFNITrmLoEE7domhGN1",
      price: "50.00",
      store: "Arcade",
    },
    {
      category: "Entertainment",
      day: "9",
      month: "11",
      year: "23",
      date: "9/11/23",
      id: "nFNITrmLoEE7domhGN1",
      price: "50.00",
      store: "Arcade",
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
      store: "Walmart",
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
      month: "11",
      year: "23",
      date: "1/11/23",
      id: "jKe0kJWUDCiZt2aZYau",
      price: "9.99",
      store: "Chipotle",
    },
    {
      category: "Travel",
      day: "3",
      month: "11",
      year: "23",
      date: "11/3/23",
      id: "m4tAdv3UofY0kJhXmI9",
      price: "125.99",
      store: "Delta",
    },
    {
      category: "Entertainment",
      day: "9",
      month: "11",
      year: "23",
      date: "9/9/23",
      id: "nFNITrmLoEE7domhGN1",
      price: "50.00",
      store: "Arcade",
    },
    {
      category: "Entertainment",
      day: "9",
      month: "11",
      year: "23",
      date: "11/9/23",
      id: "nFNITrmLoEE7domhGN1",
      price: "50.00",
      store: "Arcade",
    },
  ];

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  const getTotalPrice = async (receipts) => {
    let totalPrice = 0;
    receipts.forEach((receipts) => {
      console.log(receipts.price);
      totalPrice += parseFloat(receipts.price);
    });

    setTotalSpent(totalPrice);
  };

  useEffect(() => {
    (async () => {
      const items = [];
      if (receipts.length <= 1) {
        const querySnapshot = await getDocs(collection(db, email));
        querySnapshot.forEach((doc) => {
          if (doc.id != "user_information") {
            const data = doc.data();
            const id = doc.id;
            console.log(doc.id, " => ", doc.data());
            items.push({ id, ...data });
          } else if (doc.id == "user_information") {
            const data = doc.data();
            setBuget(data.budget);
          }
        });
      }
      setReceipts(items);
    })();

    getTotalPrice(receipts);
  }, []);

  const ProgressBar = ({ spent, budget }) => {
    const percentSpent = Math.floor((spent / budget) * 100);
    const progressBarWidth = percentSpent + "%";

    const progress = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.timing(progress, {
        toValue: percentSpent,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }, [percentSpent, progress]);

    return (
      <View>
        <View style={styles.container}>
          <Text
            style={{
              fontSize: 20,
              marginBottom: -35,
              marginRight: 210,
              color: colors.blackTextColor,
              fontWeight: "700",
            }}
          >
            Total Budget:
          </Text>
          <View style={styles.progressText}>
            <Text style={{ fontSize: 20 }}>${budget}</Text>
          </View>
          <View style={styles.progressBar}>
            <Animated.View
              style={[
                styles.progress,
                {
                  width: progress.interpolate({
                    inputRange: [0, 100],
                    outputRange: ["0%", "100%"],
                  }),
                },
              ]}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.main}>
      <Text style={styles.header}>Total Spendings</Text>
      <Text style={styles.total}>${totalSpent}</Text>
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <FontAwesome
            name="bars"
            size={25}
            color="black"
            style={{ marginTop: -230, marginLeft: 1 }}
          />
        </TouchableOpacity>
        <View>
          <ProgressBar spent={500} budget={budget} />
        </View>
      </View>
    </View>
  );
}
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
/*
 **** START OF GRAPH CODE ****
 */

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

export default HomeScreen;

const styles = StyleSheet.create({
  main: {
    flex: 3,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: colors.primaryDarkGreen,
  },

  total: {
    color: colors.whiteBackgroundColor,
    marginBottom: "20%",
    fontSize: 70,
  },

  header: {
    color: colors.whiteBackgroundColor,
    marginTop: "20%",
    fontSize: 20,
  },
  footer: {
    flex: 1,
    backgroundColor: colors.whiteBackgroundColor,
    borderTopLeftRadius: 30,
    width: "100%",
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  progressBar: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#D5ECD4",
    overflow: "hidden",
  },
  progress: {
    height: "100%",
    backgroundColor: "#0E733D",
  },
  progressText: {
    marginVertical: 10,
    marginLeft: "80%",
    fontSize: 60,
  },

  signoutButton: {
    alignSelf: "center",
    backgroundColor: colors.primaryButtonGreen,
    width: "60%",
    padding: 15,
    borderRadius: 15,
    borderColor: colors.primaryDarkGreen,
    borderWidth: 1,
    alignItems: "center",
  },
});

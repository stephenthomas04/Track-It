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

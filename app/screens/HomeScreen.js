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
import { Slider, Overlay } from "react-native-elements";
import db from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { PieChart } from "react-native-chart-kit";

import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "../config/ThemeProvider";
import { async } from "@firebase/util";
function HomeScreen() {
  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;
  const email = auth.currentUser.email;
  const { colors, globalStyle } = useTheme();
  const [receipts, setReceipts] = useState([]);

  const [totalSpent, setTotalSpent] = useState(null);

  const [budget, setBuget] = useState(1000);
  const [name, setName] = useState(1000);

  const styles = StyleSheet.create({
    main: {
      flex: 3,
      justifyContent: "flex-end",
      alignItems: "center",
      backgroundColor: colors.primaryDarkGreen,
    },

    total: {
      color: colors.spendingButton,
      marginBottom: "20%",
      fontSize: 70,
    },

    header: {
      color: colors.spendingButton,
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

  const [showOverlay, setShowOverlay] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "TUTORIAL 1",
      content:
        "In the Receipt Scanner screen you can take a picture, upload or manually enter the information of your receipt.",
    },
    {
      title: "TUTORIAL 2",
      content:
        "In the Graphs screen you can view the distribution of your money gained from the receipt scanner.",
    },
    {
      title: "TUTORIAL 3",
      content:
        "In the Home Screen you can view your total budget and see how close you are to reaching that as well as tips for becoming better at financing and view the news regarding it.",
    },
    {
      title: "TUTORIAL 4",
      content:
        "In the Data Screen you can view your scanned reciepts and click on them to view the image of the reciept. Also you can enable dark mode to your choice.",
    },
  ];

  const handleNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleOpenOverlay = () => {
    setShowOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
    setCurrentSlide(0);
  };

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  const storeArr = async () => {};

  const getTotalPrice = async (receipts) => {
    let totalPrice = 0;
    receipts.forEach((receipts) => {
      console.log(receipts.price);
      totalPrice += parseFloat(receipts.price);
    });

    setTotalSpent(totalPrice);
  };

  const [pieArr, setpieArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getRandomGreenColor = () => {
      const shades = ["#87D068", "#52C41A", "#389E0D", "#237804", "#135200"];
      const randomIndex = Math.floor(Math.random() * shades.length);
      return shades[randomIndex];
    };

    const combinePricesByCategory = (list) => {
      const combinedPrices = {};

      list.forEach((item) => {
        const { category, price } = item;

        if (combinedPrices[category]) {
          combinedPrices[category] += price;
        } else {
          combinedPrices[category] = price;
        }
      });

      const result = Object.keys(combinedPrices).map((category) => ({
        name: category,
        value: combinedPrices[category],
        color: colors.primaryDarkGreen,
      }));

      return result;
    };

    const items = [];

    const getData = async () => {
      if (receipts.length <= 1) {
        const querySnapshot = await getDocs(collection(db, email));
        querySnapshot.forEach((doc) => {
          if (doc.id != "user_information") {
            const data = doc.data();
            const id = doc.id;
            console.log("cheese", items.price);
            items.push({ id, ...data });
          } else if (doc.id == "user_information") {
            const data = doc.data();
            setBuget(data.budget);
            setName(data.name);
          }
        });
      }
      let totalPrice = 0;
      items.forEach((items) => {
        console.log(items.price);
        totalPrice += parseFloat(items.price);
      });
      console.log("Total Spent:", totalPrice);
      setTotalSpent(totalPrice);
      console.log(combinePricesByCategory(items));

      setTimeout(() => {
        setpieArr(combinePricesByCategory(items));
        setIsLoading(false);
      }, 2000);
    };

    getData();
    console.log("Piechart", pieArr);
  }, []);

  console.log("Piechart", pieArr);
  const MyPieChart = ({ data }) => {
    return (
      <View>
        <PieChart
          data={data}
          width={200}
          height={200}
          color={colors.primaryDarkGreen}
        />
      </View>
    );
  };

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
            <Text style={{ color: colors.blackTextColor, fontSize: 20 }}>
              ${budget}
            </Text>
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
            color={colors.blackTextColor}
            style={{ marginTop: -230, marginLeft: 1 }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleOpenOverlay()}>
          <FontAwesome
            name="question-circle"
            size={25}
            color={colors.blackTextColor}
            style={{ marginTop: -230, marginLeft: "93%" }}
          />
        </TouchableOpacity>
        <Text>Welcome back {name}!</Text>
        <View>
          <ProgressBar spent={totalSpent} budget={budget} />
          {!isLoading && <MyPieChart data={pieArr} />}
        </View>
      </View>
      <Overlay
        isVisible={showOverlay}
        onBackdropPress={handleCloseOverlay}
        style={styles.overlay}
      >
        <View
          style={{
            width: 300,
            borderRadius: 20,
            backgroundColor: colors.whiteBackgroundColor,
          }}
        >
          <Text
            style={{
              backgroundColor: colors.whiteBackgroundColor,
              color: colors.blackTextColor,
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            {slides[currentSlide].title}
          </Text>
          <Text
            style={{
              backgroundColor: colors.whiteBackgroundColor,
              color: colors.blackTextColor,
              marginTop: 10,
              fontSize: 14,
            }}
          >
            {slides[currentSlide].content}
          </Text>
          <Button
            title="Next Tutorial"
            onPress={handleNextSlide}
            disabled={currentSlide === slides.length - 1}
          />
        </View>
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    width: 150,
    height: 500,
  },
});

export default HomeScreen;

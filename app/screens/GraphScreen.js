import React, { useState, useEffect, useRef } from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  ScrollView,
  Animated,
  Dimensions,
} from "react-native";
import { getAuth } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import db from "../firebase";
import { useNavigation } from "@react-navigation/native";




import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";



import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "../config/ThemeProvider";
function GraphScreen() {
  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;
  const email = auth.currentUser.email;
  const { colors, globalStyle } = useTheme();
  const [receipts, setReceipts] = useState([]);
  const [totalSpent, setTotalSpent] = useState();
  const [budget, setBuget] = useState(1000);
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
    title:{
      marginVertical: 10,
      marginTop: "20%",
      marginLeft: "2.5%",
      fontSize: 40,
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
  
  function monthCalculator() {
    let date = new Date().getMonth() + 1;
  
    if ((date == 1)) {
      return "January";
    }
    if ((date == 2)) {
      return "February";
    }
    if ((date == 3)) {
      return "March";
    }
    if ((date == 4)) {
      return "April";
    }
    if ((date == 5)) {
      return "May";
    }
    if ((date == 6)) {
      return "June";
    }
    if ((date == 7)) {
      return "July";
    }
    if ((date == 8)) {
      return "August";
    }
    if ((date == 9)) {
      return "September";
    }
    if ((date == 10)) {
      return "October";
    }
    if ((date == 11)) {
      return "November";
    }
    if ((date == 12)) {
      return "December";
    }
  }
  


  const regularArr = [];
  function convertIntoRegularArr(arr){
    arr = [...receipts]; 

    return arr; 

    
  }

  console.log("x + \n" + convertIntoRegularArr(regularArr));

  const fullYear = new Date().getFullYear();
  const year = fullYear.toString().slice(-2); //Turns 2023 into 23
  
  useEffect(() => { //This code is for the firebase call for the array 
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


    
  }, []);

  function stringToDouble(str) { //Turns the strings of the array into the numbers to proceed with the math
    let num = parseFloat(str);
    if (isNaN(num)) {
      return null;
    }
    return num;
  }
  
  function convertPriceToDouble(receipts) { //Uses the string to double function but in one function in order to simplify code 
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
    
    const date = 3;
    const isMonth = true;
    let x = 0; //x needs to be a minimum of three receitps. This makes sure that at there is three reciepts in order to display the montly data
  
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].month == date) {
        x += 1;
      }
    }
    console.log("x" + x);
    //
   
//}
  
    const filteredReceipts = arr.filter((receipt) => receipt.month === date);
  
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
  
function annualSpending(arr) {
  const fullYear = new Date().getFullYear();
  const year = fullYear.toString().slice(-2);

  const filteredReceipts = arr.filter((receipt) => receipt.year == year);
 
  console.log("filtered reciepts" + filteredReceipts);
 
    return filteredReceipts;
  
}
  
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

  function checkMonth(arr){
    let date = 3;
    let total = 0; // total keeps track of the number of reciepts 

    for(let i = 0; i < arr.length; i++){
      if(arr[i].month == date){
        total += 1;
        console.log("Total in graph total should be greater than one rn " +total)
      }
    }

    if(total >= 2){
      return true;
    }
    else{
      return false;
    }

  }

  function checkYear(arr){
    const fullYear = new Date().getFullYear();
    const year = fullYear.toString().slice(-2);
    let total = 0;

    
    for(let i = 0; i < arr.length; i++){
      if(arr[i].year == year){
        total += 1;
        console.log("Total in graph total should be greater than one rn FOR YEAR " +total)
      }
    }

    if(total >= 2){
      return true;
    }
    else{
      return false;
    }
  }
function checkData(arr){
  let check = true;
  if(arr.length >= 1){
    return check;
  }else{
    return !check;
  }
  
}

  const firstArr = convertIntoRegularArr(regularArr); //Turning the firebase call into regular arr
  console.log("X + ", firstArr);

  const stringToNum = convertPriceToDouble(firstArr);
  console.log("String to Num " + stringToNum);

  const selectionSortArr = selectionSortDate(stringToNum);
  console.log(selectionSortArr);

  const sortedArr = combineData(selectionSortArr);
  console.log(sortedArr);

  const monthArr = sortPastMonth(sortedArr);
  

  const annualArr = annualSpending(sortedArr);

  const isMonth = checkMonth(monthArr);
  console.log("Check Month = " + isMonth);

  const isYear = checkYear(annualArr);
  console.log("Check Year = " , isYear);

  const isData = checkData(sortedArr);


if(isYear && isMonth){
  return(
  <ScrollView style={globalStyle.graphScreen}>
  <Text style={styles.title}>The Finance Outlook</Text>

  <Text style={globalStyle.subHeading}>
    Your outlook for the month of {monthCalculator()}
  </Text>
  

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
    The line chart for {monthCalculator()}
  </Text>
  <LineChart
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
    The Year-To-Date outlook for {fullYear}
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
);}
else if(isMonth){
  return(
    <ScrollView style={globalStyle.graphScreen}>
    <Text style={styles.title}>The Finance Outlook</Text>
  
    <Text style={globalStyle.subHeading}>
      Your outlook for the month of {monthCalculator()}
    </Text>
    
  
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
      The line chart for {monthCalculator()}
    </Text>
    <LineChart
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
      The Year-To-Date outlook for {fullYear}
    </Text>
  </ScrollView>
  );
}else if(isYear){
  return(
    <ScrollView style={globalStyle.graphScreen}>
    <Text style={styles.title}>The Finance Outlook</Text>
  
    <Text style={globalStyle.subHeading}>
      The bar chart for {fullYear}
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
    <Text style={globalStyle.subHeading}>
      The Year-To-Date outlook for {fullYear}
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
}else if(isData){
  return(<ScrollView style={globalStyle.graphScreen}>
    <Text style={styles.title}>Add Data to Get Started!!</Text>
  
    
  </ScrollView>);
}
  

  
}
export default GraphScreen;

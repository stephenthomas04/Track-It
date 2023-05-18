import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Keyboard,
  Alert,
} from "react-native";
import { Camera } from "expo-camera";

import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { AntDesign } from "@expo/vector-icons";
import { collection, addDoc } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { getAuth } from "firebase/auth";
import db from "../firebase";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { async } from "@firebase/util";
import { useTheme } from "../config/ThemeProvider";

function CameraScreen() {
  const { colors, globalStyle } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F5FCFF",
      flexDirection: "column",
    },
    icon: {
      padding: 4,
      borderRadius: 12,

      borderColor: colors.primaryDarkGreen,
      marginLeft: "20%",
      marginBottom: "-10%",
    },

    camera: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
      width: "100%",
    },
    buttonContainer: {
      flex: 0.15,
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      // borderTopEndRadius: 20,
      // borderTopLeftRadius: 20,
      backgroundColor: "#272727",
      width: "100%",

      //marginLeft: "15%",
    },
    cameraButton: {
      width: 80,
      height: 80,
      backgroundColor: "#fff",
      borderRadius: "50%",
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      color: "#000000",
      fontSize: 18,
    },
    preview: {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ffff",
    },
    previewText: {
      fontSize: 30,
      fontWeight: "bold",
      marginBottom: 20,
    },
    previewImage: {
      width: 320,
      height: 600,
      borderRadius: 10,
    },
    retakeButton: {
      width: 100,
      height: 60,
      backgroundColor: "#fff",
      borderRadius: "25%",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
    },

    submitButton: {
      width: 100,
      height: 60,
      backgroundColor: "#14AE5C",
      borderRadius: "25%",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
    },

    buttonRow: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      justifyContent: "space-evenly",
      width: "100%",
      marginTop: 30,
    },
    uploadButton: {
      width: 40,
      height: 40,
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
    },
    backButton: {
      width: 40,
      height: 40,
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
      marginRight: "15%",
    },

    formButton: {
      width: 100,
      height: 60,
      backgroundColor: "#fff",
      borderRadius: "25%",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
    },
    input: {
      height: 40,
      width: "100%",
      borderColor: "gray",
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
    },

    indicatorWrapper: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
    },

    contentContainer: {
      backgroundColor: "#ffffff",
      height: "100%",
    },
    shadow: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.5,
      shadowRadius: 5,
      elevation: 3,
    },
  });
  const [fileText, setFileText] = useState(
    "Nike\n39.99\n$45.99\n1/15/2023\n2045634\nhgdwjeolgrd\n00.99\n$37.72\n$00.00\n&3.99\n$-48.25"
  );

  const defaultImage = require("../assets/defaultReceipt.png");

  const [storeName, setStoreName] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [info, setInfo] = useState("");
  const [imageUrl, setImageURL] = useState("");
  const navigation = useNavigation();

  const API_KEY = "AIzaSyBk0WzBazFzwoZmMA7jPo0ANJsTKSfNXT0";
  const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;
  const filePath = `C:\Users\Aashman Sharma\Documents\GitHub\Track-It\app\assets\testData.txt`;

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [cameraToggle, setCameraToggle] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [photo64, setPhoto64] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const sheetRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);
  const snapPoints = useMemo(() => ["1%", "85%"], []);

  const [testData, setTestData] = useState("");

  const handleInput1Change = (text) => {
    setStoreName(text);
  };

  const handleInput2Change = (text) => {
    setTotalPrice(text);
  };

  const handleInput4Change = (text) => {
    setDate(text);
  };

  const handleInput5Change = (text) => {
    setCategory(text);
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === "granted");
      }
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.takePictureAsync(options);
      setPhoto(data.uri);
      console.log(photo);
      setPhoto64(data.base64);
      setCameraToggle(null);
    }
  };

  const uploadImage = async () => {
    setDate("");

    setStoreName("");
    setTotalPrice("");
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [2, 1],
      base64: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.uri);
      setPhoto64(result.base64);
      setCameraToggle(null);
    }
  };

  const retakePicture = () => {
    setDate("");
    setStoreName("");
    setTotalPrice("");
    setPhoto(null);
    setPhoto64(null);
    setCategory("");
    console.log(date);
    console.log(storeName);
    console.log(totalPrice);
    console.log(photo);
    setCameraToggle(true);
  };

  const clearFields = async () => {
    console.log("------------------Clearing Data-----------------");
    setInfo("");
    setDate("");
    console.log("Date:", date);
    setStoreName("");
    console.log("Store Name:", storeName);
    setTotalPrice("");
    setCategory("");
    console.log("Price", totalPrice);
    setPhoto(null);
    setPhoto64(null);
    console.log("Photo:", photo);
    console.log("Fields have been cleared");
    console.log("------------------------------------------------");
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const validateFields = (fields) => {
    for (const key in fields) {
      if (fields.hasOwnProperty(key) && !fields[key]) {
        return false;
      }
    }
    return true;
  };

  const openSheet = () => {
    sheetRef.current.expand();
  };

  const closeSheet = () => {
    sheetRef.current.collapse();
  };

  const backOut = () => {
    setCameraToggle(null);
  };

  const callGoogleVisionAsync = async (image) => {
    //console.log(photo);
    if (photo != null) {
      setIsLoading(true);
      const body = {
        requests: [
          {
            image: {
              content: image,
            },
            features: [
              {
                type: "TEXT_DETECTION",
                maxResults: 1,
              },
            ],
          },
        ],
      };

      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        const result = await response.json();
        setData(result).then((info) => {
          openSheet();
          findData(info);
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      Alert.alert("Please Upload an image or manually input the data");
    }
  };

  const setData = (result) => {
    return new Promise((resolve, reject) => {
      try {
        const info = result.responses[0].textAnnotations[0].description;
        setInfo(info);
        resolve(info);
      } catch (error) {
        reject(error);
      }
    });
  };

  const isValidDate = (text) => {
    const dateRegex =
      /^(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])\/\d{2}(\d{2})?$/;
    return dateRegex.test(text);
  };

  const handlePress = async () => {
    console.log("Submitted");
    const auth = getAuth();
    const user = auth.currentUser.email;
    const fields = { storeName, totalPrice, category, date };
    const isValid = validateFields(fields) && isValidDate(date);
    var url = "Manual Input";
    var photoUri = photo;

    if (isValid) {
      console.log("------------------Incoming Data-----------------");
      console.log(date);
      console.log(storeName);
      console.log(totalPrice);
      console.log(photo);
      console.log("------------------------------------------------");

      const month = date.substring(0, 2);
      const day = date.substring(3, 5);
      const year = date.substring(6);

      if (photo != null) {
        try {
          setIsLoading(true);
          const metadata = {
            customMetadata: {
              store: storeName,
              price: totalPrice,
              category: category,
              date: date,
            },
          };

          const filename = photo.substring(photo.lastIndexOf("/") + 1);
          const path = `users/${user}/${filename}`;
          const storage = getStorage();
          const imagesRef = ref(storage, path);
          const response = await fetch(photo);
          const blob = await response.blob();

          await uploadBytes(imagesRef, blob, metadata).then((snapshot) => {});
          url = await getDownloadURL(ref(imagesRef));
          console.log("Uploaded a file:", url);
          setImageURL(url.uri);
        } catch (e) {
          console.error("Error adding document: ", e);
        } finally {
          setIsLoading(false);
        }
      }

      try {
        const docRef = await addDoc(collection(db, user), {
          store: storeName,
          price: totalPrice,
          category: category,
          date: date,
          day: day,
          month: month,
          year: year,
          imageUrl: url,
        });

        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      closeSheet();
      Alert.alert("Success", "Receipt submitted successfully");
      try {
        await clearFields();
      } catch (e) {
        console.log("error");
      }
      console.log("--------------------Final Data-------------------");
      console.log(date);
      console.log(storeName);
      console.log(totalPrice);
      console.log(photo);
      console.log("------------------------------------------------");
      setCameraToggle(null);
    } else {
      Alert.alert(
        "Error",
        "Please fill in all required fields in correct format"
      );
    }
  };

  const findData = async (text) => {
    try {
      const newText = text.replace(/\$/g, "");
      const priceFormat = /\d+\.\d+/g;
      const numbers = text.match(priceFormat)?.map(Number) || [];
      const totalPrice = Math.max(...numbers);

      setTotalPrice("" + totalPrice);

      if (totalPrice !== null) {
        console.log("Price: ", totalPrice);
        setTotalPrice("" + totalPrice);
      } else {
        console.log("Price: ", "No Price found");
        setTotalPrice("");
      }
    } catch (e) {
      console.log(e);
      console.log("Price: ", "No Price found");
      setTotalPrice("");
    }

    try {
      const regex =
        /\b((0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])\/(19|20)?\d{2}|(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[012])-(19|20)?\d{2})\b/g;
      const match = text.match(regex);
      if (match != null) {
        console.log("Date: ", match[0]);
        setDate(match[0]);
      } else {
        //console.log("Date: ", "No Date found");
        setDate("");
      }
    } catch (e) {
      //console.log("Date: ", "No Date found");
      setDate("");
    }

    try {
      const index = text.indexOf("\n");
      if (index !== -1) {
        console.log(text.substring(0, index));
        setStoreName(text.substring(0, index));
      } else {
        //console.log("Store: ", "No Store found");
        setStoreName("");
      }
    } catch (e) {
      //console.log("Store: ", "No Store found");
      setStoreName("");
    }
  };

  return (
    <View style={styles.container}>
      {!cameraToggle ? (
        <View style={styles.preview}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <FontAwesome
              name="bars"
              size={25}
              color="black"
              style={{ marginRight: 320, paddingBottom: 12 }}
            />
          </TouchableOpacity>
          <View style={styles.shadow}>
            {photo ? (
              <Image style={styles.previewImage} source={{ uri: photo }} />
            ) : (
              <Image style={styles.previewImage} source={defaultImage} />
            )}
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.retakeButton}
              onPress={() => retakePicture()}
            >
              <AntDesign name="camerao" size={30} color="green" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => callGoogleVisionAsync(photo64)}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.formButton}
              onPress={() => openSheet()}
            >
              <AntDesign name="form" size={30} color="green" />
            </TouchableOpacity>
          </View>
          {isLoading ? (
            <View style={styles.indicatorWrapper}>
              <ActivityIndicator size="large" color="green" />
            </View>
          ) : null}
        </View>
      ) : (
        <Camera style={styles.camera} ref={(ref) => setCameraRef(ref)}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={{
                marginLeft: 50,
                width: 50,
                height: 50,
                borderRadius: 5,
                backgroundColor: "#fff",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 10,
              }}
              onPress={() => uploadImage()}
            >
              <AntDesign name="upload" size={24} color="#14AE5C" />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                marginLeft: 22,
                width: 90,
                height: 90,
                backgroundColor: "#fff",
                borderRadius: "50%",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 10,
              }}
              onPress={() => takePicture()}
            ></TouchableOpacity>

            <TouchableOpacity
              style={{
                marginLeft: 20,
                width: 50,
                height: 50,
                borderRadius: 5,
                backgroundColor: "#fff",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "15%",
                marginBottom: 10,
              }}
              onPress={() => backOut()}
            >
              <AntDesign name="arrowright" size={24} color="#14AE5C" />
            </TouchableOpacity>
          </View>
        </Camera>
      )}
      <BottomSheet
        ref={sheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose={"true"}
      >
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.bottomSheet}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <KeyboardAvoidingView behavior="padding">
                <Text
                  style={{
                    color: colors.darkGreenTextColor,
                    padding: "5%",
                    fontSize: 30,
                    marginLeft: "5%",
                    marginTop: "5%",
                    width: "100%",
                  }}
                >
                  Enter Receipt Manually
                </Text>
                <FontAwesome5
                  name="store"
                  size={18}
                  color="green"
                  style={{
                    padding: 4,
                    borderRadius: 12,
                    marginLeft: "11%",
                    marginTop: "5%",
                    marginBottom: "-30%",
                  }}
                />
                <TextInput
                  style={{
                    flexDirection: "row",
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                    width: "80%",
                    paddingBottom: 3,
                    marginTop: 100,
                    marginBottom: "10%",
                    paddingLeft: 35,
                    marginLeft: "11%",
                  }}
                  onChangeText={handleInput1Change}
                  value={storeName}
                  placeholder="Store"
                  defaultValue={storeName}
                />

                <MaterialIcons
                  name="attach-money"
                  size={24}
                  color="green"
                  style={{
                    padding: 4,
                    borderRadius: 12,
                    marginLeft: "11%",
                    marginBottom: "-18%",
                  }}
                />
                <TextInput
                  style={{
                    flexDirection: "row",
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                    width: "80%",
                    paddingBottom: 3,
                    marginTop: 50,
                    marginBottom: "10%",
                    paddingLeft: 30,
                    marginLeft: "11%",
                  }}
                  onChangeText={handleInput2Change}
                  value={totalPrice}
                  keyboardType="numeric"
                  placeholder="0.00"
                  defaultValue={totalPrice}
                />

                <MaterialIcons
                  name="category"
                  size={20}
                  color="green"
                  style={{
                    padding: 4,
                    borderRadius: 12,
                    marginLeft: "11%",
                    marginBottom: "-18%",
                  }}
                />
                <TextInput
                  style={{
                    flexDirection: "row",
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                    width: "80%",
                    paddingBottom: 3,
                    marginTop: 50,
                    marginBottom: "10%",
                    paddingLeft: 30,
                    marginLeft: "11%",
                  }}
                  onChangeText={handleInput5Change}
                  value={category}
                  placeholder="Category"
                />

                <MaterialIcons
                  name="date-range"
                  size={20}
                  color="green"
                  style={{
                    padding: 4,
                    borderRadius: 12,
                    marginLeft: "11%",
                    marginBottom: "-18%",
                  }}
                />
                <TextInput
                  style={{
                    flexDirection: "row",
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                    width: "80%",
                    paddingBottom: 3,
                    marginTop: 50,
                    marginBottom: "10%",
                    paddingLeft: 30,
                    marginLeft: "11%",
                  }}
                  onChangeText={handleInput4Change}
                  value={date}
                  placeholder="MM/DD/YY"
                  defaultValue={date}
                />

                <TouchableOpacity
                  onPress={handlePress}
                  style={{
                    width: "60%",
                    padding: 15,
                    borderRadius: 15,
                    borderColor: colors.whiteBackgroundColor,
                    backgroundColor: "#14AE5C",
                    marginTop: 5,
                    marginLeft: "20%",
                    borderColor: "white",
                    borderWidth: 2,
                    alignItems: "center",
                  }}
                >
                  <Text style={globalStyle.buttonLoginText}>Submit</Text>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
            <Text>{info}</Text>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
}

export default CameraScreen;

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
import globalStyle from "../config/globalStyle";
import colors from "../config/colors";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { AntDesign } from "@expo/vector-icons";
import { collection, addDoc } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import DropDownPicker from "react-native-dropdown-picker";
import { getAuth } from "firebase/auth";
import db from "../firebase";
import { getStorage, ref, uploadString } from "firebase/storage";
import { decode } from "base-64";

function CameraScreen() {
  const [fileText, setFileText] = useState(
    "Nike\n39.99\n$45.99\n1/15/2023\n2045634\nhgdwjeolgrd\n00.99\n$37.72\n$00.00\n&3.99\n$-48.25"
  );

  const defaultImage = require("../assets/defaultReceipt.png");

  const auth = getAuth();
  const user = auth.currentUser.email;

  const [storeName, setStoreName] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const API_KEY = "AIzaSyBk0WzBazFzwoZmMA7jPo0ANJsTKSfNXT0";
  const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;
  const filePath = `C:\Users\Aashman Sharma\Documents\GitHub\Track-It\app\assets\testData.txt`;

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [cameraToggle, setCameraToggle] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [info, setInfo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const sheetRef = useRef(null);
  const [isOpen, setIsOpen] = useState(true);
  const snapPoints = useMemo(() => ["1%", "85%"], []);

  const [testData, setTestData] = useState("");

  const storage = getStorage();
  const imagesRef = ref(storage, "images");

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
      setPhoto(data.base64);
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
      base64: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPhoto(result.base64);
      setCameraToggle(null);
    }
  };

  const retakePicture = () => {
    setDate("");

    setStoreName("");
    setTotalPrice("");
    setPhoto(null);
    setCameraToggle(true);
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
      console.log(
        "callGoogleVisionAsync -> result",
        result.responses[0].textAnnotations[0].description
      );
      setData(result).then((info) => {
        openSheet();
        console.log(info);
        findData(info);
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
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

  const handlePress = async () => {
    console.log("Submitted");
    if (photo == null) {
      setPhoto("Manually Inputted");
    }

    const fields = { storeName, totalPrice, category, date };
    const isValid = validateFields(fields);

    if (isValid) {
      try {
        /* const docRef = await addDoc(collection(db, user), {
          store: storeName,
          price: totalPrice,
          category: category,
          date: date,
        });*/

        /*const metadata = {
          customMetadata: {
            store: storeName,
            price: totalPrice,
            category: category,
            date: date,
          },
        };

        if (typeof atob === "undefined") {
          global.atob = decode;
        }*/

        if (photo != null) {
          const message2 =
            "5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB";
          uploadString(imagesRef, message2).then((snapshot) => {
            console.log("Uploaded a base64 string!");
          });
        }

        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      closeSheet();
      Alert.alert("Success", "Receipt submitted successfully");
    } else {
      Alert.alert("Error", "Please fill in all required fields");
    }
    setCameraToggle(null);
  };

  const findData = (text) => {
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
        //console.log("Date: ", match[0]);
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
        // console.log(text.substring(0, index));
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
          <View style={styles.shadow}>
            {photo ? (
              <Image
                style={styles.previewImage}
                source={{ uri: `data:image/jpeg;base64,${photo}` }}
              />
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
              onPress={() => callGoogleVisionAsync(photo)}
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
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : null}
        </View>
      ) : (
        <Camera style={styles.camera} ref={(ref) => setCameraRef(ref)}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => uploadImage()}
            >
              <AntDesign name="upload" size={24} color="green" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cameraButton}
              onPress={() => takePicture()}
            ></TouchableOpacity>

            <TouchableOpacity
              style={styles.backButton}
              onPress={() => backOut()}
            >
              <AntDesign name="arrowright" size={24} color="green" />
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
                <TextInput
                  style={{
                    marginTop:10,
                    flexDirection: "row",
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                    paddingBottom: 5,
                    marginBottom: 25,
                    borderRadius: 10,
                    backgroundColor: "red",
                    width: "70%",
                    padding: 15,
                    marginLeft: "15%",
                    borderRadius: 10,
                    alignItems: "center",
                    paddingLeft: 38,
                  }}
                  onChangeText={handleInput1Change}
                  value={setStoreName}
                  placeholder="Store"
                  defaultValue={storeName}
                />
                <TextInput
                  style={{
                    flexDirection: "row",
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                    paddingBottom: 5,
                    marginBottom: 25,
                    borderRadius: 10,
                    backgroundColor: "red",
                    width: "70%",
                    padding: 15,
                    marginLeft: "15%",
                    borderRadius: 10,
                    alignItems: "center",
                    paddingLeft: 38,
                  }}
                  onChangeText={handleInput2Change}
                  value={setTotalPrice}
                  keyboardType="numeric"
                  placeholder="Price"
                  defaultValue={totalPrice}
                />

                <TextInput
                  style={{
                    flexDirection: "row",
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                    paddingBottom: 5,
                    marginBottom: 25,
                    borderRadius: 10,
                    backgroundColor: "red",
                    width: "70%",
                    padding: 15,
                    marginLeft: "15%",
                    borderRadius: 10,
                    alignItems: "center",
                    paddingLeft: 38,
                  }}
                  onChangeText={handleInput5Change}
                  value={setCategory}
                  placeholder="Category"
                />

                <TextInput
                  style={{
                    flexDirection: "row",
                    borderBottomColor: "black",
                    borderBottomWidth: 1,
                    paddingBottom: 5,
                    marginBottom: 25,
                    borderRadius: 10,
                    backgroundColor: "red",
                    width: "70%",
                    padding: 15,
                    marginLeft: "15%",
                    borderRadius: 10,
                    alignItems: "center",
                    paddingLeft: 38,
                  }}
                  onChangeText={handleInput4Change}
                  value={setDate}
                  placeholder="Date"
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    flexDirection: "column",
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
    marginLeft: "15%",
    width: "100%",
    marginBottom: "4%",
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
    color: "#222",
    fontSize: 18,
  },
  preview: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
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
    border: 1,
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
    backgroundColor: colors.secondaryGreen,
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  contentContainer: {
    backgroundColor: "#F5F5F5",
    margin: 10,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 3,
  },
});

export default CameraScreen;

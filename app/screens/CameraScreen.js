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
import { getAuth } from "firebase/auth";
import db from "../firebase";

function CameraScreen() {
  const [fileText, setFileText] = useState(
    "Nike\n39.99\n$45.99\n1/15/2023\n2045634\nhgdwjeolgrd\n00.99\n$37.72\n$00.00\n&3.99\n$-48.25"
  );

  const auth = getAuth();
  const user = auth.currentUser.email;

  const [storeName, setStoreName] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");

  const API_KEY = "AIzaSyBk0WzBazFzwoZmMA7jPo0ANJsTKSfNXT0";
  const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;
  const filePath = `C:\Users\Aashman Sharma\Documents\GitHub\Track-It\app\assets\testData.txt`;

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [info, setInfo] = useState("");
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

  const handleInput3Change = (text) => {
    setAddress(text);
  };

  const handleInput4Change = (text) => {
    setDate(text);
  };

  const handleInput5Change = (text) => {
    setImage(text);
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
    }
  };

  const uploadImage = async () => {
    setDate("");
    setAddress("hello");
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
    }
  };

  const retakePicture = () => {
    setDate("");
    setAddress("hello");
    console.log(address);
    setStoreName("");
    setTotalPrice("");
    setPhoto(null);
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
    const fields = { storeName, totalPrice, address, date };
    const isValid = validateFields(fields);

    if (isValid) {
      try {
        const docRef = await addDoc(collection(db, user), {
          store: storeName,
          price: totalPrice,
          address: address,
          date: date,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      closeSheet();
      Alert.alert("Success", "Receipt submitted successfully");
    } else {
      Alert.alert("Error", "Please fill in all required fields");
    }
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
      {photo ? (
        <View style={styles.preview}>
          <Text style={styles.previewText}>Receipt Image:</Text>
          <Image
            style={styles.previewImage}
            source={{ uri: `data:image/jpeg;base64,${photo}` }}
          />
          <TouchableOpacity
            style={styles.retakeButton}
            onPress={() => retakePicture()}
          >
            <Text style={styles.buttonText}>Retake</Text>
          </TouchableOpacity>
          {isLoading ? (
            <View style={styles.indicatorWrapper}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : null}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => callGoogleVisionAsync(photo)}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
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
              style={styles.formButton}
              onPress={() => openSheet()}
            >
              <AntDesign name="form" size={24} color="green" />
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
                  style={styles.input}
                  onChangeText={handleInput1Change}
                  value={setStoreName}
                  placeholder="Store"
                  defaultValue={storeName}
                />
                <TextInput
                  style={styles.input}
                  onChangeText={handleInput2Change}
                  value={setTotalPrice}
                  keyboardType="numeric"
                  placeholder="Price"
                  defaultValue={totalPrice}
                />
                <TextInput
                  style={styles.input}
                  onChangeText={handleInput3Change}
                  value={setAddress}
                  placeholder="Address"
                />
                <TextInput
                  style={styles.input}
                  onChangeText={handleInput4Change}
                  value={setDate}
                  placeholder="Date"
                  defaultValue={date}
                />
                <Button title="Submit" onPress={handlePress} />
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
    backgroundColor: "#222",
    flex: 0.15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  cameraButton: {
    width: 80,
    height: 80,
    backgroundColor: "#fff",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
  },
  buttonText: {
    color: "#222",
    fontSize: 18,
  },
  preview: {
    flex: 1,
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
    width: 300,
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
    marginRight: 200,
    marginTop: 10,
    borderWidth: 1,
  },

  submitButton: {
    width: 100,
    height: 60,
    backgroundColor: colors.secondaryGreen,
    borderRadius: "25%",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 200,
    borderWidth: 1,
  },
  uploadButton: {
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    marginRight: "15%",
    borderWidth: 3,
  },

  formButton: {
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    marginLeft: "15%",
    borderWidth: 3,
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
    backgroundColor: "white",
    margin: 10,
  },
});

export default CameraScreen;

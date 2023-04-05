import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";

import globalStyle from "../config/globalStyle";

function CameraScreen() {
  const API_KEY = "AIzaSyBk0WzBazFzwoZmMA7jPo0ANJsTKSfNXT0";
  const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;

  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [info, setInfo] = useState("");

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
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

  const retakePicture = () => {
    console.log(info);
    setPhoto(null);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  async function callGoogleVisionAsync(image) {
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

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    console.log("callGoogleVisionAsync -> result", result);
    setInfo(result.responses[0].textAnnotations[0].description);
    console.log(info);
  }

  const submitPicture = async () => {
    try {
      const result = await callGoogleVisionAsync(photo);
      setStatus(result);
    } catch (error) {
      setStatus(`Error: ${error.message}`);
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
            style={styles.button}
            onPress={() => retakePicture()}
          >
            <Text style={styles.buttonText}>Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => submitPicture}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Camera style={styles.camera} ref={(ref) => setCameraRef(ref)}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => console.log("Upload Picture")}
            ></TouchableOpacity>

            <TouchableOpacity
              style={styles.cameraButton}
              onPress={() => takePicture()}
            ></TouchableOpacity>
          </View>
        </Camera>
      )}
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
    marginRight: "20%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
  },
  buttonText: {
    color: "#222",
    fontSize: 18,
    fontWeight: "bold",
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
  button: {
    width: 80,
    height: 80,
    backgroundColor: "#fff",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    borderWidth: 3,
  },
  uploadButton: {
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    marginRight: "7.5%",
    borderWidth: 3,
  },
});

export default CameraScreen;

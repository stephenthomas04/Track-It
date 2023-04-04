import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Camera } from "expo-camera";

import globalStyle from "../config/globalStyle";

function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.takePictureAsync(options);
      setPhoto(data.uri);
    }
  };

  const retakePicture = () => {
    setPhoto(null);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      {photo ? (
        <View style={styles.preview}>
          <Text style={styles.previewText}>Receipt Image:</Text>
          <Image style={styles.previewImage} source={{ uri: photo }} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => retakePicture()}
          >
            <Text style={styles.buttonText}>Retake</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Camera style={styles.camera} ref={(ref) => setCameraRef(ref)}>
          <View style={styles.buttonContainer}>

          <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => console.log("Upload Picture")}
            >
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.cameraButton}
              onPress={() => takePicture()}
            >
            </TouchableOpacity>
          
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
    flexDirection:"column",
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
    fontWeight: "bold"
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
  button:{
    width: 80,
    height: 80,
    backgroundColor: "#fff",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    margin: 20 ,
    borderWidth: 3,
  },
  uploadButton:{
    width: 40,
    height: 40,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    margin: 20 ,
    marginRight: "7.5%", 
    borderWidth: 3,
  }
});

export default CameraScreen;

import { View, TouchableOpacity, Text } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigationBuilder } from "@react-navigation/native";
export default function Cameras({
  startCamera,
  setStartCamera,
  picture,
  setPicture,
}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const takePicture = async () => {
    if (camera) {
      const image = await camera.takePictureAsync();
      console.log("imageurlとはこれではよいのか", image);
      setPicture(image.uri);
    }
  };
  const closeCamera = () => {
    setStartCamera(false);
  };
  return (
    <View style={{ flex: 1 }}>
      <Camera
        type={type}
        style={{ flex: 1 }}
        ref={(ref) => {
          setCamera(ref);
        }}
      />
      <View
        style={{
          height: 50,
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <TouchableOpacity onPress={closeCamera}>
          <MaterialIcons name="arrow-back" size={20} />
        </TouchableOpacity>

        <TouchableOpacity onPress={takePicture}>
          <MaterialIcons name="add-a-photo" size={20} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
        >
          <MaterialIcons name="autorenew" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

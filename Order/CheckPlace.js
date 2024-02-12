import React from "react";
import { View, Text } from "react-native";
import MapView, { Marker, Polyline, Polygon } from "react-native-maps";
import { useState } from "react";

export default function CheckPlace() {
  const [markers, setMarkers] = useState([]);

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    // setMarkers([...markers, coordinate]);
    setMarkers([coordinate]);
    console.log(markers);
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <MapView
        style={{ height: 400, width: 500 }}
        onPress={handleMapPress}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {markers &&
          markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker}
              style={{ color: "black", width: 30, heigth: 30 }}
            />
          ))}
      </MapView>
    </View>
  );
}

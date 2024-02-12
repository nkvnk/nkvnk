import React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import { AntDesign } from "@expo/vector-icons";
export default function ShareCar7() {
  // Google Maps APIキ
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    const fetchRoute = async () => {
      const origin = "35.6895,139.6917"; // 始点の座標 (例: エッフェル塔)
      const destination = "35.021,135.756";
      const API_KEY = "AIzaSyACqbF9hQeI9zPHs6c24NVlgCHau5Jbgxc";
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${API_KEY}`;

      try {
        const response = await fetch(url);
        const json = await response.json();

        const points = json.routes[0].overview_polyline.points;
        const pointsCoords = decodePolyline(points); // polylineをデコードして座標の配列に変換
        setCoordinates(pointsCoords);
        console.log("Hh");
      } catch (error) {}
    };

    fetchRoute();
  }, []);

  // Google Maps polylineをデコードする関数
  function decodePolyline(encoded) {
    if (!encoded) {
      return [];
    }
    const poly = [];
    let index = 0,
      len = encoded.length;
    let lat = 0,
      lng = 0;

    while (index < len) {
      let b,
        shift = 0,
        result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlat = result & 1 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;
      do {
        b = encoded.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      let dlng = result & 1 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      poly.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
    }

    return poly;
  }

  const minLongitude = 135.756;
  const maxLatitude = 35.6895;
  const maxLongitude = 139.6917;
  const minLatitude = 35.021;
  const latitudeDelta = maxLatitude - minLatitude;
  const longitudeDelta = maxLongitude - minLongitude + 1;
  const centerLatitude = (maxLatitude + minLatitude) / 2;
  const centerLongitude = (maxLongitude + minLongitude) / 2;

  return (
    <View style={styles.container}>
      <View style={{ left: 20, marginTop: 40 }}>
        <AntDesign name="arrowleft" size={35} color="#00a960" />
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={styles.title}>依頼の確認</Text>
      </View>
      <View style={{ height: 150 }}>
        <MapView
          style={{ flex: 1, width: "100%" }}
          initialRegion={{
            latitude: centerLatitude,
            longitude: centerLongitude,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta,
          }}
        >
          <Polyline
            coordinates={coordinates}
            strokeColor="white" // 線の色
            strokeWidth={11}
            // lineDashPattern={[10, 5]} // 線の太さ
          />
          <Polyline
            coordinates={coordinates}
            strokeColor="#00a960" // 線の色
            strokeWidth={5}
            // lineDashPattern={[10, 5]} // 線の太さ
          />
          <Marker coordinate={{ latitude: 35.021, longitude: 135.756 }}>
            <Image
              source={require("../assets/map.png")}
              style={{ width: 30, height: 30 }}
              color="black"
            />
          </Marker>
          <Marker coordinate={{ latitude: 35.6895, longitude: 139.6917 }}>
            <Image
              source={require("../assets/transport.png")}
              style={{ width: 30, height: 30 }}
              color="black"
            />
          </Marker>
        </MapView>
      </View>
      <View style={{ paddingTop: 30 }}>
        <Text style={styles.text}>出発日</Text>
        <View style={styles.views}>
          <Text style={styles.sub}>2023年3月3日</Text>
        </View>
      </View>
      <View style={styles.view}>
        <Text style={styles.text}>出発時間</Text>
        <View>
          <Text style={styles.sub}>8:00</Text>
        </View>
      </View>
      <View style={styles.view}>
        <Text style={styles.text}>一人当たりの料金</Text>
        <View>
          <Text style={styles.sub}>1000円</Text>
        </View>
      </View>
      <View style={styles.view}>
        <Text style={styles.text}>乗客人数</Text>
        <View>
          <Text style={styles.sub}>4人</Text>
        </View>
      </View>
      <View style={styles.view}>
        <Text style={styles.text}>コメント</Text>
        <View>
          <Text style={styles.sub}>宜しくお願いします</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 16,
  },
  sub: {
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 30,
  },
  views: {
    paddingTop: 7,
  },
  view: {
    paddingTop: 12,
  },
});

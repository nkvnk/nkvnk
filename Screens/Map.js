import { StatusBar } from "expo-status-bar";
import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";

import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
//import { AntDesign } from "@ant-design/icons-react-native"; // AntDesign Iconsからインポート
import Icon from "react-native-vector-icons/MaterialIcons"; // お好みのアイコンパックを選択してください
import { Md_key } from "@env";
import FeatherIcon from "react-native-vector-icons/Feather";

import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
//import { Camera, CameraType } from "expo-camera";
//mapに関するモジュールをインポート
import MapView, {
  Marker,
  Polyline,
  Polygon,
  Callout,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { UserLocationContext } from "../Context/UserLocationContext";
import { UserInformation } from "../Context/UserInformation";
import debounce from "lodash/debounce";

//amplifからdataを持ってくる
import { generateClient } from "aws-amplify/api";

import { getOrder, listPlaces, getPlace } from "../src/graphql/queries";
import RBSheet from "react-native-raw-bottom-sheet";
const client = generateClient();
export default function Map() {
  //配達する人間のユーザー情報
  const userinformation = useContext(UserInformation);

  const [mapRegion, setMapRegion] = useState({});
  const { location, setLocation } = useContext(UserLocationContext);

  const screenHeight = Dimensions.get("window").height;
  const [markers, setMarkers] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(false);
  const [order, setOrder] = useState(null);

  const [currentasgoogle, setCurrentasgoogle] = useState(null);

  useEffect(() => {
    if (location !== null) {
      setCurrentasgoogle({
        description: "現在地",
        geometry: {
          location: {
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          },
        },
      });
    }
  }, [location]);

  const [flagLongitude, setFlagLongitude] = useState(null);
  const [flagLatitude, setFlagLatitude] = useState(null);
  const [flagStartLatitude, setFlagStartLatitude] = useState(null);
  const [flagStartLongitude, setFlagStartLongitude] = useState(null);
  const coordinates = [
    { latitude: mapRegion?.latitude, longitude: mapRegion?.longitude },

    { latitude: flagLatitude, longitude: flagLongitude },
    { latitude: flagStartLatitude, longitude: flagStartLongitude },
  ].filter((coord) => coord.latitude != null && coord.longitude != null); // 無効な値を除外

  const flagCoordinate = [{ latitude: flagLatitude, longitude: flagLongitude }];
  //direction
  const [coordinate7, setCoordinate7] = useState([]);
  const API_KEY = "AIzaSyACqbF9hQeI9zPHs6c24NVlgCHau5Jbgxc";
  const fetchRoute = async (originLat, originLng, destLat, destLng) => {
    const origin = `${originLat},${originLng}`;
    const destination = `${destLat},${destLng}`;
    console.log("origin", origin);
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${API_KEY}`;

    try {
      const response = await fetch(url);
      const json = await response.json();
      const points = json.routes[0].overview_polyline.points;
      const pointsCoords = decodePolyline(points); // polylineをデコードして座標の配列に変換
      setCoordinate7(pointsCoords);
    } catch (error) {}
  };

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

  const todo = async (marker) => {
    const markerId = marker.OrderId;

    try {
      const oneOrder = await client.graphql({
        query: getOrder,
        variables: { id: markerId },
      });
      console.log(oneOrder);
      setOrder(oneOrder.data.getOrder);
      const flag = oneOrder?.data?.getOrder?.latitude;
      const flags = oneOrder?.data?.getOrder?.longitude;
      //modal を表示にする
      // setSelectedMarker(true);

      //bottomsheet をtrueにする

      //目的地の旗を立てる

      setFlagLatitude(flag);
      setFlagLongitude(flags);
      postlocaton(markerId);
      bottoms();
    } catch (err) {
      console.log("完了しません示が");
    }
  };

  const postlocaton = async (markerId) => {
    try {
      console.log(markerId);
      const variables = {
        filter: {
          OrderId: { eq: markerId },
        },
      };
      console.log("現在地の取得の始まり");
      const allPlaces = await client.graphql({
        query: listPlaces,
        variables: variables,
      });
      const longitude = allPlaces.data.listPlaces.items[0].longitude;
      const latitude = allPlaces.data.listPlaces.items[0].latitude;
      setFlagStartLatitude(latitude);
      setFlagStartLongitude(longitude);
    } catch (error) {
      console.log("なか", error);
    }
  };

  const navigation = useNavigation("");
  const start = () => {
    sheet.current.close();
    setFlagLongitude(null);
    setFlagLatitude(null);
    setFlagStartLatitude(null);
    setFlagStartLongitude(null);
    navigation.navigate("make", { passData: order });
  };

  const [currentLocation, setCurrentLocation] = useState();
  const mapRef = useRef();
  useEffect(() => {
    if (location) {
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      setCurrentLocation(mapRegion);
    }
  }, [location]);

  const handleCurrentLocation = () => {
    if (location) {
      const newRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      mapRef.current.animateToRegion(newRegion);
      setCurrentLocation(newRegion);
      // console.log("新しい現在地取得完了ました");
    }
  };
  //polylineについてのhookのコード

  const [mapScrollEnabled, setMapScrollEnabled] = useState(true);
  // なぞり終わった緯度経度を保持する

  useEffect(() => {
    async function fetchMarkers() {
      try {
        // AWS Amplify を使ってデータを取得
        // List all items
        const result = await client.graphql({
          query: listPlaces,
        });

        const locations = result.data.listPlaces.items;
        setMarkers(locations);
        console.log("よろしくお願い", markers);
      } catch (error) {}
    }

    fetchMarkers();
    //console.log("完了");
    //MakePolygonで変更可能
  }, []);

  const sheet = useRef();

  const bottoms = () => {
    sheet.current.open();

    //goToRegion(latitudeDelta, longitudeDelta.centerLatitude, centerLongitude);
  };

  const closeBottom = () => {
    sheet.current.close();
    setFlagLongitude(null);
    setFlagLatitude(null);
    setFlagStartLatitude(null);
    setFlagStartLongitude(null);
    console.log("クロス完了しました");
  };

  const apiKey = "AIzaSyACqbF9hQeI9zPHs6c24NVlgCHau5Jbgxc";
  const getTravelTime = async (originLat, originLng, destLat, destLng) => {
    const origin = `${originLat},${originLng}`;
    const destination = `${destLat},${destLng}`;

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin}&destinations=${destination}&key=${apiKey}`
      );
      const responseJson = await response.json();
      console.log(responseJson);
      if (responseJson.rows[0].elements[0].status === "OK") {
        const duration = responseJson.rows[0].elements[0].duration.text;
        return duration;
      } else {
        throw new Error("Unable to fetch travel time");
      }
    } catch (error) {
      console.error(error);
      return "Error";
    }
  };
  const [travelTime, setTravelTime] = useState("徒歩5分");
  {
    useEffect(() => {
      if (
        flagStartLatitude &&
        flagStartLongitude &&
        flagLatitude &&
        flagLongitude
      ) {
        fetchRoute(
          flagStartLatitude,
          flagStartLongitude,
          flagLatitude,
          flagLongitude
        )
          .then(setTravelTime)
          .catch((error) => console.log(error));
      }
    }, [flagStartLatitude, flagStartLongitude, flagLatitude, flagLongitude]);
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", alignItems: "center" }}>
      <MapView
        ref={mapRef}
        style={styles.map}
        showsUserLocation={true}
        region={currentLocation}
        scrollEnabled={mapScrollEnabled}
        provider={PROVIDER_GOOGLE}
        zoomEnabled={mapScrollEnabled}
        initialRegion={mapRegion}
      >
        <TextInput
          style={styles.searchBar}
          placeholder="Search for places"
          // value={searchText}
          // onChangeText={setSearchText}
          //onSubmitEditing={handleSearch}
        />

        {markers.length > 0 &&
          markers.map((marker) => (
            <Marker
              key={marker.id}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              onPress={() => todo(marker)}
            >
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: 31, // 必要に応じてサイズを調整してください
                  height: 31, // 必要に応じてサイズを調整してください
                  backgroundColor: "white",
                  borderRadius: 25, // 幅と高さの半分の値にして円を作ります
                  elevation: 3, // Android用の影を追加
                  // iOS用の影
                  shadowOpacity: 0.3,
                  shadowRadius: 3,
                  shadowOffset: { height: 0, width: 0 },
                }}
              >
                <MaterialCommunityIcons name="cart" size={20} color="black" />
              </TouchableOpacity>
            </Marker>
          ))}

        {coordinates.length === 3 && ( // 2点の座標がすべて有効な場合のみポリラインを描画
          <Polyline
            coordinates={coordinate7}
            strokeColor="white" // 線の色
            strokeWidth={15}
            // lineDashPattern={[10, 5]} // 線の太さ
          />

          // lineDashPattern={[10,
        )}
        {coordinates.length === 3 && ( // 2点の座標がすべて有効な場合のみポリラインを描画
          <Polyline
            coordinates={coordinate7}
            strokeColor="#00a960" // 線の色
            strokeWidth={8}
          />
        )}

        {flagCoordinate.length === 1 && (
          <View>
            <Marker
              coordinate={{ latitude: flagLatitude, longitude: flagLongitude }}
            >
              <Image
                source={require("../assets/store2.png")}
                style={{ width: 30, height: 30 }}
              />
            </Marker>
          </View>
        )}
      </MapView>

      <View style={{ position: "absolute", right: "0%" }}>
        <View style={{ top: 500 }}>
          <TouchableOpacity
            onPress={handleCurrentLocation}
            style={styles.buttons}
          >
            <MaterialCommunityIcons name="near-me" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <RBSheet
        customStyles={{ container: styles.sheet }}
        //  height={200}
        // openDuration={250}
        ref={sheet}
      >
        <View style={styles.sheetHeader}>
          <View>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.sheetTitle}>配達</Text>
              <View
                style={{
                  position: "absolute",
                  top: -8,
                  right: 20,
                }}
              >
                <TouchableOpacity style={styles.batu} onPress={closeBottom}>
                  <Icon
                    name="close"
                    size={25}
                    color="black"
                    style={{ right: "0%" }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between", // 子要素を両端に配置
                alignItems: "center", // 子要素をY軸に沿って中央に配置
                marginRight: 20,
                marginLeft: 40, // 必要に応じて左マージンを調整
              }}
            >
              <View style={{ flexDirection: "column" }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 20, // イオンモール柏の画像とテキストを中央揃え
                  }}
                >
                  <Image
                    source={require("../assets/store.png")}
                    style={{ height: 30, width: 30 }}
                  />
                  <Text style={{ fontSize: 15, fontWeight: "600", padding: 8 }}>
                    イオンモール柏
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 10,
                    // イオンモール柏の画像とテキストを中央揃え
                  }}
                >
                  <Image
                    source={require("../assets/clock.png")}
                    style={{ height: 30, width: 30 }}
                  />
                  <Text style={{ fontSize: 15, fontWeight: "600", padding: 8 }}>
                    5時30分まで
                  </Text>
                </View>
              </View>

              <Image
                style={{ height: 100, width: 100 }}
                source={require("../assets/package-delivery.png")}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.btn} onPress={start}>
            <Text style={styles.btnText}>配達をする</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    //...StyleSheet.absoluteFillObject,

    width: Dimensions.get("screen").width * 1,
    height: Dimensions.get("screen").height * 0.92,
  },

  searchBar: {
    height: 40,
    // borderWidth: 1,
    borderColor: "gray",
    paddingLeft: 10,
    marginHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "white",
    marginTop: 40,
  },
  shadow: {
    // 影のスタイル
    marginTop: 400,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Android用の影
  },
  markerView: {
    // マーカーと移動時間ビューの配置を調整するスタイル
    alignItems: "center",
    justifyContent: "center",
    width: 150, // 必要に応じて調整
  },
  bubble: {
    // 移動時間を表示するビューのスタイル
    flexDirection: "row",
    alignSelf: "flex-start",
    backgroundColor: "white",
    borderRadius: 6,
    borderColor: "grey",
    borderWidth: 0.5,
    padding: 8,
    //bottom: , // マーカー画像の高さに合わせて調整
  },
  calloutText: {
    // 移動時間テキストのスタイル
    color: "black",
    textAlign: "center",
  },
  viewbutton: {
    position: "absolute",
    right: "0%",
  },
  currenticon: {
    fontSize: 30,
    marginTop: 140,
    marginRight: 15,
    color: "#00a960",
  },

  modal: {
    width: "80%",
    maxHeight: Dimensions.get("window").height * 0.8, // 画面の高さの80%までの制限
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // 透明度を設定してモーダル以外
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  closeButton: {
    alignSelf: "flex-end",
    marginRight: 10,
    marginTop: 10,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    height: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  currentLocationText: {
    color: "black", // 任意の色に変更
    fontWeight: "bold", // 太さを変更
  },
  buttons: {
    justifyContent: "center",
    alignItems: "center",
    width: 44, // 必要に応じてサイズを調整してください
    height: 44, // 必要に応じてサイズを調整してください
    backgroundColor: "white",
    borderRadius: 25, // 幅と高さの半分の値にして円を作ります
    elevation: 3,

    marginRight: 15, // Android用の影を追加
    // iOS用の影
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { height: 0, width: 0 },
  },

  sheet: {
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    height: 250,
  },
  sheetHeader: {
    paddingVertical: 14,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    textTransform: "uppercase",
    color: "black",
    alignSelf: "flex-start",
    paddingHorizontal: 40,
  },
  sheetText: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    color: "#000000",
    marginTop: 12,
  },
  sheetBody: {
    padding: 24,
  },
  sheetBodyOptions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 48,
    marginHorizontal: -16,
  },
  sheetBodyOption: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 12,
    marginHorizontal: 16,
    paddingVertical: 28,
  },
  sheetBodyOptionText: {
    fontSize: 18,
    fontWeight: "600",
    //  marginTop: 2,
    color: "#bcbdd9",
  },
  /** Button */
  btn: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: "#000000",
    marginBottom: 32,
    backgroundColor: "#000000",
    alignSelf: "center",
    width: "80%",
  },
  btnText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },

  batu: {
    justifyContent: "center",
    alignItems: "center",
    width: 30, // 必要に応じてサイズを調整してください
    height: 30, // 必要に応じてサイズを調整してください
    backgroundColor: "#f0f8ff",
    borderRadius: 25, // 幅と高さの半分の値にして円を作ります
    elevation: 3, // Android用の影を追加
    // iOS用の影
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { height: 0, width: 0 },
  },
});
//<MaterialCommunityIcons name="magnify" />
{
  /*



 <View style={styles.shadow}>
          <View style={styles.bubble}>
            <Icon name="directions-walk" size={20} color="#000" />
            <Text style={styles.timeText}> 14 分</Text>
          </View>
        </View>





*/
}

{
  /*




<View style={styles.markerView}>
                {/*} <View style={styles.bubble}>
                  <Icon name="directions-walk" size={20} color="#000" />
                  <Text style={styles.calloutText}>移動時間: {travelTime}</Text>
        </View>
      </View>*/
}

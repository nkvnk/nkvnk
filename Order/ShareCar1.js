import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  Keyboard,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ShareCarInformation } from "../Context/ShareCarInformation";
import { useContext } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
export default function ShareCar1() {
  const navigation = useNavigation();
  const go = () => {
    navigation.navigate("sharecar2");
  };

  const { place1, setPlace1 } = useContext(ShareCarInformation);
  console.log(place1);
  //google place automotic
  const [locations, setLocations] = useState(null);
  const [selectedLocations, setSelectedLocations] = useState("");
  const handlePlaceSelect = (data, details) => {
    // 選択された場所の緯度経度情報を取得
    const { lat, lng } = details.geometry.location;
    setSelectedLocations(data.description);
    setLocations({ latitude: lat, longitude: lng });

    setModalVisible(false);
  };
  const [up, setUp] = useState(true);
  const ups = () => {
    setUp(false);
  };
  const downs = () => {
    setUp(true);
  };
  return (
    <View style={styles.container}>
      {up ? (
        <View>
          <View style={{ left: 20, marginTop: 40 }}>
            <AntDesign name="arrowleft" size={35} color="white" />
          </View>
          <View style={{ marginTop: 40 }}>
            <Text style={styles.title}>出発する場所を指定してしてください</Text>
          </View>
        </View>
      ) : (
        <View style={{ marginTop: 30 }}></View>
      )}
      <GooglePlacesAutocomplete
        textInputProps={{
          onFocus: () => {
            ups();
          },
          onBlur: () => {
            downs();
          },
          // 他の TextInput のプロパティ
        }}
        placeholder="住所を入れてください"
        onPress={(data, details = null) => {
          // 'details' は Google Places API から取得した詳細情報が含まれます
          console.log(data, details);
        }}
        query={{
          key: "AIzaSyACqbF9hQeI9zPHs6c24NVlgCHau5Jbgxc",
          language: "ja",
        }}
        styles={{
          textInputContainer: styles.searchSection,
          textInput: styles.input,
          predefinedPlacesDescription: {
            color: "white",
          },
          description: {
            // This will affect the text color and size of the search results.
            fontWeight: "bold",
            fontSize: 18,

            // ← ここで文字の大きさを指定
          },
        }}
        renderRow={(data) => (
          <View style={styles.row}>
            <Text style={styles.mainText}>
              {data.structured_formatting.main_text}
            </Text>
            <Text style={styles.secondaryText}>
              {data.structured_formatting.secondary_text}
            </Text>
          </View>
        )}
        renderLeftButton={() => (
          <Icon
            name="search"
            size={18}
            color="#a9a9a9"
            style={styles.searchIcon}
          />
        )}
      />

      <TouchableOpacity style={styles.fab} onPress={go}>
        <AntDesign name="arrowright" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //  backgroundColor: "#fff",
    backgroundColor: "#27282f",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 16,
    color: "white",
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "#e6e6e6",
    backgroundColor: "#414249",
    borderRadius: 20,
    margin: 16,
    paddingLeft: 16,
    height: 55,
  },
  searchIcon: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    // paddingVertical: 10,
    fontSize: 20,
    // backgroundColor: "#e6e6e6",
    backgroundColor: "#414249",
    color: "#000",
    marginRight: 10,

    // アイコンとのスペースを調整
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  locationIcon: {
    marginRight: 10,
  },
  locationText: {
    fontSize: 16,
    color: "#000",
  },
  fab: {
    backgroundColor: "#00a960", // Bootstrap primary blue
    width: 56, // Standard FAB size
    height: 56,
    borderRadius: 28, // Half the width and height to create a circle
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 16, // Margin from the bottom
    right: 16, // Margin from the right
    elevation: 4, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  row: {
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 5,
  },
  mainText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  secondaryText: {
    fontSize: 14,
    color: "gray",
  },
});

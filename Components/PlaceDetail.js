import React from "react";
import { View, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useState, useEffect } from "react";
export default function PlaceDetail({ updateParentState }) {
  const [locations, setLocations] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  const handlePlaceSelect = (data, details) => {
    // 選択された場所の緯度経度情報を取得
    const { lat, lng } = details.geometry.location;
    setSelectedLocation(data.description);
    setLocations({ latitude: lat, longitude: lng });
    updateParentState();
    console.log("ロケーションだよ", locations);
    console.log(selectedLocation);
    updateParentState(data.description);
  };

  useEffect(() => {
    if (locations !== null) {
      //console.log(data);
      console.log("追加データ", locations);
      console.log("賞っ歳dataだよ", selectedLocation);
    }
  }, [locations]);
  return (
    <GooglePlacesAutocomplete
      styles={{
        container: {
          // コンテナ全体のスタイル
          flex: 1,
          width: "100%",
        },
        textInputContainer: {
          // テキスト入力コンテナのスタイル
          backgroundColor: "lightgrey",
          borderTopWidth: 0,
          borderBottomWidth: 1,
          borderColor: "grey",
        },
        textInput: {
          // テキスト入力フィールドのスタイル
          marginLeft: 0,
          marginRight: 0,
          height: 38,
          color: "green",
        },
        predefinedPlacesDescription: {
          // プレースの説明のスタイル
          color: "#1faadb",
        },
      }}
      placeholder="Search"
      fetchDetails={true}
      onPress={handlePlaceSelect}
      query={{
        key: "AIzaSyACqbF9hQeI9zPHs6c24NVlgCHau5Jbgxc",
        language: "ja", // 言語設定
        components: "country:jp",
      }}
    />
  );
}

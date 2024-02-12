import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome5";
import { EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
export default function Search() {
  const [origin, setOrigin] = useState(false);
  const orgins = () => {
    setOrigin(true);
  };
  const orginss = () => {
    setOrigin(false);
  };
  const navigation = useNavigation();
  const go = () => {
    navigation.navigate("searchdetail");
  };
  return (
    <View style={styles.container}>
      <View style={{ paddingVertical: 50, paddingHorizontal: 40 }}>
        <Text style={{ color: "white", fontSize: 26, fontWeight: "bold" }}>
          今すぐ相乗りを見つけよう
        </Text>
      </View>
      <View>
        <TouchableOpacity style={styles.searchSection} onPress={orgins}>
          <AntDesign name="enviromento" size={24} color="#a9a9a9" />
          <Text style={{ color: "white", marginLeft: 40, fontWeight: "bold" }}>
            出発地
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.searchSection}>
          <AntDesign name="enviromento" size={24} color="#a9a9a9" />
          <Text style={{ color: "white", marginLeft: 40, fontWeight: "bold" }}>
            到着地
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.searchSection}>
          <EvilIcons name="calendar" size={30} color="#a9a9a9" />
        </TouchableOpacity>
      </View>
      <View style={{ width: "80%", marginHorizontal: 40 }}>
        <TouchableOpacity style={styles.becomeDriverButton} onPress={go}>
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            検索する
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: "#27282f" }}>
        <Modal visible={origin} style={{ backgroundColor: "#27282f" }}>
          <GooglePlacesAutocomplete
            textInputProps={{
              onBlur: () => {
                orginss();
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
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#27282f",
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "#e6e6e6",
    //  backgroundColor: "#414249",
    backgroundColor: "#27282f",
    borderRadius: 20,
    margin: 16,
    paddingLeft: 16,
    height: 55,
  },
  becomeDriverButton: {
    backgroundColor: "#00cc66",
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginHorizontal: 10,
    borderRadius: 20,
    marginTop: 15,
    backgroundColor: "#00a960",
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
});

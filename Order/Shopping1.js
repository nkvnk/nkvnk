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
import { MaterialIcons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { ShareCarInformation } from "../Context/ShareCarInformation";
import { useContext, useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { ScrollView } from "react-native-gesture-handler";
export default function Shopping1() {
  const navigation = useNavigation();
  const go = () => {
    navigation.navigate("shopping2");
  };
  const [price, setPrice] = useState(1);

  const incrementPrice = () => {
    setPrice((prevPrice) => prevPrice + 1);
  };

  const decrementPrice = () => {
    if (price > 0) {
      setPrice((prevPrice) => prevPrice - 1);
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <View style={{ left: 20, marginTop: 30 }}>
          <AntDesign name="arrowleft" size={35} color="#00a960" />
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={styles.title}>買い物依頼の詳細を記入してください</Text>
        </View>
      </View>

      <View style={{ flex: 1, paddingVertical: 10 }}>
        <View style={{ marginLeft: 16 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>商品の名前</Text>
          <Text style={{ fontSize: 10, fontWeight: "400" }}>
            (正確でなくてもよいので、わかる範囲で)
          </Text>
        </View>
        <View style={{ marginLeft: 16 }}>
          <TextInput
            style={{
              height: 50,
              width: "90%",
              backgroundColor: "#EEEEEE",
              paddingHorizontal: 10,
              borderRadius: 18,
              fontWeight: "bold",
              fontSize: 17,
              marginLeft: 20,
            }}
          ></TextInput>
        </View>
        <View style={{ marginLeft: 16 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            商品のブランド
          </Text>
          <Text style={{ fontSize: 10, fontWeight: "400" }}>(任意)</Text>
        </View>
        <View style={{ marginLeft: 16 }}>
          <TextInput
            style={{
              height: 50,
              width: "90%",
              backgroundColor: "#EEEEEE",
              paddingHorizontal: 10,
              borderRadius: 18,
              fontWeight: "bold",
              fontSize: 17,
              marginLeft: 20,
            }}
          ></TextInput>
        </View>
        <View style={{ marginLeft: 16 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>注文する数</Text>
          <Text style={{ fontSize: 10, fontWeight: "400" }}>(任意)</Text>
        </View>
        <View style={styles.priceContainer}>
          <TouchableOpacity onPress={decrementPrice} style={styles.button}>
            <Icon name="minus" size={20} color="#00a960" />
          </TouchableOpacity>

          <Text style={styles.priceText}>{price}個</Text>
          <TouchableOpacity onPress={incrementPrice} style={styles.button}>
            <Icon name="plus" size={20} color="#00a960" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.fab} onPress={go}>
        <AntDesign name="arrowright" size={28} color="#fff" />
      </TouchableOpacity>
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

  searchIcon: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    // paddingVertical: 10,
    fontSize: 20,
    backgroundColor: "#e6e6e6",
    color: "#000",
    marginRight: 10,

    // アイコンとのスペースを調整
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 100,
  },
  button: {
    //backgroundColor: "#ddd",
    padding: 15,
    margin: 10,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#00a960",
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

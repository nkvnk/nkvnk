import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // アイコン用
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
export default function ShareCar5() {
  const [price, setPrice] = useState(1200);

  const incrementPrice = () => {
    setPrice((prevPrice) => prevPrice + 200);
  };

  const decrementPrice = () => {
    if (price > 0) {
      setPrice((prevPrice) => prevPrice - 200);
    }
  };
  const navigation = useNavigation();
  const go = () => {
    navigation.navigate("sharecar6");
  };
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 50 }}>
        <Text style={styles.title}>1席の金額を選択してください</Text>
      </View>
      <View style={styles.priceContainer}>
        <TouchableOpacity onPress={decrementPrice} style={styles.button}>
          <Icon name="minus" size={20} color="#00a960" />
        </TouchableOpacity>

        <Text style={styles.priceText}>{price}円</Text>
        <TouchableOpacity onPress={incrementPrice} style={styles.button}>
          <Icon name="plus" size={20} color="#00a960" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.fab} onPress={go}>
        <AntDesign name="arrowright" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

// スタイルを適宜調整してください
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //  justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
  },
  button: {
    //backgroundColor: "#ddd",
    padding: 15,
    margin: 10,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#00a960",
  },
  priceText: {
    fontSize: 50,
    fontWeight: "bold",
    marginHorizontal: 12,
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
});

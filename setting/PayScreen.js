import React, { useState } from "react";
import {
  Text,
  View,
  FlatList,
  Button,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons"; // or any other icon pack
import { FontAwesome5 } from "@expo/vector-icons";
import { UserInformation } from "../Context/UserInformation";
import { useContext } from "react";
//import { kc_url } from "@env";
import { CardField, createToken } from "@stripe/stripe-react-native";
export default function PayScreen() {
  const userinformation = useContext(UserInformation);
  // console.log(userinformation);
  const [cardInfo, setCardInfo] = useState(null);
  const email = userinformation?.user?.email;
  console.log("mail", email);
  const fetchCardDetail = (cardDetails) => {
    //  console.log("関数内だよ", cardDetails);
    // const [cardInfo, setCardInfo] = useState(null);

    if (cardDetails.complete) {
      setCardInfo(cardDetails);
    } else {
      setCardInfo(null);
    }
  };

  const [selectedMethod, setSelectedMethod] = useState("Apple Pay");
  const renderStatusIcon = (method) => {
    if (selectedMethod === method) {
      return <Icon name="check-circle" size={24} color="#00a960" />;
    }
    return <Icon name="radio-button-unchecked" size={24} color="#000" />;
  };
  const navigation = useNavigation();
  const go = () => {
    navigation.navigate("keepcard");
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.paymentMethod}
        onPress={() => setSelectedMethod("Apple Pay")}
      >
        <View style={styles.iconContainer}>
          <FontAwesome5 name="apple-pay" size={24} color="black" />
        </View>
        <Text style={styles.text}>Apple Pay</Text>
        {renderStatusIcon("Apple Pay")}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.paymentMethod}
        onPress={() => setSelectedMethod("Cash")}
      >
        <Icon name="attach-money" size={24} color="#000" />
        <Text style={styles.text}>Cash</Text>
        {renderStatusIcon("Cash")}
      </TouchableOpacity>
      <TouchableOpacity style={styles.addCard} onPress={go}>
        <Icon name="add" size={24} color="#000" />
        <Text style={styles.text}>クレジットカードを追加する</Text>
        {selectedMethod === "Add Card" && (
          <Icon name="check-circle" size={24} color="green" />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  addCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  text: {
    flex: 1,
    marginLeft: 12,
    fontSize: 17,
    fontWeight: "bold",
  },
  iconContainer: {
    borderWidth: 1, // 四角い線の幅を設定
    borderColor: "black", // 線の色を設定
    padding: 2, // アイコンと線の間に余白を設定
    borderRadius: 4, // 円形の線を作成（必要に応じて調整）
  },
});

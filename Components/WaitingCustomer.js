import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
export default function WaitingCustomer() {
  const route = useRoute("");
  const ordererpValue = route?.params?.ordererpValue;
  console.log("確認waiting", ordererpValue);
  const navigation = useNavigation("");
  const chat = () => {
    navigation.navigate("chato", { ordererpValue });
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>waiting customer</Text>
      <TouchableOpacity onPress={chat}>
        <View style={{ alignSelf: "flex-end", paddingVertical: 20 }}>
          <Icon name="message" size={24} color="black" />
          <Text>メッセージ</Text>
        </View>
      </TouchableOpacity>
      <View style={{ marginTop: 40 }}>
        <TouchableOpacity
          style={{
            alignSelf: "center",
            justifyContent: "center",
            backgroundColor: "#00a960",
            width: 200,
            height: 40,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
            }}
          >
            注文した商品が届いた
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

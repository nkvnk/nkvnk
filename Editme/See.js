import { UserInformation } from "../Context/UserInformation";
import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { UserLocationContext } from "../Context/UserLocationContext";
import { generateClient } from "aws-amplify/api";
import { deleteOrder, listOrders, getOrder } from "../src/graphql/mutations";
const client = generateClient();
export default function See() {
  const userinformation = useContext(UserInformation);
  const userLocation = useContext(UserLocationContext);
  console.log(userinformation.user);
  //インプット情報をhookでまとめている。
  const [product, setProduct] = useState("");
  const [brand, setBrand] = useState("");
  const [shop, setShop] = useState("");
  const [color, setColor] = useState("");
  const [comment, setComment] = useState("");
  const [price, setPrice] = useState("");
  const navigation = useNavigation("");

  //amplifyを利用してdataを持ってくる
  console.log(userinformation.user.sub);

  //テキストインプットの色の変化を楽しむ

  const [borderColor, setBorderColor] = useState("grey");
  const handleFocus = () => {
    setBorderColor("#00a960");
  };

  const handleBlur = () => {
    setBorderColor("grey");
  };

  //amplifyのデータ削除

  const Delete = async () => {
    try {
      const deletedOrder = await client.graphql({
        query: deleteOrder,
        variables: {
          input: {
            userId: userinformation.user.sub,
          },
        },
      });
      console.log("削除完了");
    } catch (err) {
      console.log("削除失敗");
    }
  };

  const seeOrder = async () => {
    try {
      // Get a specific item
      const oneOrder = await client.graphql({
        query: getOrder,
        variables: { id: "680dbf7c-e4be-4fb2-855e-fcc3e3588a00" },
      });
      console.log("kannryou");
    } catch (err) {
      console.log("seeできないんですけど");
    }
  };
  seeOrder();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView>
        <View style={styles.headView}>
          <Text style={styles.headText}>注文情報</Text>

          <View>
            <Text style={styles.productName}>商品</Text>
            <TextInput
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={{
                height: 40,
                width: 330,
                paddingHorizontal: 10,
                borderRadius: 10,
                color: "#fff",
                borderWidth: 2,
                borderColor: borderColor,
              }}
              onChangeText={(text) => setProduct(text)}
              placeholder="商品情報"
              placeholderTextColor="grey"
            />
            <Text style={styles.productName}>ブランド</Text>
            <TextInput
              style={styles.inputProductName}
              onChangeText={(text) => setBrand(text)}
              placeholder="商品のブランド"
              placeholderTextColor="grey"
            />

            <Text style={styles.productName}>購入場所</Text>
            <TextInput
              style={styles.inputProductName}
              onChangeText={(text) => setShop(text)}
              placeholder="(任意)"
              placeholderTextColor="grey"
            />
            <Text style={styles.productName}>サイズや色など</Text>
            <TextInput
              style={styles.inputProductName}
              onChangeText={(text) => setColor(text)}
              placeholder="(任意)"
              placeholderTextColor="grey"
            />
            <Text style={styles.productName}>コメント</Text>
            <TextInput
              style={styles.inputProductComment}
              onChangeText={(text) => setComment(text)}
              placeholder="(任意)"
              placeholderTextColor="grey"
            />
            <Text style={styles.productName}>予算範囲</Text>
            <TextInput
              style={styles.inputProductName}
              onChangeText={(number) => setPrice(number)}
              keyboardType="numeric"
              placeholder="200～300円"
              placeholderTextColor="grey"
            />

            <View style={styles.buttonView} behavior="padding ">
              <TouchableOpacity style={styles.buttonupload}>
                <Text style={styles.uploadText}>編集を完了する</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#00a960",
                  width: 200,
                  height: 40,
                  borderRadius: 20,
                  marginTop: 30,
                }}
              >
                <Text style={styles.uploadText} onPress={Delete}>
                  削除する
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#2d2d2d",
    backgroundColor: "white",
  },
  headView: {
    flex: 1,
    alignItems: "center",
  },
  headText: {
    color: "black",
    fontSize: 30,
    marginTop: 40,
    fontWeight: "bold",
    marginBottom: 30,
  },

  productName: {
    color: "grey",
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 30,
    paddingBottom: 10,
  },
  inputProductName: {
    borderWidth: 1,
    height: 40,
    width: 330,
    borderColor: "#9c9c9c",
    paddingHorizontal: 10,
    borderRadius: 10,
    // color: "#fff",

    color: "black",
    borderWidth: 2,
  },
  inputProductComment: {
    borderWidth: 1,
    height: 200,
    width: 330,
    borderColor: "#9c9c9c",
    paddingHorizontal: 10,
    borderRadius: 5,
    color: "#fff",
  },
  buttonView: {
    alignItems: "center",
    marginTop: 30,
  },

  buttonupload: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#00a960",
    width: 200,
    height: 40,
    borderRadius: 20,
  },
  uploadText: {
    fontWeight: "bold",
    color: "white",
  },
});

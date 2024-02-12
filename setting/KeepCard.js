import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

import { UserInformation } from "../Context/UserInformation";
import { useContext, useState } from "react";
import { kc_url } from "@env";
import { CardField, createToken, useStripe } from "@stripe/stripe-react-native";
export default function KeepCard() {
  const userinformation = useContext(UserInformation);
  const { createToken } = useStripe();
  const [cardInfo, setCardInfo] = useState(null);
  const email = userinformation?.user?.email;
  const userId = userinformation?.user?.sub;
  console.log("mail", email);
  const fetchCardDetail = (cardDetails) => {
    if (cardDetails.complete) {
      setCardInfo(cardDetails);
    } else {
      setCardInfo(null);
      console.log("カード情報が不完全である");
    }
  };
  const handleSaveCard = async (cardInfo) => {
    try {
      // Replace 'cardDetails' with actual card details object obtained from your form
      console.log(cardInfo);
      const responses = await createToken({ ...cardInfo, type: "Card" });
      console.log("結果");

      if (responses.error) {
        // Handle error
        console.log("sippai");
        return;
      }

      console.log("全て完了");
      console.log(responses);
      console.log(email);
      console.log(userId);
      send(responses, email, userId);
    } catch (error) {
      // Handle error
      console.warn(error);
    }
  };

  const send = async (responses, email, userId) => {
    try {
      const response = await fetch(`${kc_url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tokenId: responses,

          userId,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error("サーバーエラー");
      }

      const responseData = await response.json();
      console.log("サーバーからの応答:", responseData);
    } catch (error) {
      console.error("送信中にエラーが発生しました:", error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={{ alignSelf: "center", marginTop: 20 }}>
        <Text style={styles.descriptionText}>
          以下のカードがご利用いただけます
        </Text>
      </View>
      <View style={styles.cardLogos}>
        <Image source={require("../assets/visa.png")} style={styles.logo} />
        <Image source={require("../assets/jcb.png")} style={styles.logo} />
        <Image source={require("../assets/card.png")} style={styles.logo} />
      </View>

      {/* Card Input Field */}

      <CardField
        postalCodeEnabled={false}
        placeholders={{
          number: "4242 4242 4242 4242",
        }}
        cardStyle={{
          backgroundColor: "#FFFFFF",
          textColor: "#000000",
          borderWidth: 1,
          borderRadius: 10,
        }}
        style={{
          width: "100%",
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={(cardDetails) => {
          fetchCardDetail(cardDetails);
        }}
        onFocus={(focusedField) => {
          // console.log("focusField", focusedField);
        }}
      />
      <TouchableOpacity
        style={{
          alignSelf: "center",
          justifyContent: "center",
          backgroundColor: "#00a960",

          height: 50,
          borderRadius: 25,
          width: "95%",
        }}
        //  disabled={!cardInfo}
        // disabled={cardInfo}
        disabled={!cardInfo}
        onPress={() => handleSaveCard(cardInfo)}
      >
        <Text
          style={{ fontWeight: "bold", color: "white", textAlign: "center" }}
        >
          カード情報の保存
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "600",
  },
  cardLogos: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  logo: {
    width: 50,
    height: 30,
    resizeMode: "contain",
  },
  noteText: {
    fontSize: 12,
    color: "red",
    marginBottom: 20,
  },
  cardInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    padding: 10,
    marginBottom: 20,
  },
  input: {
    marginLeft: 10,
    fontSize: 18,
    color: "#000",
    flex: 1,
  },
  button: {
    backgroundColor: "blue", // Replace with the exact color code from your design
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

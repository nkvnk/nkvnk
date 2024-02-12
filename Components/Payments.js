import React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { useState, useEffect, useContext } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { generateClient } from "aws-amplify/api";
import { createUserMoney } from "../src/graphql/mutations";
import { UserInformation } from "../Context/UserInformation";

import { createCard } from "../src/graphql/mutations";

const client = generateClient();
import { Sp_Key, Sl_Url } from "@env";
import {
  CardField,
  useConfirmPayment,
  useStripe,
  createToken,
  confirmPayment,
} from "@stripe/stripe-react-native";

export default function Payments() {
  const route = useRoute();
  const total = route.params.total;
  const lastPrice = route.params.lastPrice;
  const userinformation = useContext(UserInformation);
  //console.log("mail", userinformation?.user?.email);
  const [cardInfo, setCardInfo] = useState(null);
  const [cos, setCos] = useState();
  const ordererpValue = lastPrice[0]?.delivererp;

  //console.log(ordererpValue);
  const fetchCardDetail = (cardDetails) => {
    //  console.log("関数内だよ", cardDetails);

    if (cardDetails.complete) {
      setCardInfo(cardDetails);
    } else {
      setCardInfo(null);
    }
  };
  // stripe のcustomer idを取得する

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${Sl_Url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: total,
        userId: userinformation.user.sub,
        userEmail: userinformation.user.email,
      }),
    });
    const { clientSecret, customer } = await response.json();

    // クライアントサイドでclientSecretとcustomerを表示させる
    console.log("Client Secret:", clientSecret);
    console.log("Customer:", customer);
    setCos(customer);

    return clientSecret;
  };
  const navigation = useNavigation();
  const go = () => {
    navigation.navigate("waitingcustomer", { ordererpValue });
  };
  const handlePayPress = async () => {
    // Gather the customer's billing information (for example, email)
    const clientSecret = await fetchPaymentIntentClientSecret();

    // Fetch the intent client secret from the backend

    // Confirm the payment with the card details
    const { paymentIntent, error } = await confirmPayment(clientSecret, {
      paymentMethodType: "Card",
    });

    if (error) {
      console.log("Payment confirmation error", error);
    } else if (paymentIntent) {
      alert("支払いが完了しました");

      go();
      try {
        const newUserMoney = await client.graphql({
          query: createUserMoney,
          variables: {
            input: {
              delivererm: ordererpValue,
              Money: total,
              ordererm: userinformation?.user?.sub,
              address: userinformation?.user?.address,
            },
          },
        });
        console.log("相手に入金が完了しました");
      } catch (error) {
        console.log("相手に入金できません");
      }
      console.log("Success from promise");
    }
  };

  const keep = async () => {
    try {
      const newCard = await client.graphql({
        query: createCard,
        variables: {
          input: {
            customer: cos,
            userId: userinformation?.user?.sub,
          },
        },
      });
      console.log("stripeの情報が保存されました");
    } catch (error) {
      console, log(error);
    }
  };
  useEffect(() => {
    if (cos) {
      keep();
    }
  }, [cos]);
  return (
    <View>
      <Text>creditcard</Text>
      {total && <Text>{total}</Text>}
      <CardField
        postalCodeEnabled={true}
        placeholders={{
          number: "4242 4242 4242 4242",
        }}
        cardStyle={{
          backgroundColor: "#FFFFFF",
          textColor: "#000000",
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
          width: 200,
          height: 40,
          borderRadius: 20,
        }}
        onPress={handlePayPress}
        disabled={!cardInfo}
      >
        <Text
          style={{ fontWeight: "bold", color: "white", textAlign: "center" }}
        >
          決済
        </Text>
      </TouchableOpacity>
    </View>
  );
}

{
  /*


let apiData = {
  amount: 500,
  currency: "jpy",
};

try {
  const res = await createIntent(apiData);
  console.log("payment intent create succesfully...!!!", res);

  if (res?.data?.paymentIntent) {
    let confirmPaymentIntent = await confirmPayment(
      res?.data?.paymentIntent,
      { paymentMethodType: "Card" }
    );
    console.log("confirmPaymentIntent res++++", confirmPaymentIntent);
    alert("Payment succesfully...!!!");
  }
} catch (error) {
  console.log("Error rasied during payment intent", error);
}*/
}

{
  /*


 async function postTodo() {
    try {
      const restOperation = post({
        apiName: "stripeLamdaApi",
        path: "/",
        options: {
          body: {},
        },
      });

      {
     



*/
}

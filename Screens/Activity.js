import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useState, useContext } from "react";
import PayMoney from "../Traging/PayMoney";
import { UserInformation } from "../Context/UserInformation";
import { listPrices } from "../src/graphql/queries";
import { onCreatePrice } from "../src/graphql/subscriptions";
import { generateClient } from "aws-amplify/api";
import { useNavigation } from "@react-navigation/native";
const client = generateClient();
export default function Activity() {
  const userInformation = useContext(UserInformation);
  console.log("activity screen", userInformation.user.sub);
  const [hasData, setHasData] = useState(false);

  const check = async () => {
    try {
      // List all items
      const variables = {
        filter: { ordererp: { eq: userInformation.user.sub } },
      };
      const allPrices = await client.graphql({
        query: listPrices,
        variables: variables,
      });
      console.log(allPrices.data.listPrices.items);
      if (allPrices.data.listPrices.items.length) {
        console.log("all complite");
        setHasData(true);
      }
    } catch (err) {
      console.log("完了し目線");
    }
  };

  useEffect(() => {
    check();
  }, []);
  const navigation = useNavigation();
  const goTo = () => {
    navigation.navigate("trade");
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
      }}
    >
      {hasData ? (
        <PayMoney />
      ) : (
        <View>
          <View
            style={{
              alignItems: "flex-start",
              marginTop: 60,
              marginLeft: 20,
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 25,
              }}
            >
              アクティビティ
            </Text>
            <TouchableOpacity onPress={goTo}>
              <View style={{ position: "absolute", marginLeft: 90 }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 20,
                  }}
                >
                  履歴
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ alignSelf: "center", marginTop: 150 }}>
            <Image
              source={require("../assets/contract.png")}
              style={{
                width: 150,
                height: 150,
                alignSelf: "center",
              }}
            />
            <Text style={{ fontSize: 20, fontWeight: "600", marginTop: 30 }}>
              アクティビティがありません
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}
